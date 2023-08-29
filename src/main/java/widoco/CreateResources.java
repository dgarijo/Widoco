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

import diagram.DiagramGeneration;
import diff.CompareOntologies;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Properties;
import javax.swing.JOptionPane;
import lode.LODEGeneration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.semanticweb.owlapi.formats.NTriplesDocumentFormat;
import org.semanticweb.owlapi.formats.RDFJsonLDDocumentFormat;
import org.semanticweb.owlapi.formats.RDFXMLDocumentFormat;
import org.semanticweb.owlapi.formats.TurtleDocumentFormat;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import widoco.entities.Agent;
import widoco.entities.Ontology;

/**
 * Class that given a path, it creates all the associated resources needed to
 * view the documentation. Also, it builds the structure of the folder
 * 
 * @author Daniel Garijo
 */
public class CreateResources {

	private static final Logger logger = LoggerFactory.getLogger(CreateResources.class);

	public static void generateDocumentation(String outFolder, Configuration c, File lodeResources) throws Exception {
		String lodeContent;
		String folderOut = outFolder;
		Properties languageFile = new Properties();
		try {
			String resource = "/widoco/" + c.getCurrentLanguage() + ".properties";
			languageFile.load(CreateResources.class.getResourceAsStream(resource));
		} catch (Exception e) {
			String resource = "/widoco/en.properties";
			try {
				logger.info("Language file not found for " + c.getCurrentLanguage() + "!! Loading english by default");
				languageFile.load(CreateResources.class.getResourceAsStream(resource));
			} catch (Exception e1) {
				logger.error("Error while reading the language file: " + e1.getMessage());
			}
		}
		logger.info("Generate documentation in " + outFolder);
		logger.info("- ontology IRI: " + c.getOntologyURI());
		lodeContent = LODEGeneration.getLODEhtml(c, lodeResources);
		LODEParser lode = new LODEParser(lodeContent, c, languageFile);
                
		if (c.isCreateHTACCESS()) {
                        File fOut = new File(folderOut);
                        if (!fOut.exists()) {
                                fOut.mkdirs();
                        }
			createHTACCESSFile(folderOut + File.separator + ".htaccess", c);
		}
		// slash ontologies require a special type of redirection
		if (!c.getMainOntology().isHashOntology()) {
			folderOut += File.separator + "doc";
		}
		createFolderStructure(folderOut, c, languageFile);
                //the text of the sections is kept in case users choose to save in the same document
                String abs="",intro="",overview="",description="",crossref="",ref="",changeLog="";
		if (c.isIncludeAbstract()) {
			abs = createAbstractSection(folderOut + File.separator + "sections", c, languageFile);
		}
		if (c.isIncludeIntroduction()) {
			intro = createIntroductionSection(folderOut + File.separator + "sections", c,
					languageFile);
		}
		if (c.isIncludeOverview()) {
			overview = createOverviewSection(folderOut + File.separator + "sections", c, lode.getClassList(),
                                lode.getPropertyList(), lode.getDataPropList(), lode.getAnnotationPropList(),
                                lode.getNamedIndividualList(), lode.getRuleList(), languageFile);
		}
		if (c.isIncludeDescription()) {
			description = createDescriptionSection(folderOut + File.separator + "sections", c, languageFile);
		}
		if (c.isIncludeCrossReferenceSection()) {
			crossref = createCrossReferenceSection(folderOut + File.separator + "sections", lode, c, languageFile);
		}
		if (c.isIncludeReferences()) {
			ref = createReferencesSection(folderOut + File.separator + "sections", c, languageFile);
		}
		if (c.isPublishProvenance()) {
			createProvenancePage(folderOut + File.separator + "provenance", c, languageFile);
		}
		if (c.isIncludeChangeLog()) {
			if (c.getMainOntology().getPreviousVersion() != null
					&& !"".equals(c.getMainOntology().getPreviousVersion())) {
				changeLog = createChangeLog(folderOut + File.separator + "sections", c, languageFile);
			} else {
            	logger.info("No previous version provided. No changelog produced!");
			}
		}
		if (c.isCreateWebVowlVisualization()) {
			DiagramGeneration.generateOntologyDiagram(folderOut, c);
		}

		// serialize the model in different serializations.
		OWLOntologyManager om = c.getMainOntology().getOWLAPIOntologyManager();
		OWLOntology o = c.getMainOntology().getOWLAPIModel();
		WidocoUtils.writeModel(om, o, new RDFXMLDocumentFormat(), folderOut + File.separator + "ontology.owl");
		WidocoUtils.writeModel(om, o, new TurtleDocumentFormat(), folderOut + File.separator + "ontology.ttl");
		WidocoUtils.writeModel(om, o, new NTriplesDocumentFormat(), folderOut + File.separator + "ontology.nt");
		WidocoUtils.writeModel(om, o, new RDFJsonLDDocumentFormat(), folderOut + File.separator + "ontology.jsonld");
		if (c.isIncludeIndex()) {
                    if(c.isIncludeAllSectionsInOneDocument()){
                        createUnifiedIndexDocument(abs,intro,overview,description,crossref,ref,changeLog, folderOut, c, lode, languageFile);
                    }else{
                        createIndexDocument(folderOut, c, lode, languageFile);
                    }
		}
	}

