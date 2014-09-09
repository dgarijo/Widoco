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
package oops;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.hp.hpl.jena.ontology.DatatypeProperty;
import com.hp.hpl.jena.ontology.Individual;
import com.hp.hpl.jena.ontology.ObjectProperty;
import com.hp.hpl.jena.ontology.OntClass;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.ontology.OntModelSpec;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.NodeIterator;
import com.hp.hpl.jena.rdf.model.RDFNode;
import com.hp.hpl.jena.rdf.model.ResIterator;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.util.iterator.ExtendedIterator;

/**
 * 
 * @author Maria Poveda.
 * Integrated by Daniel Garijo.
 */
public class OOPSevaluation {

	public boolean error = false;
	public OntModel model = null;
	
	private String uriOnto = null;
	
	public OOPSevaluation(String uriOnto, String content) throws IOException {
		this.uriOnto = uriOnto;
		
		String request = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
						"<OOPSRequest><OntologyUrl>";
                if(uriOnto!=null &!"".equals(uriOnto)){
                    request+=uriOnto;
                }
                request+="</OntologyUrl><OntologyContent>";
                if(content!=null &&!"".equals(content)){
                    request+=content;
                }
                request+="</OntologyContent>"+
                    "<Pitfalls></Pitfalls>" +
                    "<OutputFormat>RDF/XML</OutputFormat>" +
                    "</OOPSRequest>";
		
		String uri = "http://oops-ws.oeg-upm.net/rest";
		URL url = new URL(uri);
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("POST");
		connection.setDoOutput(true);
		connection.setRequestProperty("Connection", "Keep-Alive");
		connection.setRequestProperty("Accept", "application/xml");

		OutputStreamWriter wr = new OutputStreamWriter(connection.getOutputStream());
		wr.write(request);
		
		wr.flush();
		
		InputStream in = (InputStream) connection.getInputStream();
		
		OntModelSpec s = new OntModelSpec( OntModelSpec.OWL_MEM );
		this.model = ModelFactory.createOntologyModel( s );
		this.model.read(in, "http://myEvaluation.com#");
		
		
		URL url2 = new URL(uri);
		HttpURLConnection connection2 = (HttpURLConnection) url2.openConnection();
		connection2.setRequestMethod("POST");
		connection2.setDoOutput(true);
		connection2.setRequestProperty("Connection", "Keep-Alive");
		connection2.setRequestProperty("Accept", "application/xml");
		OutputStreamWriter wr2 = new OutputStreamWriter(connection2.getOutputStream());
		wr2.write(request);
		wr2.flush();
		InputStream in2 = (InputStream) connection2.getInputStream();
//		String line;
//		BufferedReader reader = new BufferedReader(
//				new InputStreamReader(in2));
//                PrintStream ps = new PrintStream(new BufferedOutputStream(new FileOutputStream(new File("output/web/ws/"+uriOnto.replace("/", "")+".txt"))), true); 
//
//		while ((line = reader.readLine()) != null) {
//			ps.println(line);
//		}
//		ps.close();
//		reader.close();
		in2.close();
		wr2.close();

		in.close();
		wr.close();
		
		connection.disconnect();
	}
	
