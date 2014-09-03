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

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import javax.swing.JOptionPane;
import lode.LODEGeneration;
import widoco.entities.Agent;
import widoco.entities.License;
import widoco.entities.Ontology;

/**
 * Class that given a path, it creates all the associated resources needed to
 * view the documentation. Also, it builds the structure of the folder
 * @author Daniel Garijo
 */
public class CreateResources {
    
    //to do: analyze if this is the right name for the class. Maybe "generate" is better
    public static void generateDocumentation(String folderOut, Configuration c, boolean fromURI, File lodeResources){
        try{
            //invoke LODE
            String lodeContent;
            if(fromURI) {
                lodeContent = LODEGeneration.getLODEhtmlFromURL(c.getOntologyPath(),c.isUseOwlAPI(),c.isUseImported(), false, c.isUseReasoner(), c.getLanguage(), lodeResources);
            }else{
                lodeContent = LODEGeneration.getLODEhtmlFromFile(c.getOntologyPath(),c.getOntologyURI(),c.isUseOwlAPI(),c.isUseImported(), false, c.isUseReasoner(), c.getLanguage(), lodeResources);
            }
            LODEParser lode = new LODEParser(lodeContent,c);
            //create a folder with all the appropriate substructure on the selected folder.
            createFolderStructure(folderOut,c.isIncludeDiagram(),c.isPublishProvenance());
            //we create the resources, in case the user wants to add them later.
            //abstract section and file
            createAbstractSection(folderOut+File.separator+"sections");
            //introduction section and file
            createIntroductionSection(folderOut+File.separator+"sections",lode.getNamespaceDeclarations(),c);
            //overview section and file
            createOverviewSection(folderOut+File.separator+"sections",c, lode.getClassList(),lode.getPropertyList(),lode.getDataPropList());
            //description section and file
            createDescriptionSection(folderOut+File.separator+"sections",c);
            //cross reference section and  file
            createCrossReferenceSection(folderOut+File.separator+"sections",lode, c);
            //references section and file
            createReferencesSection(folderOut+File.separator+"sections");
                
            //create the image (if selected)

            if(c.isPublishProvenance()){
                createProvenancePage(folderOut+File.separator+"provenance", c);
            }
            
            //create the main page (aggregation of the different sections)
            createIndexDocument(folderOut,c);
        }catch(IOException e){
            System.err.println("Error while creating the documentation: "+e.getMessage());    
        }
    }
    
    /**
     * Provenance page
     */
    private static void createProvenancePage(String path, Configuration c){
        saveDocument(path+File.separator+"provenance.html", TextConstants.getProvenanceHtml(c));
        saveDocument(path+File.separator+"provenance.ttl", TextConstants.getProvenanceRDF(c));
    }
    
    /**
     * Sections of the document. Each section will be a separate html file
     */
    private static void createAbstractSection(String path){
        saveDocument(path+File.separator+"abstract.html", TextConstants.abstractSection);
    }
    
    private static void createIntroductionSection(String path, HashMap<String,String> nsDecl, Configuration c){
        String introSectionText = TextConstants.introductionSection;
        if(nsDecl!=null && !nsDecl.isEmpty()){
            introSectionText += TextConstants.getNameSpaceDeclaration(nsDecl);
            //small fix: use prefix selected by user.
            if(c.getMainOntology().getNamespacePrefix()!=null && !"".equals(c.getMainOntology().getNamespacePrefix()))
                introSectionText = introSectionText.replace("default namespace", c.getMainOntology().getNamespacePrefix());
        }
        //introSection += TextConstants.getNamespaceDeclarations(c, lodeInput);
        saveDocument(path+File.separator+"introduction.html", introSectionText);
    }
    
    //the lists passed onto this method are the fixed lists
    private static void createOverviewSection(String path, Configuration c, String classesList, String propList, String dataPropList){
        String overViewSection = TextConstants.getOverviewSection(c);
        if(!"".equals(classesList) && classesList!=null){
            overViewSection+=("<h4>Classes</h4>\n");
            overViewSection+=(classesList);
        }
        if(!"".equals(propList) && propList!=null){
            overViewSection+=("<h4>Properties</h4>");
            overViewSection+=(propList);
        }
        if(!"".equals(dataPropList) && dataPropList!=null){
            overViewSection+=("<h4>Data Properties</h4>");
            overViewSection+=(dataPropList);
        }
        saveDocument(path+File.separator+"overview.html", overViewSection);
    }
    
    private static void createDescriptionSection(String path, Configuration c){
        saveDocument(path+File.separator+"description.html",TextConstants.getDescriptionSection(c) );
    }
    
    private static void createCrossReferenceSection(String path,LODEParser lodeParser, Configuration c){
        String crossRef = TextConstants.getCrossReferenceSection(c);
        String classesList = lodeParser.getClassList(),propList = lodeParser.getPropertyList(), dataPropList = lodeParser.getDataPropList();
        if(classesList!=null && !"".equals(classesList)){
            crossRef += lodeParser.getClasses();
        }
        if(propList!=null && !"".equals(propList)){
            crossRef += lodeParser.getProperties();
        }
        if(dataPropList!=null && !"".equals(dataPropList)){
            crossRef += lodeParser.getDataProp();
        }
        saveDocument(path+File.separator+"crossref.html", crossRef);
    }
    
