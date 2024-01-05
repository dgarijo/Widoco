/*
 * Copyright (c) 2024 Victor Chavez <vchavezb@protonmail.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * This class tests the correct parsing of external properties that cannot
 * be transformed with the xslt by analyzing the html generated output.
 */
package widoco;

import org.jsoup.nodes.Element;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;

import java.io.File;
import java.util.ArrayList;

import static org.junit.Assert.fail;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;


/**
 *
 * @author vChavezB
 */
public class ExternalEntitiesTest {

    /**
     * Class to store fact properties
     */
    class Fact {
        private String predicateIRI;
        private String predicateType;
        private String objectIRI;
        private String objectType;

        public Fact(String predicateIRI, String predicateType, String objectIRI, String objectType) {
            this.predicateIRI = predicateIRI;
            this.predicateType = predicateType;
            this.objectIRI = objectIRI;
            this.objectType = objectType;
        }

        public String getPredicateIRI() {
            return predicateIRI;
        }

        public String getPredicateType() {
            return predicateType;
        }

        public String getObjectIRI() {
            return objectIRI;
        }

        public String getObjectType() {
            return objectType;
        }

    }
    static String docUri = "myDoc";
    Configuration c;
    static final private String ONT_NS = "http://www.external-entity.com/testCase/";
    public ExternalEntitiesTest() {
        c = new Configuration();
        //set up where the files will be written. Otherwise, an error will be produced
        c.setDocumentationURI(docUri);
        c.setOverwriteAll(true);
    }

    @BeforeClass
    public static void setUpClass() {

    }

    @AfterClass
    public static void tearDownClass() {
        deleteFiles(new File (docUri));
    }

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() {
        deleteFiles(c.getTmpFile());
    }

    private static void deleteFiles(File folder){
        String[]entries = folder.list();
        for(String s: entries){
            File currentFile = new File(folder.getPath(),s);
            if(currentFile.isDirectory()){
                deleteFiles(currentFile);
            }
            else{
                currentFile.delete();
            }
        }
        folder.delete();
    }

    /**
     * Get div element for a specific class with id
     * @param doc
     * @param className
     * @param id
     * @return
     */
    private static Element getDiv(Document doc, String className, String id){
        Elements elements = doc.getElementsByAttributeValue("class", className);

        // Iterate over the elements and filter by id
        for (Element element : elements) {
            if (id.equals(element.id())) {
                return element;
            }
        }
        return null;
    }


    /**
     * Find first superclass in html of a crossref document
     * for a specific class
     * @param doc the Jsoup document with the crossref section
     * @param class_iri the class iri to look for
     * @return Type of superclass. Expected values (type-c,type-ep), null if not found
     */
    private static String getSuperClassType(Document doc, String class_iri) {
        Element ExtProjectElement = getDiv(doc, "entity", class_iri);
        Element ddElement = ExtProjectElement.select("dt:containsOwn(has super-classes) + dd").first();
        Element supElement = ddElement.select("sup").first();
        // Check if the sup element was found
        if (supElement != null) {
            // Get the entity descriptor class
            return supElement.attr("class");
        } else {
            return null;
        }
    }

    /**
     * Get the descriptor type located in the sup tag for an individual
     * @param doc
     * @param individual_iri
     * @return
     */
    private static String getIndividualClassType(Document doc, String individual_iri) {
        Element classEntity = getDiv(doc, "entity", individual_iri);
        Element ddElement = classEntity.select("dt:containsOwn(belongs to) + dd").first();
        Element supElement =  ddElement.select("sup").first();
        if (supElement != null) {
            // Get the entity descriptor class
            return supElement.attr("class");
        } else {
            return null;
        }
    }

    /**
     * Get the type of class for and individual
     * @param doc
     * @param individual_iri
     * @return
     */
    private static String getIndividualClassIRI(Document doc, String individual_iri) {
        Element individualEntity = getDiv(doc, "entity", individual_iri);
        Element ddElement = individualEntity.select("dt:containsOwn(belongs to) + dd").first();
        Element aElement =  ddElement.select("a").first();
        if (aElement != null) {
            // Get the entity descriptor class
            return aElement.attr("title");
        } else {
            return null;
        }
    }

