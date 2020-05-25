package diff;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;


import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.*;
import org.semanticweb.owlapi.search.EntitySearcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import widoco.Configuration;


/**
 * @author James Malone
 * @version 1.02       
 *          Use the CompareOntologies class and subsequent doFindAllChanges methods to invoke a diff
 *          between two ontologies.
 *          Diff results can be output to xml file using the writeDiffAsXMLFile method
 * 
 *
 * NOTICE:
 * @author Daniel Garijo
 * Code adapted to Widoco by Daniel Garijo (heavily changed)
 * The changes made to the original bubastis code have been made so the original tool can be used
 * within Widoco without having to invoke bubastis through the command line. They are summarized as follows:
 * - Simplified the original code removing unused constructors.
 * - Refined the changes among two classes (now it will return classes with different labels).
 * - Added change tracking of properties and data properties.
 * Original bubastis code has been obtained from: https://github.com/EBISPOT/bubastis
 */
public class CompareOntologies {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

    //classes
    private ArrayList<OWLAxiomInfo> modifiedClasses = new ArrayList<>();
    private ArrayList<OWLAxiomInfo> newClasses = new ArrayList<>();
    private ArrayList<OWLAxiomInfo> deletedClasses = new ArrayList<>();
    //properties
    private ArrayList<OWLAxiomInfo> modifiedProperties = new ArrayList<>();
    private ArrayList<OWLAxiomInfo> newProperties = new ArrayList<>();
    private ArrayList<OWLAxiomInfo> deletedProperties = new ArrayList<>();
    //data properties
    private ArrayList<OWLAxiomInfo> modifiedDataProperties = new ArrayList<>();
    private ArrayList<OWLAxiomInfo> newDataProperties = new ArrayList<>();
    private ArrayList<OWLAxiomInfo> deletedDataProperties = new ArrayList<>();
    
    private String oldVersion, newVersion;

    /**
     * @param oldOntologyLocation     location of the first ontology to be compared (the older ontology in most cases)
     * @param c     Configuration where the information of the current ontology is loaded
     * @throws java.lang.Exception if the ontology could not be loaded
     */
    public CompareOntologies(String oldOntologyLocation, Configuration c) throws Exception {
        //Create 2 OWLOntologyManager which manages a set of ontologies
        OWLOntologyManager manager1 = OWLManager.createOWLOntologyManager();
        OWLOntology ontology1;
        try {
            ontology1= manager1.loadOntologyFromOntologyDocument(new File(oldOntologyLocation));
            logger.info("old ontology version loaded");
            doFindAllChanges(ontology1, c.getMainOntology().getOWLAPIModel());
        } catch (Exception e) {
            logger.error("Error while loading the older version of the ontology");
            throw e;
        }
    }


    /**
     * Perform diff on two ontologies supplying the two OWLOntologyManager classes and
     * the two OWLOntology classes which have the ontologies pre-loaded
     *
     * @param ont1     first ontology to be compared (the older ontology in most cases)
     * @param ont2     second ontology to compare to ont1 (the newer ontology in most cases)
     */
    private void doFindAllChanges(OWLOntology ont1, OWLOntology ont2) {
        this.oldVersion = ont1.getOntologyID().getOntologyIRI().toString();
        this.newVersion = ont2.getOntologyID().getOntologyIRI().toString();

        //this.modifiedClasses = compareAllClassAxioms(manager1, ont1, manager2, ont2);
        this.modifiedClasses = compareAllClassAxioms(ont1, ont2);
        this.newClasses = findNewClasses( ont1, ont2);
        this.deletedClasses = findDeletedClasses(ont1,  ont2);
        
        this.modifiedProperties = compareAllObjectPropertyAxioms(ont1,ont2);
        this.newProperties = findNewProperties(ont1, ont2);
        this.deletedProperties = findDeletedProperties(ont1, ont2);
        
        this.modifiedDataProperties = compareAllDataPropertyAxioms(ont1, ont2);
        this.newDataProperties = findNewDataProperties(ont1, ont2);
        this.deletedDataProperties = findDeletedDataProperties(ont1, ont2);
    }


