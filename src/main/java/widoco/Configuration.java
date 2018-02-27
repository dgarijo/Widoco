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

import java.awt.Image;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Properties;
import java.util.stream.Collectors;
import javax.imageio.ImageIO;
import org.semanticweb.owlapi.model.OWLOntology;
import widoco.entities.Agent;
import widoco.entities.License;
import widoco.entities.Ontology;
import widoco.gui.GuiController;
import licensius.GetLicense;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLAnnotation;
import org.semanticweb.owlapi.model.OWLAnnotationSubject;
import org.semanticweb.owlapi.model.OWLEntity;
import org.semanticweb.owlapi.search.EntitySearcher;

/**
 * class for storing all the details to generate the ontology.
 * This will be a singleton object that will be modified until the generate 
 * command is given.
 * 
 * @author Daniel Garijo
 */
public class Configuration {
   
    private Ontology mainOntologyMetadata;
    /**
     * Path where the ontology is saved (locally)
     */
    private String ontologyPath;
    /**
     * Path where the documentation will be generated.
     */
    private String documentationURI;
    /**
     * Flag to tell Widoco whether the ontology will be loaded from a file or URI.
     * True if loaded from file.
     */    
    private boolean fromFile;
    
    private boolean publishProvenance;
    
    private boolean includeAbstract;
    private boolean includeIntroduction;
    private boolean includeOverview;
    private boolean includeDescription;
    private boolean includeReferences;
    private boolean includeCrossReferenceSection;//needed for skeleton
    private boolean includeAnnotationProperties;
    private boolean includeNamedIndividuals;
    private boolean includeIndex;
    private boolean includeChangeLog;
    private String abstractPath;
    private String introductionPath;
    private String overviewPath;
    private String descriptionPath;
    private String referencesPath;
    
    /**
     * Property for including an ontology diagram (future work)
     */
    private boolean includeDiagram;
    
    private Properties propertyFile = null;
    
    
    //Lode configuration parameters
    private boolean useOwlAPI;
    private boolean useImported;
    private boolean useReasoner;
    private String currentLanguage;
    private HashMap<String,Boolean> languages; //<language,the doc been generated for that lang or not>
    
    private Image logo;
    private Image logoMini;
    
    //for overwriting
    private boolean overwriteAll = false;
    
    //just in case there is an abstract included
    private String abstractSection;
    
    private boolean useW3CStyle;
    
    private String error;//Latest error to show to user via interface.
    
    //add imported ontologies in the doc as well
    private boolean addImportedOntologies;
    private File tmpFolder; //file where different auxiliary resources might be copied to
    private boolean createHTACCESS;
    private boolean createWebVowlVisualization;
    private boolean useLicensius;//optional usage of Licensius service.
    
    /**
     * Variable to keep track of possible errors in the changelog. If there are errors, the 
     * section will not be produced. True by default.
     */
    private boolean changeLogSuccessfullyCreated = true;
    
    public Configuration() {
        initializeConfig();
        try {
            //create a temporal folder with all LODE resources
            tmpFolder = new File("tmp"+new Date().getTime());
            tmpFolder.mkdir();
            WidocoUtils.unZipIt(Constants.LODE_RESOURCES, tmpFolder.getName());
        } catch (Exception ex) {
            System.err.println("Error while creating the temporal file for storing the intermediate Widoco files.");
        }
        propertyFile = new Properties();
        //just in case, we initialize the objects:        
        try{
            URL root = GuiController.class.getProtectionDomain().getCodeSource().getLocation();
            String path = (new File(root.toURI())).getParentFile().getPath();
            loadPropertyFile(path+File.separator+Constants.CONFIG_PATH);
        }catch(URISyntaxException e){
            System.err. println("Error while loading the default property file: " +e.getMessage());
        }
    }

    public File getTmpFile() {
        return tmpFolder;
    }

    
    
    public final void initializeConfig(){
        //initialization of variables (in case something fails)
        abstractSection = "";
        publishProvenance = true;    
        includeAbstract = true;
        includeIntroduction = true;
        includeOverview = true;
        includeDescription = true;
        includeReferences = true;
        includeCrossReferenceSection = true;
        includeAnnotationProperties = false;
        includeNamedIndividuals = true;
        includeIndex = true;
        includeChangeLog = true;
        if(languages==null){
            currentLanguage = "en";
            languages = new HashMap<String, Boolean>();
            languages.put("en", false);
        }
        useW3CStyle = true;//by default
        error = "";
        addImportedOntologies = false;
        createHTACCESS = false;
        useLicensius = false;
        initializeOntology();
    }
    