    /**
     * Get a list of individual facts for a specific iri
     * @param doc
     * @param individual_iri
     * @return
     */
    private ArrayList<Fact> getIndividualFacts(Document doc, String individual_iri) {
        Element individualEntity = getDiv(doc, "entity", individual_iri);
        Element factsDtElement = individualEntity.select("dt:containsOwn(has facts)").first();
        // Create a list to store Fact instances
        ArrayList<Fact> factList = new ArrayList<>();
        if (factsDtElement != null) {
            // Find following dd elements
            Elements factDDElements = factsDtElement.nextElementSiblings().select("dd");

            for (Element factElement : factDDElements) {
                Elements aElements = factElement.select("a");
                Elements supElements = factElement.select("sup");
                Element predicateA = aElements.get(0);
                Element predicateSup = supElements.get(0);
                if (predicateA != null && predicateSup != null) {
                    String predicateIRI = predicateA.attr("title");
                    String predicateType = predicateSup.attr("class");
                    String objectIRI = "";
                    String objectType = "";
                    Element spanElement = factElement.selectFirst("span");
                    if (aElements.size()==2 && spanElement==null) {
                        Element nextAElement = factElement.select("a").get(1);
                        Element nextSupElement = factElement.select("sup").get(1);
                        if (nextAElement != null && nextSupElement != null) {
                            objectIRI = nextAElement.attr("title");
                            objectType = nextSupElement.attr("class");
                        }
                    } else {
                        // Literal
                        if (spanElement!=null) {
                            objectIRI = spanElement.attr("class");
                            objectType = spanElement.text();
                        }
                    }
                    Fact fact = new Fact(predicateIRI, predicateType, objectIRI, objectType);
                    factList.add(fact);
                }
            }
        }
        return factList;
    }

    /**
     * Test an individual and its expected class iri and descriptor type
     * @param doc
     * @param iri
     * @param expectedClassIRI
     * @param expectedType
     */
    static void testIndividual(Document doc, String iri,String expectedClassIRI,String expectedType) {
        String entityType = getIndividualClassType(doc,iri);
        String classIRI = getIndividualClassIRI(doc,iri);
        assert(entityType.equals(expectedType));
        assert(classIRI.equals(expectedClassIRI));
    }


    /**
     * Helper function to assert a fact
     * @param fact
     * @param expectedPredicateIRI
     * @param expectedPredicateType
     * @param expectedObjectIRI
     * @param expectedObjType
     */
    static void testFact(Fact fact,String expectedPredicateIRI, String expectedPredicateType, String expectedObjectIRI, String expectedObjType) {
        assert(fact.getPredicateIRI().equals(expectedPredicateIRI));
        assert(fact.getPredicateType().equals(expectedPredicateType));
        assert(fact.getObjectIRI().equals(expectedObjectIRI));
        assert(fact.getObjectType().equals(expectedObjType));
    }

    /**
     * Test that parsing external entity works
     * Generate the html and look for the facts and
     * entity descriptors generated with sup tags.
     */
    @org.junit.Test
    public void testExternalEntityOntology() {
        System.out.println("Testing Ontology: External Entity");

        try{
            String pathToOnto = "test" + File.separator + "external-entity.ttl";
            c.setFromFile(true);
            this.c.setOntologyPath(pathToOnto);
            //read the model from file
            WidocoUtils.loadModelToDocument(c);
            CreateResources.generateDocumentation(c.getDocumentationURI(), c, c.getTmpFile());
            File crossRefFile = new File(c.getDocumentationURI()+"/sections/crossref-en.html");
            Document crossRefDoc = Jsoup.parse(crossRefFile, "UTF-8");
            // Look for superclass of ExtProject
            // i.e., http://xmlns.com/foaf/0.1/Project should be recognized as type-c
            String extProjectSuperClassType = getSuperClassType(crossRefDoc,ONT_NS+"ExtProject");
            assert(extProjectSuperClassType!=null);
            assert(extProjectSuperClassType.equals("type-c"));
            testIndividual(crossRefDoc,ONT_NS+"PersonA","http://www.w3.org/2000/10/swap/pim/contact#Person","type-c");
            testIndividual(crossRefDoc,ONT_NS+"PersonB",ONT_NS+"LocalPerson","type-c");
            testIndividual(crossRefDoc,ONT_NS+"Project1",ONT_NS+"ExtProject","type-c");
            ArrayList<Fact> personBFacts = getIndividualFacts(crossRefDoc, ONT_NS + "PersonB");
            assert(personBFacts.size() == 2);
            testFact(personBFacts.get(0),"http://xmlns.com/foaf/0.1/knows","type-op",
                    "http://www.external-entity.com/testCase/PersonB","type-ni");
            testFact(personBFacts.get(1),"http://xmlns.com/foaf/0.1/age","type-dp",
                    "literal","\"30\"^^integer");

            ArrayList<Fact> project1Facts = getIndividualFacts(crossRefDoc, ONT_NS + "Project1");
            assert(project1Facts.size() == 2);
            testFact(project1Facts.get(0),"http://xmlns.com/foaf/0.1/fundedBy","type-op",
                                            "http://www.external-entity.com/testCase/PersonA","type-ni");
            testFact(project1Facts.get(1),"http://xmlns.com/foaf/0.1/title","type-dp",
                                            "literal","\"The External Project\"@en");

        }catch(Exception e){
            fail("Error while running test "+e.getMessage());
        }
    }
}
