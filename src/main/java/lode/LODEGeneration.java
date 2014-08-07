/*
 * This code was adapted from the LODE framework by Silvio Peroni.
 * https://github.com/essepuntato/LODE
 * Copyright (c) 2010-2013, Silvio Peroni <essepuntato@gmail.com>
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * Copyright 2012-2013 Ontology Engineering Group, Universidad Politécnica de Madrid, Spain
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

import com.clarkparsia.pellet.owlapiv3.PelletReasoner;
import com.clarkparsia.pellet.owlapiv3.PelletReasonerFactory;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import org.mindswap.pellet.PelletOptions;
import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.io.RDFXMLOntologyFormat;
import org.semanticweb.owlapi.io.StringDocumentTarget;
import org.semanticweb.owlapi.model.AddImport;
import org.semanticweb.owlapi.model.AddOntologyAnnotation;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLAnnotation;
import org.semanticweb.owlapi.model.OWLAnnotationAssertionAxiom;
import org.semanticweb.owlapi.model.OWLAnnotationProperty;
import org.semanticweb.owlapi.model.OWLAxiom;
import org.semanticweb.owlapi.model.OWLClass;
import org.semanticweb.owlapi.model.OWLDataProperty;
import org.semanticweb.owlapi.model.OWLDatatype;
import org.semanticweb.owlapi.model.OWLEntity;
import org.semanticweb.owlapi.model.OWLImportsDeclaration;
import org.semanticweb.owlapi.model.OWLNamedIndividual;
import org.semanticweb.owlapi.model.OWLObjectProperty;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyChangeException;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyID;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.semanticweb.owlapi.model.OWLOntologyStorageException;
import org.semanticweb.owlapi.util.InferredAxiomGenerator;
import org.semanticweb.owlapi.util.InferredClassAssertionAxiomGenerator;
import org.semanticweb.owlapi.util.InferredDisjointClassesAxiomGenerator;
import org.semanticweb.owlapi.util.InferredEquivalentClassAxiomGenerator;
import org.semanticweb.owlapi.util.InferredEquivalentDataPropertiesAxiomGenerator;
import org.semanticweb.owlapi.util.InferredEquivalentObjectPropertyAxiomGenerator;
import org.semanticweb.owlapi.util.InferredInverseObjectPropertiesAxiomGenerator;
import org.semanticweb.owlapi.util.InferredOntologyGenerator;
import org.semanticweb.owlapi.util.InferredPropertyAssertionGenerator;
import org.semanticweb.owlapi.util.InferredSubClassAxiomGenerator;
import org.semanticweb.owlapi.util.InferredSubDataPropertyAxiomGenerator;
import org.semanticweb.owlapi.util.InferredSubObjectPropertyAxiomGenerator;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 *
 * @author Silvio Peroni, adpated by Daniel Garijo
 */
public class LODEGeneration {
    
    public static String getLODEhtmlFromURL(String stringURL, boolean useOWLAPI, boolean considerImportedOntologies, boolean considerImportedClosure, boolean useReasoner, String language, File lodeResources)throws IOException {
				
            SourceExtractor extractor = new SourceExtractor();
            extractor.addMimeTypes(MimeType.mimeTypes);

            try {
                    URL ontologyURL = new URL(stringURL);

                    String content = "";


                    if (considerImportedOntologies || considerImportedClosure || useReasoner) {
                            useOWLAPI = true;
                    }

                    String lang = language;
                    if (lang == null || "".equals(lang)) {
                            lang = "en";
                    }

                    if (useOWLAPI) {
                            content = parseWithOWLAPI(stringURL, useOWLAPI, considerImportedOntologies, 
                                            considerImportedClosure, useReasoner, true);
                    } else {
                            content = extractor.exec(ontologyURL);
                    }

                    content = applyXSLTTransformation(content, stringURL, lang, lodeResources);

                    return(content);
            } catch (IOException e) {
                    System.err.println("Error while applying LODE. The ontology could not be loaded: "+e.getMessage());                        
            } catch (URISyntaxException e) {
                System.err.println("Error while applying LODE. The ontology URI is not well formed: "+e.getMessage());                    
        }
//		}
        catch (TransformerException e) {
            System.err.println("Error while applying LODE. Error while applying the XLS file: "+e.getMessage());
            
        } catch (OWLOntologyCreationException ex) {
            System.err.println("Error while applying LODE. Error while creating the ontology: "+ex.getMessage());
        } catch (OWLOntologyStorageException ex) {
            System.err.println("Error while applying LODE. Error while storing the ontology: "+ex.getMessage());
        }
        return null;
	}
    
