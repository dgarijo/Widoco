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
import org.junit.Test;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;
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
    static class Fact {
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

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Fact fact = (Fact) obj;
            return predicateIRI.equals(fact.predicateIRI) &&
                    predicateType.equals(fact.predicateType) &&
                    objectIRI.equals(fact.objectIRI) &&
                    objectType.equals(fact.objectType);
        }

        @Override
        public String toString() {
            return "Fact{predicateIRI='" + predicateIRI + "', predicateType='" + predicateType +
                    "', objectIRI='" + objectIRI + "', objectType='" + objectType + "'}";
        }

    }

    private static final String DOC_URI = "myDoc";
    private static final String ONT_NS = "http://www.external-entity.com/testCase/";
    private static final String IMPORT_NS = "http://example.com/imported/ont/";
    private static final String CONTACT_NS = "http://www.w3.org/2000/10/swap/pim/contact#";
    private static final String EXT_NS = "http://my-external-ont.com/ext/";

    private Configuration c;

    public ExternalEntitiesTest() {
        c = new Configuration();
        c.setDocumentationURI(DOC_URI);
        c.setOverwriteAll(true);
    }

    @BeforeClass
    public static void setUpClass() {

    }

    @AfterClass
    public static void tearDownClass() {
        deleteFiles(new File(DOC_URI));
    }

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() {
        deleteFiles(c.getTmpFile());
    }

    private static void deleteFiles(File folder){
        if (folder == null || !folder.exists()) {
            return;
        }
        String[] entries = folder.list();
        if (entries != null) {
            for(String s: entries){
                File currentFile = new File(folder.getPath(),s);
                if(currentFile.isDirectory()){
                    deleteFiles(currentFile);
                }
                else{
                    currentFile.delete();
                }
            }
        }
        folder.delete();
    }

    private static void copyResourceToFile(String resourcePath, File targetFile) throws Exception {
        try (InputStream in = ExternalEntitiesTest.class.getClassLoader().getResourceAsStream(resourcePath)) {
            if (in == null) {
                throw new IllegalStateException("Resource not found: " + resourcePath);
            }
            Files.copy(in, targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        }
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
     */
    private List<Fact> getIndividualFacts(Document doc, String individual_iri) {
        Element individualEntity = getDiv(doc, "entity", individual_iri);
        Element factsDtElement = individualEntity.select("dt:containsOwn(has facts)").first();
        List<Fact> factList = new java.util.ArrayList<>();
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
     */
    private static void testIndividual(Document doc, String iri, String expectedClassIRI, String expectedType) {
        String entityType = getIndividualClassType(doc, iri);
        String classIRI = getIndividualClassIRI(doc, iri);
        assertEquals("Entity type mismatch for " + iri, expectedType, entityType);
        assertEquals("Class IRI mismatch for " + iri, expectedClassIRI, classIRI);
    }

    /**
     * Helper function to assert that all expected facts are present in the actual facts list.
     * Order-independent comparison.
     */
    private void assertContainsFacts(List<Fact> actualFacts, List<Fact> expectedFacts) {
        assertEquals("Facts count mismatch", expectedFacts.size(), actualFacts.size());
        for (Fact expected : expectedFacts) {
            assertTrue("Expected fact not found: " + expected, actualFacts.contains(expected));
        }
    }

    @Test
    public void testExternalEntityOntology() {
        System.out.println("Testing Ontology: External Entity");

        File tempDir = null;
        try {
            tempDir = Files.createTempDirectory("external-entity").toFile();
            File externalEntity = new File(tempDir, "external-entity.ttl");
            File importedOntology = new File(tempDir, "imported-ontology.ttl");
            copyResourceToFile("externalEntity/external-entity.ttl", externalEntity);
            copyResourceToFile("externalEntity/imported-ontology.ttl", importedOntology);

            c.setFromFile(true);
            c.setOntologyPath(externalEntity.getAbsolutePath());
            c.setImports(Arrays.asList(tempDir.getAbsolutePath()));
            WidocoUtils.loadModelToDocument(c);
            // Ensure the local import ontology is available in the manager so property types are detected.
            c.getMainOntology().getOWLAPIModel().getOWLOntologyManager()
                    .loadOntologyFromOntologyDocument(importedOntology);
            CreateResources.generateDocumentation(c.getDocumentationURI(), c, c.getTmpFile());

            File crossRefFile = new File(c.getDocumentationURI() + "/sections/crossref-en.html");
            Document crossRefDoc = Jsoup.parse(crossRefFile, "UTF-8");

            // Test superclass of ExtProject
            String extProjectSuperClassType = getSuperClassType(crossRefDoc, ONT_NS + "ExtProject");
            assertNotNull("SuperClass type should not be null", extProjectSuperClassType);
            assertEquals("type-c", extProjectSuperClassType);

            // Test individuals
            testIndividual(crossRefDoc, ONT_NS + "PersonA", CONTACT_NS + "Person", "type-c");
            testIndividual(crossRefDoc, ONT_NS + "PersonB", ONT_NS + "LocalPerson", "type-c");
            testIndividual(crossRefDoc, ONT_NS + "Project1", ONT_NS + "ExtProject", "type-c");

            // PersonA facts
            List<Fact> expectedPersonAFacts = Arrays.asList(
                    new Fact(EXT_NS + "Annotation", "type-ap", "literal", "\"external annotation\"@en")
            );
            assertContainsFacts(getIndividualFacts(crossRefDoc, ONT_NS + "PersonA"), expectedPersonAFacts);

            // PersonB facts
            List<Fact> expectedPersonBFacts = Arrays.asList(
                    new Fact(IMPORT_NS + "knows", "type-op", ONT_NS + "PersonA", "type-ni"),
                    new Fact(IMPORT_NS + "age", "type-dp", "literal", "\"30\"^^integer")
            );
            assertContainsFacts(getIndividualFacts(crossRefDoc, ONT_NS + "PersonB"), expectedPersonBFacts);

            // Project1 facts
            List<Fact> expectedProject1Facts = Arrays.asList(
                    new Fact(IMPORT_NS + "fundedBy", "type-op", ONT_NS + "PersonA", "type-ni"),
                    new Fact(IMPORT_NS + "title", "type-dp", "literal", "\"The External Project\"@en")
            );
            assertContainsFacts(getIndividualFacts(crossRefDoc, ONT_NS + "Project1"), expectedProject1Facts);

        } catch (Exception e) {
            fail("Error while running test: " + e.getMessage());
        } finally {
            if (tempDir != null && tempDir.exists()) {
                deleteFiles(tempDir);
            }
        }
    }
}
