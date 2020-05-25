package widoco;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.io.FileDocumentSource;
import org.semanticweb.owlapi.io.OWLOntologyDocumentSource;
import org.semanticweb.owlapi.io.StreamDocumentSource;
import org.semanticweb.owlapi.model.*;
import org.semanticweb.owlapi.util.AxiomSubjectProviderEx;

import javax.annotation.Nullable;
import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Stream;

/**
 * The JenaCatalogIRIMapper checks whether there's an ont-policy.rdf file in the current directory. If so, it will
 * read all OntologySpec elements and add their publicURI and altURL to a map which is then used to do the conversion
 * from ontologyIRI or versionIRI to documentIRI.
 *
 * Using OWLAPI to read one XML file is overkill but we do it anyway because it could then support any serialization
 * format, not only ont-policy.rdf but also .ttl etc. And we didn't want to do it with Jena because that dependency
 * should not be part of widoco in a future version (perhaps?)
 *
 * @author Jacobus Geluk, agnos.ai
 */
public class CatalogIRIMapper implements OWLOntologyIRIMapper {

    private static final Logger logger = LoggerFactory.getLogger(CatalogIRIMapper.class);

    //
    // Some static variables that have been copied straight from the Jena code that deals with ont-policy.rdf
    // See https://github.com/apache/jena/blob/master/jena-core/src/main/java/org/apache/jena/ontology/OntDocumentManager.java
    //
    /** The default path for searching for the metadata on locally cached ontologies */
    public static final String DEFAULT_METADATA_PATH = "file:ont-policy.rdf;file:etc/ont-policy.rdf;ont-policy.rdf";
    //
    // End of Jena vars
    //
    /** The two predicate IRIs we're scanning for */
    private static final IRI mappingOntologyIRI = IRI.create("http://jena.hpl.hp.com/schemas/2003/03/ont-manager#publicURI") ;
    private static final IRI mappingDocumentIRI = IRI.create("http://jena.hpl.hp.com/schemas/2003/03/ont-manager#altURL") ;
    private static final IRI[] mappingPredicates = { mappingOntologyIRI, mappingDocumentIRI };

    private final Map<IRI, IRI> ontologyIRI2AltIRImap = new HashMap<>();

    boolean isLoaded = false;

    private OWLOntologyManager manager = OWLManager.createOWLOntologyManager();

    CatalogIRIMapper() {

        logger.info("Creating JenaCatalogIRIMapper");

        ontologyDocumentSource()
            .map(Optional::of)
            .orElse(ontologyDocumentSourceInJar())
            .map(this::loadOntologyFromOntologyDocument)
            .ifPresent(this::process);
    }

    public void printMap() {
        ontologyIRI2AltIRImap.forEach((key, value) ->
            logger.info(key + " -> " + value)
        );
    }

    /**
     * Given an ontology IRI, this method maps the ontology IRI to a document
     * IRI.
     *
     * @param ontologyIRI The ontology IRI to be mapped.
     * @return The document IRI of the ontology, or {@code null} if the mapper doesn't have mapping
     * for the specified ontology IRI.
     */
    @Nullable
    public IRI getDocumentIRI(IRI ontologyIRI) {

        return ontologyIRI2AltIRImap.getOrDefault(ontologyIRI, ontologyIRI);
    }

    private static Optional<String> getIdOfAxiom(OWLAxiom axiom) {

        OWLObject subjectObject = AxiomSubjectProviderEx.getSubject(axiom);
        OWLIndividual subjectObjectIndividual = (OWLIndividual) subjectObject ;

        if (subjectObjectIndividual.isNamed()) return Optional.empty();

        OWLAnonymousIndividual subjectObjectAnonymousIndividual = subjectObjectIndividual.asOWLAnonymousIndividual();

        return Optional.of(subjectObjectAnonymousIndividual.toStringID());
    }

    private static IRI getPredicateIRIOfAnnotationAxiom(OWLAnnotationAssertionAxiom axiom) {
        HasIRI annotationProperty = axiom.getProperty();
        return annotationProperty.getIRI();
    }

