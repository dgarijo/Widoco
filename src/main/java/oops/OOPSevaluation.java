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
package oops;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.OWLAnnotationAssertionAxiom;
import org.semanticweb.owlapi.model.OWLAnnotationValue;
import org.semanticweb.owlapi.model.OWLClass;
import org.semanticweb.owlapi.model.OWLDataFactory;
import org.semanticweb.owlapi.model.OWLDataProperty;
import org.semanticweb.owlapi.model.OWLNamedIndividual;
import org.semanticweb.owlapi.model.OWLObjectProperty;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.semanticweb.owlapi.search.EntitySearcher;
import widoco.Constants;

/**
 * @author Maria Poveda Villalon. 
 * Integrated by Daniel Garijo.
 */
public class OOPSevaluation {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	public boolean error = false;
	private OWLOntology model = null;
        private int pitfallNumber;


    /**
     * Main constructor: given an ontology file, a request will be issue to the OOPS! server
     * @param ontologyContent
     * @throws IOException
     */
	public OOPSevaluation(String ontologyContent) throws IOException {
            //always query by content
            pitfallNumber = 0;
            String request = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + "<OOPSRequest><OntologyUrl>";
            request += "</OntologyUrl><OntologyContent>";
            if (ontologyContent != null && !"".equals(ontologyContent)) {
                    request += "<![CDATA[ " + ontologyContent + " ]]>";
            }
            request += "</OntologyContent>" + "<Pitfalls></Pitfalls>" + "<OutputFormat>RDF/XML</OutputFormat>"
                            + "</OOPSRequest>";
            String uri = Constants.OOPS_SERVICE_URL;
            URL url = new URL(uri);
            //System.out.println(request);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setConnectTimeout(Constants.OOPS_TIME_OUT);
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setRequestProperty("Connection", "Keep-Alive");
            connection.setRequestProperty("Accept", "application/xml");
            OutputStreamWriter wr = new OutputStreamWriter(connection.getOutputStream());
            wr.write(request);
            wr.flush();
            InputStream in = (InputStream) connection.getInputStream();
            initializeEvaluation(in);
            in.close();
            wr.close();
            connection.disconnect();
            
	}

    /**
     * Auxiliary constructor in case the response from OOPS! is downloaded elsewhere
     * @param OOPSResponse
     * @throws IOException
     */
    public OOPSevaluation(InputStream OOPSResponse){
        initializeEvaluation(OOPSResponse);
    }


