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
import java.util.Date;
import java.util.Properties;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.UIManager;
import org.apache.commons.io.FileUtils;
import widoco.Configuration;
import widoco.CreateDocInThread;
import widoco.CreateOOPSEvalInThread;
import widoco.CreateResources;
import widoco.LoadOntologyInThread;
import widoco.Constants;
import widoco.WidocoUtils;



/**
 *
 * @author Daniel Garijo
 */
public final class GuiController {

    
    public enum State{initial, metadata, loadingConfig, sections, loading, generated, evaluating, exit};
    private State state;
    private JFrame gui;
    private Configuration config;
    

    public GuiController() {
        this.state = State.initial;  
        config = new Configuration();
        //read logo
        gui = new GuiStep1(this);
        gui.setVisible(true);
        try { 
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
        }
    }
    
    /**
     * Method for running the application via console.
     * @param args 
     */
    public GuiController(String[] args){
        System.out.println("\n\n--WIzard for DOCumenting Ontologies (WIDOCO).\n https://w3id.org/widoco/\n"); 
        //get the arguments
        String outFolder="myDocumentation"+(new Date().getTime()), ontology="", configOutFile=null;
        boolean  isFromFile=false, oops = false, rewriteAll=false, getOntoMetadata = true, useW3Cstyle = true,
                includeImportedOntologies = false, htAccess = false, webVowl=false, errors = false, licensius = false,
                generateOnlyCrossRef = false, includeNamedIndividuals=true, includeAnnotationProperties = false, 
                displaySerializations = true, displayDirectImportsOnly=false;
        String confPath="";
        String code=null;//for tracking analytics.
        String[] languages = null;
        int i=0;
        while(i< args.length){
            String s = args[i];
            switch (s) {
                case "-confFile":
                    confPath = args[i+1];
                    getOntoMetadata = false;
                    i++;
                    break;
                case "-outFolder":
                    outFolder = args[i+1];
                    i++;
                    break;
                case "-ontFile":
                    ontology = args[i+1];
                    isFromFile = true;
                    i++;
                    break;
                case "-ontURI":
                    ontology = args[i+1];
                    i++;
                    break;
                case "-oops":
                    oops=true;
                    break;
                case "-rewriteAll":
                    rewriteAll = true;
                    break;
                case "-crossRef":
                    generateOnlyCrossRef = true;
                    break;
                case "-getOntologyMetadata":
                    getOntoMetadata = true;
                    break;//left for legacy, but now this is the behavior by default
                case "-saveConfig":
                    configOutFile = args[i+1];
                    i++;
                    break;
                case "-useCustomStyle":
                    useW3Cstyle = false;
                    break;
                case "-includeImportedOntologies":
                    includeImportedOntologies = true;
                    break;
                case "-htaccess":
                    htAccess = true;
                    break;
                case "-lang":
                    languages = args[i+1].replace(" ","").split("-");
                    i++;
                    break;
                case "-analytics":
                    code = args[i+1];
                    i++;
                    break;
                case "-webVowl":
                    webVowl = true;
                    break;
                case "-licensius":
                    licensius = true;
                    break;
                case "-ignoreIndividuals":
                    includeNamedIndividuals=false;
                    break;
                case "-includeAnnotationProperties":
                    includeAnnotationProperties = true;
                    break;
                case "-doNotDisplaySerializations":
                    displaySerializations = false;
                    break;
                case "-displayDirectImportsOnly":
                    displayDirectImportsOnly = true;
                    break;
                default:
                    System.out.println("Command"+s+" not recognized.");
                    System.out.println("Usage: java -jar widoco.jar [-ontFile file] or [-ontURI uri] [-outFolder folderName] [-confFile propertiesFile] [-getOntologyMetadata] [-oops] [-rewriteAll] [-crossRef] [-saveConfig configOutFile] [-lang lang1-lang2] [-includeImportedOntologies] [-htaccess] [-licensius] [-webVowl] [-ignoreIndividuals] [-includeAnnotationProperties] [-analytics analyticsCode]\n");
                    return;
            }
            i++;
        }
        //this creates the tmp files
        config = new Configuration();
        try{
            this.config.reloadPropertyFile(confPath);
        }catch(Exception e){
            System.out.println("Configuration file could not be loaded: "+e.getMessage());
            return;
        }            
        if(generateOnlyCrossRef){
            this.config.setIncludeIndex(false);
            this.config.setIncludeAbstract(false);
            this.config.setIncludeIntroduction(false);
            this.config.setIncludeOverview(true);
            this.config.setIncludeDescription(false);
            this.config.setIncludeCrossReferenceSection(true);
            this.config.setIncludeReferences(false);
            this.config.setCreateHTACCESS(false);
            this.config.setPublishProvenance(false);
        }
        this.config.setFromFile(isFromFile);
        this.config.setDocumentationURI(outFolder);
        this.config.setOntologyPath(ontology);
        this.config.setOverwriteAll(rewriteAll);
        this.config.setUseW3CStyle(useW3Cstyle);
        this.config.setUseImported(includeImportedOntologies);
        this.config.setCreateHTACCESS(htAccess);
        this.config.setCreateWebVowlVisualization(webVowl);
        this.config.setUseLicensius(licensius);
        this.config.setIncludeNamedIndividuals(includeNamedIndividuals);
        this.config.setIncludeAnnotationProperties(includeAnnotationProperties);
        this.config.setDisplaySerializations(displaySerializations);
        this.config.setDisplayDirectImportsOnly(displayDirectImportsOnly);
        if(code!=null){
            this.config.setGoogleAnalyticsCode(code);
        }
        if(languages!=null){
            config.removeLanguageToGenerate("en");//default
            for (String language : languages) {
                this.config.addLanguageToGenerate(language);
            }
        }
        if(!isFromFile)this.config.setOntologyURI(ontology);
        //we load the model locally so we can use it.
        try{
            WidocoUtils.loadModelToDocument(config);
        }catch(Exception e){
            System.err.println("Could not load the ontology");
        }
        if(getOntoMetadata){
            config.loadPropertiesFromOntology(config.getMainOntology().getOWLAPIModel());
        }
        try{
            for (String l : config.getLanguagesToGenerateDoc()) {
                System.out.println("Generating documentation for "+ontology+ " in lang " +l);
                CreateResources.generateDocumentation(outFolder, config, config.getTmpFile());
                config.vocabularySuccessfullyGenerated();
            }
        }catch(Exception e){
            System.err.println("Error while generating the documentation " +e.getMessage());
            errors = true;
        }
        
        if(oops){
            System.out.println("Generating the OOPS evaluation of the ontology...");
            startEvaluation(false);
            //Since it is a user thread it will remain alive even after the main thread ends.
        }
        if(configOutFile!=null){
            try{
                CreateResources.saveConfigFile(configOutFile, config);
            }catch(IOException e){
                System.err.println("Error while saving the configuraiton file: "+e.getMessage());
            }
        }
        //delete temp files
        try{
            FileUtils.deleteDirectory(config.getTmpFile());
        }catch(Exception e){
            System.err.println("could not delete temporal folder: "+ e.getMessage());
        }
        if(errors){
            //error code for notifying that there were errors.
            System.exit(1);
        }else{
            System.out.println("Documentation generated successfully");
        }
    }

