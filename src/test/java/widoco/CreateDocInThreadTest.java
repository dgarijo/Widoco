/*
 * Copyright 2017 Daniel Garijo
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

/**
 * This class tests a set of ontologies that are in the JAR/testOntologies folder.
 * The purpose of this test is not to see if the documentation is right, just checks
 * if it is generated.
 * Note that the ontologies won't be saved, as I am NOT loading their models
 */
package widoco;

import java.io.File;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import static org.junit.Assert.*;

/**
 *
 * @author dgarijo
 */
public class CreateDocInThreadTest {
    Configuration c;
    static String docUri = "myDoc";
    
    public CreateDocInThreadTest() { 
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
     * Test ontology in TTL. BNE
     */
    @org.junit.Test
    public void testOntoInTTL() {
        System.out.println("Testing Ontology: BNE");
        try{
            String pathToOnto = "test" + File.separator + "bne.ttl";
            c.setFromFile(true);
            this.c.setOntologyPath(pathToOnto);
            //read the model from file
            WidocoUtils.loadModelToDocument(c);
            CreateResources.generateDocumentation(c.getDocumentationURI(), c, c.getTmpFile());
        }catch(Exception e){
            fail("Error while running test "+e.getMessage());
        }
    }
    
    /**
     * Test an OWL ontology. coil.owl
     */
    @org.junit.Test
    public void testOntoOWLXML() {
        System.out.println("Testing Ontology: coil.owl");
        try{
            String pathToOnto = "test" + File.separator + "coil.owl";
            c.setFromFile(true);
            this.c.setOntologyPath(pathToOnto);
            //read the model from file
            WidocoUtils.loadModelToDocument(c);
            CreateResources.generateDocumentation(c.getDocumentationURI(), c, c.getTmpFile());
        }catch(Exception e){
            fail("Error while running test "+e.getMessage());
        }
    }

    /**
     * Testing a small ontology observation.owl
     */
    @org.junit.Test
    public void testOntologySmall() {
        System.out.println("Testing Ontology: observation.owl");
        try{
            String pathToOnto = "test" + File.separator + "observation.owl";
            c.setFromFile(true);
            this.c.setOntologyPath(pathToOnto);
            //read the model from file
            WidocoUtils.loadModelToDocument(c);
            CreateResources.generateDocumentation(c.getDocumentationURI(), c, c.getTmpFile());
        }catch(Exception e){
            fail("Error while running test "+e.getMessage());
        }
    }
    
    /**
     * Testing a medium  sized ontology: otalex.owl
     */
    @org.junit.Test
    public void testOntologyMedium() {
        System.out.println("Testing Ontology: otalex.owl");
        try{
            String pathToOnto = "test" + File.separator + "otalex.owl";
            c.setFromFile(true);
            this.c.setOntologyPath(pathToOnto);
            //read the model from file
            WidocoUtils.loadModelToDocument(c);
            CreateResources.generateDocumentation(c.getDocumentationURI(), c, c.getTmpFile());
        }catch(Exception e){
            fail("Error while running test "+e.getMessage());
        }
    }
    
    
    /**
     * Test if an ontology can be created from a URL. 
     * Test ontology: PROV-O
     */
    @org.junit.Test
    public void testOntologyFromURL() {
        System.out.println("Testing Ontology: prov-o");
        try{
            String pathToOnto = "http://www.w3.org/ns/prov-o";
            String aux = c.getTmpFile().getAbsolutePath()+File.separator+"auxOntology";
            c.setFromFile(false);
            this.c.setOntologyURI(pathToOnto);
            //read the model from file
            WidocoUtils.loadModelToDocument(c);
            this.c.setOntologyPath(aux);
            CreateResources.generateDocumentation(c.getDocumentationURI(), c, c.getTmpFile());
        }catch(Exception e){
            fail("Error while running test "+e.getMessage());
        }
    }

    /**
     * Test to see if the metadata is correctly gathered in:
     * 1) Direct annotations
     * 2) Blank nodes
     * 3) Entities described with URIs locally
     * The test uses an ontology which has 3 creators, each described with one of the methods above.
     */
    @org.junit.Test
    public void testAnnotationsInOntology() {
        try {
            String pathToOnto = "test" + File.separator + "example_annotated.owl";
            c.setFromFile(true);
            this.c.setOntologyPath(pathToOnto);
            //read the model from file
            WidocoUtils.loadModelToDocument(c);
            c.loadPropertiesFromOntology(c.getMainOntology().getOWLAPIModel());
            if(c.getMainOntology().getCreators().size()!=3){
                fail("Could not extract all three creators");
            }
            //not needed, but added for consistency with the other tests.
            CreateResources.generateDocumentation(c.getDocumentationURI(), c, c.getTmpFile());
        }catch(Exception e){
            fail("Error while running the test: " +e.getMessage());
        }
    }

    /**
     * Test to see if the metadata is correctly gathered for the following properties:
     * Abstract, description, title, creator, created, license, namespace prefix, namespaceURI, citation,
     * backwardCompatibility, prior version, source, see also, fundedBy,
     * introduction, rdfxml serialization, version info
     */
    @org.junit.Test
    public void testAdvancedAnnotationsInOntology() {
        try {
            String pathToOnto = "test" + File.separator + "example_test.owl";
            c.setFromFile(true);
            this.c.setOntologyPath(pathToOnto);
            //read the model from file
            WidocoUtils.loadModelToDocument(c);
            c.loadPropertiesFromOntology(c.getMainOntology().getOWLAPIModel());
            if(c.getAbstractSection().isEmpty()){
                fail("Could not extract abstract");
            }
            if(c.getMainOntology().getDescription().isEmpty()){
                fail("Could not extract description");
            }
            if(c.getMainOntology().getTitle().isEmpty()){
                fail("Could not extract title");
            }
            if(c.getMainOntology().getCreators().size()!=1){
                fail("Could not extract creator");
            }
            if(c.getMainOntology().getNamespaceURI().isEmpty()){
                fail("Could not extract ns URI");
            }
            if(c.getMainOntology().getNamespacePrefix().isEmpty()){
                fail("Could not extract prefix");
            }
            if(c.getMainOntology().getCiteAs().isEmpty()){
                fail("Could not extract citation");
            }
            if(c.getMainOntology().getBackwardsCompatibleWith().isEmpty()){
                fail("Could not extract backward compatibility");
            }
            if(c.getMainOntology().getPreviousVersion().isEmpty()){
                fail("Could not extract previous version");
            }
            if(c.getMainOntology().getSources().isEmpty()){
                fail("Could not extract sources");
            }
            if(c.getMainOntology().getSeeAlso().isEmpty()){
                fail("Could not extract seeAlso");
            }
            if(c.getMainOntology().getFunders().isEmpty()){
                fail("Could not extract funders");
            }
            if(c.getIntroText().isEmpty()){
                fail("Could not extract intro");
            }
            if(!c.getMainOntology().getSerializations().get(Constants.RDF_XML).contains("example.org")){
                fail("Could not extract rdf/xml serialization properly");
            }
            if(c.getMainOntology().getRevision().isEmpty()){
                fail("Could not extract revision");
            }
            //not needed, but added for consistency with the other tests.
            CreateResources.generateDocumentation(c.getDocumentationURI(), c, c.getTmpFile());
        }catch(Exception e){
            fail("Error while running the test: " +e.getMessage());
        }
    }

    /**
     * Test to see if annotation properties that document the ontology and also are extended in the ontology itself
     * are being recognized.
     * Issue 530 (https://github.com/dgarijo/Widoco/issues/530)
     */
    @org.junit.Test
    public void testIssue530() {
        try {
            String pathToOnto = "test" + File.separator + "medatatestont.ttl";
            c.setFromFile(true);
            this.c.setOntologyPath(pathToOnto);
            //read the model from file
            WidocoUtils.loadModelToDocument(c);
            c.loadPropertiesFromOntology(c.getMainOntology().getOWLAPIModel());
            //title is the property being extended
            if(c.getMainOntology().getTitle().isEmpty()){
                fail("Could not extract title!");
            }
            //not needed, but added for consistency with the other tests.
            CreateResources.generateDocumentation(c.getDocumentationURI(), c, c.getTmpFile());
        }catch(Exception e){
            fail("Error while running the test: " +e.getMessage());
        }
    }
//    
    /**
     * This is a test to see if a big ontology works (several MB)
     * To be tested only on releases. IFC4_ADD1 ontology (that is why it is commented)
     */
//    @org.junit.Test
//    public void testBigOntology() {
//        System.out.println("Testing Ontology: IFC4_ADD1.ttl");
//        try{
//            String pathToOnto = "test" + File.separator + "IFC4_ADD1.ttl";
//            c.setFromFile(true);
//            this.c.setOntologyPath(pathToOnto);
            //read the model from file
//            WidocoUtils.loadModelToDocument(c);
//            CreateResources.generateDocumentation(c.getDocumentationURI(), c, c.getTmpFile());
//        }catch(Exception e){
//            fail("Error while running test "+e.getMessage());
//        }
//    }
    
     /**
     * An ontology written in a language that is NOT English: geolinkeddata.owl
     * This ontology is an ontology network 
     * (needs internet connection to work)
     * 
     * TEST COMMENTED OUT BECAUSE IMPORTING THE ONTOLOGIES IS SLOW
     
    @org.junit.Test
    public void testOntologyInLanguage() {
        System.out.println("Testing Ontology: geolinkeddata.owl");
        try{
            String pathToOnto = "test" + File.separator + "geolinkeddata.owl";
            c.setFromFile(true);
            this.c.setOntologyPath(pathToOnto);
            //read the model from file
            WidocoUtils.loadModelToDocument(c);
            CreateResources.generateDocumentation(c.getDocumentationURI(), c, c.getTmpFile());
        }catch(Exception e){
            fail("Error while running test "+e.getMessage());
        }
    }*/
    
    
    
}