    private static void createReferencesSection(String path){
        saveDocument(path+File.separator+"references.html", TextConstants.referencesSection);
    }
    
    /**
     * Method for creating the index section on the url provided. The index will
     * include the pointers to all of the other sections.
     */
    private static void createIndexDocument(String path, Configuration c){
        //the boolean valuas come from the configuration.
        String textToWrite = TextConstants.getIndexDocument("resources",c);
        saveDocument(path+File.separator+"index.html", textToWrite);
    }
    
    //This method should be separated in another utils file.
    private static void saveDocument(String path, String textToWrite){
        File f = new File(path);
        Writer out = null;
        try{
            if(f.exists()){
                //here I should warn that the file is going to overwrite something
                JOptionPane.showMessageDialog(null, "You have overwritten the previous file. This message should be better prepared.");
            }
            else{f.createNewFile();}
            //write the file.
//            PrintWriter out = new PrintWriter(f);
//            out.write(textToWrite);
//            out.close();
            out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(f), "UTF-8"));
            out.write(textToWrite);
            out.close();
        }catch(IOException e){
            System.err.println("Error while creating the file "+e.getMessage()+"\n"+f.getAbsolutePath());
        }        
        
    }
    
    private static void createFolderStructure(String s, boolean includeDiagram, boolean includeProv){
        try{
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
            if(includeProv){
                provenance.mkdir();
                //do all provenance related stuff here
            }
            resources.mkdir();
            //copy jquery
            copyResource("/lode/jquery.js",new File(resources.getAbsolutePath()+File.separator+"jquery.js"));
            //copy css
            copyResource("/lode/primer.css", new File(resources.getAbsolutePath()+File.separator+"primer.css"));
            copyResource("/lode/rec.css", new File(resources.getAbsolutePath()+File.separator+"rec.css"));
            copyResource("/lode/extra.css", new File(resources.getAbsolutePath()+File.separator+"extra.css"));
            copyResource("/lode/owl.css", new File(resources.getAbsolutePath()+File.separator+"owl.css"));
        }catch(IOException e){
            System.err.println("Error while creating the resources "+e.getMessage());
        }
    }

    
    public static void copyResourceFolder(String[] resources, String savePath) throws IOException{
        for (String resource : resources) {
            String aux = resource.substring(resource.lastIndexOf("/") + 1, resource.length());
            File b = new File(savePath+File.separator+aux);
            b.createNewFile();
            copyResource(resource, b);
        }
    }
    
    /**
     * Method used to copy all the related files: styles, images, etc.
     * @param source
     * @param dest
     * @throws IOException 
     */
    private static void copyResource(String resourceName, File dest) throws IOException {
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
        catch(Exception e){
            System.err.println("Exception while copying the resource"+resourceName+". "+e.getMessage());
        }
        finally {
            if(is!=null)is.close();
            if(os!=null)os.close();
        }
    }
//    public static void main(String[] args){
//        //these methods have to be private!!
////        createFolderStructure("C:\\Users\\Monen\\Desktop\\myDoc", false, false);
//        Configuration c = new Configuration();
////        c.setIncludeOverview(false);
////        c.setIncludeCrossReferenceSection(false);
//        c.setMainOntology(new Ontology("The Wf-Motif Ontology", "Wf-motif", "http://purl.org/net/wf-motifs#"));//<-cuidado con el hash y el slash del final...
//        c.setTitle("The Wf-Motif Ontology"); //redindant??
//        c.setRevision("5.0");
//        c.setReleaseDate("1-1-2011");
//        c.setThisVersion("thisversion.org");
//        c.setPreviousVersion("lastVersion.link");
//        c.setOntologyURI("http://purl.org/net/example#");//check why do I need ont path and ont uri... and ontology namespace.
//        //c.setOntologyPath("http://purl.org/net/wf-motifs#");
//        //local copy test
//        c.setOntologyPath("C:\\Users\\Dani\\Desktop\\RO-opt.owl");
//        Agent a = new Agent();
//        a.setName("Dani");a.setURL("http://dani.org");a.setInstitutionName("OEG Corp");
//        Agent a2 = new Agent("A", "http://bananen.org", "monen group", "hdhw");
//        ArrayList<Agent> aux = new ArrayList<Agent>();
//        aux.add(a);aux.add(a2);        
//        c.setCreators(aux);
//        c.setContributors(aux);
//        Ontology test = new Ontology("a", "b", "cbc");
//        ArrayList<Ontology> t = new ArrayList<Ontology>();
//        t.add(test);
//        c.setImportedOntolgies(t);
//        License l = new License("http://licenseUri", "LicenseName", "http://i.creativecommons.org/l/by-nc-sa/2.0/88x31.png");
//        c.setLicense(l);
////        generateDocumentation("C:\\Users\\Monen\\Desktop\\myDoc", c);
//        generateDocumentation("C:\\Users\\Dani\\Desktop\\myDoc", c, false);
//    }
}
