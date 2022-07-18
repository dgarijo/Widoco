/*
 * This code was adapted by Daniel Garijo from the LODE framework by 
 * Silvio Peroni.
 * https://github.com/essepuntato/LODE
 * Copyright (c) 2010-2013, Silvio Peroni <essepuntato@gmail.com>
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * Copyright 2012-2013 Ontology Engineering Group, Universidad Politecnica de Madrid, Spain
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package lode;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.util.HashSet;
import java.util.Set;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.semanticweb.owlapi.formats.RDFXMLDocumentFormat;
import org.semanticweb.owlapi.io.OWLOntologyDocumentTarget;
import org.semanticweb.owlapi.io.StringDocumentTarget;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyStorageException;
import org.semanticweb.owlapi.model.OWLOntologyManager;

import widoco.Configuration;

/**
 *
 * @author Silvio Peroni, adpated for WIDOCO (and modified) by Daniel Garijo
 */
public class LODEGeneration {
        private static final Logger logger = LoggerFactory.getLogger(LODEGeneration.class);

	public static String getLODEhtml(Configuration c, File lodeResources) throws Exception {
		try {

			String content = "";
			String lang = c.getCurrentLanguage();
			if (lang == null || "".equals(lang)) {
				lang = "en";
			}
			// we have stored the ontology locally
			content = parseImports(c.isUseImported(), c.getMainOntology().getOWLAPIOntologyManager(),
					c.getMainOntology().getOWLAPIModel());
			content = applyXSLTTransformation(content, c.getOntologyURI(), lang, lodeResources);
			return (content);
		} catch (OWLOntologyStorageException e) {
			logger.error("Error while applying LODE. Error while applying the XLS file: " + e.getMessage());
			throw e;
		} catch (TransformerException e) {
			logger.error("Error while applying LODE. Error while applying the XLS file: " + e.getMessage());
			throw e;
		} catch (UnsupportedEncodingException e) {
			logger.error("Error while applying LODE. Error while applying the XLS file: " + e.getMessage());
			throw e;
		}
	}

	/**
	 * Method that uses the loaded ontology and parses it in case there are imports
	 * that have not been considered
	 * 
	 * @param considerImportedOntologies
	 * @param manager
	 * @param ontology
	 * @return
	 * @throws OWLOntologyCreationException
	 * @throws OWLOntologyStorageException
	 * @throws URISyntaxException
	 */
	private static String parseImports(boolean considerImportedOntologies, OWLOntologyManager manager,
			OWLOntology ontology) throws OWLOntologyStorageException {
		String result = "";
		if (considerImportedOntologies) {
			// considerImportedClosure || //<- removed for the moment
			Set<OWLOntology> setOfImportedOntologies = new HashSet<OWLOntology>();
			setOfImportedOntologies.addAll(ontology.getDirectImports());
			// else {
			// setOfImportedOntologies.addAll(ontology.getImportsClosure());
			// }
			for (OWLOntology importedOntology : setOfImportedOntologies) {
				logger.info("Found imported ontology: " + importedOntology.getOntologyID().getOntologyIRI().toString());
				manager.addAxioms(ontology, importedOntology.getAxioms());
			}
		}
		OWLOntologyDocumentTarget parsedOntology = new StringDocumentTarget();
		manager.saveOntology(ontology, new RDFXMLDocumentFormat(), parsedOntology);
		result = parsedOntology.toString();
		// }

		return result;
	}

	// private String addImportedAxioms(String result, List<String> removed) {
	// DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	// factory.setNamespaceAware(true);
	// try {
	// DocumentBuilder builder = factory.newDocumentBuilder();
	// Document document = builder.parse(new
	// ByteArrayInputStream(result.getBytes()));
	//
	// NodeList ontologies =
	// document.getElementsByTagNameNS("http://www.w3.org/2002/07/owl#",
	// "Ontology");
	// if (ontologies.getLength() > 0) {
	// Element ontology = (Element) ontologies.item(0);
	//
	// for (String toBeAdded : removed) {
	// Element importElement =
	// document.createElementNS("http://www.w3.org/2002/07/owl#","owl:imports");
	// importElement.setAttributeNS(
	// "http://www.w3.org/1999/02/22-rdf-syntax-ns#", "rdf:resource", toBeAdded);
	// ontology.appendChild(importElement);
	// }
	// }
	//
	// Transformer transformer = TransformerFactory.newInstance().newTransformer();
	// StreamResult output = new StreamResult(new StringWriter());
	// DOMSource source = new DOMSource(document);
	// transformer.transform(source, output);
	//
	// return output.getWriter().toString();
	// } catch (ParserConfigurationException e) {
	// return result;
	// } catch (SAXException e) {
	// return result;
	// } catch (IOException e) {
	// return result;
	// } catch (TransformerConfigurationException e) {
	// return result;
	// } catch (TransformerFactoryConfigurationError e) {
	// return result;
	// } catch (TransformerException e) {
	// return result;
	// }
	// }

