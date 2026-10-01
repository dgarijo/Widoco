package diagram;

import it.gov.innovazione.owl2vowl.Owl2Vowl;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import widoco.Configuration;

/**
 *
 * @author dgarijo
 */
public class DiagramGeneration {

	private final static Logger logger = LoggerFactory.getLogger(DiagramGeneration.class);

	public static void generateOntologyDiagram(String outFolder, Configuration c) {
		try {
			Owl2Vowl o = new Owl2Vowl(c.getMainOntology().getOWLAPIModel());
			Path output = Path.of(outFolder, "webvowl", "data", "ontology.json");
			Files.createDirectories(output.getParent());
			Files.writeString(output, o.getJsonAsString(), StandardCharsets.UTF_8);
		} catch (Exception e) {
			logger.error("Failed to generate the ontology diagram", e);
		}
	}
}
