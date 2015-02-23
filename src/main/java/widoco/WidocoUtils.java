/*
 * Copyright 2012-2013 Ontology Engineering Group, Universidad Politécnica de Madrid, Spain
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

import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.util.FileManager;
import java.io.InputStream;

/**
 * Some useful methods reused across different classes
 * @author Daniel Garijo
 */
public class WidocoUtils {
    public static OntModel loadModel(Configuration c){
        OntModel model = ModelFactory.createOntologyModel();//ModelFactory.createDefaultModel();
        if(c.isFromFile()){
            readModel(model, c.getOntologyPath(), null);
        }else{
            readModel(model, null, c.getOntologyURI());
        }
        return model;
    }
    private static void readModel(OntModel model,String ontoPath, String ontoURL){
        if(ontoPath!=null){
            InputStream in = null;
            try{
                in = FileManager.get().open(ontoPath);
                if (in == null) {
                    System.err.println("Error: Ontology file not found");
                    return;
                }
                model.read(in, null, "RDF/XML");
            }catch(Exception e){
                System.err.println("Could not load the ontology in rdf/xml. Attempting to read it in turtle...");
                try{
                    if(in!=null){
                        in.close();
                    }
                    in = FileManager.get().open(ontoPath);
                    model.read(in, null, "TURTLE");
                }catch(Exception e1){
                    System.err.println("Could not load ontology in turtle.");
                }
            }
        }else{
            try{
                model.read(ontoURL, null, "RDF/XML");
            }catch(Exception e){
                model.read(ontoURL, null, "TURTLE");
            }
        }
    }
}
