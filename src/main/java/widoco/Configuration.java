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

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Properties;
import widoco.entities.Agent;
import widoco.entities.License;
import widoco.entities.Ontology;

/**
 * class for storing all the details to generate the ontology.
 * This will be a singleton object that will be modified until the generate 
 * command is given.
 * 
 * @author Daniel Garijo
 */
public class Configuration {
    private ArrayList<Agent> creators;
    private ArrayList<Agent> contributors;
    private String previousVersion;
    private String thisVersion;
    private String latestVersion;
    private String revision;
    private ArrayList<Ontology> importedOntologies;
    private ArrayList<Ontology> extendedOntologies;
    private Ontology mainOntology;
    private License license;
    private String ontologyPath;
    private String documentationURI;
    private String title;
    private String releaseDate;
    
    private boolean fromFile;//if this is true, the onto will be from a file. otherwise it's a URI
    
    private boolean publishProvenance;
    private String provenanceURI; //this will be used as the subject for describing provenance (url of the doc)
    
    private boolean includeAbstract;
    private boolean includeIntroduction;
    private boolean includeOverview;
    private boolean includeDescription;
    private boolean includeReferences;
    private boolean includeCrossReferenceSection;//needed for skeleton
    private String abstractPath;
    private String introductionPath;
    private String overviewPath;
    private String descriptionPath;
    private String referencesPath;
    
    private boolean includeDiagram;
    
    private Properties propertyFile = null;
    private final String configPath = "config"+File.separator+"config.properties";
    
    //Lode configuration parameters
    private boolean useOwlAPI;
    private boolean useImported;
    private boolean useReasoner;
    private String language;
    
//    to do. Load from configuration file. Setters and getters to do it from the interface.
    //model everything as a singleton object. No need: only the controller accesses this file.
    public Configuration() {
        propertyFile = new Properties();
        //just in case, we initialize the objects:
        
        try{
            URL root = TemplateGeneratorOLD.class.getProtectionDomain().getCodeSource().getLocation();
            String path = (new File(root.toURI())).getParentFile().getPath();
            loadPropertyFile(path+File.separator+configPath);
        }catch(URISyntaxException e){
            System.err. println("Error while loading the default property file" +e.getMessage());
        }
    }
    
