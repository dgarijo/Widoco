/*
 * Copyright 2012-2022 Ontology Engineering Group, Universidad Politecnica de Madrid, Spain
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

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author dgarijo
 */
public class OOPSevaluationTest {
    
    public OOPSevaluationTest() {
    }

    /**
     * Test of printEvaluation method, from OOPSevaluation. The method copies the response from the server in case
     * it's down
     */
    @Test
    public void testPrintEvaluation()  {
        String aloResponse = "<rdf:RDF\n" +
                "    xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n" +
                "    xmlns:oops=\"http://oops.linkeddata.es/def#\"\n" +
                "    xmlns:owl=\"http://www.w3.org/2002/07/owl#\"\n" +
                "    xmlns:rdfs=\"http://www.w3.org/2000/01/rdf-schema#\"\n" +
                "    xmlns:xsd=\"http://www.w3.org/2001/XMLSchema#\" > \n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/def#warning\">\n" +
                "    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#Class\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/305ed243-3a37-4422-bd04-9c39deb40873\">\n" +
                "    <oops:hasNumberAffectedElements rdf:datatype=\"http://www.w3.org/2001/XMLSchema#integer\">1</oops:hasNumberAffectedElements>\n" +
                "    <oops:hasImportanceLevel rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Important</oops:hasImportanceLevel>\n" +
                "    <oops:hasDescription rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">The ontology lacks disjoint axioms between classes or between properties that should be defined as disjoint. This pitfall is related with the guidelines provided in [6], [2] and [7].\t</oops:hasDescription>\n" +
                "    <oops:hasName rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Missing disjointness</oops:hasName>\n" +
                "    <oops:hasCode rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">P10</oops:hasCode>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#pitfall\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/7584d4e6-a3da-44e4-8082-6f686c8769ba\">\n" +
                "    <oops:hasImportanceLevel rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Minor</oops:hasImportanceLevel>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://idi.fundacionctic.org/cruzar/turismo#Alojamiento</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://schema.org/LodgingBusiness</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://geonames.org/ontology#Feature</oops:hasAffectedElement>\n" +
                "    <oops:hasNumberAffectedElements rdf:datatype=\"http://www.w3.org/2001/XMLSchema#integer\">3</oops:hasNumberAffectedElements>\n" +
                "    <oops:hasDescription rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Ontology elements (classes, object properties and datatype properties) are created isolated, with no relation to the rest of the ontology.\t</oops:hasDescription>\n" +
                "    <oops:hasName rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Creating unconnected ontology elements</oops:hasName>\n" +
                "    <oops:hasCode rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">P04</oops:hasCode>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#pitfall\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/def#pitfall\">\n" +
                "    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#Class\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/aa4372b6-03b5-424f-90bb-164befb7292d\">\n" +
                "    <oops:hasPitfall rdf:resource=\"http://oops.linkeddata.es/data/33b4af64-62d2-4d01-8c3d-d0115246da7b\"/>\n" +
                "    <oops:hasPitfall rdf:resource=\"http://oops.linkeddata.es/data/7c439300-5f5f-4ec2-8050-ac4aac8bad0d\"/>\n" +
                "    <oops:hasPitfall rdf:resource=\"http://oops.linkeddata.es/data/464b039d-b28c-4f32-b542-6d3d8eab0a17\"/>\n" +
                "    <oops:hasPitfall rdf:resource=\"http://oops.linkeddata.es/data/305ed243-3a37-4422-bd04-9c39deb40873\"/>\n" +
                "    <oops:hasPitfall rdf:resource=\"http://oops.linkeddata.es/data/0efff784-a10f-4454-a360-bdca6c2657d0\"/>\n" +
                "    <oops:hasPitfall rdf:resource=\"http://oops.linkeddata.es/data/7584d4e6-a3da-44e4-8082-6f686c8769ba\"/>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#response\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/5fe74776-bf05-4fe7-bf2a-968742ad5889\">\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://geonames.org/ontology#featureClass</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://geonames.org/ontology#featureCode</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://purl.org/dc/terms/type</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#categoria</oops:hasAffectedElement>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#noSuggestionProperty\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/0efff784-a10f-4454-a360-bdca6c2657d0\">\n" +
                "    <oops:hasNumberAffectedElements rdf:datatype=\"http://www.w3.org/2001/XMLSchema#integer\">11</oops:hasNumberAffectedElements>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://geonames.org/ontology#featureClass</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://www.w3.org/2004/02/skos/core#Concept</oops:hasAffectedElement>\n" +
                "    <oops:hasCode rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">P08</oops:hasCode>\n" +
                "    <oops:hasImportanceLevel rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Minor</oops:hasImportanceLevel>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://schema.org/Hostel</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://schema.org/Motel</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://schema.org/Hotel</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://geonames.org/ontology#featureCode</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://geonames.org/ontology#Feature</oops:hasAffectedElement>\n" +
                "    <oops:hasDescription rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">This pitfall consists in creating an ontology element and failing to provide human readable annotations attached to it. Consequently, ontology elements lack annotation properties that label them (e.g. rdfs:label, lemon:LexicalEntry, skos:prefLabel or skos:altLabel) or that define them (e.g. rdfs:comment or dc:description). This pitfall is related to the guidelines provided in [5].\t</oops:hasDescription>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://idi.fundacionctic.org/cruzar/turismo#Alojamiento</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://schema.org/LodgingBusiness</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://schema.org/BedAndBreakfast</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://purl.org/dc/terms/type</oops:hasAffectedElement>\n" +
                "    <oops:hasName rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Missing annotations</oops:hasName>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#pitfall\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/def#suggestion\">\n" +
                "    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#Class\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/7c439300-5f5f-4ec2-8050-ac4aac8bad0d\">\n" +
                "    <oops:hasImportanceLevel rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Minor</oops:hasImportanceLevel>\n" +
                "    <oops:noSuggestion rdf:resource=\"http://oops.linkeddata.es/data/5fe74776-bf05-4fe7-bf2a-968742ad5889\"/>\n" +
                "    <oops:hasNumberAffectedElements rdf:datatype=\"http://www.w3.org/2001/XMLSchema#integer\">4</oops:hasNumberAffectedElements>\n" +
                "    <oops:hasDescription rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">This pitfall appears when any relationship (except for those that are defined as symmetric properties using owl:SymmetricProperty) does not have an inverse relationship (owl:inverseOf) defined within the ontology.\t</oops:hasDescription>\n" +
                "    <oops:hasName rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Inverse relationships not explicitly declared</oops:hasName>\n" +
                "    <oops:hasCode rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">P13</oops:hasCode>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#pitfall\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/33b4af64-62d2-4d01-8c3d-d0115246da7b\">\n" +
                "    <oops:hasCode rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">P20</oops:hasCode>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#Albergue</oops:hasAffectedElement>\n" +
                "    <oops:hasNumberAffectedElements rdf:datatype=\"http://www.w3.org/2001/XMLSchema#integer\">4</oops:hasNumberAffectedElements>\n" +
                "    <oops:hasDescription rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">The contents of some annotation properties are swapped or misused. This pitfall might affect annotation properties related to natural language information (for example, annotations for naming such as rdfs:label or for providing descriptions such as rdfs:comment). Other types of annotation could also be affected as temporal, versioning information, among others.\t</oops:hasDescription>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#pitfall\"/>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#Apartahotel</oops:hasAffectedElement>\n" +
                "    <oops:hasName rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Misusing ontology annotations</oops:hasName>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#Hotel</oops:hasAffectedElement>\n" +
                "    <oops:hasImportanceLevel rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Minor</oops:hasImportanceLevel>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#Hostal</oops:hasAffectedElement>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/464b039d-b28c-4f32-b542-6d3d8eab0a17\">\n" +
                "    <oops:hasImportanceLevel rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Important</oops:hasImportanceLevel>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://purl.org/dc/terms/type</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://geonames.org/ontology#featureCode</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://geonames.org/ontology#featureClass</oops:hasAffectedElement>\n" +
                "    <oops:hasNumberAffectedElements rdf:datatype=\"http://www.w3.org/2001/XMLSchema#integer\">3</oops:hasNumberAffectedElements>\n" +
                "    <oops:hasDescription rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Object and/or datatype properties without domain or range (or none of them) are included in the ontology. \t</oops:hasDescription>\n" +
                "    <oops:hasName rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Missing domain or range in properties</oops:hasName>\n" +
                "    <oops:hasCode rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">P11</oops:hasCode>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#pitfall\"/>\n" +
                "  </rdf:Description>\n" +
                "</rdf:RDF>";
        try{
        // The ontology has 6 pitfalls
            OOPSevaluation instance = new OOPSevaluation(new ByteArrayInputStream(aloResponse.getBytes()));
            //instance.printEvaluation();
            assertEquals(6, instance.getPitfallNumber());
        }catch(Exception e){
            fail("Error in test "+e.getMessage());
        }
    }

