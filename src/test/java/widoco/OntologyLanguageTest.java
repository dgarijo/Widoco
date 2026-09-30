/*
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
 * Tests that multilingual annotations (owl:versionInfo and contributor names)
 * are read in the requested language, falling back to English when that
 * language does not exist in the ontology (issue #828).
 * It only checks the metadata loaded into the Configuration, no HTML is generated.
 */
package widoco;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.util.regex.Pattern;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class OntologyLanguageTest {

    // Ontology with annotations in el, en, es, fr, it, no, pt, ro (no nl, no de)
    private static final String ONTOLOGY = "OSO_1_1_0.owl";
    private static final Pattern GREEK = Pattern.compile("\\p{IsGreek}");

    private Configuration c;

    @Before
    public void setUp() throws Exception {
        c = new Configuration();
        c.setFromFile(true);
        c.setOntologyPath("test" + File.separator + ONTOLOGY);
        WidocoUtils.loadModelToDocument(c);
    }

    /** Loads the metadata as Widoco does once per language of the documentation. */
    private void loadFor(String lang) {
        c.setCurrentLanguage(lang);
        c.loadPropertiesFromOntology(c.getMainOntology().getOWLAPIModel());
    }

    private String revision() {
        return c.getMainOntology().getRevision();
    }

    private String contributor() {
        assertFalse("No contributors were loaded", c.getMainOntology().getContributors().isEmpty());
        return c.getMainOntology().getContributors().get(0).getName();
    }

    @Test
    public void testEnglish() {
        loadFor("en");
        assertTrue(revision().startsWith("1.1"));
        assertFalse("English revision should not contain Greek text", GREEK.matcher(revision()).find());
        assertEquals("EMSO Data Management Service Group", contributor());
    }

    @Test
    public void testFrench() {
        loadFor("en");
        String enRevision = revision();
        String enContributor = contributor();

        // same Configuration reused, as in the documentation generation loop
        loadFor("fr");
        assertNotEquals(enRevision, revision());
        assertFalse("French revision should not contain Greek text", GREEK.matcher(revision()).find());
        assertNotEquals(enContributor, contributor());
        assertTrue(contributor().startsWith("Groupe de service"));
    }

    @Test
    public void testGreekKeepsItsOwnLanguage() {
        loadFor("el");
        assertTrue("Greek revision expected", GREEK.matcher(revision()).find());
        assertTrue("Greek contributor expected", GREEK.matcher(contributor()).find());
    }

    @Test
    public void testMissingLanguageFallsBackToEnglish() {
        loadFor("en");
        String enRevision = revision();
        String enContributor = contributor();

        // German does not exist in the ontology: English is expected, not Greek/Portuguese/etc.
        loadFor("de");
        assertEquals(enRevision, revision());
        assertEquals(enContributor, contributor());
    }

    @After
    public void tearDown() {
        deleteFiles(c.getTmpFile());
    }

    private static void deleteFiles(File folder) {
        String[] entries = folder.list();
        if (entries == null) {
            return;
        }
        for (String s : entries) {
            File currentFile = new File(folder.getPath(), s);
            if (currentFile.isDirectory()) {
                deleteFiles(currentFile);
            } else {
                currentFile.delete();
            }
        }
        folder.delete();
    }
}