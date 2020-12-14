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
import org.semanticweb.owlapi.model.OWLSubClassOfAxiom;
import org.semanticweb.owlapi.model.OWLSubPropertyAxiom;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import uk.ac.manchester.cs.owl.owlapi.OWLDataPropertyImpl;
import uk.ac.manchester.cs.owl.owlapi.OWLObjectPropertyImpl;
import widoco.Constants;

/**
 * class to render diff objects in HTML. Separated from the main class to
 * calculate
 * 
 * @author dgarijo
 */
public class OntologyDifferencesRenderer {

	private final static Logger logger = LoggerFactory.getLogger(OntologyDifferencesRenderer.class);

	/**
	 * convenience method to print information on diff to console
	 *
	 * @param c
	 */
	public static void differenceSummaryToString(CompareOntologies c) {
		System.out.println();
		System.out.println("@Ontology Change Summary");
		System.out.println("@First ontology IRI: " + c.getOldVersion());
		System.out.println("@Second ontology IRI: " + c.getNewVersion());
		System.out.println("@Number of classes changed: " + c.getModifiedClasses().size());
		System.out.println("@Number of classes added: " + c.getNewClasses().size());
		System.out.println("@Number of classes deleted: " + c.getDeletedClasses().size());

		System.out.println("@Number of properties changed: " + c.getModifiedProperties().size());
		System.out.println("@Number of properties added: " + c.getNewProperties().size());
		System.out.println("@Number of properties deleted: " + c.getDeletedProperties().size());

		System.out.println("@Number of data properties changed: " + c.getModifiedDataProperties().size());
		System.out.println("@Number of data properties added: " + c.getNewDataProperties().size());
		System.out.println("@Number of data properties deleted: " + c.getDeletedDataProperties().size());

		ArrayList<OWLAxiomInfo> modifiedClasses = c.getModifiedClasses();
		if (!modifiedClasses.isEmpty()) {
			System.out.println("\n@Modified classes");
			System.out.println(setToString(modifiedClasses, "Class changed", true));
			System.out.println();
		}
		ArrayList<OWLAxiomInfo> newClasses = c.getNewClasses();
		if (!newClasses.isEmpty()) {
			System.out.println("@New Classes");
			System.out.println(setToString(newClasses, "Class added", true));
			System.out.println();
		}
		ArrayList<OWLAxiomInfo> deletedClasses = c.getDeletedClasses();
		if (!deletedClasses.isEmpty()) {
			System.out.println("@Deleted Classes");
			System.out.println(setToString(deletedClasses, "Deleted class", false));
			System.out.println();
		}
		ArrayList<OWLAxiomInfo> modifiedProperties = c.getModifiedProperties();
		if (!modifiedProperties.isEmpty()) {
			System.out.println("\n@Modified properties");
			System.out.println(setToString(modifiedProperties, "Property changed", true));
			System.out.println();
		}
		ArrayList<OWLAxiomInfo> newProperties = c.getNewProperties();
		if (!newProperties.isEmpty()) {
			System.out.println("@New Properties");
			System.out.println(setToString(newProperties, "Property added", true));
			System.out.println();
		}
		ArrayList<OWLAxiomInfo> deletedProperties = c.getDeletedProperties();
		if (!deletedProperties.isEmpty()) {
			System.out.println("@Deleted Properties");
			System.out.println(setToString(deletedProperties, "Property deleted", false));
			System.out.println();
		}
		ArrayList<OWLAxiomInfo> modifiedDataProperties = c.getModifiedDataProperties();
		if (!modifiedDataProperties.isEmpty()) {
			System.out.println("\n@Modified Data properties");
			System.out.println(setToString(modifiedDataProperties, "Data property changed", true));
			System.out.println();
		}
		ArrayList<OWLAxiomInfo> newDataProperties = c.getNewDataProperties();
		if (!newDataProperties.isEmpty()) {
			System.out.println("@New Data Properties");
			System.out.println(setToString(newDataProperties, "Data property added", true));
			System.out.println();
		}
		ArrayList<OWLAxiomInfo> deletedDataProperties = c.getDeletedDataProperties();
		if (!deletedDataProperties.isEmpty()) {
			System.out.println("@Deleted Data Properties");
			System.out.println(setToString(deletedDataProperties, "Data property deleted", false));
			System.out.println();
		}
	}

