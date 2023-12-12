/*
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
package widoco;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Properties;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MarkerFactory;
import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 * Class made for parsing and manipulating LODE's html. This class contains most
 * of the TemplateGeneratorOLD class
 * 
 * @author Daniel Garijo
 */
public class LODEParser {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	private final HashMap<String, String> replacements; // replace lode's ids with the classes and properties.
	// this will allow navigating the document properly. It might be troublesome if
	// a class is names as a prop.
	private String classes;
	private String classList;
	private String properties;
	private String propertyList;
	private String dataProp;
	private String dataPropList;
	private String annotationProp;
	private String annotationPropList;
	private String namedIndividuals;
	private String namedIndividualList;
	private String rules;
	private String ruleList;
	Configuration c;

	/**
	 * Constructor for the LODE parser. The reason for creating this class is to reuse certain parts of
	 * the generated HTML.
	 * 
	 * @param lodeContent
	 *            text obtained as a response from LODE.
	 * @param c
	 *            configuration object
	 * @param langFile
	 *            language file to do proper annotations of classes, props, etc.
	 */
	public LODEParser(String lodeContent, Configuration c, Properties langFile) {
		replacements = new HashMap<String, String>();
		this.c = c;
		parse(lodeContent, langFile);
		//System.out.println(lodeContent);
	}

	public String getClassList() {
		return classList;
	}

	public String getClasses() {
		return classes;
	}

	public String getDataProp() {
		return dataProp;
	}

	public String getDataPropList() {
		return dataPropList;
	}

	public String getProperties() {
		return properties;
	}

	public String getPropertyList() {
		return propertyList;
	}

	public String getAnnotationProp() {
		return annotationProp;
	}

	public String getAnnotationPropList() {
		return annotationPropList;
	}

	public String getNamedIndividuals() {
		return namedIndividuals;
	}

	public String getNamedIndividualList() {
		return namedIndividualList;
	}

	public String getRules() {
		return rules;
	}

	public String getRuleList() {
		return ruleList;
	}

	private void parse(String content, Properties langFile) {

		try {
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			Document doc = db.parse(new ByteArrayInputStream(content.getBytes("UTF-8")));// StandardCharsets.UTF_8

			NodeList html = doc.getElementsByTagName("div");
			// String cList = "", pList= "", dPList= "", c= "", p= "", dp="";
			for (int i = 0; i < html.getLength(); i++) {
				String attrID = html.item(i).getAttributes().item(0).getTextContent();
				switch (attrID) {
					case "classes":
						classList = getTermList(html.item(i));
						classes = nodeToString(html.item(i));
						classes = classes.replace("<h2>" + langFile.getProperty(Constants.LANG_CLASSES) + "</h2>",
								"<h3 id=\"classes-headline\" class=\"list\">" + langFile.getProperty(Constants.LANG_CLASSES)
										+ "</h3>");
						break;
					case "objectproperties":
						propertyList = getTermList(html.item(i));
						properties = (nodeToString(html.item(i)));
						properties = properties.replace("<h2>" + langFile.getProperty(Constants.LANG_OBJ_PROP) + "</h2>",
								"<h3 id=\"properties\" class=\"list\">" + langFile.getProperty(Constants.LANG_OBJ_PROP)
										+ "</h3>");
						break;
					case "dataproperties":
						dataPropList = (getTermList(html.item(i)));
						dataProp = (nodeToString(html.item(i)));
						dataProp = dataProp.replace("<h2>" + langFile.getProperty(Constants.LANG_DATA_PROP) + "</h2>",
								"<h3 id=\"dataproperties-headline\" class=\"list\">"
										+ langFile.getProperty(Constants.LANG_DATA_PROP) + "</h3>");
						break;
					case "annotationproperties":
						annotationPropList = (getTermList(html.item(i)));
						annotationProp = (nodeToString(html.item(i)));
						annotationProp = annotationProp.replace(
								"<h2>" + langFile.getProperty(Constants.LANG_ANN_PROP) + "</h2>",
								"<h3 id=\"annotationproperties\" class=\"list\">"
										+ langFile.getProperty(Constants.LANG_ANN_PROP) + "</h3>");
						break;
					case "namedindividuals":
						namedIndividualList = (getTermList(html.item(i)));
						namedIndividuals = (nodeToString(html.item(i)));
						namedIndividuals = namedIndividuals.replace(
								"<h2>" + langFile.getProperty(Constants.LANG_NAMED_INDIV) + "</h2>",
								"<h3 id=\"namedindividuals\" class=\"list\">"
										+ langFile.getProperty(Constants.LANG_NAMED_INDIV) + "</h3>");
						break;
					/*missing: rules!*/
					case "rules":
						ruleList = (getTermList(html.item(i)));
						rules = (nodeToString(html.item(i)));
//						rules = rules.replace(
//								"<h2>" + langFile.getProperty(Constants.LANG_NAMED_INDIV) + "</h2>",
//								"<h3 id=\"rules\" class=\"list\">"
//										+ langFile.getProperty(Constants.LANG_NAMED_INDIV) + "</h3>");
						break;
				}
			}
			// fix ids
			if (!"".equals(classList) && classList != null) {
				classList = fixIds(classList);
				classes = fixIds(classes);
			}
			if (!"".equals(propertyList) && propertyList != null) {
				propertyList = fixIds(propertyList);
				properties = fixIds(properties);
			}
			if (!"".equals(dataPropList) && dataPropList != null) {
				dataPropList = fixIds(dataPropList);
				dataProp = fixIds(dataProp);
			}
			if (!"".equals(annotationPropList) && annotationPropList != null) {
				annotationPropList = fixIds(annotationPropList);
				annotationProp = fixIds(annotationProp);
			}
			if (!"".equals(namedIndividualList) && namedIndividualList != null) {
				namedIndividualList = fixIds(namedIndividualList);
				namedIndividuals = fixIds(namedIndividuals);
			}
			if (!"".equals(ruleList) && ruleList != null) {
				ruleList = fixIds(ruleList);
				rules = fixIds(rules);
				//hack so "named individuals" appear as rules
				rules = rules.replace("<a href=\"#namedindividuals\">Named Individual ToC</a>",
						"<a href=\"#rules\">Rules ToC</a>");
			}
			logger.info("Parsing Complete!");
		} catch (ParserConfigurationException | DOMException ex) {
			logger.error("Exception interpreting the resource: " + ex.getMessage());
		} catch (SAXException | IOException ex) {
			logger.error(MarkerFactory.getMarker("FATAL"), ex.getMessage());
		}
	}