    public static String getLODEhtmlFromFile(String ontologyPath, String ontologyExpectedURL, boolean useOWLAPI, boolean considerImportedOntologies, boolean considerImportedClosure, boolean useReasoner, String language, File lodeResources)throws IOException {
        try {

            String content = "";
            
            if (considerImportedOntologies || considerImportedClosure || useReasoner) {
                    useOWLAPI = true;
            }

            String lang = language;
            if (lang == null || "".equals(lang)) {
                    lang = "en";
            }

            if (useOWLAPI) {
                    content = parseWithOWLAPI(ontologyPath, useOWLAPI, considerImportedOntologies, 
                                    considerImportedClosure, useReasoner, false);
            } else {
                //read ontology from file
                BufferedReader br = new BufferedReader(new FileReader(ontologyPath));
                try {
                    StringBuilder sb = new StringBuilder();
                    String line = br.readLine();

                    while (line != null) {
                        sb.append(line);
                        sb.append(System.lineSeparator());
                        line = br.readLine();
                    }
                    content = sb.toString();
                } finally {
                    br.close();
                }
            }

            content = applyXSLTTransformation(content, ontologyExpectedURL, lang, lodeResources);

            return(content);
        }
        catch (TransformerException e) {
            System.err.println("Error while applyin LODE. Error while applying the XLS file: "+e.getMessage());
            
        } catch (OWLOntologyCreationException ex) {
            System.err.println("Error while applying LODE. Error while creating the ontology: "+ex.getMessage());
        } catch (OWLOntologyStorageException ex) {
            System.err.println("Error while applying LODE. Error while storing the ontology: "+ex.getMessage());
        } catch (URISyntaxException ex) {
            System.err.println("Error while applying LODE. Error while storing the ontology: "+ex.getMessage());
        }
        return null;
	
    }
	
//	private void resolvePaths(HttpServletRequest request) {
//		xsltURL = getServletContext().getRealPath("extraction.xsl");
//		String requestURL = request.getRequestURL().toString();
//		int index = requestURL.lastIndexOf("/");
//		cssLocation = requestURL.substring(0, index) + File.separator;
//	}
	
	private static String parseWithOWLAPI(
			String ontologyURL,
			boolean useOWLAPI,
			boolean considerImportedOntologies, 
			boolean considerImportedClosure,
			boolean useReasoner,
                        boolean loadFromURL) 
	throws OWLOntologyCreationException, OWLOntologyStorageException, URISyntaxException {
		String result = "";
		
		if (useOWLAPI) {
			OWLOntologyManager manager = OWLManager.createOWLOntologyManager(); 
			
			OWLOntology ontology;
                        if(loadFromURL){
                            ontology = manager.loadOntology(IRI.create(ontologyURL));
                        }
                        else{
                            ontology= manager.loadOntologyFromOntologyDocument(new File(ontologyURL));
                        }
			
			if (considerImportedClosure || considerImportedOntologies) {
				Set<OWLOntology> setOfImportedOntologies = new HashSet<OWLOntology>();
				if (considerImportedOntologies) {
					setOfImportedOntologies.addAll(ontology.getDirectImports());
				} else {
					setOfImportedOntologies.addAll(ontology.getImportsClosure());
				}
				for (OWLOntology importedOntology : setOfImportedOntologies) {
					manager.addAxioms(ontology, importedOntology.getAxioms());
				}
			}
			
			if (useReasoner) {
				ontology = parseWithReasoner(manager, ontology);
			}
			
			StringDocumentTarget parsedOntology = new StringDocumentTarget();
			
			manager.saveOntology(ontology, new RDFXMLOntologyFormat(), parsedOntology);
			result = parsedOntology.toString();
		}
		
		return result;
	}
	