    /**
     * Method for walking through all the classes in a given ontology and
     * comparing with classes in another given ontology and identifying
     * differences in axioms between any two identical classes - identical here
     * to mean having same class URI
     *
     * @param ont1     first ontology to be compared (the older ontology in most cases)
     * @param ont2     second ontology to compare to ont1 (the newer ontology in most cases)
     * @return all the axioms that have changed in a class.
     */
    private ArrayList<OWLAxiomInfo> compareAllClassAxioms(OWLOntology ont1, OWLOntology ont2) {

        ArrayList<OWLAxiomInfo> classDifferences = new ArrayList<OWLAxiomInfo>();
        //get all classes from first ontology and walk through them
        for (OWLClass ont1Class : ont1.getClassesInSignature()) {
            //find the current class on the second ontology. Compare them.
            if (ont2.containsClassInSignature(ont1Class.getIRI())) {
                OWLAxiomInfo tempDiffs = this.getDifferences(ont1Class.getIRI(), 
                        new HashSet<Object>(ont1.getAxioms(ont1Class)), 
                            new HashSet<Object>(ont2.getAxioms(ont1Class)));
                //differences in annotations
                OWLAxiomInfo tempDiffs2 = this.getDifferences(ont1Class.getIRI(), 
                        EntitySearcher.getAnnotationAssertionAxioms(ont1Class,ont1).collect(Collectors.toSet()),
                            EntitySearcher.getAnnotationAssertionAxioms(ont1Class,ont2).collect(Collectors.toSet()));
//                        new HashSet<OWLAxiom>(ont1Class.getAnnotationAssertionAxioms(ont1)), 
//                            new HashSet<OWLAxiom>(ont1Class.getAnnotationAssertionAxioms(ont2)));
                //merge sets.
                tempDiffs.addDeleteChangeAxioms(tempDiffs2.getDeletedAxioms());
                tempDiffs.addNewChangeAxioms(tempDiffs2.getNewAxioms());
                if (!tempDiffs.isEmpty()){
                    classDifferences.add(tempDiffs);
                }
            }
        }
        return classDifferences;
    }
    
    /**
     * Method designed to track the changes in the property axioms of the ontologies
     * @param ont1 old version of the ontology
     * @param ont2 new version of the ontology
     * @return 
     */
    private ArrayList<OWLAxiomInfo> compareAllObjectPropertyAxioms(OWLOntology ont1, OWLOntology ont2) {

        ArrayList<OWLAxiomInfo> propertyDifferences = new ArrayList<OWLAxiomInfo>();
        //get all classes from first ontology and walk through them
        for (OWLObjectProperty ont1Property : ont1.getObjectPropertiesInSignature()) {
            //find the current class on the second ontology. Compare them.
            if (ont2.containsObjectPropertyInSignature(ont1Property.getIRI())) {
                OWLAxiomInfo tempDiffs = this.getDifferences(ont1Property.getIRI(), 
                        new HashSet<Object>(ont1.getAxioms(ont1Property)), 
                            new HashSet<Object>(ont2.getAxioms(ont1Property)));
                //differences in annotations
                OWLAxiomInfo tempDiffs2 = this.getDifferences(ont1Property.getIRI(),
                        EntitySearcher.getAnnotationAssertionAxioms(ont1Property, ont1).collect(Collectors.toSet()),
                            EntitySearcher.getAnnotationAssertionAxioms(ont1Property, ont2).collect(Collectors.toSet()));
//                        new HashSet<Object>(ont1Property.getAnnotationAssertionAxioms(ont1)), 
//                            new HashSet<Object>(ont1Property.getAnnotationAssertionAxioms(ont2)));
                //merge sets.
                tempDiffs.addDeleteChangeAxioms(tempDiffs2.getDeletedAxioms());
                tempDiffs.addNewChangeAxioms(tempDiffs2.getNewAxioms());
                if (!tempDiffs.isEmpty()){
                    propertyDifferences.add(tempDiffs);
                }
            }
        }
        return propertyDifferences;
    }
    