    private void initializeOntology(){
        //this has to be checked because we might delete the uri of the onto from a previous step.
        if(mainOntologyMetadata==null){
            mainOntologyMetadata = new Ontology();
            mainOntologyMetadata.setNamespaceURI("");
        }
        mainOntologyMetadata.setTitle("");
        mainOntologyMetadata.setReleaseDate("");
        mainOntologyMetadata.setPreviousVersion("");
        mainOntologyMetadata.setThisVersion("");
        mainOntologyMetadata.setLatestVersion("");
        mainOntologyMetadata.setRevision("");
        mainOntologyMetadata.setPublisher(new Agent());
        mainOntologyMetadata.setImportedOntologies(new ArrayList<Ontology>());
        mainOntologyMetadata.setExtendedOntologies(new ArrayList<Ontology>());
        mainOntologyMetadata.setName("");
        mainOntologyMetadata.setNamespacePrefix("");
        License l = new License();
        mainOntologyMetadata.setLicense(l);
        mainOntologyMetadata.setSerializations(new HashMap<String, String>());
        //add default serializations: rdf/xml, n3 and turtle
        mainOntologyMetadata.addSerialization("RDF/XML", "ontology.xml");
        mainOntologyMetadata.addSerialization("TTL", "ontology.ttl");
        mainOntologyMetadata.addSerialization("N-Triples", "ontology.nt");
        mainOntologyMetadata.setCreators(new ArrayList<Agent>());
        mainOntologyMetadata.setContributors(new ArrayList<Agent>());
        mainOntologyMetadata.setCiteAs("");
        mainOntologyMetadata.setDoi("");
        mainOntologyMetadata.setStatus("");
        mainOntologyMetadata.setBackwardsCompatibleWith("");
    }
    