    private void initializeEvaluation(InputStream OOPSResponse){
        try{
            OWLOntologyManager manager = OWLManager.createOWLOntologyManager();
            model = manager.loadOntologyFromOntologyDocument(OOPSResponse);
            OWLClass pitfall = model.getOWLOntologyManager().getOWLDataFactory().getOWLClass(Constants.OOPS_NS + "pitfall");
            this.pitfallNumber = EntitySearcher.getIndividuals(pitfall, model).collect(Collectors.toSet()).size();
        }catch(OWLOntologyCreationException e){
            logger.warn("Could not extract the number of pitfalls from response");
        }

    }
        
        
        /**
         * Method that returns a String with an HTML representation of the evaluation
         * @return 
         */
	public String printEvaluation() {
            String evaluationOutput = "";
            OWLDataFactory df = model.getOWLOntologyManager().getOWLDataFactory();
            OWLClass pitfallClass = df.getOWLClass(Constants.OOPS_NS + "pitfall");
            OWLDataProperty hasCodeDTP = df.getOWLDataProperty(Constants.OOPS_NS + "hasCode");
            OWLDataProperty  hasNameDTP = df.getOWLDataProperty(Constants.OOPS_NS + "hasName");
            OWLDataProperty  hasDescriptionDTP = df.getOWLDataProperty(Constants.OOPS_NS + "hasDescription");
            OWLDataProperty  hasImportanceLevelDTP = df.getOWLDataProperty(Constants.OOPS_NS + "hasImportanceLevel");
            OWLDataProperty  hasFrequencyDTP = df.getOWLDataProperty(Constants.OOPS_NS + "hasNumberAffectedElements");
            OWLObjectProperty hasAffectedElement = df.getOWLObjectProperty(Constants.OOPS_NS + "hasAffectedElement");
            OWLObjectProperty mightNotBeInverseOf = df.getOWLObjectProperty(Constants.OOPS_NS + "mightNotBeInverseOf");
            OWLObjectProperty hasEquivalentClass = df.getOWLObjectProperty(Constants.OOPS_NS + "hasEquivalentClass");
            OWLObjectProperty hasWrongEquivalentClass = df.getOWLObjectProperty(Constants.OOPS_NS + "hasWrongEquivalentClass");
            OWLObjectProperty noSuggestion = df.getOWLObjectProperty(Constants.OOPS_NS + "noSuggestion");
            OWLObjectProperty haveSameLabel = df.getOWLObjectProperty(Constants.OOPS_NS + "haveSameLabel");

            Set pitfalls = EntitySearcher.getIndividuals(pitfallClass, model).collect(Collectors.toSet());
            logger.info("Pitfall number: " + pitfalls.size());
            if (this.pitfallNumber > 0) {
                HashMap<String,ArrayList<OWLNamedIndividual>> codes = new HashMap<>();
                Object[] codesList;
                Iterator<OWLNamedIndividual> pitfallIt = pitfalls.iterator();
                while (pitfallIt.hasNext()){
                    OWLNamedIndividual pit = pitfallIt.next();
                    EntitySearcher.getAnnotationAssertionAxioms(pit, model).forEach(i ->{
                        if(i.getProperty().getIRI().equals(hasCodeDTP.getIRI())){
                            String code = i.getValue().asLiteral().get().getLiteral();
                            ArrayList<OWLNamedIndividual> pitfallsWithCode;
                            if(codes.containsKey(code)){
                                pitfallsWithCode = codes.get(code);
                                pitfallsWithCode.add(pit);
                            }else{
                                pitfallsWithCode = new ArrayList<>();
                                pitfallsWithCode.add(pit);
                                codes.put(code,pitfallsWithCode);
                            }
                            //System.out.println(i.getProperty().getIRI()+"----" +i.getValue().toString());
                        }
                    });
                }

                codesList = codes.keySet().toArray();
                Arrays.sort(codesList);

                evaluationOutput = evaluationOutput + "<h2>Evaluation results</h2>\n";
                evaluationOutput = evaluationOutput + "<div class=\"panel-group\" id=\"accordion\">\n";

                int i = 0;
                for (Object temp : codesList) {
                   ArrayList<OWLNamedIndividual> resources = codes.get((String)temp);
                   for (OWLNamedIndividual ind:resources){
                        String title="";
                        String code = (String) temp;
                        String description = "";
                        String importanceLevel = "";
                        String affectedElement ="";
                        int frequency = 0;
                        
                        try{
                            List<OWLAnnotationAssertionAxiom> properties = EntitySearcher.getAnnotationAssertionAxioms(ind, model).collect(Collectors.toList());
                            for (OWLAnnotationAssertionAxiom p: properties){
                                if(p.getProperty().getIRI().equals(hasNameDTP.getIRI())){
                                    title = p.getValue().asLiteral().get().getLiteral();
                                }else if (p.getProperty().getIRI().equals(hasDescriptionDTP.getIRI())){
                                    description = p.getValue().asLiteral().get().getLiteral();
                                }else if (p.getProperty().getIRI().equals(hasImportanceLevelDTP.getIRI())){
                                    importanceLevel = p.getValue().asLiteral().get().getLiteral();
                                }else if (p.getProperty().getIRI().equals(hasFrequencyDTP.getIRI())){
                                    frequency = p.getValue().asLiteral().get().parseInteger();
                                }else if (p.getProperty().getIRI().equals(hasAffectedElement.getIRI())){
                                    affectedElement = p.getValue().asIRI().toString();
                                }
                            }
                        }catch(Exception e){
                             logger.error("Error while extracting some of the properties for the pitfall: "+code);
                        }

                        evaluationOutput = evaluationOutput + "<div class=\"panel panel-default\">\n";
                        evaluationOutput = evaluationOutput + "<div class=\"panel-heading\">\n";
                        evaluationOutput = evaluationOutput + "<h4 class=\"panel-title\">\n";
                        evaluationOutput = evaluationOutput + "<a data-toggle=\"collapse\" href=\"#collapse" + i + "\">\n";
                        evaluationOutput = evaluationOutput + code + ". " + title;

                        // frequency and important level
                        // evaluationOutput = evaluationOutput + "</a>\n";

                        // place stuff at the right
                        evaluationOutput = evaluationOutput + "<span style=\"float: right;\">";
//
                        if (code.contentEquals("P03") || code.contentEquals("P10") || code.contentEquals("P22")
                                        || code.contentEquals("P36") || code.contentEquals("P37") || code.contentEquals("P38")
                                        || code.contentEquals("P39")) {
                                evaluationOutput = evaluationOutput + " ontology *";
                        } else if (frequency == 1) {
                                evaluationOutput = evaluationOutput + frequency + " case detected. ";

                        } else {
                                evaluationOutput = evaluationOutput + frequency + " cases detected. ";
                        }
//
                        if (importanceLevel.equalsIgnoreCase("critical")) {
                                evaluationOutput = evaluationOutput + "<span class=\"label label-danger\">" + importanceLevel
                                                + "</span>";
                        } else if (importanceLevel.equalsIgnoreCase("important")) {
                                evaluationOutput = evaluationOutput + "<span class=\"label label-warning\">" + importanceLevel
                                                + "</span>";
                        } else if (importanceLevel.equalsIgnoreCase("minor")) {
                                evaluationOutput = evaluationOutput + "<span class=\"label label-minor\">" + importanceLevel
                                                + "</span>";
                        }

                        // end stuff at right
                        evaluationOutput = evaluationOutput + "</span>";

                        evaluationOutput = evaluationOutput + "</a>\n";
                        evaluationOutput = evaluationOutput + "</h4>\n";
                        evaluationOutput = evaluationOutput + "</div>\n";
                        evaluationOutput = evaluationOutput + "<div id=\"collapse" + i
                                        + "\" class=\"panel-collapse collapse\">\n";
                        evaluationOutput = evaluationOutput + "<div class=\"panel-body\">\n";
                        // descripcion
                        evaluationOutput = evaluationOutput + "<p>" + description + "</p>";

                        // affected elements
                        if (code.contentEquals("P10") || code.contentEquals("P22") || code.contentEquals("P37")
                                    || code.contentEquals("P38") || code.contentEquals("P39")) {
                            evaluationOutput = evaluationOutput + "<p>"
                                + "*This pitfall applies to the ontology in general instead of specific elements"
                                + "</p>";
                        } else if (code.contentEquals("P03")) {
//                            Resource affectedE = ind.getPropertyResourceValue(hasAffectedElement);
                            evaluationOutput = evaluationOutput + "<p>" + "The property " + "<a href=\""
                                + affectedElement + "\" target=\"_blank\">" + affectedElement + "</a>"
                                + " might be replaced by an ontology language predicate as for example "
                                + "\"rdf:type\" or \"rdfs:subclassOf\" or  \"owl:sameAs\"" + "</p>";
                        }
                        else if (code.contentEquals("P36")) {
                                evaluationOutput = evaluationOutput + "<p>"
                                    + "*This pitfall applies to the ontology in general instead of specific elements and it appears in the ontology URI."
                            //	+ "<a href=\"" + this.uriOnto + "\" target=\"_blank\">" + this.uriOnto + "</a>"
                                    + "</p>";
                        }
                        else {
                            evaluationOutput = evaluationOutput + "<p>"
                                + "This pitfall affects to the following ontology elements: " + "</p>";
                            try{
                                switch (code) {
                                    case "P05":
                                        {
                                            List<OWLAnnotationAssertionAxiom> elements =  EntitySearcher.getAnnotationAssertionAxioms(ind, model).filter
                                                                (prop -> prop.getProperty().getIRI().
                                                                        equals(mightNotBeInverseOf.getIRI())).
                                                                            collect(Collectors.toList());
                                            evaluationOutput = evaluationOutput + "<ul>";
                                            for (OWLAnnotationAssertionAxiom element:elements) {
                                                Iterator elementos =  (EntitySearcher.getAnnotationAssertionAxioms(element.getValue().asIRI().get(), model).filter
                                                                (prop -> prop.getProperty().getIRI().
                                                                        equals(hasAffectedElement.getIRI())).
                                                                            collect(Collectors.toList())).iterator();
                                                if(elementos.hasNext()){
                                                    String first = ((OWLAnnotationAssertionAxiom)elementos.next()).getValue().asLiteral().get().getLiteral();
                                                    String second = ((OWLAnnotationAssertionAxiom)elementos.next()).getValue().asLiteral().get().getLiteral();
                                                    evaluationOutput = evaluationOutput + "<li>" + "<a href=\"" + first
                                                            + "\" target=\"_blank\">" + first + "</a>" + " may not be inverse of "
                                                            + "<a href=\"" + second + "\" target=\"_blank\">" + second + "</a>" + "</li>";
                                                    evaluationOutput = evaluationOutput + "</ul>";
                                                }
                                            }
                                            break;
                                        }
                                    case "P13":
                                        {
                                            List<OWLAnnotationAssertionAxiom> elements =  EntitySearcher.getAnnotationAssertionAxioms(ind, model).filter
                                                                (prop -> prop.getProperty().getIRI().
                                                                        equals(noSuggestion.getIRI())).
                                                                            collect(Collectors.toList());
                                            evaluationOutput = evaluationOutput + "<ul>";
                                            for (OWLAnnotationAssertionAxiom element:elements) {
                                                Iterator elementos =  (EntitySearcher.getAnnotationAssertionAxioms(element.getValue().asIRI().get(), model).filter
                                                                (prop -> prop.getProperty().getIRI().
                                                                        equals(hasAffectedElement.getIRI())).
                                                                            collect(Collectors.toList())).iterator();
                                                while(elementos.hasNext()) {
                                                    String first = ((OWLAnnotationAssertionAxiom) elementos.next()).getValue().asLiteral().get().toString();
                                                    evaluationOutput = evaluationOutput + "<li>" + "<a href=\"" + first
                                                            + "\" target=\"_blank\">" + first + "</a>" + "</li>";
                                                }
                                            }     
                                            evaluationOutput = evaluationOutput + "</ul>";
                                            break;
                                        }
                                    case "P30":
                                        {
                                            List<OWLAnnotationAssertionAxiom> elements =  EntitySearcher.getAnnotationAssertionAxioms(ind, model).filter
                                                                (prop -> prop.getProperty().getIRI().
                                                                        equals(hasEquivalentClass.getIRI())).
                                                                            collect(Collectors.toList());
                                            evaluationOutput = evaluationOutput + "<ul>";
                                            for (OWLAnnotationAssertionAxiom element:elements) {
                                                Iterator elementos =  (EntitySearcher.getAnnotationAssertionAxioms(element.getValue().asIRI().get(), model).filter
                                                                (prop -> prop.getProperty().getIRI().
                                                                        equals(hasAffectedElement.getIRI())).
                                                                            collect(Collectors.toList())).iterator();
                                                while(elementos.hasNext()) {
                                                    String first = ((OWLAnnotationAssertionAxiom) elementos.next()).getValue().asLiteral().get().toString();
                                                    String second = ((OWLAnnotationAssertionAxiom) elementos.next()).getValue().asLiteral().get().toString();
                                                    evaluationOutput = evaluationOutput + "<li>" + "<a href=\"" + first
                                                            + "\" target=\"_blank\">" + first + "</a>" + " , " + "<a href=\"" + second
                                                            + "\" target=\"_blank\">" + second + "</a>" + "</li>";
                                                }       
                                                evaluationOutput = evaluationOutput + "</ul>";
                                            }
                                            break;
                                        }
                                    case "P31":
                                        {
                                            List<OWLAnnotationAssertionAxiom> elements =  EntitySearcher.getAnnotationAssertionAxioms(ind, model).filter
                                                                (prop -> prop.getProperty().getIRI().
                                                                        equals(hasWrongEquivalentClass.getIRI())).
                                                                            collect(Collectors.toList());
                                            evaluationOutput = evaluationOutput + "<ul>";
                                            for (OWLAnnotationAssertionAxiom element:elements) {
                                                Iterator elementos =  (EntitySearcher.getAnnotationAssertionAxioms(element.getValue().asIRI().get(), model).filter
                                                                (prop -> prop.getProperty().getIRI().
                                                                        equals(hasAffectedElement.getIRI())).
                                                                            collect(Collectors.toList())).iterator();
                                                while(elementos.hasNext()) {
                                                    String first = ((OWLAnnotationAssertionAxiom) elementos.next()).getValue().asLiteral().get().toString();
                                                    String second = ((OWLAnnotationAssertionAxiom) elementos.next()).getValue().asLiteral().get().toString();
                                                    evaluationOutput = evaluationOutput + "<li>" + "<a href=\"" + first
                                                            + "\" target=\"_blank\">" + first + "</a>" + " , " + "<a href=\"" + second
                                                            + "\" target=\"_blank\">" + second + "</a>" + "</li>";
                                                }       
                                                evaluationOutput = evaluationOutput + "</ul>";
                                            }
                                            break;
                                        }
                                    case "P32":
                                        {
                                            List<OWLAnnotationAssertionAxiom> elements =  EntitySearcher.getAnnotationAssertionAxioms(ind, model).filter
                                                                (prop -> prop.getProperty().getIRI().
                                                                        equals(haveSameLabel.getIRI())).
                                                                            collect(Collectors.toList());
                                            evaluationOutput = evaluationOutput + "<ul>";
                                            for (OWLAnnotationAssertionAxiom element:elements) {
                                                Iterator elementos =  (EntitySearcher.getAnnotationAssertionAxioms(element.getValue().asIRI().get(), model).filter
                                                                (prop -> prop.getProperty().getIRI().
                                                                        equals(hasAffectedElement.getIRI())).
                                                                            collect(Collectors.toList())).iterator();
                                                boolean primero = true;
                                                while(elementos.hasNext()) {
                                                    String first = ((OWLAnnotationAssertionAxiom) elementos.next()).getValue().asLiteral().get().toString();
                                                    if (!primero)
                                                        evaluationOutput = evaluationOutput + " , ";
                                                    evaluationOutput = evaluationOutput + "<a href=\"" + first + "\" target=\"_blank\">"
                                                            + first + "</a>";
                                                    primero = false;
                                                }
                                                evaluationOutput = evaluationOutput + "</li>";
                                            }
                                            evaluationOutput = evaluationOutput + "</ul>";
                                            break;
                                        }
                                    default:
                                        {
                                            List<OWLAnnotationAssertionAxiom> elements =  EntitySearcher.getAnnotationAssertionAxioms(ind, model).filter
                                                                (prop -> prop.getProperty().getIRI().
                                                                        equals(hasAffectedElement.getIRI())).
                                                                            collect(Collectors.toList());
                                            evaluationOutput = evaluationOutput + "<ul>";
                                            for (OWLAnnotationAssertionAxiom elem:elements) {
                                                OWLAnnotationValue e = ((OWLAnnotationAssertionAxiom)elem).getValue();
                                                if(e.isLiteral()){
                                                    String element = e.asLiteral().get().toString();
                                                    evaluationOutput = evaluationOutput + "<li>" + "<a href=\"" + element
                                                        + "\" target=\"_blank\">" + element + "</a>" + "</li>";
                                                }else{
                                                    logger.warn("Can't act as Individual in OOPSevaluation");
                                                }
                                            }
                                            evaluationOutput = evaluationOutput + "</ul>";
                                            break;
                                        }
                                }
                            }catch(Exception e){
                                logger.warn("Error when processing one of the pitfalls: "+e.getMessage());
                            }
                    }

                    evaluationOutput = evaluationOutput + "</div>\n";
                    evaluationOutput = evaluationOutput + "</div>\n";
                    evaluationOutput = evaluationOutput + "</div>\n";

                    i++;
                    }
                }
                evaluationOutput = evaluationOutput + "</div>\n"; // close div accordion
            } else {
                    evaluationOutput = "<h2>Congratulations! OOPS did not find a single pitfall</h2>";
            }

        return evaluationOutput;

	}

    public int getPitfallNumber() {
        return pitfallNumber;
    }
        
        

}
