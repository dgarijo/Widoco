package diagram;

import de.uni_stuttgart.vis.vowl.owl2vowl.Owl2Vowl;
import java.io.File;
import widoco.Configuration;

/**
 *
 * @author dgarijo
 */
public class DiagramGeneration {
    public static void generateOntologyDiagram(String outFolder, Configuration c){
        try {
            //extract resource to target folder
            Owl2Vowl o = new Owl2Vowl(c.getMainOntology().getOWLAPIModel()); //TO DO: Use this function instead of reading the ontology again
            o.writeToFile(new File(outFolder+File.separator+"webvowl"+File.separator+"data"+File.separator+"ontology.json"));
        } catch (Exception e) {
            System.err.println("FAILED TO LOAD " + e.getMessage());
        }
    }
    
//    public static void main(String[] args){
//        File webvowl = new File("mydoc"+File.separator+"webvowl");
//        boolean t = webvowl.mkdirs();
//        WidocoUtils.unZipIt(Constants.WEBVOWL_RESOURCES, webvowl.getAbsolutePath());
//    }
}
