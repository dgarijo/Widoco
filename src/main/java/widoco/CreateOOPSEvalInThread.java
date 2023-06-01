/*
 * Copyright 2012-2013 Ontology Engineering Group, Universidad Politecnica de Madrid, Spain
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
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import oops.OOPSevaluation;
import widoco.gui.GuiController;

/**
 *
 * @author Daniel Garijo
 */
public class CreateOOPSEvalInThread implements Runnable {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	private final Configuration c;
	private final GuiController pointerToMain;
	private final boolean showGui; // flag to know whether to show the gui or not

	public CreateOOPSEvalInThread(Configuration c, GuiController g, boolean showGUi) {
		this.c = c;
		this.pointerToMain = g;
		this.showGui = showGUi;
	}

	public void run() {

		// new folder in tmp, called Evaluation
		if (showGui) {
			this.pointerToMain.switchState("sendingRequest");
		}
		logger.info("Sending request to OOPS server...");
		try {
			// do POST petition with evaluation.
			String evaluation;
			OOPSevaluation eval;

			String ontologyXMLPath = c.getDocumentationURI();
			if (!c.getMainOntology().isHashOntology()) {
				ontologyXMLPath += File.separator + "doc";
			}
			ontologyXMLPath += File.separator + "ontology.owl";

			// read file
			String content = null;
			BufferedReader br = new BufferedReader(new FileReader(ontologyXMLPath));
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
			if (content != null && !content.equals("")) {
                            String pathOut = c.getDocumentationURI();
                            if (!c.getMainOntology().isHashOntology()) {
                                    pathOut += File.separator + "doc";
                            }
                            File evalFolder = new File(pathOut + File.separator + "OOPSevaluation");
                            // for the css etc.
                            File evalResourcesFolder = new File(evalFolder.getAbsolutePath() + File.separator + "evaluation");
                            if (!evalFolder.exists())
                                    evalFolder.mkdir();
                            evalResourcesFolder.mkdir();
                            WidocoUtils.unZipIt(Constants.OOPS_RESOURCES, evalResourcesFolder.getAbsolutePath());
                            //eval = new OOPSevaluation("", content);
                            eval = new OOPSevaluation(content);
                            evaluation = eval.printEvaluation();
                            // SAVE File
                            if (showGui) {
                                    this.pointerToMain.switchState("savingResponse");
                            }
                            logger.info("Saving response...");
                            CreateResources.saveDocument(evalFolder.getAbsolutePath() + File.separator + "oopsEval.html",
                                            Constants.getEvaluationText(evaluation, c), c);
                            //edit html file with the right pointer to the evaluation. For all languages
                            for (String lang: c.getLanguagesToGenerateDoc()){    
                                Path path = Paths.get(pathOut+File.separator+"index-"+lang+".html");
                                Charset charset = StandardCharsets.UTF_8;
                                String htmlContent = new String(Files.readAllBytes(path), charset);
                                content = htmlContent.replace("<!-- <dt>Evaluation:</dt><dd><a href=\"OOPSevaluation/oopsEval.html#\" target=\"_blank\"><img src=\"https://img.shields.io/badge/Evaluate_with-OOPS! (OntOlogy Pitfall Scanner!)-blue.svg\" alt=\"Evaluate with OOPS!\" /></a></dd> -->",
                                        "<dt>Evaluation:</dt><dd><a href=\"OOPSevaluation/oopsEval.html#\" target=\"_blank\"><img src=\"https://img.shields.io/badge/Evaluate_with-OOPS! (OntOlogy Pitfall Scanner!)-blue.svg\" alt=\"Evaluate with OOPS!\" /></a></dd>");
                                Files.write(path, content.getBytes(charset));
                            }
                            if (showGui) {
                                    pointerToMain.openBrowser(
                                                    new File(evalFolder.getAbsolutePath() + File.separator + "oopsEval.html").toURI());
                            }
			} else {
				throw new Exception("OOPS server did not return an evaluation report");
			}
		} catch (Exception e) {
			logger.error("Error while saving OOPS evaluation: " + e.getMessage());
			if (showGui) {
				this.pointerToMain.switchState("error");
			}
		}
		// go to the next step in the interface
		if (showGui) {
			this.pointerToMain.switchState("finishedEvaluation");
		}
		logger.info("Done");
	}

}
