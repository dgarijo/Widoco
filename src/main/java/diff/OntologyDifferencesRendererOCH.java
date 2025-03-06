package diff;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;
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
import org.semanticweb.owlapi.model.OWLSubPropertyAxiom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import uk.ac.manchester.cs.owl.owlapi.OWLDataPropertyImpl;
import uk.ac.manchester.cs.owl.owlapi.OWLObjectPropertyImpl;
import widoco.Constants;

/**
 * class to render diff objects in RDF following the OWL Change Ontology. Separated from the main class to
 * calculate
 * 
 * @author dconde
 */
public class OntologyDifferencesRendererOCH {

	private final static Logger logger = LoggerFactory.getLogger(OntologyDifferencesRenderer.class);

	/**
	 * Method that renders the current differences as RDF in Turtle format and writes it to a file.
	 * 
	 * @param c the comparison object with all the differences to render
	 * @param filePath the path of the file to write the RDF to
	 */
	public static void differencesToRDF(CompareOntologies c, String filePath) {
		StringBuilder rdf = new StringBuilder();
		rdf.append("@prefix ex: <http://example.org/> .\n");
		rdf.append("@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n");
		rdf.append("@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n");
		rdf.append("@prefix owl: <http://www.w3.org/2002/07/owl#> .\n");
		rdf.append("@prefix och: <http://w3id.org/def/och/> .\n");

		// Serialize class changes
		serializeChanges(c.getNewClasses(), "AddClass", rdf, "addedClass");
		serializeChanges(c.getDeletedClasses(), "RemoveClass", rdf, "removedClass");

		// Serialize object property changes
		serializeChanges(c.getNewProperties(), "AddObjectProperty", rdf, "addedObjectProperty");
		serializeChanges(c.getDeletedProperties(), "RemoveObjectProperty", rdf, "removedObjectProperty");

		// Serialize data property changes
		serializeChanges(c.getNewDataProperties(), "AddDataProperty", rdf, "addedDataProperty");
		serializeChanges(c.getDeletedDataProperties(), "RemoveDataProperty", rdf, "removedDataProperty");

		try (java.io.FileWriter fileWriter = new java.io.FileWriter(filePath)) {
			fileWriter.write(rdf.toString());
		} catch (java.io.IOException e) {
			logger.error("Error writing RDF to file", e);
		}
	}

	private static void serializeChanges(ArrayList<OWLAxiomInfo> changes, String changeType, StringBuilder rdf, String termType) {
		for (OWLAxiomInfo change : changes) {

			rdf.append("ex:change_").append(java.util.UUID.randomUUID().toString()).append(" rdf:type och:").append(changeType).append(" ;\n");
			if (change.getNewAxioms() != null) {
				for (Object axiom : change.getNewAxioms()) {
					rdf.append("  och:").append(termType).append(" ex:").append(axiom.toString()).append(" ;\n");
					
				}
			}
			if (change.getDeletedAxioms() != null) {
				for (Object axiom : change.getDeletedAxioms()) {
					rdf.append("  och:").append(termType).append(" ex:").append(axiom.toString()).append(" ;\n");
				}
			}
			rdf.append("  .\n");
		}
	}
}
