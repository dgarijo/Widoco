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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import lode.LODEGeneration;

/**
 * Class that given a path, it creates all the associated resources needed to
 * view the documentation. Also, it builds the structure of the folder
 * @author Daniel Garijo
 */
public class CreateResources {
    
    //to do: analyze if this is the right name for the class. Maybe "generate" is better
    public static void generateDocumentation(String folder, Configuration c){
        try{
            //create a folder with all the appropriate substructure on the selected folder.
            createFolderStructure(c.getDocumentationURI(),c.isIncludeDiagram(),c.isPublishProvenance());
            //invoke LODE
            String lodeContent = LODEGeneration.getLODEhtml(c.getOntologyPath(),c.isUseOwlAPI(),c.isUseImported(), false, c.isUseReasoner(), c.getLanguage());
            //TO DO, hay que hacer muchos ajustes y hay que llamar a la clase template generator simplificada.
            //copiar aqui los metodos que se usan para extraer clases, propiedades y props de datos.
            //deberia hacer metodo para hacer cross reference section (que es LODE) arreglando los ids.
            //create all the sections. If a section has to be loaded from somewhere, then do it and copy it.

            //create the main page (aggregation of the different sections)

            //create the image (if selected)

            //create provenance
        }catch(IOException e){
            System.err.println("Error while creating the documentation: "+e.getMessage());    
        }
    }
    
    /**
     * Sections of the document. Each section will be a separate html file
     */
    private static void createAbstractSection(){
        
    }
    
    private static void createIntroductionSection(){
        
    }
    
    private static void createOverviewSection(){
        
    }
    
    private static void createDescriptionSection(){
        
    }
    
    private static void createCrossReferenceSection(){
        
    }
    
    private static void createReferencesSection(){
        
    }
    
    private static void createFolderStructure(String s, boolean includeDiagram, boolean includeProv){
        File f = new File(s);
        File sections = new File(s+File.separator+"sections");
        File img = new File(s+File.separator+"img");
        File provenance = new File(s+File.separator+"provenance");
        File resources = new File(s+File.separator+"resources");
        if(!f.exists()){
            f.mkdir();
        }else{
            if(f.isDirectory()){
                System.err.println("The selected file is not a directory.");
                //throw appropriate exceptions here
            }            
        }
        sections.mkdir();
        if(includeDiagram)img.mkdir();
        if(includeProv)provenance.mkdir();
        resources.mkdir();
    }

    
    private void copyResourceFolder(String[] resources, String savePath) throws IOException{
        for(int i=0; i<resources.length;i++){
            String aux = resources[i].substring(resources[i].lastIndexOf("/")+1,resources[i].length());
            File b = new File(savePath+File.separator+aux);
            b.createNewFile();                
            copyResource(resources[i], b);
        }
    }
    
    /**
     * Method used to copy all the RO related files: styles, images, etc.
     * @param source
     * @param dest
     * @throws IOException 
     */
    private void copyResource(String resourceName, File dest) throws IOException {
        InputStream is = null;
        OutputStream os = null;
        try {
            is = CreateResources.class.getResourceAsStream(resourceName);//new FileInputStream(source);
            os = new FileOutputStream(dest);
            byte[] buffer = new byte[1024];
            int length;
            while ((length = is.read(buffer)) > 0) {
                os.write(buffer, 0, length);
            }
        }
        finally {
            is.close();
            os.close();
        }
    }
//    public static void main(String[] args){
//        createFolderStructure("C:\\Users\\Dani\\Desktop\\myDoc");
//    }
}