    /**
     * Test of printEvaluation method, from OOPSevaluation. The method copies the response from the server in case
     * it's down
     */
    @Test
    public void testPrintEvaluation2()  {
        String oopsResponse = "<rdf:RDF\n" +
                "    xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n" +
                "    xmlns:oops=\"http://oops.linkeddata.es/def#\"\n" +
                "    xmlns:owl=\"http://www.w3.org/2002/07/owl#\"\n" +
                "    xmlns:rdfs=\"http://www.w3.org/2000/01/rdf-schema#\"\n" +
                "    xmlns:xsd=\"http://www.w3.org/2001/XMLSchema#\" > \n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/def#warning\">\n" +
                "    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#Class\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/3463d931-1b6a-4a30-965c-ca3b81e68c3f\">\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://purl.org/net/p-plan#isPrecededBy</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://purl.org/net/p-plan#correspondsToVariable</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://purl.org/net/p-plan#isDecomposedAsPlan</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://purl.org/net/p-plan#isVariableOfPlan</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://purl.org/net/p-plan#isSubPlanOfPlan</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://purl.org/net/p-plan#isStepOfPlan</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://purl.org/net/p-plan#correspondsToStep</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://www.w3.org/ns/prov#wasDerivedFrom</oops:hasAffectedElement>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#noSuggestionProperty\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/54d0f686-b922-4686-9866-66654c9e68f7\">\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://www.w3.org/ns/prov#wasGeneratedBy</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://www.w3.org/ns/prov#used</oops:hasAffectedElement>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#inverseProperty\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/426240b0-1040-49ef-8690-9e2a131f3694\">\n" +
                "    <oops:hasImportanceLevel rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Minor</oops:hasImportanceLevel>\n" +
                "    <oops:noSuggestion rdf:resource=\"http://oops.linkeddata.es/data/3463d931-1b6a-4a30-965c-ca3b81e68c3f\"/>\n" +
                "    <oops:mightBeInverseRelationship rdf:resource=\"http://oops.linkeddata.es/data/54d0f686-b922-4686-9866-66654c9e68f7\"/>\n" +
                "    <oops:hasNumberAffectedElements rdf:datatype=\"http://www.w3.org/2001/XMLSchema#integer\">10</oops:hasNumberAffectedElements>\n" +
                "    <oops:hasDescription rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">This pitfall appears when any relationship (except for those that are defined as symmetric properties using owl:SymmetricProperty) does not have an inverse relationship (owl:inverseOf) defined within the ontology.\t</oops:hasDescription>\n" +
                "    <oops:hasName rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Inverse relationships not explicitly declared</oops:hasName>\n" +
                "    <oops:hasCode rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">P13</oops:hasCode>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#pitfall\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/adc6c18a-5f26-411f-ab38-a6faec53f082\">\n" +
                "    <oops:hasNumberAffectedElements rdf:datatype=\"http://www.w3.org/2001/XMLSchema#integer\">1</oops:hasNumberAffectedElements>\n" +
                "    <oops:hasImportanceLevel rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Important</oops:hasImportanceLevel>\n" +
                "    <oops:hasDescription rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">The ontology lacks disjoint axioms between classes or between properties that should be defined as disjoint. This pitfall is related with the guidelines provided in [6], [2] and [7].\t</oops:hasDescription>\n" +
                "    <oops:hasName rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Missing disjointness</oops:hasName>\n" +
                "    <oops:hasCode rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">P10</oops:hasCode>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#pitfall\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/def#pitfall\">\n" +
                "    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#Class\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/def#suggestion\">\n" +
                "    <rdf:type rdf:resource=\"http://www.w3.org/2002/07/owl#Class\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/bea4d574-9036-48f8-8e4f-a3c3956d66cb\">\n" +
                "    <oops:hasImportanceLevel rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Minor</oops:hasImportanceLevel>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://www.w3.org/ns/prov#wasDerivedFrom</oops:hasAffectedElement>\n" +
                "    <oops:hasName rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">Missing annotations</oops:hasName>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#pitfall\"/>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://www.w3.org/ns/prov#Activity</oops:hasAffectedElement>\n" +
                "    <oops:hasDescription rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">This pitfall consists in creating an ontology element and failing to provide human readable annotations attached to it. Consequently, ontology elements lack annotation properties that label them (e.g. rdfs:label, lemon:LexicalEntry, skos:prefLabel or skos:altLabel) or that define them (e.g. rdfs:comment or dc:description). This pitfall is related to the guidelines provided in [5].\t</oops:hasDescription>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://www.w3.org/ns/prov#Plan</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://www.w3.org/ns/prov#Bundle</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://www.w3.org/ns/prov#used</oops:hasAffectedElement>\n" +
                "    <oops:hasNumberAffectedElements rdf:datatype=\"http://www.w3.org/2001/XMLSchema#integer\">7</oops:hasNumberAffectedElements>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://www.w3.org/ns/prov#wasGeneratedBy</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://www.w3.org/ns/prov#Entity</oops:hasAffectedElement>\n" +
                "    <oops:hasCode rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">P08</oops:hasCode>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/8e0028fb-3f10-43bb-b907-5536789a9ed9\">\n" +
                "    <oops:hasSuggestion rdf:resource=\"http://oops.linkeddata.es/data/d44b277f-025a-4463-ba1b-06db107b4c0e\"/>\n" +
                "    <oops:hasPitfall rdf:resource=\"http://oops.linkeddata.es/data/426240b0-1040-49ef-8690-9e2a131f3694\"/>\n" +
                "    <oops:hasPitfall rdf:resource=\"http://oops.linkeddata.es/data/adc6c18a-5f26-411f-ab38-a6faec53f082\"/>\n" +
                "    <oops:hasPitfall rdf:resource=\"http://oops.linkeddata.es/data/bea4d574-9036-48f8-8e4f-a3c3956d66cb\"/>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#response\"/>\n" +
                "  </rdf:Description>\n" +
                "  <rdf:Description rdf:about=\"http://oops.linkeddata.es/data/d44b277f-025a-4463-ba1b-06db107b4c0e\">\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://purl.org/net/p-plan#isSubPlanOfPlan</oops:hasAffectedElement>\n" +
                "    <oops:hasAffectedElement rdf:datatype=\"http://www.w3.org/2001/XMLSchema#anyURI\">http://www.w3.org/ns/prov#wasDerivedFrom</oops:hasAffectedElement>\n" +
                "    <oops:hasNumberAffectedElements rdf:datatype=\"http://www.w3.org/2001/XMLSchema#integer\">2</oops:hasNumberAffectedElements>\n" +
                "    <oops:hasDescription rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">The domain and range axioms are equal for each of the following object properties. Could they be symmetric or transitive?</oops:hasDescription>\n" +
                "    <oops:hasCode rdf:datatype=\"http://www.w3.org/2001/XMLSchema#string\">SUGGESTION: symmetric or transitive object properties.</oops:hasCode>\n" +
                "    <rdf:type rdf:resource=\"http://oops.linkeddata.es/def#suggestion\"/>\n" +
                "  </rdf:Description>\n" +
                "</rdf:RDF>";
        try{
            // The ontology has 3 pitfalls
            OOPSevaluation instance = new OOPSevaluation(new ByteArrayInputStream(oopsResponse.getBytes()));
            instance.printEvaluation();
            assertEquals(3, instance.getPitfallNumber());
        }catch(Exception e){
            fail("Error in test "+e.getMessage());
        }
    }

    /**
     * Test of printEvaluation method, from OOPSEvaluation. Commented in case the server is down
     */
//    @Test
//    public void testPrintEvaluationWebServer()  {
//        try{
//        System.out.println("printEvaluation with p-plan");
//        String content = null;
//        BufferedReader br = new BufferedReader(new InputStreamReader(this.getClass().getResourceAsStream("/p-plan.owl")));
//        try {
//                StringBuilder sb = new StringBuilder();
//                String line = br.readLine();
//
//                while (line != null) {
//                        sb.append(line);
//                        sb.append(System.lineSeparator());
//                        line = br.readLine();
//                }
//                content = sb.toString();
//        } finally {
//                br.close();
//        }
//            // The ontology has 6 pitfalls
//            OOPSevaluation instance = new OOPSevaluation(content);
//            instance.printEvaluation();
//            assertEquals(3, instance.getPitfallNumber());
//        }catch(Exception e){
//            fail("Error in test "+e.getMessage());
//        }
//    }
    
}