    private void loadPropertyFile(String path){
        try {
            initializeOntology();
            //this forces the property file to be in UTF 8 instead of the ISO
            propertyFile.load(new InputStreamReader(new FileInputStream(path), "UTF-8"));
            //We try to load from the configuration file. If it fails, then we should try to load from the ontology. Then, if it fails, we should ask the user.
            abstractSection = propertyFile.getProperty(Constants.ABSTRACT_SECTION_CONTENT);
            mainOntologyMetadata.setTitle (propertyFile.getProperty(Constants.ONT_TITLE,"Title goes here"));
            mainOntologyMetadata.setReleaseDate(propertyFile.getProperty(Constants.DATE_OF_RELEASE, "Date of release"));
            mainOntologyMetadata.setPreviousVersion(propertyFile.getProperty(Constants.PREVIOUS_VERSION));
            mainOntologyMetadata.setThisVersion(propertyFile.getProperty(Constants.THIS_VERSION_URI));
            mainOntologyMetadata.setLatestVersion(propertyFile.getProperty(Constants.LATEST_VERSION_URI));
            mainOntologyMetadata.setName(propertyFile.getProperty(Constants.ONT_NAME));
            mainOntologyMetadata.setNamespacePrefix(propertyFile.getProperty(Constants.ONT_PREFIX));
            mainOntologyMetadata.setNamespaceURI(propertyFile.getProperty(Constants.ONT_NAMESPACE_URI));
            mainOntologyMetadata.setRevision(propertyFile.getProperty(Constants.ONTOLOGY_REVISION));
            Agent publisher = new Agent();
            publisher.setName(propertyFile.getProperty(Constants.PUBLISHER,""));
            publisher.setURL(propertyFile.getProperty(Constants.PUBLISHER_URI,""));
            publisher.setInstitutionName(propertyFile.getProperty(Constants.PUBLISHER_INSTITUTION, ""));
            publisher.setInstitutionURL(propertyFile.getProperty(Constants.PUBLISHER_INSTITUTION_URI, ""));
            mainOntologyMetadata.setPublisher(publisher);
            String aux = propertyFile.getProperty(Constants.AUTHORS,"");
            String[] names,urls,authorInst, authorInstURI;
            if(!aux.equals("")){
                names = aux.split(";");
                aux = propertyFile.getProperty(Constants.AUTHORS_URI,"");
                urls = aux.split(";");
                aux = propertyFile.getProperty(Constants.AUTHORS_INSTITUTION,"");
                authorInst = aux.split(";");
                aux = propertyFile.getProperty(Constants.AUTHORS_INSTITUTION_URI,"");
                authorInstURI = aux.split(";");
                for(int i =0; i< names.length; i++){
                    Agent a = new Agent();
                    a.setName(names[i]);
                    try{
                        a.setURL(urls[i]);
                    }catch(Exception e){
                        a.setURL("");
                    }
                    try{
                        a.setInstitutionName(authorInst[i]);
                    }catch(Exception e){
                        a.setInstitutionName("");
                    }
                    try{
                        a.setInstitutionURL(authorInstURI[i]);
                    }catch(Exception e){
                        a.setInstitutionURL("");
                    }
                    mainOntologyMetadata.getCreators().add(a);
                }
            }
            aux = propertyFile.getProperty(Constants.CONTRIBUTORS,"");
            if(!aux.equals("")){
                names = aux.split(";");
                aux = propertyFile.getProperty(Constants.CONTRIBUTORS_URI,"");
                urls = aux.split(";");
                aux = propertyFile.getProperty(Constants.CONTRIBUTORS_INSTITUTION,"");
                authorInst = aux.split(";");
                aux = propertyFile.getProperty(Constants.CONTRIBUTORS_INSTITUTION_URI,"");
                authorInstURI = aux.split(";");
                for(int i =0; i< names.length; i++){
                    Agent a = new Agent();
                    a.setName(names[i]);
                    try{
                        a.setURL(urls[i]);
                    }catch(Exception e){
                        a.setURL("");
                    }
                    try{
                        a.setInstitutionName(authorInst[i]);
                    }catch(Exception e){
                        a.setInstitutionName("");
                    }
                    try{
                        a.setInstitutionURL(authorInstURI[i]);
                    }catch(Exception e){
                        a.setInstitutionURL("");
                    }
                    mainOntologyMetadata.getContributors().add(a);
                }
            }
            aux = propertyFile.getProperty(Constants.IMPORTED_ONTOLOGY_NAMES,"");
            names = aux.split(";");
            aux = propertyFile.getProperty(Constants.IMPORTED_ONTOLOGY_URIS,"");
            urls = aux.split(";");
            for(int i =0; i< names.length; i++){
                if(!"".equals(names[i])){
                    Ontology o = new Ontology();
                    o.setName(names[i]);
                    try{
                        o.setNamespaceURI(urls[i]);
                    }catch(Exception e){
                        o.setNamespaceURI("");
                    }
                    mainOntologyMetadata.getImportedOntologies().add(o);
                }
            }
            aux = propertyFile.getProperty(Constants.EXTENDED_ONTOLOGY_NAMES,"");
            names = aux.split(";");
            aux = propertyFile.getProperty(Constants.EXTENDED_ONTOLOGY_URIS,"");
            urls = aux.split(";");
            for(int i =0; i< names.length; i++){
                if(!"".equals(names[i])){
                    Ontology o = new Ontology();
                    o.setName(names[i]);
                    try{
                        o.setNamespaceURI(urls[i]);
                    }catch(Exception e){
                        o.setNamespaceURI("");
                    }
                    mainOntologyMetadata.getExtendedOntologies().add(o);
                }
            }
            mainOntologyMetadata.getLicense().setName(propertyFile.getProperty(Constants.LICENSE_NAME,""));
            mainOntologyMetadata.getLicense().setUrl(propertyFile.getProperty(Constants.LICENSE_URI,""));
            mainOntologyMetadata.getLicense().setIcon(propertyFile.getProperty(Constants.LICENSE_ICON_URL,""));
            mainOntologyMetadata.setStatus(propertyFile.getProperty(Constants.STATUS,"Specification Draft"));
            mainOntologyMetadata.setCiteAs(propertyFile.getProperty(Constants.CITE_AS, ""));
            mainOntologyMetadata.setDoi(propertyFile.getProperty(Constants.DOI, ""));
            mainOntologyMetadata.setBackwardsCompatibleWith(propertyFile.getProperty(Constants.COMPATIBLE, ""));
            //vocabLoadedSerialization = propertyFile.getProperty(TextConstants.deafultSerialization, "RDF/XML");
            String serializationRDFXML = propertyFile.getProperty(Constants.RDF,"");
            if(!"".equals(serializationRDFXML)){
                mainOntologyMetadata.addSerialization("RDF/XML", serializationRDFXML);
            }
            String serializationTTL = propertyFile.getProperty(Constants.TTL,"");
            if(!"".equals(serializationTTL)){
                mainOntologyMetadata.addSerialization("TTL", serializationTTL);
            }
            String serializationN3 = propertyFile.getProperty(Constants.N3,"");
            if(!"".equals(serializationN3)){
                mainOntologyMetadata.addSerialization("N-Triples", serializationN3);
            }
            String serializationJSONLD = propertyFile.getProperty(Constants.JSON,"");
            if(!"".equals(serializationJSONLD)){
                mainOntologyMetadata.addSerialization("JSON-LD", serializationJSONLD);
            }
    	} catch (Exception ex) {
            System.err.println("Error while reading configuration properties "+ex.getMessage());
        }
    }
    
    
    /**
     * Method that given an ontology retrieves the main metadata properties into the configuration.
     * @param o 
     */
    public void loadPropertiesFromOntology(OWLOntology o){
        if(o == null){
            //System.err.println("The ontology is not loaded. Aborting loading metadata...");
            return;
        }
        initializeOntology();
        this.mainOntologyMetadata.setNamespacePrefix("[Ontology NS Prefix]");
        String uri;
        try{
            uri = o.getOntologyID().getOntologyIRI().get().toString();
        }catch( Exception e){
            uri = "[Ontology URI]";
        }
        this.mainOntologyMetadata.setNamespaceURI(uri);
        String versionUri = null;
        try{
            versionUri = o.getOntologyID().getVersionIRI().get().toString();
        }catch( Exception e){
            //versionUri = "[Version URI not provided]"; // if it is not present, do not show it
        }
        //imports of the ontology.
        o.imports().forEach(i->{
            //get name, get URI, add to the config
            Ontology ont = new Ontology();
            ont.setNamespaceURI(i.getOntologyID().getOntologyIRI().get().toString());
            ont.setName(i.getOntologyID().getOntologyIRI().get().getShortForm());
            mainOntologyMetadata.getImportedOntologies().add(ont);
        });
        this.mainOntologyMetadata.setThisVersion(versionUri);
        o.annotations().forEach(a-> completeMetadata(a));
        if(isUseLicensius()){
            String licName;
            String lic = GetLicense.getFirstLicenseFound(mainOntologyMetadata.getNamespaceURI());
            if (!lic.isEmpty()&& !lic.equals("unknown"))
            {
                mainOntologyMetadata.getLicense().setUrl(lic);
                licName = GetLicense.getTitle(lic);
                mainOntologyMetadata.getLicense().setName(licName);
            }
        }
        if(this.mainOntologyMetadata.getName()==null || this.mainOntologyMetadata.getName().equals("")){
            this.mainOntologyMetadata.setName(mainOntologyMetadata.getTitle());
        }
        if(mainOntologyMetadata.getStatus()==null || mainOntologyMetadata.getStatus().equals("")){
            mainOntologyMetadata.setStatus("Ontology Specification Draft");
        }
        //default name if no annotations are found
        if(mainOntologyMetadata.getName()==null || mainOntologyMetadata.getName().equals("")){
            this.mainOntologyMetadata.setName("[Ontology Name]");
        }
    }
    private void completeMetadata(OWLAnnotation a){            
    //this.currentLanguage
        System.out.println(a.toString());
        String propertyName = a.getProperty().getIRI().getIRIString();
        String value;
        String valueLanguage;
        switch (propertyName){
            case Constants.PROP_RDFS_LABEL: 
                try{
                    valueLanguage = a.getValue().asLiteral().get().getLang();
                    value = a.getValue().asLiteral().get().getLiteral();
                    if(this.currentLanguage.equals(valueLanguage)||
                            (mainOntologyMetadata.getName()==null || "".equals(mainOntologyMetadata.getName()))){
                        this.mainOntologyMetadata.setName(value);
                    }                            
                }catch(Exception e){
                    System.err.println("Error while getting ontology label. No literal provided");
                }                        
                break;
            case Constants.PROP_DC_TITLE: case Constants.PROP_DCTERMS_TITLE: case Constants.PROP_SCHEMA_NAME:
                try{
                    valueLanguage = a.getValue().asLiteral().get().getLang();
                    value = a.getValue().asLiteral().get().getLiteral();
                    if(this.currentLanguage.equals(valueLanguage)||
                            (mainOntologyMetadata.getTitle()==null || "".equals(mainOntologyMetadata.getTitle()))){
                        this.mainOntologyMetadata.setTitle(value);
                    }                            
                }catch(Exception e){
                    System.err.println("Error while getting ontology title. No literal provided");
                }                        
                break;
            case Constants.PROP_DCTERMS_ABSTRACT: case Constants.PROP_DC_ABSTRACT: 
                case Constants.PROP_DCTERMS_DESCRIPTION: case Constants.PROP_DC_DESCRIPTION: 
                    case Constants.PROP_SCHEMA_DESCRIPTION: case Constants.PROP_SKOS_NOTE:
                try{
                    valueLanguage = a.getValue().asLiteral().get().getLang();
                    value = a.getValue().asLiteral().get().getLiteral();
                    if(this.currentLanguage.equals(valueLanguage)||
                            (abstractSection==null || "".equals(abstractSection))){
                        abstractSection = value;
                    }                            
                }catch(Exception e){
                    System.err.println("Error while getting ontology abstract. No literal provided");
                }                        
                break;
            case Constants.PROP_DCTERMS_REPLACES: case Constants.PROP_DC_REPLACES: 
                case Constants.PROP_PROV_WAS_REVISION_OF: case Constants.PROP_OWL_PRIOR_VERSION:
                case Constants.PROP_PAV_PREVIOUS_VERSION:
                    value = WidocoUtils.getValueAsLiteralOrURI(a.getValue()); 
                    mainOntologyMetadata.setPreviousVersion(value);
                break;
            case Constants.PROP_OWL_VERSION_INFO: case Constants.PROP_SCHEMA_SCHEMA_VERSION:
                try{
                    value = a.getValue().asLiteral().get().getLiteral();
                    mainOntologyMetadata.setRevision(value);
                }catch(Exception e){
                    System.err.println("Error while getting ontology abstract. No literal provided");
                }
                break;
            case Constants.PROP_VANN_PREFIX:
                value = WidocoUtils.getValueAsLiteralOrURI(a.getValue()); 
                mainOntologyMetadata.setNamespacePrefix(value);
                break; 
            case Constants.PROP_VANN_URI:
                value = WidocoUtils.getValueAsLiteralOrURI(a.getValue()); 
                mainOntologyMetadata.setNamespaceURI(value);
                break;
            case Constants.PROP_DCTERMS_LICENSE: case Constants.PROP_DC_RIGHTS: 
                case Constants.PROP_SCHEMA_LICENSE: case Constants.PROP_CC_LICENSE:
                value = WidocoUtils.getValueAsLiteralOrURI(a.getValue());
                License l = new License();
                if(isURL(value)){
                    l.setUrl(value);
                    l.setName(value);
                }else{
                    l.setName(value);
                }
                mainOntologyMetadata.setLicense(l);
                break;
            case Constants.PROP_DC_CONTRIBUTOR: case Constants.PROP_DCTERMS_CONTRIBUTOR: 
            case Constants.PROP_SCHEMA_CONTRIBUTOR: case Constants.PROP_PAV_CONTRIBUTED_BY:
                case Constants.PROP_DC_CREATOR: case Constants.PROP_DCTERMS_CREATOR: case Constants.PROP_SCHEMA_CREATOR: 
                case Constants.PROP_PAV_CREATED_BY: case Constants.PROP_PROV_ATTRIBUTED_TO:
                    case Constants.PROP_DC_PUBLISHER: case Constants.PROP_DCTERMS_PUBLISHER:
                    case Constants.PROP_SCHEMA_PUBLISER:
                value = WidocoUtils.getValueAsLiteralOrURI(a.getValue());
                Agent g = new Agent();
                if(isURL(value)){
                    g.setURL(value);
                    g.setName(value);
                }else{
                    g.setName(value);
                    g.setURL("");
                }
                switch (propertyName) {
                    case Constants.PROP_DC_CONTRIBUTOR: case Constants.PROP_DCTERMS_CONTRIBUTOR:
                    case Constants.PROP_SCHEMA_CONTRIBUTOR: case Constants.PROP_PAV_CONTRIBUTED_BY:
                        mainOntologyMetadata.getContributors().add(g);
                        break;
                    case Constants.PROP_DC_CREATOR: case Constants.PROP_DCTERMS_CREATOR:
                    case Constants.PROP_PAV_CREATED_BY: case Constants.PROP_PROV_ATTRIBUTED_TO:
                    case Constants.PROP_SCHEMA_CREATOR:
                        mainOntologyMetadata.getCreators().add(g);
                        break;
                    default:
                        mainOntologyMetadata.setPublisher(g);
                        break;
                }
                break;
            case Constants.PROP_DCTERMS_CREATED: case Constants.PROP_SCHEMA_DATE_CREATED:
                case Constants.PROP_PROV_GENERATED_AT_TIME: case Constants.PROP_PAV_CREATED_ON:
                if(mainOntologyMetadata.getReleaseDate()==null || "".equals(mainOntologyMetadata.getReleaseDate())){
                    value = a.getValue().asLiteral().get().getLiteral();
                    mainOntologyMetadata.setReleaseDate(value);
                }
                break;
            case Constants.PROP_DCTERMS_MODIFIED: case Constants.PROP_SCHEMA_DATE_MODIFIED:
                value = a.getValue().asLiteral().get().getLiteral();
                mainOntologyMetadata.setReleaseDate(value);
                break;
            case Constants.PROP_DCTERMS_BIBLIOGRAPHIC_CIT: case Constants.PROP_SCHEMA_CITATION:
                value = WidocoUtils.getValueAsLiteralOrURI(a.getValue());
                mainOntologyMetadata.setCiteAs(value);
                break;
            case Constants.PROP_BIBO_DOI:
                value = WidocoUtils.getValueAsLiteralOrURI(a.getValue());
                mainOntologyMetadata.setDoi(value);
                break;
            case Constants.PROP_BIBO_STATUS:
                try{
                    value = a.getValue().asLiteral().get().getLiteral();
                    mainOntologyMetadata.setStatus(value);
                }catch(Exception e){
                    System.err.println("Error while getting the status. No literal provided");
                }
                break;
            case Constants.PROP_OWL_BACKWARDS_COMPATIBLE:
                value = WidocoUtils.getValueAsLiteralOrURI(a.getValue());
                mainOntologyMetadata.setBackwardsCompatibleWith(value);
                break;
        }
    }
//    public void loadPropertiesFromOntology(OntModel m){
//        //maybe there are some properties regarding the version of the uri that I am missing...
//        if(m == null){
//            System.err.println("The ontology could not be read...");
//            return;
//        }
//        initializeOntology();
//        this.mainOntologyMetadata.setName("[Ontology Name]");
//        this.mainOntologyMetadata.setNamespacePrefix("[Ontology NS Prefix]");
//        this.mainOntologyMetadata.setNamespaceURI("[Ontology URI]");
//        //we assume only one ontology per file.
//        try{
//            OntResource onto = m.getOntClass("http://www.w3.org/2002/07/owl#Ontology").listInstances().next();
//            this.mainOntologyMetadata.setNamespaceURI(onto.getURI());
//            this.mainOntologyMetadata.setName(onto.getLocalName());
//            Iterator it = onto.listProperties();
//            String propertyName, value;
//            while(it.hasNext()){
//                Statement s = (Statement) it.next();
//                propertyName = s.getPredicate().getLocalName();
//                try{
//                    value = s.getObject().asLiteral().getString();
//                }catch(Exception e){
//                    value = s.getObject().asResource().getURI();
//                }
//    //            System.out.println(propertyName + " " + value);
//                // fill in the properties here.
//                if(propertyName.equals("label")){
//                    this.mainOntologyMetadata.setName(value);
//                }else
//                if(propertyName.equals("abstract")){
//                    this.abstractSection = value;
//                }else
//                if(propertyName.equals("title")){
//                    mainOntologyMetadata.setTitle(value);
//                }else
//                if(propertyName.equals("replaces")||propertyName.equals("wasRevisionOf")||propertyName.equals("priorVersion")){
//                    mainOntologyMetadata.setPreviousVersion(value);
//                }else
//                if(propertyName.equals("versionInfo")){
//                    mainOntologyMetadata.setRevision(value);
//                }else
//                if(propertyName.equals("versionIRI")){
//                    mainOntologyMetadata.setThisVersion(value);
//                }else
//                if(propertyName.equals("preferredNamespacePrefix")){
//                    this.mainOntologyMetadata.setNamespacePrefix(value);
//                }else
//                if(propertyName.equals("preferredNamespaceUri")){
//                    this.mainOntologyMetadata.setNamespaceURI(value);                
//                }else
//                //we deal with the license by invoking the licensius service
//                //(only if we cannot find it)
//                if(propertyName.equals("license")){
//                    License l = new License();
//                    if(isURL(value)){
//                        l.setUrl(value);
//                    }else{
//                        l.setName(value);
//                    }
//                    mainOntologyMetadata.setLicense(l);
//                }else
//                if(propertyName.equals("creator")||propertyName.equals("contributor")
//                        ||propertyName.equals("publisher")){
//                    Agent g = new Agent();
//                    if(isURL(value)){
//                        g.setURL(value);
//                        g.setName(value);
//                    }else{
//                        g.setName(value);
//                        g.setURL("");
//                    }
//                    if(propertyName.equals("creator")){
//                        mainOntologyMetadata.getCreators().add(g);
//                    }else if (propertyName.equals("contributor")){
//                        mainOntologyMetadata.getContributors().add(g);
//                    }else{
//                        mainOntologyMetadata.setPublisher(g);
//                    }
//                }else
//                if(propertyName.equals("created")){
//                    if(mainOntologyMetadata.getReleaseDate()==null || "".equals(mainOntologyMetadata.getReleaseDate())){
//                        mainOntologyMetadata.setReleaseDate(value);
//                    }
//                }else
//                if(propertyName.equals("modified")){
//                    mainOntologyMetadata.setReleaseDate(value);
//                }else
//                if(propertyName.equals("bibliographicCitation")){
//                    mainOntologyMetadata.setCiteAs(value);
//                }else
//                if(propertyName.equals("doi")||propertyName.equals("hasDOI")){
//                    mainOntologyMetadata.setDoi(value);
//                }else
//                if(propertyName.equals("backwardsCompatibleWith")){
//                    mainOntologyMetadata.setBackwardsCompatibleWith(value);
//                }else
//                if(propertyName.equals("status")){
//                    mainOntologyMetadata.setStatus(value);
//                }else
//                if(propertyName.equals("imports")){
//                    Ontology o = new Ontology();
//                    if(isURL(value)){
//                        o.setNamespaceURI(value);
//                        o.setName(value);
//                    }else{
//                        o.setName(value);
//                        o.setNamespaceURI("");
//                    }
//                    mainOntologyMetadata.getImportedOntologies().add(o);
//                }
//                //to do: if property is comment and abstract is null, then complete abstract.
//            }
//        if(this.mainOntologyMetadata.getName()==null || this.mainOntologyMetadata.getName().equals("")){
//            this.mainOntologyMetadata.setName(mainOntologyMetadata.getTitle());
//        }
//        if(mainOntologyMetadata.getStatus()==null || mainOntologyMetadata.getStatus().equals("")){
//            mainOntologyMetadata.setStatus("Ontology Specification Draft");
//        }
//        }catch(Exception e){
//            System.err.println("No ontology declared. Ignoring properties");
//        }
//        if(isUseLicensius()){
//            String licName;
//            String lic = GetLicense.getFirstLicenseFound(mainOntologyMetadata.getNamespaceURI());
//            if (!lic.isEmpty()&& !lic.equals("unknown"))
//            {
//                mainOntologyMetadata.getLicense().setUrl(lic);
//                licName = GetLicense.getTitle(lic);
//                mainOntologyMetadata.getLicense().setName(licName);
//            }
//        }
//        
//        System.out.println("Loaded properties from ontology");
//    }
    
