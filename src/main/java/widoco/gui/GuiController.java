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
    
    public void reloadConfiguration(String path){
        this.config.reloadPropertyFile(path);
    }
    
    
    public void generateSkeleton() {
        CreateResources.generateSkeleton(this.config.getDocumentationURI(), config);
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
                    this.generateSkeleton();
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
                state = State.metadata;
                if(input.equals("finishedLoading")){
                    ((GuiStep2)gui).refreshPropertyTable();
                    ((GuiStep2)gui).stopLoadingAnimation();
                }else if(input.equals("error")){
                    JOptionPane.showMessageDialog(gui, "Error while loading the ontology\n Please check the URI");
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