    private void loadPropertyFile(String path){
        try {
            //initialization of variables (in case something fails
            title ="";
            releaseDate = "";
            previousVersion ="";
            thisVersion ="";
            latestVersion ="";
            mainOntology = new Ontology();
            mainOntology.setName("");
            mainOntology.setNamespacePrefix("");
            mainOntology.setNamespaceURI("");
            revision = "";
            creators = new ArrayList<Agent>();
            contributors = new ArrayList<Agent>();
            importedOntologies = new ArrayList<Ontology>();
            extendedOntologies = new ArrayList<Ontology>();
            license = new License();
            publishProvenance = true;    
            includeAbstract = true;
            includeIntroduction = true;
            includeOverview = true;
            includeDescription = true;
            includeReferences = true;
            includeCrossReferenceSection = true;
//            propertyFile.load(new FileInputStream(path));
            //this forces the property file to be in UTF 8 instead of the ISO
            propertyFile.load(new InputStreamReader(new FileInputStream(path), "UTF-8"));
            //We try to load from the configuration file. If it fails, then we should try to load from the ontology. Then, if it fails, we should ask the user.
            this.title = propertyFile.getProperty("title","Title goes here");
            this.releaseDate = propertyFile.getProperty("dateOfRelease", "Date of release");
            this.previousVersion =propertyFile.getProperty("previousVersion");
            thisVersion =propertyFile.getProperty("thisVersion");
            latestVersion =propertyFile.getProperty("latestVersion");
            mainOntology.setName(propertyFile.getProperty("name"));
            mainOntology.setNamespacePrefix(propertyFile.getProperty("ontologyPrefix"));
            mainOntology.setNamespaceURI(propertyFile.getProperty("ontologyNamespaceURI"));
            revision = propertyFile.getProperty("revision");
            //to do: check that the authors is not empty before doing the split.
            String[] names = propertyFile.getProperty("authors").split(";");
            String[] urls = propertyFile.getProperty("authorURL").split(";");
            String[] authorInst = propertyFile.getProperty("authorInstitution").split(";");
            for(int i =0; i< names.length; i++){
                Agent a = new Agent();
                a.setName(names[i]);
                if(urls.length == names.length){
                    a.setURL(urls[i]);
                }
                if(authorInst.length == names.length){
                    a.setInstitutionName(authorInst[i]);
                }
                creators.add(a);
            }
            names = propertyFile.getProperty("contributors").split(";");
            urls = propertyFile.getProperty("contributorsURL").split(";");
            authorInst = propertyFile.getProperty("contributorsInstitution").split(";");
            for(int i =0; i< names.length; i++){
                Agent a = new Agent();
                a.setName(names[i]);
                if(urls.length == names.length){
                    a.setURL(urls[i]);
                }
                if(authorInst.length == names.length){
                    a.setInstitutionName(authorInst[i]);
                }
                contributors.add(a);
            }
            names = propertyFile.getProperty("importsNames").split(";");
            urls = propertyFile.getProperty("importsURLs").split(";");
            for(int i =0; i< names.length; i++){
                Ontology o = new Ontology();
                o.setName(names[i]);
                if(urls.length == names.length){
                    o.setNamespaceURI(urls[i]);
                }
                importedOntologies.add(o);
            }
            names = propertyFile.getProperty("extendsNames").split(";");
            urls = propertyFile.getProperty("extendsURLS").split(";");
            for(int i =0; i< names.length; i++){
                Ontology o = new Ontology();
                o.setName(names[i]);
                if(urls.length == names.length){
                    o.setNamespaceURI(urls[i]);
                }
                extendedOntologies.add(o);
            }
            license.setName(propertyFile.getProperty("license"));
            license.setUrl(propertyFile.getProperty("licenseURL"));
            license.setIcon(propertyFile.getProperty("licenseIconURL"));
            //to do: add the license icon!
    	} catch (IOException ex) {
            System.err.println("Error while reading configuration properties "+ex.getMessage());
        }
    }

    public boolean isFromFile() {
        return fromFile;
    }
    
    public void reloadPropertyFile(String path){
        this.loadPropertyFile(path);
    }

    public ArrayList<Agent> getContributors() {
        return contributors;
    }

    public ArrayList<Agent> getCreators() {
        return creators;
    }

    public String getDocumentationURI() {
        return documentationURI;
    }

    public ArrayList<Ontology> getExtendedOntologies() {
        return extendedOntologies;
    }

    public String getRevision() {
        return revision;
    }

    public ArrayList<Ontology> getImportedOntolgies() {
        return importedOntologies;
    }

    public String getLatestVersion() {
        return latestVersion;
    }

    public License getLicense() {
        return license;
    }

    public Ontology getMainOntology() {
        return mainOntology;
    }

    public String getOntologyPath() {
        return ontologyPath;
    }

    public String getOntologyURI() {
        return this.mainOntology.getNamespaceURI();
    }

    public String getPreviousVersion() {
        return previousVersion;
    }

    public String getThisVersion() {
        return thisVersion;
    }

