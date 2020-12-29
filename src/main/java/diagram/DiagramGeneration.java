package diagram;

import de.uni_stuttgart.vis.vowl.owl2vowl.Owl2Vowl;
import java.io.File;

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
			// extract resource to target folder
			Owl2Vowl o = new Owl2Vowl(c.getMainOntology().getOWLAPIModel());
			o.writeToFile(new File(outFolder + File.separator + "webvowl" + File.separator + "data" + File.separator
					+ "ontology.json"));
		} catch (Exception e) {
			logger.error("FAILED TO LOAD " + e.getMessage());
		}
	}
}