    /**
     * Method designed to track the changes in the data property axioms of the ontologies
     * @param ont1 old version of the ontology
     * @param ont2 new version of the ontology
     * @return 
     */
    private ArrayList<OWLAxiomInfo> compareAllDataPropertyAxioms(OWLOntology ont1, OWLOntology ont2) {

        ArrayList<OWLAxiomInfo> propertyDifferences = new ArrayList<OWLAxiomInfo>();
        //get all classes from first ontology and walk through them
        for (OWLDataProperty ont1Property : ont1.getDataPropertiesInSignature()) {
            //find the current class on the second ontology. Compare them.
            if (ont2.containsDataPropertyInSignature(ont1Property.getIRI())) {
                OWLAxiomInfo tempDiffs = this.getDifferences(ont1Property.getIRI(), 
                        new HashSet<Object>(ont1.getAxioms(ont1Property)), 
                            new HashSet<Object>(ont2.getAxioms(ont1Property)));
                //differences in annotations
                OWLAxiomInfo tempDiffs2 = this.getDifferences(ont1Property.getIRI(),
                        EntitySearcher.getAnnotationAssertionAxioms(ont1Property, ont1).collect(Collectors.toSet()),
                            EntitySearcher.getAnnotationAssertionAxioms(ont1Property, ont2).collect(Collectors.toSet()));
//                        new HashSet<Object>(ont1Property.getAnnotationAssertionAxioms(ont1)), 
//                            new HashSet<Object>(ont1Property.getAnnotationAssertionAxioms(ont2)));
                //merge sets.
                tempDiffs.addDeleteChangeAxioms(tempDiffs2.getDeletedAxioms());
                tempDiffs.addNewChangeAxioms(tempDiffs2.getNewAxioms());
                if (!tempDiffs.isEmpty()){
                    propertyDifferences.add(tempDiffs);
                }
            }
        }
        return propertyDifferences;
    }
    
    /**
     * Method to get the different axioms between two sets.
     * @param entity the entity we want to track on each set.
     * @param setOnto1 the set of axioms on ontology 1
     * @param setOnto2 the set of axioms on ontology 2
     * @return 
     */
    private OWLAxiomInfo getDifferences(IRI entity, Set<Object>setOnto1, Set<Object>setOnto2){
        OWLAxiomInfo tempDiffs = new OWLAxiomInfo(entity, null, null);
        if(!setOnto1.equals(setOnto2)){
            Set<Object> newChanges = new HashSet<Object>(setOnto2);
            newChanges.removeAll(setOnto1);

            Set<Object> deletedChanges = new HashSet<Object>(setOnto1);
            deletedChanges.removeAll(setOnto2);

            tempDiffs.addNewChangeAxioms(newChanges);
            tempDiffs.addDeleteChangeAxioms(deletedChanges);
        }
        return tempDiffs;
    }


    /**
     * method to find classes that have been deleted, that is classes that appear
     * in ontology 1 but not in ontology 2. It chains to the findNewClasses and
     * simply reverses the order, i.e. classes in ontology 1 but not in ontology 2
     *
     * @param ont1     first ontology to be compared (the older ontology in most cases)
     * @param ont2     second ontology to compare to ont1 (the newer ontology in most cases)
     * @return axioms from deleted classes
     */
    private ArrayList<OWLAxiomInfo> findDeletedClasses(OWLOntology ont1, OWLOntology ont2) {

        return findNewClasses(ont2, ont1);

    }
    /**
     * Method to find all the deleted properties, i.e., those that appear in ont2 and do not
     * appear on on1
     * @param ont1 old version of the ontology
     * @param ont2 new version of the ontology
     * @return 
     */
    private ArrayList<OWLAxiomInfo> findDeletedProperties(OWLOntology ont1, OWLOntology ont2) {

        return findNewProperties(ont2, ont1);

    }
    
    /**
     * Method to find all the deleted data properties, i.e., those that appear in ont2 and do not
     * appear on on1
     * @param ont1 old version of the ontology
     * @param ont2 new version of the ontology
     * @return 
     */
    private ArrayList<OWLAxiomInfo> findDeletedDataProperties(OWLOntology ont1, OWLOntology ont2) {

        return findNewDataProperties(ont2, ont1);

    }