	public String printEvaluation (){
		
            String oops = "http://www.oeg-upm.net/oops#";

            String evaluationOutput = "";

            OntClass pitfallClass = model.createClass( oops + "pitfall");
            DatatypeProperty hasCodeDTP = model.createDatatypeProperty( oops + "hasCode");
//		DatatypeProperty hasTitleDTP = model.createDatatypeProperty( oops + "hasTitle");
            DatatypeProperty hasNameDTP = model.createDatatypeProperty( oops + "hasName");
            DatatypeProperty hasDescriptionDTP = model.createDatatypeProperty( oops + "hasDescription");
            DatatypeProperty hasImportanceLevelDTP = model.createDatatypeProperty( oops + "hasImportanceLevel");
            DatatypeProperty hasFrequencyDTP = model.createDatatypeProperty( oops + "hasNumberAffectedElements");
            ObjectProperty hasAffectedElement = model.createObjectProperty(oops + "hasAffectedElement");
            ObjectProperty mightNotBeInverseOf = model.createObjectProperty(oops + "mightNotBeInverseOf");
            ObjectProperty hasEquivalentClass = model.createObjectProperty(oops + "hasEquivalentClass");
            ObjectProperty hasWrongEquivalentClass = model.createObjectProperty(oops + "hasWrongEquivalentClass");
            ObjectProperty noSuggestion = model.createObjectProperty(oops + "noSuggestion");
            ObjectProperty haveSameLabel = model.createObjectProperty(oops + "haveSameLabel");

            ExtendedIterator<Individual> p = model.listIndividuals(pitfallClass);	
            List<Individual> plist = p.toList();
            System.out.println("Numero de pitfalls: " + plist.size() );

            if (plist.size() > 0){

                    //prepare for order list

                    List<String> codesL = new ArrayList();

                    for (int k = 0; k < plist.size(); k++){
                            if (plist.get(k).hasProperty(hasCodeDTP)){
                                    codesL.add(plist.get(k).getPropertyValue(hasCodeDTP).asLiteral().getString());
                            }
                            else {
                                    System.out.println("The pitfall does not have CODE: " + plist.get(k).getURI());
                            }
                    }

                    Collections.sort(codesL);

    //    		int l=0;
    //    		for(String temp: codesL){
    //    			System.out.println("fruits " + ++l + " : " + temp);
    //    		}

                    //end order list

                    evaluationOutput = evaluationOutput + "<h2>Evaluation results</h2>\n";
                    evaluationOutput = evaluationOutput + "<div class=\"panel-group\" id=\"accordion\">\n";

    //    		for (int i = 0; i < plist.size(); i++){
                    int i = 0;
                    for(String temp: codesL){
    //    			Individual ind = plist.get(i);
                            ResIterator resources= model.listSubjectsWithProperty(hasCodeDTP, temp);

                            if (resources.hasNext()){
                                    Individual ind = resources.next().as(Individual.class);

    //	    			Iterator a = ind.listProperties();
    //	    			while (a.hasNext()){
    //	        			System.out.println(a.next().toString());
    //	
    //	    			}

                                    String title = ind.getPropertyValue(hasNameDTP).asLiteral().getString();
                                    String code = ind.getPropertyValue(hasCodeDTP).asLiteral().getString();
                                    String description = ind.getPropertyValue(hasDescriptionDTP).asLiteral().getString();
                                    String importanceLevel = ind.getPropertyValue(hasImportanceLevelDTP).asLiteral().getString();

                                    boolean hasFrequency = ind.hasProperty(hasFrequencyDTP);
                                    int frequency = 0;

                                    if (hasFrequency){
                                            frequency = ind.getPropertyValue(hasFrequencyDTP).asLiteral().getInt();
                                    }

            //    			if(ind.hasProperty(hasTitleDTP)){
            //    				title = ind.getPropertyValue(hasTitleDTP).asLiteral().getString();
            //    			}

                                    // c—digo y titulo
                                    evaluationOutput = evaluationOutput + "<div class=\"panel panel-default\">\n";
                                    evaluationOutput = evaluationOutput + "<div class=\"panel-heading\">\n";
                                    evaluationOutput = evaluationOutput + "<h4 class=\"panel-title\">\n";
                                    evaluationOutput = evaluationOutput + "<a data-toggle=\"collapse\" href=\"#collapse"+i+"\">\n";
                                    evaluationOutput = evaluationOutput + code + ". " + title ;

                                    // frequency and important level
            //    			evaluationOutput = evaluationOutput + "</a>\n";

                                    //place stuff at the right
                                            evaluationOutput = evaluationOutput + "<span style=\"float: right;\">";


                                            if (code.contentEquals("P03") || code.contentEquals("P10") ||
                                                            code.contentEquals("P22") || code.contentEquals("P36") ||
                                                            code.contentEquals("P37") || code.contentEquals("P38") ||
                                                            code.contentEquals("P39")){
                                            evaluationOutput = evaluationOutput +  " ontology *";					
                                            }
                                            else if (frequency == 1){
                                            evaluationOutput = evaluationOutput + frequency + " case detected. ";

                                            }
                                            else{
                                                    evaluationOutput = evaluationOutput + frequency + " cases detected. ";
                                            }


                                    if (importanceLevel.equalsIgnoreCase("critical")){
                                            evaluationOutput = evaluationOutput + "<span class=\"label label-danger\">" + importanceLevel + "</span>";
                                    }
                                    else if (importanceLevel.equalsIgnoreCase("important")){
                                            evaluationOutput = evaluationOutput + "<span class=\"label label-warning\">" + importanceLevel + "</span>";
                                    }
                                    else if (importanceLevel.equalsIgnoreCase("minor")){
                                            evaluationOutput = evaluationOutput + "<span class=\"label label-minor\">" + importanceLevel + "</span>";
                                    }

                                    //end stuff at right
                                            evaluationOutput = evaluationOutput +  "</span>";

                                    evaluationOutput = evaluationOutput + "</a>\n";
                                    evaluationOutput = evaluationOutput + "</h4>\n";
                                    evaluationOutput = evaluationOutput + "</div>\n";
                                    evaluationOutput = evaluationOutput + "<div id=\"collapse"+i+"\" class=\"panel-collapse collapse\">\n";
                                    evaluationOutput = evaluationOutput + "<div class=\"panel-body\">\n";
                                    //descripci—n
                                    evaluationOutput = evaluationOutput + "<p>" +  description + "</p>";

                                    // affected elements
                                    if (code.contentEquals("P10") || code.contentEquals("P22") ||
                                                            code.contentEquals("P37") || code.contentEquals("P38") ||
                                                            code.contentEquals("P39")){
                                            evaluationOutput = evaluationOutput + "<p>" +  
                                                            "*This pitfall applies to the ontology in general instead of specific elements"  +
                                                            "</p>";					
                                            }
                                    else if (code.contentEquals("P03")){
                                            Resource affectedE = ind.getPropertyResourceValue(hasAffectedElement);
                                            evaluationOutput = evaluationOutput + "<p>" +  
                                                            "The property " +
                                                            "<a href=\"" + affectedE.getURI() + "\" target=\"_blank\">" + affectedE.getURI() + "</a>" + 
                                                            " might be replaced by an ontology language predicate as for example " +
                                                            "\"rdf:type\" or \"rdfs:subclassOf\" or  \"owl:sameAs\""  +
                                                            "</p>";		    				
                                    }
    //	    			else if (code.contentEquals("P05")){
    //	    				//special output. P05. Defining wrong inverse relationships
    //	    				evaluationOutput = evaluationOutput + "<p>" +  
    //								"This pitfall affects to the following ontology elements: "  +
    //			    					"</p>";
    //	    				NodeIterator elements= ind.listPropertyValues(hasAffectedElement);
    //	    				
    //	    				evaluationOutput = evaluationOutput + "<ul>";
    //	    				
    //	    				while (elements.hasNext()){
    //	    					RDFNode nextNode = elements.next();
    //	    					
    //
    //	    					if (nextNode.isLiteral()){
    //	    						System.out.println("This should be an instance in OOPSevaluation");
    //	    					}
    //	    					else if (nextNode.isURIResource()){
    //	    						// for each accepted element get the wrong inverse
    //			    				ObjectProperty mightBeEquivalentProperty = model.createObjectProperty(oops + "mightBeEquivalentProperty");
    //			    				Resource pairs = nextNode.asResource().
    //	    					}
    //	    					else{
    //	    						System.out.println("Can't act as Individual in OOPSevaluation");
    //	    					}
    //	    						
    //	    				}
    //	    				evaluationOutput = evaluationOutput + "</ul>";
    //
    //	    			}
                                    else if (code.contentEquals("P36")){
                                            evaluationOutput = evaluationOutput + "<p>" +  
                                                                    "*This pitfall applies to the ontology in general instead of specific elements and it appears in the ontology URI: "  +
                                                                    "<a href=\"" + this.uriOnto + "\" target=\"_blank\">" + this.uriOnto + "</a>" + "</p>";	
                                    }

                                    else {
                                            evaluationOutput = evaluationOutput + "<p>" +  
                                                                    "This pitfall affects to the following ontology elements: "  +
                                                                    "</p>";
                                            if (code.contentEquals("P05")){
                                                    NodeIterator elements= ind.listPropertyValues(mightNotBeInverseOf);

                                                    evaluationOutput = evaluationOutput + "<ul>";

                                                    while (elements.hasNext()){
                                                            String uri = elements.next().asResource().getURI();
                                                            Individual indi = model.getIndividual(uri);

                                                            NodeIterator elementos= indi.listPropertyValues(hasAffectedElement);
                                                            String first = elementos.next().asLiteral().getString();
                                                            String second = elementos.next().asLiteral().getString();
                                                            evaluationOutput = evaluationOutput + "<li>" + 
                                                                    "<a href=\"" + first + "\" target=\"_blank\">" + first + "</a>"+
                                                                    " may not be inverse of " +
                                                                    "<a href=\"" + second + "\" target=\"_blank\">" + second + "</a>"+
                                                                    "</li>";
                                                    }

                                                    evaluationOutput = evaluationOutput + "</ul>";
                                            }
                                            else if (code.contentEquals("P13")){

                                                    NodeIterator elements = ind.listPropertyValues(noSuggestion);

                                                    evaluationOutput = evaluationOutput + "<ul>";

                                                    while (elements.hasNext()){
                                                            String uri = elements.next().asResource().getURI();
                                                            Individual indi = model.getIndividual(uri);

                                                            NodeIterator elementos= indi.listPropertyValues(hasAffectedElement);
                                                            while (elementos.hasNext()){
                                                                    String first = elementos.next().asLiteral().getString();
                                                                    evaluationOutput = evaluationOutput + "<li>" + 
                                                                            "<a href=\"" + first + "\" target=\"_blank\">" + first + "</a>"+
                                                                            "</li>";
                                                            }
                                                    }

                                                    evaluationOutput = evaluationOutput + "<ul>";

                                            }
                                            else if (code.contentEquals("P30")){

                                                    NodeIterator elements = ind.listPropertyValues(hasEquivalentClass);

                                                    evaluationOutput = evaluationOutput + "<ul>";

                                                    while (elements.hasNext()){
                                                            String uri = elements.next().asResource().getURI();
                                                            Individual indi = model.getIndividual(uri);

                                                            NodeIterator elementos= indi.listPropertyValues(hasAffectedElement);

                                                            String first = elementos.next().asLiteral().getString();
                                                            String second = elementos.next().asLiteral().getString();
                                                            evaluationOutput = evaluationOutput + "<li>" + 
                                                                    "<a href=\"" + first + "\" target=\"_blank\">" + first + "</a>"+
                                                                    " , " +
                                                                    "<a href=\"" + second + "\" target=\"_blank\">" + second + "</a>"+
                                                                    "</li>";
                                                    }

                                                    evaluationOutput = evaluationOutput + "<ul>";

                                            }
                                            else if (code.contentEquals("P31")){

                                                    NodeIterator elements = ind.listPropertyValues(hasWrongEquivalentClass);

                                                    evaluationOutput = evaluationOutput + "<ul>";

                                                    while (elements.hasNext()){
                                                            String uri = elements.next().asResource().getURI();
                                                            Individual indi = model.getIndividual(uri);

                                                            NodeIterator elementos= indi.listPropertyValues(hasAffectedElement);

                                                            String first = elementos.next().asLiteral().getString();
                                                            String second = elementos.next().asLiteral().getString();
                                                            evaluationOutput = evaluationOutput + "<li>" + 
                                                                    "<a href=\"" + first + "\" target=\"_blank\">" + first + "</a>"+
                                                                    " , " +
                                                                    "<a href=\"" + second + "\" target=\"_blank\">" + second + "</a>"+
                                                                    "</li>";
                                                    }

                                                    evaluationOutput = evaluationOutput + "<ul>";

                                            }
                                            else if (code.contentEquals("P32")){

                                                    NodeIterator elements = ind.listPropertyValues(haveSameLabel);

                                                    evaluationOutput = evaluationOutput + "<ul>";

                                                    while (elements.hasNext()){
                                                            String uri = elements.next().asResource().getURI();
                                                            Individual indi = model.getIndividual(uri);

                                                            NodeIterator elementos= indi.listPropertyValues(hasAffectedElement);
                                                            evaluationOutput = evaluationOutput + "<li>";
                                                            boolean primero = true;
                                                            while (elementos.hasNext()){
                                                                    String first = elementos.next().asLiteral().getString();
                                                                    if (!primero)
                                                                            evaluationOutput = evaluationOutput + " , ";
                                                                    evaluationOutput = evaluationOutput + "<a href=\"" + first + "\" target=\"_blank\">" + first + "</a>";
                                                                    primero = false;
                                                            }
                                                            evaluationOutput = evaluationOutput + "</li>";
                                                    }

                                                    evaluationOutput = evaluationOutput + "<ul>";

                                            }
                                            else {
                                                    NodeIterator elements= ind.listPropertyValues(hasAffectedElement);

                                                    evaluationOutput = evaluationOutput + "<ul>";

                                                    while (elements.hasNext()){
                                                            RDFNode nextNode = elements.next();

                                                            if (nextNode.isLiteral()){
                                                                    String element = nextNode.asLiteral().getString();
                                                                    evaluationOutput = evaluationOutput + "<li>" + 
                                                                                    "<a href=\"" + element + "\" target=\"_blank\">" + element + "</a>"
                                                                                    + "</li>";
                                                            }
                                                            else if (nextNode.isURIResource()){
                                                                    System.out.println("Es un Resource in OOPSevaluation");

                                                            }
                                                            else{
                                                                    System.out.println("Can't act as Individual in OOPSevaluation");
                                                            }

                                                    }
                                                    evaluationOutput = evaluationOutput + "</ul>";
                                            }
                                    }


                                    evaluationOutput = evaluationOutput + "</div>\n";
                                    evaluationOutput = evaluationOutput + "</div>\n";
                                    evaluationOutput = evaluationOutput + "</div>\n";



                                     i++;
                            }
                    }
                    evaluationOutput = evaluationOutput + "</div>\n"; //close div accordion
            }


            return evaluationOutput;

            }
	
}