	/*
	 * private String removeImportedAxioms(String result, List<String>
	 * removedImport) { DocumentBuilderFactory factory =
	 * DocumentBuilderFactory.newInstance(); factory.setNamespaceAware(true); try {
	 * DocumentBuilder builder = factory.newDocumentBuilder(); Document document =
	 * builder.parse(new ByteArrayInputStream(result.getBytes()));
	 * 
	 * NodeList ontologies =
	 * document.getElementsByTagNameNS("http://www.w3.org/2002/07/owl#",
	 * "Ontology"); for (int i = 0; i < ontologies.getLength() ; i++) { Element
	 * ontology = (Element) ontologies.item(i);
	 * 
	 * NodeList children = ontology.getChildNodes(); List<Element> removed = new
	 * ArrayList<Element>(); for (int j = 0; j < children.getLength(); j++) { Node
	 * child = children.item(j);
	 * 
	 * if ( child.getNodeType() == Node.ELEMENT_NODE &&
	 * child.getNamespaceURI().equals("http://www.w3.org/2002/07/owl#") &&
	 * child.getLocalName().equals("imports")) { removed.add((Element) child); } }
	 * 
	 * for (Element toBeRemoved : removed) {
	 * removedImport.add(toBeRemoved.getAttributeNS(
	 * "http://www.w3.org/1999/02/22-rdf-syntax-ns#", "resource"));
	 * ontology.removeChild(toBeRemoved); } }
	 * 
	 * Transformer transformer = TransformerFactory.newInstance().newTransformer();
	 * StreamResult output = new StreamResult(new StringWriter()); DOMSource source
	 * = new DOMSource(document); transformer.transform(source, output);
	 * 
	 * return output.getWriter().toString(); } catch (ParserConfigurationException
	 * e) { return result; } catch (SAXException e) { return result; } catch
	 * (IOException e) { return result; } catch (TransformerConfigurationException
	 * e) { return result; } catch (TransformerFactoryConfigurationError e) { return
	 * result; } catch (TransformerException e) { return result; } }
	 */