    private static boolean isMappingIRI(OWLAnnotationAssertionAxiom axiom) {
        IRI checkIRI = getPredicateIRIOfAnnotationAxiom(axiom);
        for (IRI mappingPredicateIRI : mappingPredicates) { // old school loop is faster for 2 element array
            if (checkIRI.equals(mappingPredicateIRI)) return true;
        }
        return false;
    }

    /**
     * Process the ont-policy.rdf file (or whatever format it had, does not necessarily have to be rdf/xml format)
     * and find the mapping predicate IRIs we're interested in and update the ontologyIRI2AltIRImap accordingly.
     */
    private void process(OWLOntology ontology) {

        logger.info("Loaded ont-policy ontology");

        isLoaded = true;

        class Mapping {
            public Optional<IRI> ontologyIRI = Optional.empty();
            public Optional<IRI> alternativeIRI = Optional.empty();

            void setIRI(IRI predicateIRI, IRI valueIRI) {
                if (predicateIRI.equals(mappingOntologyIRI)) {
                    ontologyIRI = Optional.of(valueIRI);
                } else {
                    alternativeIRI = Optional.of(valueIRI);
                }
                if (ontologyIRI.isPresent() && alternativeIRI.isPresent()) {
                    logger.debug("Mapping: " + ontologyIRI.get() + " -> " + alternativeIRI.get());
                    ontologyIRI2AltIRImap.put(ontologyIRI.get(), alternativeIRI.get());
                }
            }
        }

        Map<String, Mapping> temporaryMap = new HashMap<>();

        ontology.axioms()
            .filter(OWLAxiom::isAnnotationAxiom)
            .map(axiom -> (OWLAnnotationAssertionAxiom) axiom)
            .filter(annotationAssertionAxiom ->
                AxiomSubjectProviderEx.getSubject(annotationAssertionAxiom).isIndividual()
            )
            .filter(CatalogIRIMapper::isMappingIRI)
//          .peek(axiom -> logger.info("Axiom " + axiom.toString() + " type " + axiom.getAxiomType().getName()))
            .forEach(annotationAssertionAxiom ->
                getIdOfAxiom(annotationAssertionAxiom).ifPresent(axiomId ->
                    Optional
                        .ofNullable(temporaryMap.computeIfAbsent(axiomId, x -> new Mapping()))
                        .ifPresent(mapping ->
                            mapping.setIRI(
                                getPredicateIRIOfAnnotationAxiom(annotationAssertionAxiom),
                                IRI.create(annotationAssertionAxiom.getValue().toString())
                            )
                        )
                )
            );
    }

    private OWLOntology loadOntologyFromOntologyDocument(OWLOntologyDocumentSource documentSource) {
        try {
            logger.info("Loading 3 " + documentSource.getDocumentIRI());
            return manager.loadOntologyFromOntologyDocument(documentSource);
        } catch (OWLOntologyCreationException e_) {
            logger.error("Could not load ont-policy " + e_.getMessage(), e_);
            return null;
        }
    }

    private static Optional<OWLOntologyDocumentSource> ontologyDocumentSource() {
        return ontPolicyLocations()
            .filter(CatalogIRIMapper::fileExists)
            .peek(fileName -> logger.info("Loading 1 " + fileName))
            .map(fileName -> new File(fileName))
            .findFirst()
            .map(file -> new FileDocumentSource(file))
            ;
    }

    private Optional<OWLOntologyDocumentSource> ontologyDocumentSourceInJar() {
        logger.debug("Getting ont-policy.rdf from class loader");
        return Optional.ofNullable(getClass().getClassLoader())
            .map(classLoader -> classLoader.getResourceAsStream("ont-policy.rdf"))
            .map(inputStream -> new StreamDocumentSource(inputStream))
            ;
    }

    private static Stream<String> ontPolicyLocations() {
        return Pattern.compile(";").splitAsStream(DEFAULT_METADATA_PATH);
    }

    private static boolean fileExists(String fileName) {
        return new File(fileName).exists();
    }

    public boolean isLoaded() {
        return this.isLoaded;
    }

}