	/**
	 * Method to serialize a set as a string
	 * 
	 * @param set
	 * @param initialMessage
	 * @param printDetails
	 *            true if the goal is to print more details about the changes, e.g.,
	 *            modification of a term
	 * @return
	 */
	private static String setToString(ArrayList<OWLAxiomInfo> set, String initialMessage, boolean printDetails) {
		String v = "";
		Iterator<OWLAxiomInfo> i = set.iterator();
		while (i.hasNext()) {
			OWLAxiomInfo classAxiomSet = i.next();
			// if the output is write URIs print them
			v += "---\n" + initialMessage + " ";
			v += classAxiomSet.getIRIAsString() + "\n";

			if (printDetails) {
				if (classAxiomSet.getNewAxioms() != null) {
					for (Object f : classAxiomSet.getNewAxioms()) {
						v += "+" + f.toString() + "\n";
					}
				}
				if (classAxiomSet.getDeletedAxioms() != null) {
					for (Object f : classAxiomSet.getDeletedAxioms()) {
						v += "-" + f.toString() + "\n";
					}
				}
			}
		}
		return v;
	}

	/**
	 * Method to serialize a set as html. This method is designed to be called by
	 * added classes and properties.
	 * 
	 * @param set
	 * @param ns
	 * @param showAdditions
	 *            true if the goal is to print more details about the changes, e.g.,
	 *            modification of a term
	 * @return
	 */
	private static String axiomInfoSetToHTML(ArrayList<OWLAxiomInfo> set, String ns, boolean showAdditions,
			boolean showDeletions, Properties lang) {
		String v = "";
		Iterator<OWLAxiomInfo> i = set.iterator();
		while (i.hasNext()) {
			OWLAxiomInfo axiomSet = i.next();
			// we print the whole url of the new property and link to the document
			// reference.
			v += "<li><a href=\"#" + axiomSet.getIRIAsString().replace(ns, "") + "\">" + axiomSet.getIRIAsString()
					+ "</a>\n";
			if (showAdditions && axiomSet.getNewAxioms() != null && !axiomSet.getNewAxioms().isEmpty()) {
				v += "<ul>\n";
				v += axiomSetToHTML(axiomSet.getNewAxioms(), true, lang);
				v += "</ul>\n";
			}
			if (showDeletions && axiomSet.getDeletedAxioms() != null && !axiomSet.getDeletedAxioms().isEmpty()) {
				v += "<ul>\n";
				v += axiomSetToHTML(axiomSet.getDeletedAxioms(), false, lang);
				v += "</ul>\n";
			}
			v += "</li>\n";
		}
		return v.replace("##", "#");//avoiding potential errors.
	}

