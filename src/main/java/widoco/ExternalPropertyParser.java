/*
 * Copyright (c) 2024 Victor Chavez <vchavezb@protonmail.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
package widoco;

import org.semanticweb.owlapi.model.*;
import org.semanticweb.owlapi.model.parameters.Imports;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.semanticweb.owlapi.search.EntitySearcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

public class ExternalPropertyParser {
    private enum PropertyType {
        OBJECT_PROPERTY,
        DATA_PROPERTY,
        NAMED_INDIVIDUAL,
        CLASS,
        ANNOTATION_PROPERTY,
        EXTERNAL_PROPERTY,
    }

    private OWLOntology ontology;
    private static boolean uses_ep = false;
    private static boolean uses_op = false;
    private static boolean uses_ap = false;
    private static boolean uses_dp = false;
    private static boolean uses_ni = false;
    private static boolean uses_c = false;

    private Properties lang;

    private final static String OP_PROP = "objectproperty";
    private final static String DP_PROP = "dataproperty";
    private final static String CLASS_PROP = "class";
    private final static String NI_PROP = "namedindividual";
    private final static String AP_PROP = "annotationproperty";
    private final static String EP_PROP = "externalproperty";

    private String ontologyNSURI = "";
    private String langPrefix ="";


    private static final Logger logger = LoggerFactory.getLogger(ExternalPropertyParser.class);

    public static boolean hasExternalProps(){
        return uses_ep;
    }

    public static boolean hasClasses(){
        return uses_c;
    }

    public static boolean hasObjProps(){
        return uses_op;
    }

    public static boolean hasAnnotProps(){
        return uses_ap;
    }

    public static boolean hasDataProps(){
        return uses_dp;
    }

    public static boolean hasNamedIndiv(){
        return uses_ni;
    }

    public void setOntology(OWLOntology ont,String uri) {
        ontology = ont;
        ontologyNSURI = uri;
    }

    /**
     *  Set the language for the external parser.
     *  Load the lode/XX.xml resource with the specific language
     *  and save it to a Property object
     * @param lang
     */
    public void setLang(String lang) {
        String resource = "/lode/"+lang+".xml";
        langPrefix = lang;
        Properties properties = new Properties();
        try (InputStream inputStream = ExternalPropertyParser.class.getResourceAsStream(resource)) {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            org.w3c.dom.Document document = dBuilder.parse(inputStream);
            document.getDocumentElement().normalize();
            // Get all elements inside <labels>
            org.w3c.dom.NodeList nodeList = document.getElementsByTagName("labels");
            // Iterate through each <labels> element
            for (int temp = 0; temp < nodeList.getLength(); temp++) {
                org.w3c.dom.Node node = nodeList.item(temp);
                if (node.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
                    org.w3c.dom.Element element = (org.w3c.dom.Element) node;
                    // Get all child nodes (tags) inside <labels>
                    org.w3c.dom.NodeList childNodes = element.getChildNodes();
                    // Iterate through each child node
                    for (int i = 0; i < childNodes.getLength(); i++) {
                        org.w3c.dom.Node childNode = childNodes.item(i);
                        if (childNode.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE) {
                            // Convert the tag name and text content into Properties
                            properties.setProperty(childNode.getNodeName(), childNode.getTextContent());
                        }
                    }
                }
            }
        } catch (Exception e) {
            this.lang = null;
        }
        this.lang = properties;
    }

    /**
     * Parse html content with external property tags, i.e., the sup tag
     * with class type-ep and attempt to find the type of property type
     * within the ontology.
     * The main purpose of this utility is to add metadata from the ontology
     * since the xslt transform cannot look for external properties
     * outisde of the xml rdf serialization of the ontology when Widoco
     * does not document the imported ontologies.
     * @param htmlContent Html content where the external properties are located.
     *                     Typically this is the named individuals section
     * @return
     */
    public String parse(String htmlContent) {

        Document document = Jsoup.parseBodyFragment(htmlContent, "UTF-8");
        // Find all <a> tags with <sup> tags having class "type-ep"
        Elements superscripts = document.select("a + sup.type-ep");
        // Modify the <sup> tag based on the property type
        for (Element superscript : superscripts) {
            Element owlObjTextRef = superscript.previousElementSibling();
            String href_val = owlObjTextRef.attr("href");
            boolean hrefToHash = href_val.startsWith("#");
            String search_iri;
            if (hrefToHash) {
                search_iri = owlObjTextRef.attr("title");
            } else {
                search_iri = href_val;
            }
            PropertyType type = getPropertyType(search_iri);
            String class_name;
            String text;
            String title;
            if (type == PropertyType.OBJECT_PROPERTY) {
                class_name = "type-op";
                text="op";
                if(lang != null) {
                    title = lang.getProperty(OP_PROP);
                } else {
                    title = "object property";
                }
                if (!uses_op) {
                    uses_op = true;
                }
            } else if(type == PropertyType.DATA_PROPERTY) {
                class_name = "type-dp";
                text="dp";
                if (!uses_dp) {
                    uses_dp = true;
                }
                if(lang != null) {
                    title = lang.getProperty(DP_PROP);
                } else {
                    title = "data property";
                }
            } else if (type == PropertyType.NAMED_INDIVIDUAL) {
                class_name = "type-ni";
                text="ni";
                if (!uses_ni) {
                    uses_ni = true;
                }
                if(lang != null) {
                    title = lang.getProperty(NI_PROP);
                } else {
                    title = "named individual";
                }
            } else if (type == PropertyType.CLASS) {
                class_name = "type-c";
                text="c";
                if (!uses_c) {
                    uses_c = true;
                }
                if(lang != null) {
                    title = lang.getProperty(CLASS_PROP);
                } else {
                    title = "class";
                }
            } else if (type == PropertyType.ANNOTATION_PROPERTY) {
                class_name = "type-ap";
                text="ap";
                if (!uses_ap) {
                    uses_ap = true;
                }
                if(lang != null) {
                    title = lang.getProperty(AP_PROP);
                } else {
                    title = "annotation property";
                }
            } else {
                class_name = "type-ep";
                text ="ep";
                if (!uses_ep) {
                    uses_ep = true;
                }
                if(lang != null) {
                    title = lang.getProperty(EP_PROP);
                } else {
                    title = "external property";
                }
            }
            if (!hrefToHash) {
                // In case the iri belongs to the ontology but
                // through xslt transformation it did not get
                // referenced properly
                if (href_val.contains(ontologyNSURI)) {
                    // remove the "target="_blank" since the IRI is in
                    // the ontology
                    String newRef = href_val.replace(ontologyNSURI,"");
                    owlObjTextRef.removeAttr("target");
                    owlObjTextRef.attr("href",newRef);
                }
            }
            if (type != PropertyType.EXTERNAL_PROPERTY) {
                String label = findLabel(search_iri,langPrefix);
                if (label != null) {
                    owlObjTextRef.text(label);
                }
            }
            superscript.text(text);
            superscript.attr("class",class_name);
            superscript.attr("title",title);
        }
        return document.body().html();
    }

    /**
     * Find a label for a External Property from
     * the loaded ontology
     * @param obj_iri IRI whose rdfs:label will be searched
     * @param langPrefix Preffered language of the label, if not found
     *                   it will try to find any label.
     * @return
     */
    private String findLabel(String obj_iri, String langPrefix) {
        IRI iri = IRI.create(obj_iri);
        OWLEntity entity = ontology.entitiesInSignature(iri).findFirst().orElse(null);
        if (entity != null) {
            java.util.Optional<OWLAnnotation> labelAnnotation = getLabelAnnotation(entity, langPrefix);

            if (labelAnnotation.isPresent()) {
                return labelAnnotation.get().getValue().asLiteral().get().getLiteral();
            }
        }
        return null;
    }

    /**
     * Get the rdfs:label in the form of OWLAnnotation
     * This will look in the main ontology and also in the imported ontologies
     * @param entity OWLEntity whose label will be searched
     * @param langPrefix Preferred language of the label
     * @return
     */
    private Optional<OWLAnnotation> getLabelAnnotation(OWLEntity entity, String langPrefix) {
        Optional<OWLAnnotation> label = getLabel(entity, langPrefix, ontology);
        if (!label.isEmpty()) return label;

        // Check imported ontologies
        for (OWLOntology importedOntology : ontology.getImports()) {
            String importedIRI = importedOntology.getOntologyID().getOntologyIRI().get().toString();
            if (!entity.getIRI().toString().contains(importedIRI)) {
                continue;
            }
            label = getLabel(entity, langPrefix, importedOntology);
            if (label != null) return label;
        }
        return Optional.empty();
    }

    /**
     * Search for an rdfs:label based on the language preference and an ontology
     * @param entity OWLEntity whose rdfs:label will be searched
     * @param langPrefix Preferred language
     * @param ontology Ontology used as reference for the search
     * @return OWLAnnotation with the rdfs:label
     */
    private Optional<OWLAnnotation> getLabel(OWLEntity entity, String langPrefix, OWLOntology ontology) {
        List<OWLAnnotation> annotationList = EntitySearcher.getAnnotations(entity, ontology).collect(Collectors.toList());

        Predicate<OWLAnnotation> isValidLabel = annotation ->
                annotation.getProperty().isLabel() &&
                        annotation.getValue().asLiteral().isPresent();

        Optional<OWLAnnotation> labelWithLang = annotationList.stream()
                .filter(isValidLabel.and(annotation ->
                        annotation.getValue().asLiteral().get().getLang().equals(langPrefix)))
                .findFirst();

        if (labelWithLang.isPresent()) {
            return labelWithLang; // Found the annotation with the specified langPrefix
        }

        // If langPrefix is not found, try to find the annotation with langPrefix = ""
        Optional<OWLAnnotation> labelWithEmptyLang = annotationList.stream()
                .filter(isValidLabel.and(annotation ->
                        annotation.getValue().asLiteral().get().getLang().isEmpty()))
                .findFirst();

        if (labelWithEmptyLang.isPresent()) {
            return labelWithEmptyLang; // Found the annotation with langPrefix = ""
        }

        // If neither langPrefix nor "" is found, return the first available label
        return annotationList.stream()
                .filter(isValidLabel)
                .findFirst();
    }

    /**
     * Find the type of property an owl entity marked as external property
     * with the xslt transformation
     * @param entityIRI IRI of the owl entity to look for
     * @return Property type, if not found it will return PropertyType.propertyIRI
     */
    private PropertyType getPropertyType(String entityIRI) {
        IRI propertyIRIObject = IRI.create(entityIRI);
        Set<OWLObjectProperty> objectProperties = ontology.getObjectPropertiesInSignature(Imports.INCLUDED);
        for (OWLObjectProperty objectProperty : objectProperties) {
            if (objectProperty.getIRI().equals(propertyIRIObject)) {
                return PropertyType.OBJECT_PROPERTY;
            }
        }
        Set<OWLDataProperty> dataProperties = ontology.getDataPropertiesInSignature(Imports.INCLUDED);
        for (OWLDataProperty dataProperty : dataProperties) {
            if (dataProperty.getIRI().equals(propertyIRIObject)) {
                return PropertyType.DATA_PROPERTY;
            }
        }
        Set<OWLNamedIndividual> individuals = ontology.getIndividualsInSignature(Imports.INCLUDED);
        for (OWLNamedIndividual individual : individuals) {
            if (individual.getIRI().equals(propertyIRIObject)) {
                return PropertyType.NAMED_INDIVIDUAL;
            }
        }
        Set<OWLClass> classes = ontology.getClassesInSignature(Imports.INCLUDED);
        for (OWLClass owl_class : classes) {
            if (owl_class.getIRI().equals(propertyIRIObject)) {
                return PropertyType.CLASS;
            }
        }
        Set<OWLAnnotationProperty> annotationProperties = ontology.getAnnotationPropertiesInSignature(Imports.INCLUDED);
        for (OWLAnnotationProperty annotationProperty : annotationProperties) {
            if (annotationProperty.getIRI().equals(propertyIRIObject)) {
                return PropertyType.ANNOTATION_PROPERTY;
            }
        }
        return PropertyType.EXTERNAL_PROPERTY;
    }

}
