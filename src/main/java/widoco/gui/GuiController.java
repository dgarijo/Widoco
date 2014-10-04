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

package widoco.gui;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.UIManager;
import widoco.Configuration;
import widoco.CreateDocInThread;
import widoco.CreateOOPSEvalInThread;
import widoco.CreateResources;
import widoco.LoadOntologyPropertiesInThread;
import widoco.TextConstants;
import widoco.entities.Agent;
import widoco.entities.Ontology;



/**
 *
 * @author Daniel Garijo
 */
public class GuiController {

    
    public enum State{initial, metadata, loadingConfig, sections, loading, generated, evaluating, exit};
    private State state;
    private JFrame gui;
    private Configuration config;
    private File tmpFile;

    public GuiController() {
        this.state = State.initial;  
        config = new Configuration();
        //read logo
        gui = new GuiStep1(this);
        gui.setVisible(true);
        try {
            //create a temporal folder with all LODE resources
            tmpFile = new File("tmp"+new Date().getTime());
            tmpFile.mkdir();
            CreateResources.copyResourceFolder(TextConstants.lodeResources, tmpFile.getName());
        } catch (IOException ex) {
            System.err.println("Error while creating the temporal file");
        }
        
        try { 
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            
        }
        
    }

    public Configuration getConfig() {
        return config;
    }
    
    
    
    public HashMap<String,String> getEditableProperties(){
        HashMap<String,String> props = new HashMap<String,String>();
        if(config.getAbstractSection()!=null)props.put(TextConstants.abstractSectionContent, config.getAbstractSection());
        if(config.getTitle()!=null)props.put(TextConstants.ontTitle, config.getTitle());
        if(config.getMainOntology()!=null){
            props.put(TextConstants.ontName, config.getMainOntology().getName());
            props.put(TextConstants.ontPrefix, config.getMainOntology().getNamespacePrefix());
            props.put(TextConstants.ontNamespaceURI, config.getMainOntology().getNamespaceURI());
        }
        if(config.getReleaseDate()!=null)props.put(TextConstants.dateOfRelease, config.getReleaseDate());
        if(config.getThisVersion()!=null)props.put(TextConstants.thisVersionURI, config.getThisVersion());
        if(config.getLatestVersion()!=null)props.put(TextConstants.latestVersionURI, config.getLatestVersion());
        if(config.getPreviousVersion()!=null)props.put(TextConstants.previousVersionURI, config.getPreviousVersion());
        if(config.getRevision()!=null)props.put(TextConstants.ontologyRevision, config.getRevision());
        //authors go here in a loop
        if(config.getCreators()!=null){
            ArrayList<Agent> creators = config.getCreators();
            Iterator<Agent> it = creators.iterator();
            String author="",authorUri="",authorInsti="";
            while(it.hasNext()){
                Agent a = it.next();
                author +=a.getName()+";";
                if(a.getURL()!=null)authorUri+=a.getURL()+";";
                if(a.getInstitutionName()!=null)authorInsti += a.getInstitutionName()+";";
            }
            if(!"".equals(author)) props.put(TextConstants.authors, author.substring(0, author.length()-1));
            if(!"".equals(authorUri)) props.put(TextConstants.authorsURI, authorUri.substring(0,authorUri.length()-1));
            if(!"".equals(authorInsti)) props.put(TextConstants.authorsInstitution, authorInsti.substring(0, authorInsti.length()-1));
        }
        if(config.getContributors()!=null){
            //contributors go here in a loop
            ArrayList<Agent> contributors = config.getContributors();
            Iterator<Agent> itContr = contributors.iterator();
            String contributor="",contributorUri="",contributorInsti="";
            while(itContr.hasNext()){
                Agent a = itContr.next();
                contributor +=a.getName()+";";
                if(a.getURL()!=null)contributorUri+=a.getURL()+";";
                if(a.getInstitutionName()!=null)contributorInsti += a.getInstitutionName()+";";
            }
            if(!"".equals(contributor))props.put(TextConstants.contributors, contributor.substring(0,contributor.length()-1));
            if(!"".equals(contributorUri))props.put(TextConstants.contributorsURI, contributorUri.substring(0,contributorUri.length()-1));
            if(!"".equals(contributorInsti))props.put(TextConstants.contributorsInstitution, contributorInsti.substring(0,contributorInsti.length()-1));
        }
        if(config.getImportedOntolgies()!=null){
            ArrayList<Ontology> imported = config.getImportedOntolgies();
            Iterator<Ontology> itImported = imported.iterator();
            String importedName="",importedUri="";
            while(itImported.hasNext()){
                Ontology a = itImported.next();
                importedName +=a.getName()+";";
                importedUri+=a.getNamespaceURI()+";";
            }
            if(!"".equals(importedName))props.put(TextConstants.importedOntologyNames, importedName.substring(0,importedName.length()-1));
            if(!"".equals(importedUri))props.put(TextConstants.importedOntologyURIs, importedUri.substring(0,importedUri.length()-1));
        }
        
        if(config.getExtendedOntologies()!=null){
            //extended ontos go here in a loop
            ArrayList<Ontology> extended = config.getExtendedOntologies();
            Iterator<Ontology> itExtended = extended.iterator();
            String extendedName="",extendedUri="";
            while(itExtended.hasNext()){
                Ontology a = itExtended.next();
                extendedName +=a.getName()+";";
                extendedUri+=a.getNamespaceURI()+";";
            }
            if(!"".equals(extendedName))props.put(TextConstants.extendedOntologyNames, extendedName.substring(0,extendedName.length()-1));
            if(!"".equals(extendedUri))props.put(TextConstants.extendedOntologyURIs, extendedUri.substring(0,extendedUri.length()-1));
        }
        //license
        if(config.getLicense()!=null){
            props.put(TextConstants.licenseName, config.getLicense().getName());
            props.put(TextConstants.licenseURI, config.getLicense().getUrl());
            if(config.getLicense().getIcon()!=null){
                props.put(TextConstants.licenseIconURL, config.getLicense().getIcon());
            }
        }
        return props;
    }
    
