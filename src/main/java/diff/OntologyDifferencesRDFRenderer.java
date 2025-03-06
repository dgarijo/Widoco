package diff;

import java.util.ArrayList;
import java.io.Writer;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.vocabulary.RDF;
import org.semanticweb.owlapi.model.OWLAnnotationAssertionAxiom;
import org.semanticweb.owlapi.model.OWLAxiom;
import org.semanticweb.owlapi.model.OWLClass;
import org.semanticweb.owlapi.model.OWLClassExpression;
import org.semanticweb.owlapi.model.OWLDataPropertyDomainAxiom;
import org.semanticweb.owlapi.model.OWLDataPropertyRangeAxiom;
import org.semanticweb.owlapi.model.OWLObjectIntersectionOf;
import org.semanticweb.owlapi.model.OWLObjectPropertyDomainAxiom;
import org.semanticweb.owlapi.model.OWLObjectPropertyRangeAxiom;
import org.semanticweb.owlapi.model.OWLObjectUnionOf;
import org.semanticweb.owlapi.model.OWLPropertyExpression;
import org.semanticweb.owlapi.model.OWLSubClassOfAxiom;
import org.semanticweb.owlapi.model.OWLSubPropertyAxiom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import uk.ac.manchester.cs.owl.owlapi.OWLDataPropertyImpl;
import uk.ac.manchester.cs.owl.owlapi.OWLObjectPropertyImpl;
import widoco.Constants;

/**
 * class to render diff objects in RDF. Separated from the main class to
 * calculate
 * 
 * @author dgarijo
 */
public class OntologyDifferencesRDFRenderer {

    private final static Logger logger = LoggerFactory.getLogger(OntologyDifferencesRenderer.class);

    /**
     * Method that renders the current differences as RDF.
     * 
     * @param c
     *            the comparison object with all the differences to render
     * @param ontologyNamespace
     *            namespace of the ontology to link back
     * @param language
     *            language file with the labels to be used in the report
     * @return
     */
    public static Model differencesToRDF(CompareOntologies c, String ontologyNamespace, Properties language) {
        Model model = ModelFactory.createDefaultModel();
        Resource ontologyChangeSummary = model.createResource(ontologyNamespace + "OntologyChangeSummary");

        ontologyChangeSummary.addProperty(model.createProperty(ontologyNamespace + "oldVersion"), c.getOldVersion());
        ontologyChangeSummary.addProperty(model.createProperty(ontologyNamespace + "newVersion"), c.getNewVersion());

        addChangesToModel(model, ontologyChangeSummary, c.getModifiedClasses(), "ModifiedClass", ontologyNamespace, language);
        addChangesToModel(model, ontologyChangeSummary, c.getNewClasses(), "AddedClass", ontologyNamespace, language);
        addChangesToModel(model, ontologyChangeSummary, c.getDeletedClasses(), "DeletedClass", ontologyNamespace, language);

        addChangesToModel(model, ontologyChangeSummary, c.getModifiedProperties(), "ModifiedProperty", ontologyNamespace, language);
        addChangesToModel(model, ontologyChangeSummary, c.getNewProperties(), "AddedProperty", ontologyNamespace, language);
        addChangesToModel(model, ontologyChangeSummary, c.getDeletedProperties(), "DeletedProperty", ontologyNamespace, language);

        addChangesToModel(model, ontologyChangeSummary, c.getModifiedDataProperties(), "ModifiedDataProperty", ontologyNamespace, language);
        addChangesToModel(model, ontologyChangeSummary, c.getNewDataProperties(), "AddedDataProperty", ontologyNamespace, language);
        addChangesToModel(model, ontologyChangeSummary, c.getDeletedDataProperties(), "DeletedDataProperty", ontologyNamespace, language);

        try (Writer writer = new FileWriter("auto_changes.ttl")) {
            model.write(writer, "TTL");
        } catch (IOException e) {
            logger.error("Error writing RDF model to file", e);
        }
        return model;
    }

    private static void addChangesToModel(Model model, Resource parentResource, ArrayList<OWLAxiomInfo> changes, String changeType, String ontologyNamespace, Properties language) {
        for (OWLAxiomInfo axiomInfo : changes) {
            Resource changeResource = model.createResource(ontologyNamespace + axiomInfo.getIRIAsString());
            changeResource.addProperty(RDF.type, model.createResource(ontologyNamespace + changeType));
            parentResource.addProperty(model.createProperty(ontologyNamespace + "hasChange"), changeResource);

            if (axiomInfo.getNewAxioms() != null) {
                for (Object newAxiom : axiomInfo.getNewAxioms()) {
                    changeResource.addProperty(model.createProperty(ontologyNamespace + "addedAxiom"), newAxiom.toString());
                }
            }
            if (axiomInfo.getDeletedAxioms() != null) {
                for (Object deletedAxiom : axiomInfo.getDeletedAxioms()) {
                    changeResource.addProperty(model.createProperty(ontologyNamespace + "deletedAxiom"), deletedAxiom.toString());
                }
            }
        }
    }
}