	private String addImportedAxioms(String result, List<String> removed) {
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	    factory.setNamespaceAware(true);
	    try {
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document document = builder.parse(new ByteArrayInputStream(result.getBytes()));
			
			NodeList ontologies = 
				document.getElementsByTagNameNS("http://www.w3.org/2002/07/owl#", "Ontology");
			if (ontologies.getLength() > 0) {
				Element ontology = (Element) ontologies.item(0);
				
				for (String toBeAdded : removed) {
					Element importElement = 
						document.createElementNS("http://www.w3.org/2002/07/owl#","owl:imports");
					importElement.setAttributeNS(
							"http://www.w3.org/1999/02/22-rdf-syntax-ns#", "rdf:resource", toBeAdded);
					ontology.appendChild(importElement);
				}
			}
			
			Transformer transformer = TransformerFactory.newInstance().newTransformer();
			StreamResult output = new StreamResult(new StringWriter());
			DOMSource source = new DOMSource(document);
			transformer.transform(source, output);

			return output.getWriter().toString();
		} catch (ParserConfigurationException e) {
			return result;
		} catch (SAXException e) {
			return result;
		} catch (IOException e) {
			return result;
		} catch (TransformerConfigurationException e) {
			return result;
		} catch (TransformerFactoryConfigurationError e) {
			return result;
		} catch (TransformerException e) {
			return result;
		}
	}

	/*
	private String removeImportedAxioms(String result, List<String> removedImport) {
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	    factory.setNamespaceAware(true);
	    try {
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document document = builder.parse(new ByteArrayInputStream(result.getBytes()));
			
			NodeList ontologies = 
				document.getElementsByTagNameNS("http://www.w3.org/2002/07/owl#", "Ontology");
			for (int i = 0; i < ontologies.getLength() ; i++) {
				Element ontology = (Element) ontologies.item(i);
				
				NodeList children = ontology.getChildNodes();
				List<Element> removed = new ArrayList<Element>();
				for (int j = 0; j < children.getLength(); j++) {
					Node child = children.item(j);
					
					if (
							child.getNodeType() == Node.ELEMENT_NODE && 
							child.getNamespaceURI().equals("http://www.w3.org/2002/07/owl#") &&
							child.getLocalName().equals("imports")) {
						removed.add((Element) child);
					}
				}
				
				for (Element toBeRemoved : removed) {
					removedImport.add(toBeRemoved.getAttributeNS(
							"http://www.w3.org/1999/02/22-rdf-syntax-ns#", "resource"));
					ontology.removeChild(toBeRemoved);
				}
			}
			
			Transformer transformer = TransformerFactory.newInstance().newTransformer();
			StreamResult output = new StreamResult(new StringWriter());
			DOMSource source = new DOMSource(document);
			transformer.transform(source, output);

			return output.getWriter().toString();
		} catch (ParserConfigurationException e) {
			return result;
		} catch (SAXException e) {
			return result;
		} catch (IOException e) {
			return result;
		} catch (TransformerConfigurationException e) {
			return result;
		} catch (TransformerFactoryConfigurationError e) {
			return result;
		} catch (TransformerException e) {
			return result;
		}
	}
	*/

