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
package widoco.entities;

//import com.hp.hpl.jena.ontology.OntModel;
import java.util.ArrayList;
import java.util.HashMap;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyManager;

/**
 * Class for representing the ontology objects
 * @author Daniel Garijo
 */
public class Ontology {
    /**
     * Name of the ontology
     */
    private String name;
    /**
     * Namespace prefix of the ontology
     */
    private String namespacePrefix;
    /**
     * Namespace URI of the ontology
     */
    private String namespaceURI;
    /**
     * Available serializations of the ontology.
     * Key: serialization type
     * Value: Serialization path/URI
     */ 
    private HashMap<String,String> serializations;
    /**
     * License of the ontology. A license may have name, uri and logo
     */
    private License license;
    /**
     * Creators of the ontology
     */
    private ArrayList<Agent> creators;
    /**
     * Contributors of the ontology
     */
    private ArrayList<Agent> contributors;
    /**
     * Publisher of the ontology
     */
    private Agent publisher;
    /**
     * Previous version uri of the ontology
     */
    private String previousVersion;
    /**
     * This version uri of the ontology
     */
    private String thisVersion;
    /**
     * Latest version of the ontology
     */
    private String latestVersion;
    /**
     * Version number of the ontology
     */
    private String revision;
    /**
     * Imported ontologies used in the current ontology
     */
    private ArrayList<Ontology> importedOntologies;
    /**
     * Extended ontologies used in the current one
     */
    private ArrayList<Ontology> extendedOntologies;
    /**
     * OntModel of the ontology being documented. 
     */
//    private OntModel mainOntologyModel;
    /**
     * In-Memory representation of the ontology being documented (OWLAPI)
     */
    private OWLOntology mainOntology;
    /**
     * In-Memory manager of the ontology being documented (OWLAPI
     */
    private OWLOntologyManager mainOntologyManager;
    /**
     * Title of the ontology. Different from the name
     */
    private String title;
    /**
     * Creation date of the ontology
     */
    private String creationDate;
    /**
     * Modification date of the ontology
     */
    private String modifiedDate;
    /**
     * Status of the ontology (e.g., specification draft, official release, etc.)
     */
    private String status; 
    /**
     * How to cite the ontology (paper or publication that describes it)
     */
    private String citeAs;
    /**
     * DOI of the ontology, if available
     */
    private String doi;
    
    /**
     * Compatible with
     */
    private String backwardsCompatibleWith;
    
    /**
     * owl:incompatibleWith
     */
    private String incompatibleWith;

    /**
     * images used to illustrate the ontology
     */
    private ArrayList<String> images;

    /**
     * Issued date
     */
    private String issuedDate;

    private ArrayList<Agent> funders;

    private ArrayList<String> fundingGrants;

    private String description;

    private ArrayList<String> sources;

    /**
     * See also resources (list)
     */
    private ArrayList<String> seeAlso;

    private String logo;



    public Ontology() {
        this.images = new ArrayList<>();
    }

    public Ontology(String name, String namespacePrefix, String namespaceURI) {
        this.name = name;
        this.namespacePrefix = namespacePrefix;
        this.namespaceURI = namespaceURI;
        this.images = new ArrayList<>();
    }

    public String getName() {
        return name;
    }
    
    public String getNamespacePrefix() {
        return namespacePrefix;
    }

    public String getNamespaceURI() {
        return namespaceURI;
    }
    