    public Configuration getConfig() {
        return config;
    }
    
    public void generateSkeleton() {
        //default language
        String resource = "/widoco/en.properties";
        try{
            Properties languageFile =  new Properties();
            languageFile.load(GuiController.class.getResourceAsStream(resource));
            CreateResources.generateSkeleton(this.config.getDocumentationURI(), config,languageFile);
        }catch(Exception e){
            System.out.println("Error while reading the language file: "+e.getMessage());
        }        
    }
    
    private void startGeneratingDoc() {
        Runnable r = new CreateDocInThread(this.config, this, config.getTmpFile());
        new Thread(r).start();
    }
    
    private void startEvaluation(boolean showGui){
        Runnable r = new CreateOOPSEvalInThread(this.config, this, showGui);
        new Thread(r).start();
    }
    
    private void startLoadingOntology(boolean showGui){
        Runnable r = new LoadOntologyInThread(this.config, this, showGui);
        new Thread(r).start();
    }
    
    //The other method could call directly switch state, but htis way the flow is more clear.
    public void docGenerated(String status){
        this.switchState(status);
    }
    
    private void exit(){
        this.gui.dispose();
        try{
            FileUtils.deleteDirectory(config.getTmpFile());
        }catch(Exception e){
            System.err.println("could not delete temporal folder: "+ e.getMessage());
        }
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
                    this.generateSkeleton();
                    this.gui.dispose();
                    gui = new GuiStep5(this, true);
                    gui.setVisible(true);
                }else
                    if(input.equals("next")){
                        state = State.metadata;
                        this.gui.dispose();
                        gui = new GuiStep2(this);
                        gui.setVisible(true);
                        switchState("loadOntologyProperties");
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
                        this.startLoadingOntology(true);                    
                    }else if(input.equals("next")){//next
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
                }else if(input.equals("error")){
                    state = State.initial;
                    ((GuiStep2)gui).stopLoadingAnimation();
                    JOptionPane.showMessageDialog(gui, "The ontology could not be loaded. Please check the following:\n1) The URI/file is correct and passes a syntax check\n2) All the imported ontologies resolve");
                    state = State.initial;
                    this.gui.dispose();
                    gui = new GuiStep1(this);
                    gui.setVisible(true);
                }
            break;
            case sections:
                if(input.equals("back")){
                    state = State.metadata;
                    this.gui.dispose();
                    gui = new GuiStep2(this);
                    gui.setVisible(true);
                    ((GuiStep2)gui).refreshPropertyTable();
                    ((GuiStep2)gui).stopLoadingAnimation();
                }else if(input.equals("next")){
                    state = State.loading;
                    this.startGeneratingDoc();
                }
                break;
            case loading:
                if(input.equals("error")){
                    JOptionPane.showMessageDialog(gui,config.getError());
                }else{
                    config.vocabularySuccessfullyGenerated();
                    if(config.getCurrentLanguage()!=null){
                        JOptionPane.showMessageDialog(gui, "Documentation successfully generated!\n Now you will be requested to add the metadata for the next language: "+config.getCurrentLanguage());
                        state = State.metadata;
                        this.gui.dispose();
                        gui = new GuiStep2(this);
                        gui.setVisible(true);
                        switchState("loadOntologyProperties");
                        break;
//                        probar si esto itera bien
                    }
                }
                state = State.generated;
                this.gui.dispose();
                gui = new GuiStep5(this,false);
                gui.setVisible(true);
                break;                
            case generated:
                if(input.equals("restart")){
                    //clean properties
                    this.config.initializeConfig();
                    this.gui.dispose();
                    state = State.initial;
                    gui = new GuiStep1(this);
                    gui.setVisible(true);
                }
                if(input.equals("evaluate")){
                    state = State.evaluating;
                    this.startEvaluation(true);
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
    
    public static void main(String[] args){
        GuiController guiController;
        if(args.length>0){
            guiController = new GuiController(args);
        }
        else{
         guiController = new GuiController();
        }
    }
    
    

}