    /**
     * method to find classes that are 'new', that is classes that appear
     * in ontology 2 but not in ontology 1
     *
     * @param ont1     first ontology to be compared (the older ontology in most cases)
     * @param ont2     second ontology to compare to ont1 (the newer ontology in most cases)
     * @return 
     */
    private ArrayList<OWLAxiomInfo> findNewClasses(OWLOntology ont1, OWLOntology ont2) {

        ArrayList<OWLAxiomInfo> newC = new ArrayList<OWLAxiomInfo>();
        //get all classes from 2nd ontology and walk through them
        for (OWLClass ont2Class : ont2.getClassesInSignature()) {
            //if there is no reference in ontology 1 to the class in ontoloy 2 then it's new
            if (!ont1.containsClassInSignature(ont2Class.getIRI())) {
                Set<Object> newClassAxiomsSet = new HashSet<Object>(ont2.getAxioms(ont2Class));
                //create information for the new class
                OWLAxiomInfo tempNewClass = new OWLAxiomInfo(ont2Class.getIRI(), newClassAxiomsSet,null);
                newC.add(tempNewClass);
            }
        }
        return newC;

    }
    
    /**
     * Method to find properties that are new, i.e., that appear in ont2 but not in ont1
     * @param ont1 old version of the ontology
     * @param ont2 new version of the ontology
     * @return 
     */
    private ArrayList<OWLAxiomInfo> findNewProperties(OWLOntology ont1, OWLOntology ont2) {
        ArrayList<OWLAxiomInfo> newC = new ArrayList<OWLAxiomInfo>();
        for (OWLObjectProperty ont2Prop : ont2.getObjectPropertiesInSignature()) {
            if (!ont1.containsObjectPropertyInSignature(ont2Prop.getIRI())) {
                Set<Object> newProprAxiomsSet = new HashSet<Object>(ont2.getAxioms(ont2Prop));
                OWLAxiomInfo tempNewProp = new OWLAxiomInfo(ont2Prop.getIRI(), newProprAxiomsSet,null);
                newC.add(tempNewProp);
            }
        }
        return newC;
    }
    
     /**
     * Method to find data properties that are new, i.e., that appear in ont2 but not in ont1
     * @param ont1 old version of the ontology
     * @param ont2 new version of the ontology
     * @return 
     */
    private ArrayList<OWLAxiomInfo> findNewDataProperties(OWLOntology ont1, OWLOntology ont2) {
        ArrayList<OWLAxiomInfo> newC = new ArrayList<OWLAxiomInfo>();
        for (OWLDataProperty ont2Prop : ont2.getDataPropertiesInSignature()) {
            if (!ont1.containsDataPropertyInSignature(ont2Prop.getIRI())) {
                Set<Object> newDataProprAxiomsSet = new HashSet<Object>(ont2.getAxioms(ont2Prop));
                OWLAxiomInfo tempNewProp = new OWLAxiomInfo(ont2Prop.getIRI(), newDataProprAxiomsSet,null);
                newC.add(tempNewProp);
            }
        }
        return newC;
    }    


    /**
     * get method to retrieve information about all the classes with differences
     *
     * @return list of classes with information about differences
     */
    public ArrayList<OWLAxiomInfo> getClassesWithDifferences() {
        return modifiedClasses;
    }


    /**
     * get method to retrieve information about all the classes that are new to second ontology
     *
     * @return list of classes with information about the classes new to the second ontology
     */
    public ArrayList<OWLAxiomInfo> getNewClasses() {
        return newClasses;
    }

    /**
     * Get all of the classes that have been deleted between versions
     *
     * @return the deletedClasses
     */
    public ArrayList<OWLAxiomInfo> getDeletedClasses() {
        return deletedClasses;
    }

    public ArrayList<OWLAxiomInfo> getDeletedDataProperties() {
        return deletedDataProperties;
    }

    public ArrayList<OWLAxiomInfo> getDeletedProperties() {
        return deletedProperties;
    }

    public ArrayList<OWLAxiomInfo> getModifiedClasses() {
        return modifiedClasses;
    }

    public ArrayList<OWLAxiomInfo> getModifiedDataProperties() {
        return modifiedDataProperties;
    }

    public ArrayList<OWLAxiomInfo> getModifiedProperties() {
        return modifiedProperties;
    }

    public ArrayList<OWLAxiomInfo> getNewDataProperties() {
        return newDataProperties;
    }

    public ArrayList<OWLAxiomInfo> getNewProperties() {
        return newProperties;
    }

    public String getNewVersion() {
        return newVersion;
    }

    public String getOldVersion() {
        return oldVersion;
    }
    
    

    
    

}
