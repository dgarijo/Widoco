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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import widoco.gui.GuiController;

/**
 * Class designed to load all properties from an ontology in a separate thread.
 * 
 * @author Daniel Garijo
 */
public class LoadOntologyInThread implements Runnable {

	private static final Logger logger = LoggerFactory.getLogger(LoadOntologyInThread.class);

	private final Configuration c;
	private final GuiController pointerToMain;
	private final boolean showGui;

	public LoadOntologyInThread(Configuration c, GuiController g, boolean showgui) {
		this.c = c;
		this.pointerToMain = g;
		this.showGui = showgui;
	}

	@Override
	public void run() {
		try {
			WidocoUtils.loadModelToDocument(c);
			c.loadPropertiesFromOntology(c.getMainOntology().getOWLAPIModel());
			if (showGui) {
				pointerToMain.switchState("finishedLoading");
			}
			logger.info("Ontology loaded successfully");
		} catch (Throwable e) {
			if (showGui) {
				pointerToMain.switchState("error");
			}
			logger.error("Error while loading the ontology: " + e.getMessage());
		}
	}

}