	private String getTermList(Node n) {
		NodeList divs = n.getChildNodes();
		for (int j = 0; j < divs.getLength(); j++) {
			if (divs.item(j).getNodeName().equals("ul")) {
				return (nodeToString(divs.item(j)));
			}
		}
		return null;
	}

	private String nodeToString(Node n) {
		try {
			TransformerFactory transfac = TransformerFactory.newInstance();
			Transformer trans = transfac.newTransformer();
			trans.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
			trans.setOutputProperty(OutputKeys.INDENT, "yes");
			StringWriter sw = new StringWriter();
			StreamResult result = new StreamResult(sw);
			DOMSource source = new DOMSource(fixAnchor(n));
			trans.transform(source, result);
			return sw.toString();
		} catch (IllegalArgumentException | TransformerException ex) {
			logger.error("Error while writing to xml " + ex.getMessage());
			return null;
		}
	}

	// this methods removes the first 2 anchors of the div returned by LODE (they
	// lead to an error).
	// it also changes the id of the div replacing it with the name found in the
	// anchor
	// (the second one)
	private Node fixAnchor(Node nodeToFix) {
		try {
			NodeList outerDiv = nodeToFix.getChildNodes();
			for (int i = 0; i < outerDiv.getLength(); i++) {
				Node currentNode = outerDiv.item(i);
				if (currentNode.getNodeName().equals("div")) {
					// NodeList list = nodeToFix.getChildNodes();
					Node firstAnchor = currentNode.getFirstChild();
					Node secondAnchor = firstAnchor.getNextSibling();
					String newID = firstAnchor.getAttributes().getNamedItem("name").getNodeValue();
					newID = newID.replace(c.getMainOntology().getNamespaceURI(), "");

					try {
						// if the URI contains special characters, we must decode them for referencing
						// them properly.
						newID = URLDecoder.decode(newID, "UTF-8");
					} catch (Exception e) {
						logger.error("Error when encoding node.");
					}
					if (newID.startsWith("#")) {
						newID = newID.replace("#", "");
					} // fix in case the author insert the NS URI without "#"
					if (secondAnchor.getNodeName().equals("a")) {
						currentNode.removeChild(secondAnchor);
					}
					// we save the the id for derreferencing properly the resource. Note that
					// if a property has the same name as a Class this could lead to problems
					replacements.put(currentNode.getAttributes().getNamedItem("id").getNodeValue() + "\"",
							newID + "\"");
					// I include the comma at the end so smaller ids don't replace larger ids.
					// (quick fix)

					// we remove the anchor, which makes an error in the visualization
					currentNode.removeChild(firstAnchor);
				}
			}
			return nodeToFix;
		} catch (DOMException ex) {
			logger.error("Could not fix node");
			return nodeToFix;
		}
	}

	/**
	 * Method to fix the ids generated automatically by LODE with the URIs of the
	 * classes and properties.
	 * 
	 * @param textToBeFixed
	 *            The input text with the links to be fixed
	 * @return
	 */
	private String fixIds(String textToBeFixed) {
		for (String keyToReplace : replacements.keySet()) {
			textToBeFixed = textToBeFixed.replace(keyToReplace, replacements.get(keyToReplace));
			textToBeFixed = textToBeFixed.replace("<span>:", "<span>");
		}
		return textToBeFixed;
	}
}