	public static void generateSkeleton(String folderOut, Configuration c, Properties l) {
		// c.setTitle("Skeleton title");
		c.setIncludeDiagram(false);
		c.setPublishProvenance(false);
		c.setUseW3CStyle(true);
		createFolderStructure(folderOut, c, l);
		createAbstractSection(folderOut + File.separator + "sections", c, l);
		createIntroductionSection(folderOut + File.separator + "sections", c, l);
		createDescriptionSection(folderOut + File.separator + "sections", c, l);
		createReferencesSection(folderOut + File.separator + "sections", c, l);
		createIndexDocument(folderOut, c, null, l);
	}

	/**
	 * Provenance page
	 */
	private static void createProvenancePage(String path, Configuration c, Properties lang) {
		saveDocument(path + File.separator + "provenance-" + c.getCurrentLanguage() + ".html",
				Constants.getProvenanceHtml(c, lang), c);
		saveDocument(path + File.separator + "provenance-" + c.getCurrentLanguage() + ".ttl",
				Constants.getProvenanceRDF(c), c);
	}

	/**
	 * Method that creates an htaccess file for content negotiation
	 * 
	 * @param path
	 *            where to save the file
	 * @param c
	 *            configuration with the information of the current settings
	 */
	private static void createHTACCESSFile(String path, Configuration c) {
		saveDocument(path, Constants.getHTACCESS(c), c);
	}

	/**
	 * Method that creates a 406 page in case the user ir requesting an unsupported
	 * serialization
	 * 
	 * @param path
	 *            where to save the file
	 * @param c
	 *            configuration with the information of the current settings
	 * @lang patameter with the language properties document with the translations
	 */
	private static void create406Page(String path, Configuration c, Properties lang) {
		saveDocument(path, Constants.get406(c, lang), c);
	}

	/**
	 * Method that creates the change log for the ontology, automatically.
	 * 
	 * @param path
	 * @param c
	 * @param lang
	 */
	private static String createChangeLog(String path, Configuration c, Properties lang) {
            String textToWrite = null;
            try {
                logger.info("Attempting to generate an automated changelog\nDownloading old ontology "
                                + c.getMainOntology().getPreviousVersion());
                String oldVersionPath = c.getTmpFile().getAbsolutePath() + File.separator + "OLDOntology";
                WidocoUtils.downloadOntology(c.getMainOntology().getPreviousVersion(), oldVersionPath);
                CompareOntologies comparison = new CompareOntologies(oldVersionPath, c);
                textToWrite = Constants.getChangeLogSection(c, comparison, lang);
                if(!c.isIncludeAllSectionsInOneDocument()){
                    saveDocument(path + File.separator + "changelog-" + c.getCurrentLanguage() + ".html",
                                textToWrite, c);
                }
                logger.info("Changelog successfully created");
            } catch (Exception e) {
                c.setChangeLogSuccessfullyCreated(false);
                logger.error("Could not generate changelog: " + e.getMessage());
            }
            return textToWrite;
	}

