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
    
    public LoadOntologyPropertiesInThread(Configuration c, GuiController g){
        this.c = c;
        this.pointerToMain = g;
        
    }

    public void run() {
        //once it is loaded, load the properties in the config
        c.loadPropertiesFromOntology(WidocoUtils.loadModel(c));
        //notify the main thread to refresh the properties table.
        pointerToMain.switchState("finishedLoading");
    }
    
    

}