	private static OWLOntology parseWithReasoner(OWLOntologyManager manager, OWLOntology ontology) {
		try {
                    //poner la url donde esta directamente. Coger como resource y cargar el path (facil)
//			PelletOptions.load(new URL("http://" + cssLocation + "pellet.properties"));
                        //new URL("lode/resources/pellet.properties")
                        PelletOptions.load(new URL(ClassLoader.getSystemResource("lode/pellet.properties").getPath()));
			PelletReasoner reasoner = PelletReasonerFactory.getInstance().createReasoner(ontology);
			reasoner.getKB().prepare();
			List<InferredAxiomGenerator<? extends OWLAxiom>> generators=
				new ArrayList<InferredAxiomGenerator<? extends OWLAxiom>>();
	        generators.add(new InferredSubClassAxiomGenerator());
	        generators.add(new InferredClassAssertionAxiomGenerator());
	        generators.add(new InferredDisjointClassesAxiomGenerator());
	        generators.add(new InferredEquivalentClassAxiomGenerator());
	        generators.add(new InferredEquivalentDataPropertiesAxiomGenerator());
	        generators.add(new InferredEquivalentObjectPropertyAxiomGenerator());
	        generators.add(new InferredInverseObjectPropertiesAxiomGenerator());
	        generators.add(new InferredPropertyAssertionGenerator());
	        generators.add(new InferredSubDataPropertyAxiomGenerator());
	        generators.add(new InferredSubObjectPropertyAxiomGenerator());
	        
	        InferredOntologyGenerator iog = new InferredOntologyGenerator(reasoner, generators);
			
			OWLOntologyID id = ontology.getOntologyID();
			Set<OWLImportsDeclaration> declarations = ontology.getImportsDeclarations();
	        Set<OWLAnnotation> annotations = ontology.getAnnotations();
	        
	        Map<OWLEntity, Set<OWLAnnotationAssertionAxiom>> entityAnnotations = new HashMap<OWLEntity,Set<OWLAnnotationAssertionAxiom>>();
	        for (OWLClass aEntity  : ontology.getClassesInSignature()) {
	        	entityAnnotations.put(aEntity, aEntity.getAnnotationAssertionAxioms(ontology));
	        }
	        for (OWLObjectProperty aEntity : ontology.getObjectPropertiesInSignature()) {
	        	entityAnnotations.put(aEntity, aEntity.getAnnotationAssertionAxioms(ontology));
	        }
	        for (OWLDataProperty aEntity : ontology.getDataPropertiesInSignature()) {
	        	entityAnnotations.put(aEntity, aEntity.getAnnotationAssertionAxioms(ontology));
	        }
	        for (OWLNamedIndividual aEntity : ontology.getIndividualsInSignature()) {
	        	entityAnnotations.put(aEntity, aEntity.getAnnotationAssertionAxioms(ontology));
	        }
	        for (OWLAnnotationProperty aEntity : ontology.getAnnotationPropertiesInSignature()) {
	        	entityAnnotations.put(aEntity, aEntity.getAnnotationAssertionAxioms(ontology));
	        }
	        for (OWLDatatype aEntity : ontology.getDatatypesInSignature()) {
	        	entityAnnotations.put(aEntity, aEntity.getAnnotationAssertionAxioms(ontology));
	        }
	        
	        manager.removeOntology(ontology);
	        OWLOntology inferred = manager.createOntology(id);
			iog.fillOntology(manager, inferred);
			
			for (OWLImportsDeclaration decl : declarations) {
	        	manager.applyChange(new AddImport(inferred, decl));
	        }
	        for (OWLAnnotation ann : annotations) {
	        	manager.applyChange(new AddOntologyAnnotation(inferred, ann));
	        }
	        for (OWLClass aEntity : inferred.getClassesInSignature()) {
	        	applyAnnotations(aEntity, entityAnnotations, manager, inferred);
	        }
	        for (OWLObjectProperty aEntity : inferred.getObjectPropertiesInSignature()) {
	        	applyAnnotations(aEntity, entityAnnotations, manager, inferred);
	        }
	        for (OWLDataProperty aEntity : inferred.getDataPropertiesInSignature()) {
	        	applyAnnotations(aEntity, entityAnnotations, manager, inferred);
	        }
	        for (OWLNamedIndividual aEntity : inferred.getIndividualsInSignature()) {
	        	applyAnnotations(aEntity, entityAnnotations, manager, inferred);
	        }
	        for (OWLAnnotationProperty aEntity : inferred.getAnnotationPropertiesInSignature()) {
	        	applyAnnotations(aEntity, entityAnnotations, manager, inferred);
	        }
	        for (OWLDatatype aEntity : inferred.getDatatypesInSignature()) {
	        	applyAnnotations(aEntity, entityAnnotations, manager, inferred);
	        }
			return inferred;
		} catch (IOException e) {
			return ontology;
		} catch (OWLOntologyChangeException e) {
                    return ontology;
                } catch (OWLOntologyCreationException e) {
                    return ontology;
                }
	}

