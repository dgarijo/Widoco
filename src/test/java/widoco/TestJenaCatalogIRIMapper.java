package widoco;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.semanticweb.owlapi.model.IRI;

import static org.junit.Assert.*;

/**
 * Test the class JenaCatalogIRIMapper
 */
public class TestJenaCatalogIRIMapper {

    final static Logger logger = LoggerFactory.getLogger(TestJenaCatalogIRIMapper.class);

    final static CatalogIRIMapper iriMapper = new CatalogIRIMapper() ;

    @org.junit.Test
    public void testIsOntPolicyFileLoaded() {
        assertTrue("Test whether the JenaCatalogIRIMapper can load the test ont-policy.rdf file", iriMapper.isLoaded());
    }

    @org.junit.Test
    public void testItHasPrintableMap() {
        // TODO: really check if something was printed on log
        iriMapper.printMap();
        assert(true);
    }

    @org.junit.Test
    public void testDoesOwlUrlMapCorrectly() {
        assertEquals(
            "Test owl url",
            IRI.create("file:///test/lib/ontologies/w3c/owl.owl"),
            iriMapper.getDocumentIRI(IRI.create("http://www.w3.org/2002/07/owl"))
        );
    }

    @org.junit.Test
    public void testDoesRdfSchemaUrlMapCorrectly() {
        assertEquals(
            "Test owl url",
            IRI.create("file:///test/lib/ontologies/w3c/rdf-schema.rdf"),
            iriMapper.getDocumentIRI(IRI.create("http://www.w3.org/2000/01/rdf-schema"))
        );
    }

}