	private static String axiomSetToHTML(Set<Object> set, boolean isAddition, Properties lang) {
		String v = "";
		String message;
		if (isAddition) {
			message = lang.getProperty(Constants.LANG_ADDED) + ": ";
		} else {
			message = lang.getProperty(Constants.LANG_DELETED) + ": ";
		}
		for (Object f : set) {
			try {
				v += "<li>";
				if (f instanceof OWLSubClassOfAxiom) {
					v += message + lang.getProperty(Constants.LANG_SUBCLASS_OF) + " "
							+ ((OWLSubClassOfAxiom) f).getSuperClass().asOWLClass().getIRI();
				} else if (f instanceof OWLSubPropertyAxiom) {
					OWLPropertyExpression prop = ((OWLSubPropertyAxiom) f).getSuperProperty();
					if (prop instanceof OWLObjectPropertyImpl) {
						v += message + lang.getProperty(Constants.LANG_SUBPROP_OF) + " "
								+ ((OWLObjectPropertyImpl) prop).getIRI();
					} else if (prop instanceof OWLDataPropertyImpl) {
						v += message + lang.getProperty(Constants.LANG_SUBPROP_OF) + " "
								+ ((OWLDataPropertyImpl) prop).getIRI();
					}
				} else if (f instanceof OWLObjectPropertyDomainAxiom) {
					v += message + Constants.LANG_DOMAIN + " "
							+ expressionToHTML(((OWLObjectPropertyDomainAxiom) f).getDomain(), lang);
				} else if (f instanceof OWLDataPropertyDomainAxiom) {
					v += message + lang.getProperty(Constants.LANG_DOMAIN) + " "
							+ expressionToHTML(((OWLDataPropertyDomainAxiom) f).getDomain(), lang);
				} else if (f instanceof OWLObjectPropertyRangeAxiom) {
					v += message + lang.getProperty(Constants.LANG_RANGE) + " "
							+ expressionToHTML(((OWLObjectPropertyRangeAxiom) f).getRange(), lang);
				} else if (f instanceof OWLDataPropertyRangeAxiom) {
					v += message + lang.getProperty(Constants.LANG_RANGE) + " "
							+ ((OWLDataPropertyRangeAxiom) f).getRange().asOWLDatatype().getIRI();
				} else if (f instanceof OWLAnnotationAssertionAxiom) {
					v += message + ((OWLAnnotationAssertionAxiom) f).getProperty().toString() + " "
							+ ((OWLAnnotationAssertionAxiom) f).getValue().toString();
				} else {
					// other less typical axioms
					v += message + ((OWLAxiom) f).getAxiomType().getName() + " "
							+ f.toString().replace("<", "&lt;").replace(">", "&gt;");
				}
				/**
				 * To add if we want to refine OWLDisjointClassesAxiom,
				 * OWLDisjointDataPropertiesAxiom, OWLDisjointObjectPropertiesAxiom,
				 * OWLEquivalentClassesAxiom, OWLEquivalentDataPropertiesAxiom,
				 * OWLEquivalentObjectPropertiesAxiom, OWLFunctionalDataPropertyAxiom,
				 * OWLFunctionalObjectPropertyAxiom,
				 */
				v += "</li>\n";
			} catch (Exception e) {
				logger.error("Error while transforming " + f.toString() + " " + e.getMessage());
			}

		}

		return v.replace("##", "#");
	}

	/**
	 * Method to translate expressions to html. It is recursive as an expression
	 * could be the union of intersections or viceversa.
	 * 
	 * @param expr
	 * @param lang
	 * @return
	 */
	private static String expressionToHTML(OWLClassExpression expr, Properties lang) {
		String v = "";
		if (expr instanceof OWLClass) {
			v += expr.asOWLClass().getIRI();
		} else {
			if (expr instanceof OWLObjectUnionOf || expr instanceof OWLObjectIntersectionOf) {
				if (expr instanceof OWLObjectUnionOf) {
					v += lang.getProperty(Constants.LANG_UNION) + " (";
					for (OWLClassExpression e : expr.asDisjunctSet()) {
						v += expressionToHTML(e, lang) + ", ";
					}
				} else {
					v += lang.getProperty(Constants.LANG_INTERSECTION) + " (";
					for (OWLClassExpression e : expr.asConjunctSet()) {
						v += expressionToHTML(e, lang) + ", ";
					}
				}

				if (v.length() > 2) {
					v = v.substring(0, v.length() - 2);// remove last comma
				}
				v += ")";
			}
		}
		return v;
	}