	private static void applyAnnotations(
			OWLEntity aEntity, Map<OWLEntity, Set<OWLAnnotationAssertionAxiom>> entityAnnotations, 
			OWLOntologyManager manager, OWLOntology ontology) {
		Set<OWLAnnotationAssertionAxiom> entitySet = entityAnnotations.get(aEntity);
    	if (entitySet != null) {
    		for (OWLAnnotationAssertionAxiom ann : entitySet) {
    			manager.addAxiom(ontology, ann);
    		}
    	}
	}
	
	
    private static String applyXSLTTransformation(String source, String ontologyUrl, String lang, File resourcesFile) 
	throws TransformerException {	
		TransformerFactory tfactory = new net.sf.saxon.TransformerFactoryImpl();
		
		ByteArrayOutputStream output = new ByteArrayOutputStream();
//		URL xsltURL = Thread.currentThread().getContextClassLoader().getResource("lode/extraction.xsl");
		Transformer transformer =
			tfactory.newTransformer(
//                                        new StreamSource(ClassLoader.getSystemResourceAsStream("lode/extraction.xsl")));
                                        new StreamSource(resourcesFile.getPath()+"/extraction.xsl"));
//                                        new StreamSource(ClassLoader.getSystemResourceAsStream("lode/resources/extraction.xsl")));
		
                //this will be modified later on, so it is not important right now
//		transformer.setParameter("css-location", "");
		transformer.setParameter("lang", lang);
		transformer.setParameter("ontology-url", ontologyUrl);
//		transformer.setParameter("source", cssLocation + "source");
		
		StreamSource inputSource = new StreamSource(new StringReader(source));
		
		transformer.transform(
				inputSource, 
				new StreamResult(output));
		
		return output.toString();
	}
        
//        public static void main(String[] args) throws URISyntaxException, TransformerException{
//            URL a = ClassLoader.getSystemResource("lode/extraction.xsl");
//            System.out.println(a.toURI().getPath());
//            String test = "<?xml version=\"1.0\"?>\n" +
//"<rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n" +
//"  xmlns:foaf=\"http://xmlns.com/foaf/0.1/\"\n" +
//"  xmlns:dct=\"http://purl.org/dc/terms/\"\n" +
//"  xmlns:dc=\"http://purl.org/dc/elements/1.1/\"\n" +
//"  xmlns:rdfs=\"http://www.w3.org/2000/01/rdf-schema#\"\n" +
//"  xmlns:vann=\"http://purl.org/vocab/vann/\"\n" +
//"  xmlns:msg0=\"http://web.resource.org/cc/\">\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://vocab.org/vann/.rdf\">\n" +
//"    <rdf:type rdf:resource=\"http://xmlns.com/foaf/0.1/Document\"/>\n" +
//"    <rdf:type rdf:resource=\"http://purl.org/dc/dcmitype/Text\"/>\n" +
//"    <foaf:primaryTopic rdf:resource=\"http://purl.org/vocab/vann/\"/>\n" +
//"    <dct:hasFormat rdf:resource=\"http://vocab.org/vann/.html\"/>\n" +
//"    <dct:hasFormat rdf:resource=\"http://vocab.org/vann/.json\"/>\n" +
//"    <dct:hasFormat rdf:resource=\"http://vocab.org/vann/.turtle\"/>\n" +
//"    <foaf:topic rdf:resource=\"http://purl.org/vocab/vann/\"/>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://vocab.org/vann/.html\">\n" +
//"    <rdf:type rdf:resource=\"http://purl.org/dc/dcmitype/Text\"/>\n" +
//"    <rdf:type rdf:resource=\"http://xmlns.com/foaf/0.1/Document\"/>\n" +
//"    <dc:format>text/html</dc:format>\n" +
//"    <rdfs:label>HTML</rdfs:label>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://vocab.org/vann/.json\">\n" +
//"    <rdf:type rdf:resource=\"http://purl.org/dc/dcmitype/Text\"/>\n" +
//"    <rdf:type rdf:resource=\"http://xmlns.com/foaf/0.1/Document\"/>\n" +
//"    <dc:format>application/json</dc:format>\n" +
//"    <rdfs:label>JSON</rdfs:label>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://vocab.org/vann/.turtle\">\n" +
//"    <rdf:type rdf:resource=\"http://purl.org/dc/dcmitype/Text\"/>\n" +
//"    <rdf:type rdf:resource=\"http://xmlns.com/foaf/0.1/Document\"/>\n" +
//"    <dc:format>text/plain</dc:format>\n" +
//"    <rdfs:label>Turtle</rdfs:label>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://purl.org/vocab/vann/\">\n" +
//"    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#Ontology\"/>\n" +
//"    <dct:title xml:lang=\"en\">VANN: A vocabulary for annotating vocabulary descriptions</dct:title>\n" +
//"    <dct:date>2010-06-07</dct:date>\n" +
//"    <dct:description xml:lang=\"en\">This document describes a vocabulary for annotating descriptions of vocabularies with examples and usage notes.</dct:description>\n" +
//"    <dct:identifier>http://purl.org/vocab/vann/vann-vocab-20050401</dct:identifier>\n" +
//"    <dct:isVersionOf rdf:resource=\"http://purl.org/vocab/vann/\"/>\n" +
//"    <dct:replaces rdf:resource=\"http://purl.org/vocab/vann/vann-vocab-20040305\"/>\n" +
//"    <dct:creator rdf:resource=\"http://iandavis.com/id/me\"/>\n" +
//"    <dct:rights>Copyright © 2005 Ian Davis</dct:rights>\n" +
//"    <vann:preferredNamespaceUri>http://purl.org/vocab/vann/</vann:preferredNamespaceUri>\n" +
//"    <vann:preferredNamespacePrefix>vann</vann:preferredNamespacePrefix>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://iandavis.com/id/me\">\n" +
//"    <rdf:type rdf:resource=\"http://xmlns.com/foaf/0.1/Person\"/>\n" +
//"    <foaf:name>Ian Davis</foaf:name>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"file:///var/www/vocab.org/www/htdocs/vann/\">\n" +
//"    <rdf:type rdf:resource=\"http://web.resource.org/cc/Work\"/>\n" +
//"    <msg0:license rdf:resource=\"http://creativecommons.org/licenses/by/1.0/\"/>\n" +
//"    <dct:type rdf:resource=\"http://purl.org/dc/dcmitype/Text\"/>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://creativecommons.org/licenses/by/1.0/\">\n" +
//"    <rdf:type rdf:resource=\"http://web.resource.org/cc/License\"/>\n" +
//"    <msg0:permits rdf:resource=\"http://web.resource.org/cc/Reproduction\"/>\n" +
//"    <msg0:permits rdf:resource=\"http://web.resource.org/cc/Distribution\"/>\n" +
//"    <msg0:permits rdf:resource=\"http://web.resource.org/cc/DerivativeWorks\"/>\n" +
//"    <msg0:requires rdf:resource=\"http://web.resource.org/cc/Notice\"/>\n" +
//"    <msg0:requires rdf:resource=\"http://web.resource.org/cc/Attribution\"/>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://purl.org/vocab/vann/changes\">\n" +
//"    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#AnnotationProperty\"/>\n" +
//"    <rdfs:label xml:lang=\"en\">Changes</rdfs:label>\n" +
//"    <rdfs:comment xml:lang=\"en\">A reference to a resource that describes changes between this version of a vocabulary and the previous.</rdfs:comment>\n" +
//"    <rdfs:subPropertyOf rdf:resource=\"http://www.w3.org/2000/01/rdf-schema#seeAlso\"/>\n" +
//"    <rdfs:isDefinedBy rdf:resource=\"http://purl.org/vocab/vann/\"/>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://purl.org/vocab/vann/usageNote\">\n" +
//"    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#AnnotationProperty\"/>\n" +
//"    <rdfs:label xml:lang=\"en\">Usage Note</rdfs:label>\n" +
//"    <rdfs:comment xml:lang=\"en\">A reference to a resource that provides information on how this resource is to be used.</rdfs:comment>\n" +
//"    <rdfs:subPropertyOf rdf:resource=\"http://www.w3.org/2000/01/rdf-schema#seeAlso\"/>\n" +
//"    <rdfs:isDefinedBy rdf:resource=\"http://purl.org/vocab/vann/\"/>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://purl.org/vocab/vann/example\">\n" +
//"    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#AnnotationProperty\"/>\n" +
//"    <rdfs:label xml:lang=\"en\">Example</rdfs:label>\n" +
//"    <rdfs:comment xml:lang=\"en\">A reference to a resource that provides an example of how this resource can be used.</rdfs:comment>\n" +
//"    <rdfs:subPropertyOf rdf:resource=\"http://www.w3.org/2000/01/rdf-schema#seeAlso\"/>\n" +
//"    <rdfs:isDefinedBy rdf:resource=\"http://purl.org/vocab/vann/\"/>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://purl.org/vocab/vann/preferredNamespaceUri\">\n" +
//"    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#AnnotationProperty\"/>\n" +
//"    <rdfs:label xml:lang=\"en\">Preferred Namespace Uri</rdfs:label>\n" +
//"    <rdfs:comment xml:lang=\"en\">The preferred namespace URI to use when using terms from this vocabulary in an XML document.</rdfs:comment>\n" +
//"    <rdfs:isDefinedBy rdf:resource=\"http://purl.org/vocab/vann/\"/>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://purl.org/vocab/vann/preferredNamespacePrefix\">\n" +
//"    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#AnnotationProperty\"/>\n" +
//"    <rdfs:label xml:lang=\"en\">Preferred Namespace Prefix</rdfs:label>\n" +
//"    <rdfs:comment xml:lang=\"en\">The preferred namespace prefix to use when using terms from this vocabulary in an XML document.</rdfs:comment>\n" +
//"    <rdfs:isDefinedBy rdf:resource=\"http://purl.org/vocab/vann/\"/>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"  <rdf:Description rdf:about=\"http://purl.org/vocab/vann/termGroup\">\n" +
//"    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#AnnotationProperty\"/>\n" +
//"    <rdfs:label xml:lang=\"en\">Term Group</rdfs:label>\n" +
//"    <rdfs:comment xml:lang=\"en\">A group of related terms in a vocabulary.</rdfs:comment>\n" +
//"    <rdfs:isDefinedBy rdf:resource=\"http://purl.org/vocab/vann/\"/>\n" +
//"  </rdf:Description>\n" +
//"\n" +
//"</rdf:RDF>";
//            System.out.println(LODEGeneration.applyXSLTTransformation(test, "http://purl.org/net/p-plan", "en"));
////            System.out.println(ClassLoader.getSystemResourceAsStream("lode/resources/extraction.xsl"));
//        }
}