	// private static OWLOntology parseWithReasoner(OWLOntologyManager manager,
	// OWLOntology ontology) {
	// try {
	// //poner la url donde esta directamente. Coger como resource y cargar el path
	// (facil)
	//// PelletOptions.load(new URL("http://" + cssLocation + "pellet.properties"));
	// //new URL("lode/resources/pellet.properties")
	// PelletOptions.load(new
	// URL(ClassLoader.getSystemResource("lode/pellet.properties").getPath()));
	// PelletReasoner reasoner =
	// PelletReasonerFactory.getInstance().createReasoner(ontology);
	// reasoner.getKB().prepare();
	// List<InferredAxiomGenerator<? extends OWLAxiom>> generators=
	// new ArrayList<InferredAxiomGenerator<? extends OWLAxiom>>();
	// generators.add(new InferredSubClassAxiomGenerator());
	// generators.add(new InferredClassAssertionAxiomGenerator());
	// generators.add(new InferredDisjointClassesAxiomGenerator());
	// generators.add(new InferredEquivalentClassAxiomGenerator());
	// generators.add(new InferredEquivalentDataPropertiesAxiomGenerator());
	// generators.add(new InferredEquivalentObjectPropertyAxiomGenerator());
	// generators.add(new InferredInverseObjectPropertiesAxiomGenerator());
	// generators.add(new InferredPropertyAssertionGenerator());
	// generators.add(new InferredSubDataPropertyAxiomGenerator());
	// generators.add(new InferredSubObjectPropertyAxiomGenerator());
	//
	// InferredOntologyGenerator iog = new InferredOntologyGenerator(reasoner,
	// generators);
	//
	// OWLOntologyID id = ontology.getOntologyID();
	// Set<OWLImportsDeclaration> declarations = ontology.getImportsDeclarations();
	// Set<OWLAnnotation> annotations = ontology.getAnnotations();
	//
	// Map<OWLEntity, Set<OWLAnnotationAssertionAxiom>> entityAnnotations = new
	// HashMap<OWLEntity,Set<OWLAnnotationAssertionAxiom>>();
	// for (OWLClass aEntity : ontology.getClassesInSignature()) {
	// entityAnnotations.put(aEntity,
	// aEntity.getAnnotationAssertionAxioms(ontology));
	// }
	// for (OWLObjectProperty aEntity : ontology.getObjectPropertiesInSignature()) {
	// entityAnnotations.put(aEntity,
	// aEntity.getAnnotationAssertionAxioms(ontology));
	// }
	// for (OWLDataProperty aEntity : ontology.getDataPropertiesInSignature()) {
	// entityAnnotations.put(aEntity,
	// aEntity.getAnnotationAssertionAxioms(ontology));
	// }
	// for (OWLNamedIndividual aEntity : ontology.getIndividualsInSignature()) {
	// entityAnnotations.put(aEntity,
	// aEntity.getAnnotationAssertionAxioms(ontology));
	// }
	// for (OWLAnnotationProperty aEntity :
	// ontology.getAnnotationPropertiesInSignature()) {
	// entityAnnotations.put(aEntity,
	// aEntity.getAnnotationAssertionAxioms(ontology));
	// }
	// for (OWLDatatype aEntity : ontology.getDatatypesInSignature()) {
	// entityAnnotations.put(aEntity,
	// aEntity.getAnnotationAssertionAxioms(ontology));
	// }
	//
	// manager.removeOntology(ontology);
	// OWLOntology inferred = manager.createOntology(id);
	// iog.fillOntology(manager, inferred);
	//
	// for (OWLImportsDeclaration decl : declarations) {
	// manager.applyChange(new AddImport(inferred, decl));
	// }
	// for (OWLAnnotation ann : annotations) {
	// manager.applyChange(new AddOntologyAnnotation(inferred, ann));
	// }
	// for (OWLClass aEntity : inferred.getClassesInSignature()) {
	// applyAnnotations(aEntity, entityAnnotations, manager, inferred);
	// }
	// for (OWLObjectProperty aEntity : inferred.getObjectPropertiesInSignature()) {
	// applyAnnotations(aEntity, entityAnnotations, manager, inferred);
	// }
	// for (OWLDataProperty aEntity : inferred.getDataPropertiesInSignature()) {
	// applyAnnotations(aEntity, entityAnnotations, manager, inferred);
	// }
	// for (OWLNamedIndividual aEntity : inferred.getIndividualsInSignature()) {
	// applyAnnotations(aEntity, entityAnnotations, manager, inferred);
	// }
	// for (OWLAnnotationProperty aEntity :
	// inferred.getAnnotationPropertiesInSignature()) {
	// applyAnnotations(aEntity, entityAnnotations, manager, inferred);
	// }
	// for (OWLDatatype aEntity : inferred.getDatatypesInSignature()) {
	// applyAnnotations(aEntity, entityAnnotations, manager, inferred);
	// }
	// return inferred;
	// } catch (IOException e) {
	// return ontology;
	// } catch (OWLOntologyChangeException e) {
	// return ontology;
	// } catch (OWLOntologyCreationException e) {
	// return ontology;
	// }
	// }

	// private static void applyAnnotations(
	// OWLEntity aEntity, Map<OWLEntity, Set<OWLAnnotationAssertionAxiom>>
	// entityAnnotations,
	// OWLOntologyManager manager, OWLOntology ontology) {
	// Set<OWLAnnotationAssertionAxiom> entitySet = entityAnnotations.get(aEntity);
	// if (entitySet != null) {
	// for (OWLAnnotationAssertionAxiom ann : entitySet) {
	// manager.addAxiom(ontology, ann);
	// }
	// }
	// }

	private static String applyXSLTTransformation(String source, String ontologyUrl, String lang, File resourcesFile)
			throws TransformerException, UnsupportedEncodingException {
		TransformerFactory tfactory = new net.sf.saxon.TransformerFactoryImpl();

		ByteArrayOutputStream output = new ByteArrayOutputStream();
		Transformer transformer = tfactory
				.newTransformer(new StreamSource(resourcesFile.getPath() + File.separator + "extraction.xsl"));

		// transformer.setParameter("css-location", "");
		transformer.setParameter("lang", lang);
		transformer.setParameter("ontology-url", ontologyUrl);
		// transformer.setParameter("source", cssLocation + "source");

		StreamSource inputSource = new StreamSource(new StringReader(source));

		transformer.transform(inputSource, new StreamResult(output));

		return output.toString("UTF-8").replace("any u r i", "anyURI");
	}

}