    private boolean isURL(String s){
        try{
            URL url = new URL(s);
            url.toURI();
            return true;
        }catch(MalformedURLException e){
            return false;
        } catch (URISyntaxException e) {
            return false;
        }
    }

    public void setOverwriteAll(boolean s){
        this.overwriteAll = s;
    }
    
    public boolean getOverWriteAll(){
        return overwriteAll;
    }
    
    public boolean isFromFile() {
        return fromFile;
    }
    
    public void reloadPropertyFile(String path){
        this.loadPropertyFile(path);
    }

    /**
     * returns the path where the documentation will be generated.
     * @return documentation path
     */
    public String getDocumentationURI() {
        return documentationURI;
    }

    public Ontology getMainOntology() {
        return mainOntologyMetadata;
    }

    public String getOntologyPath() {
        return ontologyPath;
    }

    public String getOntologyURI() {
        return this.mainOntologyMetadata.getNamespaceURI();
    }

    public boolean isPublishProvenance() {
        return publishProvenance;
    }

    public boolean isChangeLogSuccessfullyCreated() {
        return changeLogSuccessfullyCreated;
    }

    public void setChangeLogSuccessfullyCreated(boolean changeLogSuccessfullyCreated) {
        this.changeLogSuccessfullyCreated = changeLogSuccessfullyCreated;
    }
    
    
    