	/**
	 * Method that renders the current differences as HTML.
	 * 
	 * @param c
	 *            the comparison object with all the differences to render
	 * @param ontologyNamepsace
	 *            namespace of the ontology to link back
	 * @param language
	 *            language file with the labels to be used in the report
	 * @return
	 */
	public static String differencesToHTML(CompareOntologies c, String ontologyNamepsace, Properties language) {
		String changelog = "";
		int changesInClasses = c.getDeletedClasses().size() + c.getModifiedClasses().size() + c.getNewClasses().size(),
				changesInProps = c.getDeletedProperties().size() + c.getModifiedProperties().size()
						+ c.getNewProperties().size(),
				changesInDataProps = c.getDeletedDataProperties().size() + c.getModifiedProperties().size()
						+ c.getNewDataProperties().size();
		if (changesInClasses > 0) {
			changelog += "<h3 id=\"changeClass\" class=\"list\">" + language.getProperty(Constants.LANG_CLASSES)
					+ "</h3>\n";// this will be on the lang file later
			if (!c.getModifiedClasses().isEmpty()) {
				changelog += "<details><summary><u>" + language.getProperty(Constants.LANG_MODIFIED_CLASS)
						+ "</u></summary>\n";
				changelog += "<ul>";
				changelog += axiomInfoSetToHTML(c.getModifiedClasses(), ontologyNamepsace, true, true, language);
				changelog += "</ul></details>";
			}
			if (!c.getNewClasses().isEmpty()) {
				changelog += "<details><summary><u>" + language.getProperty(Constants.LANG_ADDED_CLASS)
						+ "</u></summary>\n";
				changelog += "<ul>";
				changelog += axiomInfoSetToHTML(c.getNewClasses(), ontologyNamepsace, true, false, language);
				changelog += "</ul></details>";
			}
			if (!c.getDeletedClasses().isEmpty()) {
				changelog += "<details><summary><u>" + language.getProperty(Constants.LANG_DELETED_CLASS)
						+ "</u></summary>\n";
				changelog += "<ul>";
				changelog += axiomInfoSetToHTML(c.getDeletedClasses(), ontologyNamepsace, false, false, language);
				changelog += "</ul></details>";
			}

		}
		if (changesInProps > 0) {
			changelog += "<h3 id=\"changeProp\" class=\"list\">" + language.getProperty(Constants.LANG_OBJ_PROP)
					+ "</h3>\n";
			if (!c.getModifiedProperties().isEmpty()) {
				changelog += "<details><summary><u>" + language.getProperty(Constants.LANG_MODIFIED_PROP)
						+ "</u></summary>\n";
				changelog += "<ul>";
				changelog += axiomInfoSetToHTML(c.getModifiedProperties(), ontologyNamepsace, true, true, language);
				changelog += "</ul></details>";
			}
			if (!c.getNewProperties().isEmpty()) {
				changelog += "<details><summary><u>" + language.getProperty(Constants.LANG_ADDED_PROP)
						+ "</u></summary>\n";
				changelog += "<ul>";
				changelog += axiomInfoSetToHTML(c.getNewProperties(), ontologyNamepsace, true, false, language);
				changelog += "</ul></details>";
			}
			if (!c.getDeletedProperties().isEmpty()) {
				changelog += "<details><summary><u>" + language.getProperty(Constants.LANG_DELETED_PROP)
						+ "</u></summary>\n";
				changelog += "<ul>";
				changelog += axiomInfoSetToHTML(c.getDeletedProperties(), ontologyNamepsace, false, false, language);
				changelog += "</ul></details>";
			}
		}
		if (changesInDataProps > 0) {
			changelog += "<h3 id=\"changeDataProp\" class=\"list\">" + language.getProperty(Constants.LANG_DATA_PROP)
					+ "</h3>\n";
			if (!c.getModifiedDataProperties().isEmpty()) {
				changelog += "<details><summary><u>" + language.getProperty(Constants.LANG_MODIFIED_DATA_PROP)
						+ "</u></summary>\n";
				changelog += "<ul>";
				changelog += axiomInfoSetToHTML(c.getModifiedDataProperties(), ontologyNamepsace, true, true, language);
				changelog += "</ul></details>";
			}
			if (!c.getNewDataProperties().isEmpty()) {
				changelog += "<details><summary><u>" + language.getProperty(Constants.LANG_ADDED_DATA_PROP)
						+ "</u></summary>\n";
				changelog += "<ul>";
				changelog += axiomInfoSetToHTML(c.getNewDataProperties(), ontologyNamepsace, true, false, language);
				changelog += "</ul></details>";
			}
			if (!c.getDeletedDataProperties().isEmpty()) {
				changelog += "<details><summary><u>" + language.getProperty(Constants.LANG_DELETED_DATA_PROP)
						+ "</u></summary>\n";
				changelog += "<ul>";
				changelog += axiomInfoSetToHTML(c.getDeletedDataProperties(), ontologyNamepsace, false, false,
						language);
				changelog += "</ul></details>";
			}
		}
		return changelog;
	}
}