	/**
	 * Sections of the document. Each section will be a separate html file
	 */
	private static String createAbstractSection(String path, Configuration c, Properties languageFile) {
            String textToWrite;
		if ((c.getAbstractPath() != null) && (!"".equals(c.getAbstractPath()))) {
                    textToWrite = WidocoUtils.readExternalResource(c.getAbstractPath());
		} else {
                    textToWrite = Constants.getAbstractSection(c.getAbstractSection(), c, languageFile);
                    if(!c.isIncludeAllSectionsInOneDocument()){
			saveDocument(path + File.separator + "abstract-" + c.getCurrentLanguage() + ".html",
					textToWrite, c);
                    }
		}
            return textToWrite;
	}

	private static String createIntroductionSection(String path, Configuration c,Properties lang) {
            String introText;
			String nsText="";
            HashMap<String,String> nsDecl = c.getNamespaceDeclarations();
            if ((c.getIntroductionPath() != null) && (!"".equals(c.getIntroductionPath()))) {
				introText = WidocoUtils.readExternalResource(c.getIntroductionPath());
            } else {
				introText = Constants.getIntroductionSectionTitleAndPlaceHolder(c, lang);
                if (nsDecl != null && !nsDecl.isEmpty()) {
					nsText = Constants.getNameSpaceDeclaration(nsDecl, c, lang);
                }
                //only save if separating sections
                if(!c.isIncludeAllSectionsInOneDocument()){
                    saveDocument(path + File.separator + "introduction-" + c.getCurrentLanguage() + ".html", introText,c);
					saveDocument(path + File.separator + "ns-" + c.getCurrentLanguage() + ".html", nsText,c);
                }
            }
            return introText + nsText;
	}

	// the lists passed onto this method are the fixed lists
	private static String createOverviewSection(String path, Configuration c, String classesList, String propList,
            String dataPropList, String annotationProps, String namedIndividuals, String rules, Properties lang) {
            String textToWrite = "";
            if ((c.getOverviewPath() != null) && (!"".equals(c.getOverviewPath()))) {
                textToWrite = WidocoUtils.readExternalResource(c.getOverviewPath());
            } else {
                textToWrite = Constants.getOverviewSectionTitleAndPlaceHolder(c, lang);
                if (!"".equals(classesList) && classesList != null) {
                        textToWrite += ("<h4>" + lang.getProperty(Constants.LANG_CLASSES) + "</h4>\n");
                        textToWrite += (classesList);
                }
                if (!"".equals(propList) && propList != null) {
                        textToWrite += ("<h4>" + lang.getProperty(Constants.LANG_OBJ_PROP) + "</h4>");
                        textToWrite += (propList);
                }
                if (!"".equals(dataPropList) && dataPropList != null) {
                        textToWrite += ("<h4>" + lang.getProperty(Constants.LANG_DATA_PROP) + "</h4>");
                        textToWrite += (dataPropList);
                }
                if (!"".equals(annotationProps) && annotationProps != null && c.isIncludeAnnotationProperties()) {
                        textToWrite += ("<h4>" + lang.getProperty(Constants.LANG_ANN_PROP) + "</h4>");
                        textToWrite += (annotationProps);
                }
                if (!"".equals(namedIndividuals) && namedIndividuals != null && c.isIncludeNamedIndividuals()) {
                        textToWrite += ("<h4>" + lang.getProperty(Constants.LANG_NAMED_INDIV) + "</h4>");
                        textToWrite += (namedIndividuals);
                }
				if (!"".equals(rules) && rules != null ) {
					//only eng support for now
					textToWrite += ("<h4> Rules </h4>");
					textToWrite += (rules);
				}
                // add the webvowl diagram, if selected
                if (c.isCreateWebVowlVisualization()) {
                        textToWrite += "<iframe align=\"center\" width=\"100%\" height =\"500px\" src=\"webvowl/index.html\"></iframe> ";
                }
                textToWrite += "\n";
                if(!c.isIncludeAllSectionsInOneDocument()){
                    saveDocument(path + File.separator + "overview-" + c.getCurrentLanguage() + ".html", textToWrite, c);
                }
            }
            return textToWrite;
	}