    public void setDocumentationURI(String documentationURI) {
        this.documentationURI = documentationURI;
    }

    public void setMainOntology(Ontology mainOntology) {
        this.mainOntologyMetadata = mainOntology;
    }

    public void setOntologyPath(String ontologyPath) {
        this.ontologyPath = ontologyPath;
    }

    public void setOntologyURI(String ontologyURI) {
        this.mainOntologyMetadata.setNamespaceURI(ontologyURI);
    }

    public void setPublishProvenance(boolean publishProvenance) {
        this.publishProvenance = publishProvenance;
    }

    public String getAbstractPath() {
        return abstractPath;
    }

    public String getDescriptionPath() {
        return descriptionPath;
    }

    public String getIntroductionPath() {
        return introductionPath;
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

    public boolean isIncludeIndex() {
        return includeIndex;
    }

    public boolean isIncludeChangeLog() {
        return includeChangeLog;
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

    public void setIncludeIndex(boolean includeIndex) {
        this.includeIndex = includeIndex;
    }

    public void setIncludeChangeLog(boolean includeChangeLog) {
        this.includeChangeLog = includeChangeLog;
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
    
    public void setFromFile(boolean fromFile) {
        this.fromFile = fromFile;
    }
    
    public String getCurrentLanguage() {
        return currentLanguage;
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

    public void setCurrentLanguage(String language) {
        this.currentLanguage = language;
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
    
    public Image getWidocoLogo(){
        if(logo == null){
            loadWidocoLogos();
        }
        return this.logo;
    }
    
    public Image getWidocoLogoMini(){
        if(logoMini == null){
            loadWidocoLogos();
        }
        return this.logoMini;
    }
    
    private void loadWidocoLogos(){
        try {
            this.logo = ImageIO.read(ClassLoader.getSystemResource("logo/logo2.png"));
            this.logoMini = ImageIO.read(ClassLoader.getSystemResource("logo/logomini100.png"));
        } catch (IOException e) {
            System.err.println("Error loading the logo :( "+e.getMessage());
        }
    }

    public String getAbstractSection() {
        return abstractSection;
    }

    public void setAbstractSection(String abstractSection) {
        this.abstractSection = abstractSection;
    }

    public boolean isIncludeAnnotationProperties() {
        return includeAnnotationProperties;
    }
    
    public void setIncludeAnnotationProperties(boolean includeAnnotationProperties) {
        this.includeAnnotationProperties = includeAnnotationProperties;
    }

    public boolean isIncludeNamedIndividuals() {
        return includeNamedIndividuals;
    }

    public void setIncludeNamedIndividuals(boolean includeNamedIndividuals) {
        this.includeNamedIndividuals = includeNamedIndividuals;
    }
    
    public void addLanguageToGenerate(String lang){
        if(!this.languages.containsKey(lang)){
            this.languages.put(lang, false);
            if(currentLanguage.equals("")){
                currentLanguage = lang;
            }
        }   
    }
    
    public void removeLanguageToGenerate(String lang){
        if(this.languages.containsKey(lang) && !languages.get(lang)){
            this.languages.remove(lang);
            if(currentLanguage.equals(lang)){
                ArrayList<String> aux = getRemainingToGenerateDoc();
                if(!aux.isEmpty()){
                    currentLanguage = getRemainingToGenerateDoc().get(0);
                }else{
                    currentLanguage = "";
                }
                
            }
        }   
    }
    
    public ArrayList<String> getLanguagesToGenerateDoc(){
        Iterator<String> it = languages.keySet().iterator();
        ArrayList<String> s = new ArrayList<String>();
        while (it.hasNext()){
            s.add(it.next());
        }
        return s;
    }
    
    public ArrayList<String> getRemainingToGenerateDoc(){
        Iterator<String> it = languages.keySet().iterator();
        ArrayList<String> s = new ArrayList<String>();
        while (it.hasNext()){
            String nextLang = it.next();
            if(!languages.get(nextLang)){
                s.add(nextLang);
            }
        }
        return s;
    }
    
    public String getNextLanguageToGenerateDoc(){
        if(!"".equals(currentLanguage) && languages.get(currentLanguage)){
            ArrayList<String> aux = getRemainingToGenerateDoc();
            if(aux.isEmpty()){
                return null;
            }
            else{
                currentLanguage = aux.get(0);
            }
        }
        return currentLanguage;
    }
    
    public void vocabularySuccessfullyGenerated(){
        languages.put(currentLanguage, true);
        System.out.println("Doc successfully generated for lang "+ currentLanguage);
        currentLanguage = getNextLanguageToGenerateDoc();
    }
    
      public boolean isUseW3CStyle() {
        return useW3CStyle;
    }

    public void setUseW3CStyle(boolean useW3CStyle) {
        this.useW3CStyle = useW3CStyle;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public boolean isAddImportedOntologies() {
        return addImportedOntologies;
    }

    public void setAddImportedOntologies(boolean addImportedOntologies) {
        this.addImportedOntologies = addImportedOntologies;
    }


    public boolean isCreateHTACCESS() {
        return createHTACCESS;
    }

    public void setCreateHTACCESS(boolean createHTACCESS) {
        this.createHTACCESS = createHTACCESS;
    }

    public boolean isCreateWebVowlVisualization() {
        return createWebVowlVisualization;
    }

    public void setCreateWebVowlVisualization(boolean createWebVowlVisualization) {
        this.createWebVowlVisualization = createWebVowlVisualization;
    } 

    public boolean isUseLicensius() {
        return useLicensius;
    }

    public void setUseLicensius(boolean useLicensius) {
        this.useLicensius = useLicensius;
    }
    
    
    
    
}
