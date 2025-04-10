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
import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.sparql.function.library.print;

/**
 * class to render diff objects in RDF. Separated from the main class to
 * calculate
 * 
 */
public class OntologyDifferencesRDFRenderer {

    private final static Logger logger = LoggerFactory.getLogger(OntologyDifferencesRenderer.class);

    @SuppressWarnings("rawtypes")
    private static void axiomSetToRDF(Set<Object> set, Model model, Properties lang, String namespace,String operation) {
		for (Object f : set) {
			try {
				if (f instanceof OWLSubClassOfAxiom && operation.equals("Add")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#AddSubClass"));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#sourceAddSubClass"),model.createResource(((OWLSubClassOfAxiom)f).getSubClass().asOWLClass().getIRI().toString()));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#targetAddSubClass"),model.createResource(((OWLSubClassOfAxiom) f).getSuperClass().asOWLClass().getIRI().toString()));
                } else if (f instanceof OWLSubClassOfAxiom && operation.equals("Remove")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#RemoveSubClass"));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#sourceRemoveSubClass"),model.createResource(((OWLSubClassOfAxiom)f).getSubClass().asOWLClass().getIRI().toString()));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#targetRemoveSubClass"),model.createResource(((OWLSubClassOfAxiom) f).getSuperClass().asOWLClass().getIRI().toString()));
                } else if (f instanceof OWLSubPropertyAxiom && operation.equals("Add")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#AddSubProperty"));
                    if (((OWLSubPropertyAxiom)f).getSuperProperty() instanceof OWLDataPropertyImpl) {
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#sourceAddSubProperty"),model.createResource(((OWLSubPropertyAxiom)f).getSubProperty().asOWLDataProperty().getIRI().toString()));
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#targetAddSubProperty"),model.createResource(((OWLSubPropertyAxiom) f).getSuperProperty().asOWLDataProperty().getIRI().toString()));
                    } else if (((OWLSubPropertyAxiom)f).getSuperProperty() instanceof OWLObjectPropertyImpl) {
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#sourceAddSubProperty"),model.createResource(((OWLSubPropertyAxiom)f).getSubProperty().asOWLObjectProperty().getIRI().toString()));
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#targetAddSubProperty"),model.createResource(((OWLSubPropertyAxiom) f).getSuperProperty().asOWLObjectProperty().getIRI().toString()));
                    }
                } else if (f instanceof OWLSubPropertyAxiom && operation.equals("Remove")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#RemoveSubProperty"));
                    if (((OWLSubPropertyAxiom)f).getSuperProperty() instanceof OWLDataPropertyImpl) {
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#sourceRemoveSubProperty"),model.createResource(((OWLSubPropertyAxiom)f).getSubProperty().asOWLDataProperty().getIRI().toString()));
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#targetRemoveSubProperty"),model.createResource(((OWLSubPropertyAxiom) f).getSuperProperty().asOWLDataProperty().getIRI().toString()));
                    } else if (((OWLSubPropertyAxiom)f).getSuperProperty() instanceof OWLObjectPropertyImpl) {
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#sourceRemoveSubProperty"),model.createResource(((OWLSubPropertyAxiom)f).getSubProperty().asOWLObjectProperty().getIRI().toString()));
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#targetRemoveSubProperty"),model.createResource(((OWLSubPropertyAxiom) f).getSuperProperty().asOWLObjectProperty().getIRI().toString()));
                    }
                } else if (f instanceof OWLObjectPropertyDomainAxiom && operation.equals("Add")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#AddDomain"));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#addedDomainToProperty"),model.createResource(((OWLObjectPropertyDomainAxiom) f).getProperty().asOWLObjectProperty().getIRI().toString()));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#addedDomain"),model.createResource(((OWLObjectPropertyDomainAxiom) f).getDomain().asOWLClass().getIRI().toString()));
                } else if (f instanceof OWLObjectPropertyDomainAxiom && operation.equals("Remove")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#RemoveDomain"));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#removeDomainFromProperty"),model.createResource(((OWLObjectPropertyDomainAxiom) f).getProperty().asOWLObjectProperty().getIRI().toString()));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#removedDomain"),model.createResource(((OWLObjectPropertyDomainAxiom) f).getDomain().asOWLClass().getIRI().toString()));
                } else if (f instanceof OWLDataPropertyDomainAxiom && operation.equals("Add")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#AddDomain"));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#addedDomainToProperty"),model.createResource(((OWLDataPropertyDomainAxiom) f).getProperty().asOWLDataProperty().getIRI().toString()));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#addedDomain"),model.createResource(((OWLDataPropertyDomainAxiom) f).getDomain().asOWLClass().getIRI().toString()));
                } else if (f instanceof OWLDataPropertyDomainAxiom && operation.equals("Remove")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#RemoveDomain"));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#removeDomainFromProperty"),model.createResource(((OWLDataPropertyDomainAxiom) f).getProperty().asOWLDataProperty().getIRI().toString()));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#removedDomain"),model.createResource(((OWLDataPropertyDomainAxiom) f).getDomain().asOWLClass().getIRI().toString()));
				} else if (f instanceof OWLObjectPropertyRangeAxiom && operation.equals("Add")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#AddRangeObjectProperty"));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#addedRangeToProperty"),model.createResource(((OWLObjectPropertyRangeAxiom) f).getProperty().asOWLObjectProperty().getIRI().toString()));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#addedObjectRange"),model.createResource(((OWLObjectPropertyRangeAxiom) f).getRange().asOWLClass().getIRI().toString()));
                } else if (f instanceof OWLObjectPropertyRangeAxiom && operation.equals("Remove")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#RemoveRangeObjectProperty"));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#removedRangeFromProperty"),model.createResource(((OWLObjectPropertyRangeAxiom) f).getProperty().asOWLObjectProperty().getIRI().toString()));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#removedObjectRange"),model.createResource(((OWLObjectPropertyRangeAxiom) f).getRange().asOWLClass().getIRI().toString()));
				} else if (f instanceof OWLDataPropertyRangeAxiom && operation.equals("Add")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#AddRangeDataProperty"));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#addedRangeToProperty"),model.createResource(((OWLDataPropertyRangeAxiom) f).getProperty().asOWLDataProperty().getIRI().toString()));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#addedDataRange"),model.createResource(((OWLDataPropertyRangeAxiom) f).getRange().asOWLDatatype().getIRI().toString()));
				} else if (f instanceof OWLDataPropertyRangeAxiom && operation.equals("Remove")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#RemoveRangeDataProperty"));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#removedRangeFromProperty"),model.createResource(((OWLDataPropertyRangeAxiom) f).getProperty().asOWLDataProperty().getIRI().toString()));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#removedDataRange"),model.createResource(((OWLDataPropertyRangeAxiom) f).getRange().asOWLDatatype().getIRI().toString()));
				} else if (f instanceof OWLAnnotationAssertionAxiom && operation.equals("Add")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#AddAnnotationToEntity"));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#targetAddAnnotationToEntity"),((OWLAnnotationAssertionAxiom) f).getValue().toString());
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#sourceAddAnnotationToEntity"),model.createResource(((OWLAnnotationAssertionAxiom) f).getSubject().asIRI().toString()));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#addedAnnotationToEntity"),model.createResource(((OWLAnnotationAssertionAxiom) f).getProperty().asOWLAnnotationProperty().getIRI().toString()));
				} else if (f instanceof OWLAnnotationAssertionAxiom && operation.equals("Remove")) {
                    Resource changeResource = model.createResource(namespace+ "#Change_" + System.nanoTime());
                    model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#RemoveAnnotationFromEntity"));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#targetRemoveAnnotationFromEntity"),((OWLAnnotationAssertionAxiom) f).getValue().toString());
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#sourceRemoveAnnotationFromEntity"),model.createResource(((OWLAnnotationAssertionAxiom) f).getSubject().asIRI().toString()));
                    model.add(changeResource, model.createProperty("https://w3id.org/def/och#removedAnnotationFromEntity"),model.createResource(((OWLAnnotationAssertionAxiom) f).getProperty().asOWLAnnotationProperty().getIRI().toString()));
				}   
			} catch (Exception e) {
				logger.error("Error while transforming RDF " + f.toString() + " " + e.getMessage());
			}
		}
	}

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
    public static Model differencesToRDF(CompareOntologies c, String ontologyNamespace, Properties language, String prefix) {
        Model model = ModelFactory.createDefaultModel();
        model.setNsPrefix("och", "https://w3id.org/def/och#");
        model.setNsPrefix(prefix, ontologyNamespace);
            int changesInClasses = c.getDeletedClasses().size() + c.getModifiedClasses().size() + c.getNewClasses().size(),
                    changesInProps = c.getDeletedProperties().size() + c.getModifiedProperties().size()
                            + c.getNewProperties().size(),
                    changesInDataProps = c.getDeletedDataProperties().size() + c.getModifiedProperties().size()
                            + c.getNewDataProperties().size();
            if (changesInClasses > 0) {
                if (!c.getModifiedClasses().isEmpty()) {
                    Iterator<OWLAxiomInfo> i = c.getModifiedClasses().iterator();
                    while (i.hasNext()) {
                        OWLAxiomInfo axiomSet = i.next();
                        axiomSetToRDF(axiomSet.getDeletedAxioms(),model,language,ontologyNamespace,"Remove");
                        axiomSetToRDF(axiomSet.getNewAxioms(),model,language,ontologyNamespace,"Add");
                    }
                }
                if (!c.getNewClasses().isEmpty()) {
                    Iterator<OWLAxiomInfo> i = c.getNewClasses().iterator();
                    while (i.hasNext()) {
                        OWLAxiomInfo axiomSet = i.next();
                        Resource changeResource = model.createResource(ontologyNamespace + "#Change_" + System.nanoTime());
                        model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#AddClass"));
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#addedClass"), model.createResource(axiomSet.getIRI().toString()));
                        axiomSetToRDF(axiomSet.getNewAxioms(),model,language,ontologyNamespace,"Add");
                    }
                }
                if (!c.getDeletedClasses().isEmpty()) {
                    Iterator<OWLAxiomInfo> i = c.getDeletedClasses().iterator();
                    while (i.hasNext()) {
                        OWLAxiomInfo axiomSet = i.next();
                        Resource changeResource = model.createResource(ontologyNamespace + "#Change_" + System.nanoTime());
                        model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#RemoveClass"));
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#removedClass"),model.createResource(axiomSet.getIRI().toString()));
                        axiomSetToRDF(axiomSet.getNewAxioms(),model,language,ontologyNamespace,"Remove");
                    }
                }
            }
            if (changesInProps > 0) {
                if (!c.getModifiedProperties().isEmpty()) {
                    Iterator<OWLAxiomInfo> i = c.getModifiedProperties().iterator();
                    while (i.hasNext()) {
                        OWLAxiomInfo axiomSet = i.next();
                        axiomSetToRDF(axiomSet.getDeletedAxioms(),model,language,ontologyNamespace,"Remove");
                        axiomSetToRDF(axiomSet.getNewAxioms(),model,language,ontologyNamespace,"Add");
                    }
                }
                if (!c.getNewProperties().isEmpty()) {
                    Iterator<OWLAxiomInfo> i = c.getNewProperties().iterator();
                    while (i.hasNext()) {
                        OWLAxiomInfo axiomSet = i.next();
                        Resource changeResource = model.createResource(ontologyNamespace + "#Change_" + System.nanoTime());
                        model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#AddObjectProperty"));
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#addedObjectProperty"), model.createResource(axiomSet.getIRI().toString()));
                        axiomSetToRDF(axiomSet.getNewAxioms(),model,language,ontologyNamespace,"Add");
                    }
                }
                if (!c.getDeletedProperties().isEmpty()) {
                    Iterator<OWLAxiomInfo> i = c.getDeletedProperties().iterator();
                    while (i.hasNext()) {
                        OWLAxiomInfo axiomSet = i.next();
                        Resource changeResource = model.createResource(ontologyNamespace + "#Change_" + System.nanoTime());
                        model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#RemoveObjectProperty"));
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#removedObjectProperty"),model.createResource(axiomSet.getIRI().toString()));
                        axiomSetToRDF(axiomSet.getNewAxioms(),model,language,ontologyNamespace,"Remove");
                    }                
                }
            }
            if (changesInDataProps > 0) {
                if (!c.getModifiedDataProperties().isEmpty()) {
                    Iterator<OWLAxiomInfo> i = c.getModifiedDataProperties().iterator();
                    while (i.hasNext()) {
                        OWLAxiomInfo axiomSet = i.next();
                        axiomSetToRDF(axiomSet.getDeletedAxioms(),model,language,ontologyNamespace,"Remove");
                        axiomSetToRDF(axiomSet.getNewAxioms(),model,language,ontologyNamespace,"Add");
                    }                    
                }
                if (!c.getNewDataProperties().isEmpty()) {
                    Iterator<OWLAxiomInfo> i = c.getNewDataProperties().iterator();
                    while (i.hasNext()) {
                        OWLAxiomInfo axiomSet = i.next();
                        Resource changeResource = model.createResource(ontologyNamespace + "#Change_" + System.nanoTime());
                        model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#AddDataProperty"));
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#addedDataProperty"), model.createResource(axiomSet.getIRI().toString()));
                        axiomSetToRDF(axiomSet.getNewAxioms(),model,language,ontologyNamespace,"Add");
                }
            }
                if (!c.getDeletedDataProperties().isEmpty()) {
                    Iterator<OWLAxiomInfo> i = c.getDeletedDataProperties().iterator();
                    while (i.hasNext()) {
                        OWLAxiomInfo axiomSet = i.next();
                        Resource changeResource = model.createResource(ontologyNamespace + "#Change_" + System.nanoTime());
                        model.add(changeResource, RDF.type, model.createResource("https://w3id.org/def/och#RemoveDataProperty"));
                        model.add(changeResource, model.createProperty("https://w3id.org/def/och#removedDataProperty"), model.createResource(axiomSet.getIRI().toString()));
                        axiomSetToRDF(axiomSet.getNewAxioms(),model,language,ontologyNamespace,"Remove");
                    }                
                }
            }
        return model;
    }
}