    public void reloadConfiguration(String path){
        this.config.reloadPropertyFile(path);
    }
    
    public void saveEditableProperties(HashMap properties){
        //we don't check wether it exists because the property mght have been deleted.
        config.setAbstractSection((String)properties.get(TextConstants.abstractSectionContent));
        config.setTitle((String)properties.get(TextConstants.ontTitle));
        //mandatory
        if(properties.containsKey(TextConstants.ontName)){
            config.getMainOntology().setName((String)properties.get(TextConstants.ontName));
        }
        if(properties.containsKey(TextConstants.ontPrefix)){
            config.getMainOntology().setNamespacePrefix((String)properties.get(TextConstants.ontPrefix));
        }
        if(properties.containsKey(TextConstants.ontNamespaceURI)){
            config.setOntologyURI((String)properties.get(TextConstants.ontNamespaceURI));
        }
        config.setReleaseDate((String)properties.get(TextConstants.dateOfRelease));
        config.setThisVersion((String)properties.get(TextConstants.thisVersionURI));
        config.setLatestVersion((String)properties.get(TextConstants.latestVersionURI));
        config.setPreviousVersion((String)properties.get(TextConstants.previousVersionURI));
        config.setRevision((String)properties.get(TextConstants.ontologyRevision));
        config.getLicense().setName((String)properties.get(TextConstants.licenseName));
        config.getLicense().setUrl((String)properties.get(TextConstants.licenseURI));        
        config.getLicense().setIcon((String)properties.get(TextConstants.licenseIconURL));  
        
        if(properties.containsKey(TextConstants.authors)){
            String authorValue = (String)properties.get(TextConstants.authors);
            if(!"".equals(authorValue)){
                String[] authors = authorValue.split(";");
                String[] authorURIs = null;
                String[] authorInstis = null;
                ArrayList<Agent> newAuthors = new ArrayList<Agent>();
                if(properties.containsKey(TextConstants.authorsURI)){
                    if(!"".equals(properties.get(TextConstants.authorsURI))){
                        authorURIs = ((String)properties.get(TextConstants.authorsURI)).split(";");
                    }
                }
                if(properties.containsKey(TextConstants.authorsInstitution)){
                    if(!"".equals(properties.get(TextConstants.authorsInstitution))){
                        authorInstis = ((String)properties.get(TextConstants.authorsInstitution)).split(";");
                    }
                }
                for(int i=0; i< authors.length;i++){
                    Agent author = new Agent();
                    author.setName(authors[i]);
                    if (authorURIs!=null && authors.length == authorURIs.length ){
                        author.setURL(authorURIs[i]);
                    }
                    if (authorInstis!=null && authors.length == authorInstis.length ){
                        author.setInstitutionName(authorInstis[i]);
                    }
                    newAuthors.add(author);
                }
                config.setCreators(newAuthors);
            }
        }
        
        if(properties.containsKey(TextConstants.contributors)){
            String contribValue = (String)properties.get(TextConstants.contributors);
            if(!"".equals(contribValue)){
                String[] contrib = contribValue.split(";");
                String[] contribURI = null;
                String[] contribInsti = null;
                ArrayList<Agent> newContrib = new ArrayList<Agent>();
                if(properties.containsKey(TextConstants.contributorsURI)){
                    if(!"".equals(properties.get(TextConstants.contributorsURI))){
                        contribURI = ((String)properties.get(TextConstants.contributorsURI)).split(";");
                    }
                }
                if(properties.containsKey(TextConstants.contributorsInstitution)){
                    if(!"".equals(properties.get(TextConstants.contributorsInstitution))){
                        contribInsti = ((String)properties.get(TextConstants.contributorsInstitution)).split(";");
                    }
                }
                
                for(int i=0; i< contrib.length;i++){
                    Agent contributor = new Agent();
                    contributor.setName(contrib[i]);
                    if (contribURI!=null && contrib.length == contribURI.length ){
                        contributor.setURL(contribURI[i]);
                    }
                    if (contribInsti!=null && contrib.length == contribInsti.length ){
                        contributor.setInstitutionName(contribInsti[i]);
                    }
                    newContrib.add(contributor);
                }
                config.setContributors(newContrib);
            }
        }
        
        if(properties.containsKey(TextConstants.extendedOntologyNames)){
            String extended = (String)properties.get(TextConstants.extendedOntologyNames);
            if(!"".equals(extended)){
                String[] extendedOntoNames = extended.split(";");
                String[] extendedURIs = null;
                ArrayList<Ontology> newExtended = new ArrayList<Ontology>();
                if(properties.containsKey(TextConstants.extendedOntologyURIs)){
                    if(!"".equals(properties.get(TextConstants.extendedOntologyURIs))){
                        extendedURIs = ((String)properties.get(TextConstants.extendedOntologyURIs)).split(";");
                    }
                }
                for(int i=0; i< extendedOntoNames.length;i++){
                    Ontology o = new Ontology();
                    o.setName(extendedOntoNames[i]);
                    if(extendedURIs!=null && extendedURIs.length == extendedOntoNames.length){
                        o.setNamespaceURI(extendedURIs[i]);
                    }
                    newExtended.add(o);
                }
                config.setExtendedOntologies(newExtended);
            }
        }
        
        if(properties.containsKey(TextConstants.importedOntologyNames)){
        String imported = (String)properties.get(TextConstants.importedOntologyNames);
            if(!"".equals(imported)){
                String[] importedOntoNames = imported.split(";");
                String[] importedURIs = null;
                ArrayList<Ontology> newExtended = new ArrayList<Ontology>();
                if(properties.containsKey(TextConstants.importedOntologyURIs)){
                    if(!"".equals(properties.get(TextConstants.importedOntologyURIs))){
                        importedURIs = ((String)properties.get(TextConstants.importedOntologyURIs)).split(";");
                    }
                }
                for(int i=0; i< importedOntoNames.length;i++){
                    Ontology o = new Ontology();
                    o.setName(importedOntoNames[i]);
                    if(importedURIs!=null && importedURIs.length == importedOntoNames.length){
                        o.setNamespaceURI(importedURIs[i]);
                    }
                    newExtended.add(o);
                }
                config.setImportedOntologies(newExtended);
            }    
        }
    }
    
