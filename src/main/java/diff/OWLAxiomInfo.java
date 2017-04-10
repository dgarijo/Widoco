package diff;

import java.util.HashSet;
import java.util.Set;

import org.semanticweb.owlapi.model.*;


/*
 * Helper class to store information on a class which can be
 * used to store information about difference between two classes
 * newClassAxiomsSet holds axioms that have been added to this class
 * and deletedClassAxiomsSet holds axioms that have been removed compared with
 * the same class in another ontology
 */

/**
 * @author Daniel Garijo
 * This class has been modified by Daniel Garijo to make the axioms more general 
 * and capture changes in labels and comments or definitions (annotation properties)
 * @author dgarijo
 */


public class OWLAxiomInfo {

	private final IRI classIRI;
	private Set<Object> newAxiomSet;
	private Set<Object> deletedAxiomSet;


	
	
	//constructor
	public OWLAxiomInfo(IRI classIRI, Set<Object> newClassAxiomsSet, 
							  Set<Object> deletedClassAxiomsSet) {
		this.classIRI = classIRI;
		this.newAxiomSet = newClassAxiomsSet;
		this.deletedAxiomSet = deletedClassAxiomsSet;
	}
	
	
	
	
	public IRI getIRI(){
		return classIRI;
	}
	
	
	//get method to return the new class axioms as Axioms
	public Set<Object> getNewAxioms(){
		return newAxiomSet;
	}
        
        /**
         * Method to merge two collection of axioms to the new Changes Set
         * @param newAxioms
         */
        public void addNewChangeAxioms(Set<Object> newAxioms){
            if(this.newAxiomSet==null){
                this.newAxiomSet = new HashSet<Object>();                
            }
            if(newAxioms!= null && !newAxioms.isEmpty()){
                this.newAxiomSet.addAll(newAxioms);
            }
            
        }
        
        /**
         * Method to merge two collection of axioms to the deletions Set
         * @param deleteAxioms
         */
        public void addDeleteChangeAxioms(Set<Object> deleteAxioms){
            if(this.deletedAxiomSet==null){
                this.deletedAxiomSet = new HashSet<Object>();
            }
            if(deleteAxioms !=null && !deleteAxioms.isEmpty()){
                this.deletedAxiomSet.addAll(deleteAxioms);
            }
        }
	
	//get method to return the deleted class axioms as Axioms
	public Set<Object> getDeletedAxioms(){
		return deletedAxiomSet;
	}
	
	
	public String getIRIAsString(){
		return this.classIRI.toString();
	}
	
	

    public boolean isEmpty(){
        return!((this.newAxiomSet!=null && !this.newAxiomSet.isEmpty())||
                (this.deletedAxiomSet!=null && !this.deletedAxiomSet.isEmpty()));      
    }


	
}
