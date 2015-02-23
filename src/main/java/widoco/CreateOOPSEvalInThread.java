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

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import oops.OOPSevaluation;
import widoco.gui.GuiController;

/**
 *
 * @author Daniel Garijo
 */
public class CreateOOPSEvalInThread implements Runnable{
    private final Configuration c;
    private final GuiController pointerToMain;
    
    public CreateOOPSEvalInThread(Configuration c, GuiController g){
        this.c = c;
        this.pointerToMain = g;
    }

    public void run() {
        //new folder in tmp, called Evaluation
        this.pointerToMain.switchState("sendingRequest");
        File evalFolder = new File(c.getDocumentationURI()+File.separator+"OOPSevaluation");
        File evalResourcesFolder = new File(evalFolder.getAbsolutePath()+File.separator+"evaluation");//for the css etc.
        try{
            if(!evalFolder.exists())evalFolder.mkdir();
            evalResourcesFolder.mkdir();
            CreateResources.copyResourceFolder(TextConstants.oopsResources, evalResourcesFolder.getAbsolutePath());
            //do POST petition with evaluation.
            String evaluation;
            OOPSevaluation eval;
            if(c.isFromFile()){
                //read file
                String content;
                BufferedReader br = new BufferedReader(new FileReader(c.getOntologyPath()));
                try {
                    StringBuilder sb = new StringBuilder();
                    String line = br.readLine();

                    while (line != null) {
                        sb.append(line);
                        sb.append(System.lineSeparator());
                        line = br.readLine();
                    }
                     content = sb.toString();
                } finally {
                    br.close();
                }
                eval = new OOPSevaluation("",content);
            }else{
                eval = new OOPSevaluation(c.getOntologyURI(), "");
            }            
            evaluation = eval.printEvaluation();
            //SAVE File
            this.pointerToMain.switchState("savingResponse");
            CreateResources.saveDocument(evalFolder.getAbsolutePath()+File.separator+"oopsEval.html", TextConstants.getEvaluationText(evaluation, c),c);
            pointerToMain.openBrowser(new File(evalFolder.getAbsolutePath()+File.separator+"oopsEval.html").toURI());
        }catch(Exception e){
            System.err.println("Error while saving OOPS evaluation: "+e.getMessage());
            this.pointerToMain.switchState("error");
        }
        //go to the next step in the interface
        this.pointerToMain.switchState("finishedEvaluation");
    }

}