    public HashMap<String, String> getSerializations() {
        return serializations;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNamespaceURI(String namespaceURI) {
        this.namespaceURI = namespaceURI;
    }

    public void setNamespacePrefix(String namespacePrefix) {
        this.namespacePrefix = namespacePrefix;
    }
    
    public boolean isHashOntology(){
        return !namespaceURI.endsWith("/");
    }
   
    public License getLicense() {
        return license;
    }
    
    public void setLicense(License license) {
        this.license = license;
    }
    
    public ArrayList<Agent> getContributors() {
        return contributors;
    }
    
    public void setContributors(ArrayList<Agent> contributors) {
        this.contributors = contributors;
    }

    public ArrayList<Agent> getCreators() {
        return creators;
    }

    public void setCreators(ArrayList<Agent> creators) {
        this.creators = creators;
    }
    
    /**
     * Method that adds a serialization to the supported serialization arraylist of the vocabulary
     * @param serializationName
     * @param serializationURI 
     */
    public void addSerialization(String serializationName, String serializationURI){
        serializations.put(serializationName, serializationURI);
        
    }   
    
    public void setSerializations(HashMap<String, String> serializations) {
        this.serializations = serializations;
    }
     
    public String getCiteAs() {
        return citeAs;
    }

    public void setCiteAs(String citeAs) {
        this.citeAs = citeAs;
    }
    
    public String getDoi() {
        return doi;
    }
    
    public void setDoi(String doi) {
        this.doi = doi;
    }
     
    public ArrayList<Ontology> getExtendedOntologies() {
        return extendedOntologies;
    }
    
    public void setExtendedOntologies(ArrayList<Ontology> extendedOntologies) {
        this.extendedOntologies = extendedOntologies;
    }

    public String getRevision() {
        return revision;
    }
    
    public void setRevision(String revision) {
        this.revision = revision;
    }


    public String getLatestVersion() {
        return latestVersion;
    }
    
    public void setLatestVersion(String latestVersion) {
        this.latestVersion = latestVersion;
    }
    
    public String getPreviousVersion() {
        return previousVersion;
    }
    
    public void setPreviousVersion(String previousVersion) {
        this.previousVersion = previousVersion;
    }

    public String getThisVersion() {
        return thisVersion;
    }
    
    public void setThisVersion(String thisVersion) {
        this.thisVersion = thisVersion;
    }

    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        if(title==null) this.title= "Untitled ontology";
        else this.title = title;
    }

    public String getCreationDate() {
        return creationDate;
    }
    
    public void setCreationDate(String releaseDate) {
        this.creationDate = releaseDate;
    }

    public String getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(String modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getIssuedDate(){ return issuedDate;}

    public void setIssuedDate(String issuedDate){ this.issuedDate = issuedDate;}
    
    public ArrayList<Ontology> getImportedOntologies() {
        return importedOntologies;
    }
    
    public void setImportedOntologies(ArrayList<Ontology> importedOntologies) {
        this.importedOntologies = importedOntologies;
    }
    
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
   
    /**
     * Getter for the in-memory ontology representation.
     * @return 
     */
    public OWLOntology getOWLAPIModel(){
        return this.mainOntology;
    }
    
    public OWLOntologyManager getOWLAPIOntologyManager(){
        return this.mainOntologyManager;
    }
    
    public void setMainOntology(OWLOntology o){
        this.mainOntology = o;
    }
    
    public void setMainOntologyManager(OWLOntologyManager m){
        this.mainOntologyManager = m;
    }
    
    public Agent getPublisher() {
        return publisher;
    }

    public void setPublisher(Agent publisher) {
        this.publisher = publisher;
    }

    public String getBackwardsCompatibleWith() {
        return backwardsCompatibleWith;
    }

    public void setBackwardsCompatibleWith(String backwardsCompatibleWith) {
        this.backwardsCompatibleWith = backwardsCompatibleWith;
    }

    public String getIncompatibleWith() {
        return incompatibleWith;
    }

    public void setIncompatibleWith(String incompatibleWith) {
        this.incompatibleWith = incompatibleWith;
    }

    public ArrayList<String> getImages(){
        return images;
    }

    public void addImage(String image){
        this.images.add(image);
    }

    public void setImages(ArrayList<String> images){
        this.images = images;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ArrayList<Agent> getFunders() {
        return funders;
    }

    public void setFunders(ArrayList<Agent> funders) {
        this.funders = funders;
    }
    public void addFunder(Agent funder) {
        if (funders == null) {
            funders = new ArrayList<>();
        }
        this.funders.add(funder);
    }

    public ArrayList<String> getFundingGrants() {
        return fundingGrants;
    }

    public void addFunding(String funding) {
        if (fundingGrants == null){
            fundingGrants = new ArrayList<>();
        }
        this.fundingGrants.add(funding);
    }

    public void setFundingGrants(ArrayList<String> fundingGrants) {
        this.fundingGrants = fundingGrants;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public ArrayList<String> getSeeAlso() {
        return seeAlso;
    }

    public void setSeeAlso(ArrayList<String> seeAlso) {
        this.seeAlso = seeAlso;
    }

    public ArrayList<String> getSources() {
        return sources;
    }

    public void setSources(ArrayList<String> sources) {
        this.sources = sources;
    }
}