	private static String createDescriptionSection(String path, Configuration c, Properties lang) {
            String textToWrite;
            if ((c.getDescriptionPath() != null) && (!"".equals(c.getDescriptionPath()))) {
                textToWrite = WidocoUtils.readExternalResource(c.getDescriptionPath());
            } else {
                textToWrite = Constants.getDescriptionSectionTitleAndPlaceHolder(c, lang);
                if(!c.isIncludeAllSectionsInOneDocument()){
                    saveDocument(path + File.separator + "description-" + c.getCurrentLanguage() + ".html",
                                    textToWrite, c);
                }
            }
            return textToWrite;
	}

	private static String createCrossReferenceSection(String path, LODEParser lodeParser, Configuration c,
			Properties lang) {
            // Cross reference section has to be included always.
            String textToWrite = Constants.getCrossReferenceSectionTitleAndPlaceHolder(c, lang);

            String classesList = lodeParser.getClassList(), propList = lodeParser.getPropertyList(),
                            dataPropList = lodeParser.getDataPropList(), annotationPropList = lodeParser.getAnnotationPropList(),
                            namedIndividualList = lodeParser.getNamedIndividualList();

			final boolean includesClass = classesList != null && !"".equals(classesList);
			final boolean includesProperty = propList != null && !"".equals(propList);
			final boolean includesDatatypeProperty = dataPropList != null && !"".equals(dataPropList);
			final boolean includesAnnotation =
				c.isIncludeAnnotationProperties() && annotationPropList != null && !"".equals(annotationPropList);
			final boolean includesNamedIndividual =
				c.isIncludeNamedIndividuals() && namedIndividualList != null && !"".equals(namedIndividualList);

			if (includesClass) {
				textToWrite += lodeParser.getClasses();
            }
            if (includesProperty) {
				textToWrite += lodeParser.getProperties();
            }
            if (includesDatatypeProperty) {
				textToWrite += lodeParser.getDataProp();
            }
            if (includesAnnotation) {
				textToWrite += lodeParser.getAnnotationProp();
            }
            if (includesNamedIndividual) {
				textToWrite += lodeParser.getNamedIndividuals();
            }
			//since rules are an edge case, if they exist we add them
			if(lodeParser.getRuleList()!=null && !lodeParser.getRuleList().isEmpty()){
				textToWrite += lodeParser.getRules();
			}

            // Add legend (for ontology components actually used).
            textToWrite += Constants.getLegend(lang, includesClass, includesProperty,
					includesDatatypeProperty, includesAnnotation, includesNamedIndividual);
            if(!c.isIncludeAllSectionsInOneDocument()){
                saveDocument(path + File.separator + "crossref-" + c.getCurrentLanguage() + ".html", textToWrite, c);
            }
            return textToWrite;
	}

	private static String createReferencesSection(String path, Configuration c, Properties lang) {
            String textToWrite;
            if ((c.getReferencesPath() != null) && (!"".equals(c.getReferencesPath()))) {
                textToWrite = WidocoUtils.readExternalResource(c.getReferencesPath());
            } else {
                textToWrite =  Constants.getReferencesSection(c, lang);
                if(!c.isIncludeAllSectionsInOneDocument()){
                    saveDocument(path + File.separator + "references-" + c.getCurrentLanguage() + ".html",
                                   textToWrite, c);
                }
            }
            return textToWrite;
	}

	/**
	 * Method for creating the index section on the url provided. The index will
	 * include the pointers to all of the other sections.
	 */
	private static void createIndexDocument(String path, Configuration c, LODEParser l, Properties lang) {
		// the boolean valuas come from the configuration.
		String textToWrite = Constants.getIndexDocument("resources", c, l, lang);
		saveDocument(path + File.separator + "index-" + c.getCurrentLanguage() + ".html", textToWrite, c);
	}
        
                
        private static void createUnifiedIndexDocument(String abstractText,
                String introText, String overviewText, String descriptionText,
                String crossrefText,String refText,String changeLogText,
                String path, Configuration c, LODEParser l, Properties lang) {
		// the boolean valuas come from the configuration.
		String textToWrite = Constants.getUnifiedIndexDocument("resources", c, l, lang,abstractText,introText,
                        overviewText,descriptionText,refText,changeLogText,crossrefText);
		saveDocument(path + File.separator + "index-" + c.getCurrentLanguage() + ".html", textToWrite, c);
	}

