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

import widoco.gui.GuiController;

/**
 * Class designed to load all properties from an ontology in a separate thread.
 * @author Daniel Garijo
 */
public class LoadOntologyPropertiesInThread implements Runnable{
    private final Configuration c;
    private final GuiController pointerToMain;
    private final boolean showGui;
    
    public LoadOntologyPropertiesInThread(Configuration c, GuiController g, boolean showgui){
        this.c = c;
        this.pointerToMain = g;
        this.showGui = showgui;
    }

    public void run() {
        //once it is loaded, load the properties in the config
        try{
            WidocoUtils.loadModel(c);
            c.loadPropertiesFromOntology(c.getMainOntology().getMainModel());
            if(showGui){
                pointerToMain.switchState("finishedLoading");
            }
            System.out.println("Properties loaded successfully from the ontology");
        }catch(Exception e){
            if(showGui){
                pointerToMain.switchState("error");
            }
            System.out.println("Error while loading properties: "+e.getMessage());
        }
    }
    
    

}