    public void generateSkeleton() {
        //if state is initial, then it is a skeleton
        //call a method in createResources called createSkeleton, and done.
    }
    
    private void startGeneratingDoc() {
        Runnable r = new CreateDocInThread(this.config, this, this.tmpFile);
        new Thread(r).start();
    }
    
    private void startEvaluation(){
        Runnable r = new CreateOOPSEvalInThread(this.config, this);
        new Thread(r).start();
    }
    
    private void startLoadingPropertiesFromOntology(){
        Runnable r = new LoadOntologyPropertiesInThread(this.config, this);
        new Thread(r).start();
    }
    
    //The other method could call directly switch state, but htis way the flow is more clear.
    public void docGenerated(String status){
        this.switchState(status);
    }
    
    private void exit(){
        this.gui.dispose();
        //delete tmp folder here!
        deleteAllTempFiles(tmpFile);
    }
    
    private void deleteAllTempFiles(File folder){
        String[]entries = folder.list();
        for(String s: entries){
            File currentFile = new File(folder.getPath(),s);
            if(currentFile.isDirectory()){
                deleteAllTempFiles(currentFile);
            }
            else{
                currentFile.delete();
            }
        }
        folder.delete();
    }
    
    public void switchState(String input){
        if(input.equals("cancel")){
            state = State.exit;
            exit();
        }
        switch(this.state){
            case initial:
                if(input.equals("skeleton")){
                    state = State.generated;
                    this.generateSkeleton();//TO DO
                    this.gui.dispose();
                    gui = new GuiStep5(this, true);
                    gui.setVisible(true);
                }
                else {//next
                    state = State.metadata;
                    this.gui.dispose();
                    gui = new GuiStep2(this);
                    gui.setVisible(true);
                }
                break;
            case metadata:
                if(input.equals("back")){
                    state = State.initial;
                    this.gui.dispose();
                    gui = new GuiStep1(this);
                    gui.setVisible(true);
                }else{
                if(input.equals("loadOntologyProperties")){    
                    state = State.loadingConfig;
                    this.startLoadingPropertiesFromOntology();                    
                }else{//next
                    state = State.sections;
                    this.gui.dispose();
                    gui = new GuiStep3(this);
                    gui.setVisible(true);
                }
                }
                break;
            case loadingConfig:
                if(input.equals("finishedLoading")){
                    state = State.metadata;
                    ((GuiStep2)gui).refreshPropertyTable();
                    ((GuiStep2)gui).stopLoadingAnimation();
                }
            break;
            case sections:
                if(input.equals("back")){
                    state = State.metadata;
                    this.gui.dispose();
                    gui = new GuiStep2(this);
                    gui.setVisible(true);
                }else{//next
                    state = State.loading;
                    this.startGeneratingDoc();
                }
                break;
              //i decided to remove this step, as it is not needed.  
//            case configLODE:
//                if(input.equals("back")){
//                    state = State.sections;
//                    this.gui.dispose();
//                    gui = new GuiStep3(this);
//                    gui.setVisible(true);
//                }else{//next
//                    state = State.loading;
//                    this.startGeneratingDoc();
//                }
//                break;
            case loading:
                if(input.equals("error")){
                    JOptionPane.showMessageDialog(gui,"error while generating the documentation! refine this error.");
                }
                state = State.generated;
                this.gui.dispose();
                gui = new GuiStep5(this,false);
                gui.setVisible(true);
                break;                
            case generated:
                if(input.equals("restart")){
                    //clean properties
                    this.config = new Configuration();
                    this.gui.dispose();
                    state = State.initial;
                    gui = new GuiStep1(this);
                    gui.setVisible(true);
                }
                if(input.equals("evaluate")){
                    state = State.evaluating;
                    this.startEvaluation();
                }
                break;
            case evaluating:
                if(input.equals("sendingRequest")){
                    ((GuiStep5)gui).updateMessage("Sending request to OOPS...");
                }
                if(input.equals("savingResponse")){
                    ((GuiStep5)gui).updateMessage("Saving response...");
                }
                if(input.equals("error")){
                    JOptionPane.showMessageDialog(gui, "Error while evaluating the ontology with OOPS. Internet connection is required.");
                }
                if(input.equals("finishedEvaluation")){
                    state = State.generated;
                    //make the gif stop. Nothing else necessary.
                    ((GuiStep5)gui).stopLoadingSign();
                }
            case exit: //exit is an abstract state. Nothing should happen here
                break;
        }
    }
    
    public void openBrowser (URI uri){
        if(Desktop.isDesktopSupported())
        {
            try {
                Desktop.getDesktop().browse(uri);
            } catch (IOException ex) {
                System.err.println("Could not open browser: "+ex.getMessage());
            }
        }
    }
    
//    public void generateDoc(boolean considerImportedOntologies, boolean considerImportedClosure, boolean useReasoner){
//        //this method will invoke the LODE transformation to get the html and then get the resultant html for our needs.
//    }
    
    public static void main(String[] args){
        new GuiController();
    }
    
    

}