	// This method should be separated in another utils file.
	public static void saveDocument(String path, String textToWrite, Configuration c) {
		File f = new File(path);
		Writer out = null;
		try {
			if (f.exists()) {
				try {
					if (!c.getOverWriteAll()) {
						String[] options = new String[]{"Rewrite all", "Yes", "No"};
						int response = JOptionPane.showOptionDialog(null,
								"The file " + f.getName() + " already exists. Do you want to overwrite it?",
								"Existing File!", JOptionPane.DEFAULT_OPTION, JOptionPane.INFORMATION_MESSAGE, null,
								options, options[0]);
						// 0 -> yes to all. 1 -> Yes. 2-> No
						if (response == 0)
							c.setOverwriteAll(true);
						if (response == 2)
							return; // else we continue rewriting the file.
					}
				}catch (Exception e){
					logger.error("It looks like WIDOCO tried to save the documentation, but files already exist. Please " +
							"try using the -rewriteAll option.");
				}
			} else {
				f.createNewFile();
			}
			out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(f), "UTF-8"));
			out.write(textToWrite);
			out.close();
		} catch (IOException e) {
			logger.error("Error while creating the file " + e.getMessage() + "\n" + f.getAbsolutePath());
		}

	}

	private static void createFolderStructure(String s, Configuration c, Properties lang) {
		File f = new File(s);
                if(!c.isIncludeAllSectionsInOneDocument()){
                    File sections = new File(s + File.separator + "sections");
                    sections.mkdirs();
                }
		File img = new File(s + File.separator + "img");
		File provenance = new File(s + File.separator + "provenance");
		File resources = new File(s + File.separator + "resources");
		if (!f.exists()) {
			f.mkdirs();
		} else {
			if (!f.isDirectory()) {
				logger.error("The selected file is not a directory.");
				// throw appropriate exceptions here
			}
		}
		if (c.isIncludeDiagram())
			img.mkdir();
		if (c.isPublishProvenance()) {
			provenance.mkdir();
			// do all provenance related stuff here
		}
		resources.mkdir();
		// copy jquery
		WidocoUtils.copyLocalResource("/lode/jquery.js",
				new File(resources.getAbsolutePath() + File.separator + "jquery.js"));
		WidocoUtils.copyLocalResource("/lode/marked.min.js",
				new File(resources.getAbsolutePath() + File.separator + "marked.min.js"));
		// icon
		WidocoUtils.copyLocalResource("/widoco/images/rdf.icon",
				new File(resources.getAbsolutePath() + File.separator + "rdf.icon"));
		// copy css
		if (c.isUseW3CStyle()) {
			WidocoUtils.copyLocalResource("/lode/lodeprimer.css",
					new File(resources.getAbsolutePath() + File.separator + "primer.css"));
			WidocoUtils.copyLocalResource("/lode/rec.css",
					new File(resources.getAbsolutePath() + File.separator + "rec.css"));
			WidocoUtils.copyLocalResource("/lode/extra.css",
					new File(resources.getAbsolutePath() + File.separator + "extra.css"));
			WidocoUtils.copyLocalResource("/lode/owl.css",
					new File(resources.getAbsolutePath() + File.separator + "owl.css"));
		} else {
			WidocoUtils.copyLocalResource("/lode/bootstrap-yeti.css",
					new File(resources.getAbsolutePath() + File.separator + "yeti.css"));
			WidocoUtils.copyLocalResource("/lode/site.css",
					new File(resources.getAbsolutePath() + File.separator + "site.css"));
		}
		// copy widoco readme
		WidocoUtils.copyLocalResource("/widoco/readme.md",
				new File(f.getAbsolutePath() + File.separator + "readme.md"));
		if (c.isCreateHTACCESS()) {
			create406Page(s + File.separator + "406.html", c, lang);
		}
		// diagram information
		if (c.isCreateWebVowlVisualization()) {
			File webvowl = new File(s + File.separator + "webvowl");
			webvowl.mkdir();
			WidocoUtils.unZipIt(Constants.WEBVOWL_RESOURCES, webvowl.getAbsolutePath());
		}
	}

	public static void saveConfigFile(String path, Configuration conf) throws IOException {
		String textProperties = "\n";// the first line I leave an intro because there have been problems.
		textProperties += Constants.PF_ABSTRACT_SECTION_CONTENT + "=" + conf.getAbstractSection() + "\n";
		textProperties += Constants.PF_ONT_TITLE + "=" + conf.getMainOntology().getTitle() + "\n";
		textProperties += Constants.PF_ONT_PREFIX + "=" + conf.getMainOntology().getNamespacePrefix() + "\n";
		textProperties += Constants.PF_ONT_NAMESPACE_URI + "=" + conf.getMainOntology().getNamespaceURI() + "\n";
		textProperties += Constants.PF_ONT_NAME + "=" + conf.getMainOntology().getName() + "\n";
		textProperties += Constants.PF_THIS_VERSION_URI + "=" + conf.getMainOntology().getThisVersion() + "\n";
		textProperties += Constants.PF_LATEST_VERSION_URI + "=" + conf.getMainOntology().getLatestVersion() + "\n";
		textProperties += Constants.PF_PREVIOUS_VERSION + "=" + conf.getMainOntology().getPreviousVersion() + "\n";
		textProperties += Constants.PF_DATE_CREATED + "=" + conf.getMainOntology().getCreationDate() + "\n";
		textProperties += Constants.PF_DATE_MODIFIED + "=" + conf.getMainOntology().getModifiedDate() + "\n";
		textProperties += Constants.PF_ONT_REVISION_NUMBER + "=" + conf.getMainOntology().getRevision() + "\n";
		textProperties += Constants.PF_LICENSE_URI + "=" + conf.getMainOntology().getLicense().getUrl() + "\n";
		textProperties += Constants.PF_LICENSE_NAME + "=" + conf.getMainOntology().getLicense().getName() + "\n";
		textProperties += Constants.PF_LICENSE_ICON_URL + "=" + conf.getMainOntology().getLicense().getIcon() + "\n";
		textProperties += Constants.PF_CITE_AS + "=" + conf.getMainOntology().getCiteAs() + "\n";
		textProperties += Constants.PF_DOI + "=" + conf.getMainOntology().getDoi() + "\n";
		textProperties += Constants.STATUS + "=" + conf.getMainOntology().getStatus() + "\n";
		textProperties += Constants.PF_LOGO + "=" + conf.getMainOntology().getLogo() + "\n";
		textProperties += Constants.PF_DESCRIPTION + "=" + conf.getMainOntology().getDescription() + "\n";
		textProperties += Constants.PF_INTRODUCTION + "=" + conf.getIntroText() + "\n";
		textProperties += Constants.COMPATIBLE + "=" + conf.getMainOntology().getBackwardsCompatibleWith() + "\n";
		if (conf.getMainOntology().getPublisher() != null ) {
			Agent p = conf.getMainOntology().getPublisher();
			String publisher = "", publisherURI="", publisherInstitution="", publisherInstitutionURI="";
			if (p.getName() != null)
				publisher = p.getName();
			if (p.getURL() != null)
				publisherURI = p.getURL();
			if (p.getInstitutionName() != null)
				publisherInstitution = p.getInstitutionName();
			if (p.getInstitutionURL() != null)
				publisherInstitutionURI += p.getInstitutionURL();
			textProperties += Constants.PF_PUBLISHER + "=" + publisher + "\n";
			textProperties += Constants.PF_PUBLISHER_URI + "=" + publisherURI + "\n";
			textProperties += Constants.PF_PUBLISHER_INSTITUTION + "=" + publisherInstitution + "\n";
			textProperties += Constants.PF_PUBLISHER_INSTITUTION_URI + "=" + publisherInstitutionURI + "\n";
		}
		String authors = "", authorURLs = "", authorInstitutions = "", authorInstitutionURLs = "";
		ArrayList<Agent> ag = conf.getMainOntology().getCreators();
		if (!ag.isEmpty()) {
			for (int i = 0; i < ag.size() - 1; i++) {
				Agent a = ag.get(i);
				if (a.getName() != null)
					authors += a.getName();
				authors += ";";
				if (a.getURL() != null)
					authorURLs += a.getURL();
				authorURLs += ";";
				if (a.getInstitutionName() != null)
					authorInstitutions += a.getInstitutionName();
				authorInstitutions += ";";
				if (a.getInstitutionURL() != null)
					authorInstitutionURLs += a.getInstitutionURL();
				authorInstitutionURLs += ";";
			}
			// last agent: no ";"
			if (ag.get(ag.size() - 1).getName() != null)
				authors += ag.get(ag.size() - 1).getName();
			if (ag.get(ag.size() - 1).getURL() != null)
				authorURLs += ag.get(ag.size() - 1).getURL();
			if (ag.get(ag.size() - 1).getInstitutionName() != null)
				authorInstitutions += ag.get(ag.size() - 1).getInstitutionName();
			if (ag.get(ag.size() - 1).getInstitutionURL() != null)
				authorInstitutionURLs += ag.get(ag.size() - 1).getInstitutionURL();
		}
		textProperties += Constants.PF_AUTHORS + "=" + authors + "\n";
		textProperties += Constants.PF_AUTHORS_URI + "=" + authorURLs + "\n";
		textProperties += Constants.PF_AUTHORS_INSTITUTION + "=" + authorInstitutions + "\n";
		textProperties += Constants.PF_AUTHORS_INSTITUTION_URI + "=" + authorInstitutionURLs + "\n";

		ag = conf.getMainOntology().getContributors();
		authors = "";
		authorURLs = "";
		authorInstitutions = "";
		authorInstitutionURLs = "";
		if (!ag.isEmpty()) {
			for (int i = 0; i < ag.size() - 1; i++) {
				Agent a = ag.get(i);
				if (a.getName() != null)
					authors += a.getName();
				authors += ";";
				if (a.getURL() != null)
					authorURLs += a.getURL();
				authorURLs += ";";
				if (a.getInstitutionName() != null)
					authorInstitutions += a.getInstitutionName();
				authorInstitutions += ";";
				if (a.getInstitutionURL() != null)
					authorInstitutionURLs += a.getInstitutionURL();
				authorInstitutionURLs += ";";
			}
			if (ag.get(ag.size() - 1).getName() != null)
				authors += ag.get(ag.size() - 1).getName();
			if (ag.get(ag.size() - 1).getURL() != null)
				authorURLs += ag.get(ag.size() - 1).getURL();
			if (ag.get(ag.size() - 1).getInstitutionName() != null)
				authorInstitutions += ag.get(ag.size() - 1).getInstitutionName();
			if (ag.get(ag.size() - 1).getInstitutionURL() != null)
				authorInstitutionURLs += ag.get(ag.size() - 1).getInstitutionURL();
		}
		textProperties += Constants.PF_CONTRIBUTORS + "=" + authors + "\n";
		textProperties += Constants.PF_CONTRIBUTORS_URI + "=" + authorURLs + "\n";
		textProperties += Constants.PF_CONTRIBUTORS_INSTITUTION + "=" + authorInstitutions + "\n";
		textProperties += Constants.PF_CONTRIBUTORS_INSTITUTION_URI + "=" + authorInstitutionURLs + "\n";
		String importedNames = "", importedURIs = "";
		ArrayList<Ontology> imported = conf.getMainOntology().getImportedOntologies();
		if (!imported.isEmpty()) {
			for (int i = 0; i < imported.size() - 1; i++) {
				Ontology o = imported.get(i);
				if (o.getName() != null)
					importedNames += o.getName();
				importedNames += ";";
				if (o.getNamespaceURI() != null)
					importedURIs += o.getNamespaceURI();
				importedURIs += ";";
			}
			// last agent: no ";"
			if (imported.get(imported.size() - 1).getName() != null)
				importedNames += imported.get(imported.size() - 1).getName();
			if (imported.get(imported.size() - 1).getNamespaceURI() != null)
				importedURIs += imported.get(imported.size() - 1).getNamespaceURI();
		}
		textProperties += Constants.PF_IMPORTED_ONTOLOGY_NAMES + "=" + importedNames + "\n";
		textProperties += Constants.PF_IMPORTED_ONTOLOGY_URIS + "=" + importedURIs + "\n";
		imported = conf.getMainOntology().getExtendedOntologies();
		importedNames = "";
		importedURIs = "";
		if (!imported.isEmpty()) {
			for (int i = 0; i < imported.size() - 1; i++) {
				Ontology o = imported.get(i);
				if (o.getName() != null)
					importedNames += o.getName();
				importedNames += ";";
				if (o.getNamespaceURI() != null)
					importedURIs += o.getNamespaceURI();
				importedURIs += ";";
			}
			// last onto: no ";"
			if (imported.get(imported.size() - 1).getName() != null)
				importedNames += imported.get(imported.size() - 1).getName();
			if (imported.get(imported.size() - 1).getNamespaceURI() != null)
				importedURIs += imported.get(imported.size() - 1).getNamespaceURI();
		}
		textProperties += Constants.PF_EXTENDED_ONTOLOGY_NAMES + "=" + importedNames + "\n";
		textProperties += Constants.PF_EXTENDED_ONTOLOGY_URIS + "=" + importedURIs + "\n";
		// serializations
		HashMap<String, String> serializations = conf.getMainOntology().getSerializations();
		if (serializations.containsKey("RDF/XML")) {
			textProperties += Constants.PF_SERIALIZATION_RDF + "=" + serializations.get("RDF/XML") + "\n";
		}
		if (serializations.containsKey("TTL")) {
			textProperties += Constants.PF_SERIALIZATION_TTL + "=" + serializations.get("TTL") + "\n";
		}
		if (serializations.containsKey("N-Triples")) {
			textProperties += Constants.PF_SERIALIZATION_NT + "=" + serializations.get("N-Triples") + "\n";
		}
		if (serializations.containsKey("JSON-LD")) {
			textProperties += Constants.PF_SERIALIZATION_JSON + "=" + serializations.get("JSON-LD") + "\n";
		}
		String images = "", sources = "", seeAlso = "", funding = "", funder = "";
		ArrayList<String> imgs = conf.getMainOntology().getImages();
		if (!imgs.isEmpty()){
			for (int i = 0; i < imgs.size() - 1; i++) {
				images += imgs.get(i) + ";";
			}
			images += imgs.get(imgs.size() - 1) ;
		}
		textProperties += Constants.PF_IMAGES + "=" + images + "\n";
		ArrayList<String> srcs = conf.getMainOntology().getSources();
		if (!srcs.isEmpty()){
			for (int i = 0; i < srcs.size() - 1; i++) {
				sources += srcs.get(i) + ";";
			}
			sources += srcs.get(srcs.size() - 1) ;
		}
		textProperties += Constants.PF_SOURCE + "=" + sources + "\n";
		ArrayList<String> see = conf.getMainOntology().getSeeAlso();
		if (!see.isEmpty()){
			for (int i = 0; i < see.size() - 1; i++) {
				seeAlso += see.get(i) + ";";
			}
			seeAlso += see.get(see.size() - 1) ;
		}
		textProperties += Constants.PF_SEE_ALSO + "=" + seeAlso + "\n";
		ArrayList<String> fund = conf.getMainOntology().getFundingGrants();
		if (!fund.isEmpty()){
			for (int i = 0; i < fund.size() - 1; i++) {
				funding += fund.get(i) + ";";
			}
			funding += fund.get(fund.size() - 1) ;
		}
		textProperties += Constants.PF_FUNDING + "=" + funding + "\n";
		ArrayList<Agent> funders = conf.getMainOntology().getFunders();
		if (!funders.isEmpty()){
			for (int i = 0; i < funders.size() - 1; i++) {
				funder += funders.get(i).getName() + ";";
			}
			funder += funders.get(fund.size() - 1).getName() ; //name is a URL in this case
		}
		textProperties += Constants.PF_FUNDERS + "=" + funder + "\n";
		// copy the result into the file
		Writer writer = null;
		try {
			writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path), "utf-8"));
			writer.write(textProperties);
			// JOptionPane.showMessageDialog(this, "Property file saved successfully");
		} catch (IOException ex) {
			logger.error("Error while saving the property file " + ex.getMessage());
			throw ex;
		} finally {
			try {
				if (writer != null)
					writer.close();
			} catch (IOException ex) {
				logger.warn("Could not close the properties file.");
			}
		}
	}

}