    public String getTitle() {
        return title;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public boolean isPublishProvenance() {
        return publishProvenance;
    }

    public String getProvenanceURI() {
        return provenanceURI;
    }

    
    
    public void setProvenanceURI(String provenanceURI) {
        this.provenanceURI = provenanceURI;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setTitle(String title) {
        if(title==null) this.title= "Untitled ontology";
        else this.title = title;
    }


    public void setContributors(ArrayList<Agent> contributors) {
        this.contributors = contributors;
    }

    public void setCreators(ArrayList<Agent> creators) {
        this.creators = creators;
    }

    public void setDocumentationURI(String documentationURI) {
        this.documentationURI = documentationURI;
    }

    public void setExtendedOntologies(ArrayList<Ontology> extendedOntologies) {
        this.extendedOntologies = extendedOntologies;
    }

    public void setGetRevision(String getRevision) {
        this.revision = getRevision;
    }

    public void setImportedOntolgies(ArrayList<Ontology> importedOntolgies) {
        this.importedOntologies = importedOntolgies;
    }

    public void setLatestVersion(String latestVersion) {
        this.latestVersion = latestVersion;
    }

    public void setLicense(License license) {
        this.license = license;
    }

    public void setMainOntology(Ontology mainOntology) {
        this.mainOntology = mainOntology;
    }

    public void setOntologyPath(String ontologyPath) {
        this.ontologyPath = ontologyPath;
    }

    public void setOntologyURI(String ontologyURI) {
        this.mainOntology.setNamespaceURI(ontologyURI);
    }

    public void setPreviousVersion(String previousVersion) {
        this.previousVersion = previousVersion;
    }

    public void setThisVersion(String thisVersion) {
        this.thisVersion = thisVersion;
    }

    public void setPublishProvenance(boolean publishProvenance) {
        this.publishProvenance = publishProvenance;
    }

    public String getAbstractPath() {
        return abstractPath;
    }

    public String getConfigPath() {
        return configPath;
    }

    public String getDescriptionPath() {
        return descriptionPath;
    }

    public String getIntroductionPath() {
        return introductionPath;
    }

    public ArrayList<Ontology> getImportedOntologies() {
        return importedOntologies;
    }

    public String getOverviewPath() {
        return overviewPath;
    }

    public String getReferencesPath() {
        return referencesPath;
    }

    public boolean isIncludeAbstract() {
        return includeAbstract;
    }

    public boolean isIncludeDescription() {
        return includeDescription;
    }

    public boolean isIncludeDiagram() {
        return includeDiagram;
    }

    public boolean isIncludeIntroduction() {
        return includeIntroduction;
    }

    public boolean isIncludeOverview() {
        return includeOverview;
    }

    public boolean isIncludeReferences() {
        return includeReferences;
    }

    public boolean isIncludeCrossReferenceSection() {
        return includeCrossReferenceSection;
    }

    public void setAbstractPath(String abstractPath) {
        this.abstractPath = abstractPath;
    }

    public void setDescriptionPath(String descriptionPath) {
        this.descriptionPath = descriptionPath;
    }

    public void setIncludeAbstract(boolean includeAbstract) {
        this.includeAbstract = includeAbstract;
    }

    public void setImportedOntologies(ArrayList<Ontology> importedOntologies) {
        this.importedOntologies = importedOntologies;
    }

    public void setIncludeDescription(boolean includeDescription) {
        this.includeDescription = includeDescription;
    }

    public void setIncludeDiagram(boolean includeDiagram) {
        this.includeDiagram = includeDiagram;
    }

    public void setIncludeIntroduction(boolean includeIntroduction) {
        this.includeIntroduction = includeIntroduction;
    }

    public void setIncludeOverview(boolean includeOverview) {
        this.includeOverview = includeOverview;
    }

    public void setIncludeReferences(boolean includeReferences) {
        this.includeReferences = includeReferences;
    }

    public void setIncludeCrossReferenceSection(boolean includeCrossReferenceSection) {
        this.includeCrossReferenceSection = includeCrossReferenceSection;
    }

    public void setIntroductionPath(String introductionPath) {
        this.introductionPath = introductionPath;
    }

    public void setOverviewPath(String overviewPath) {
        this.overviewPath = overviewPath;
    }

    public void setPropertyFile(Properties propertyFile) {
        this.propertyFile = propertyFile;
    }

    public void setReferencesPath(String referencesPath) {
        this.referencesPath = referencesPath;
    }

    public void setRevision(String revision) {
        this.revision = revision;
    }    
    
    public void setFromFile(boolean fromFile) {
        this.fromFile = fromFile;
    }
    
    /**
     * Lode configuration parameters
     */
    
    public String getLanguage() {
        return language;
    }

    public boolean isUseImported() {
        return useImported;
    }

    public boolean isUseOwlAPI() {
        return useOwlAPI;
    }

    public boolean isUseReasoner() {
        return useReasoner;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public void setUseOwlAPI(boolean useOwlAPI) {
        this.useOwlAPI = useOwlAPI;
    }

    public void setUseImported(boolean useImported) {
        this.useImported = useImported;
    }

    public void setUseReasoner(boolean useReasoner) {
        this.useReasoner = useReasoner;
    }

    
}
