/*
 *  Copyright 2012-2013 Ontology Engineering Group, Universidad Politécnica de Madrid, Spain

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
package widoco;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Iterator;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.restlet.representation.Representation;
import org.restlet.resource.ClientResource;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 *
 * @author Daniel Garijo
 */
public class TemplateGeneratorOLD {
    private HashMap<String,String> replacements;

    public TemplateGeneratorOLD() {
        replacements = new HashMap<String, String>();
    }
    
    
    
    public  String getTermList(Node n){
    NodeList divs = n.getChildNodes();
    for(int j = 0; j<divs.getLength(); j++){
        if(divs.item(j).getNodeName().equals("ul")){            
            return(nodeToString(divs.item(j)));
        }       
    }    
    return null;
}    
    public  String nodeToString(Node n){
        try {
            TransformerFactory transfac = TransformerFactory.newInstance();
            Transformer trans = transfac.newTransformer();
            trans.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
            trans.setOutputProperty(OutputKeys.INDENT, "yes");
            StringWriter sw = new StringWriter();
            StreamResult result = new StreamResult(sw);
            DOMSource source = new DOMSource(fixAnchor(n));
            trans.transform(source, result);
            String returnValue= sw.toString().replace("\n", "");          
            return(returnValue);
        }
        catch (Exception ex) {
            System.out.println("Error while writing to xml "+ex.getMessage());
            //ex.printStackTrace();
            return null;
        }
    }

    //this methods removes the first 2 anchors of the div returned by LODE (they lead to an error).
    //it also changes the id of the div replacing it with the name found in the anchor
    //(the second one)
    private  Node fixAnchor(Node nodeToFix) {        
        try{
            NodeList outerDiv = nodeToFix.getChildNodes();
            for(int i = 0; i<outerDiv.getLength(); i++){
                Node currentNode = outerDiv.item(i);
                if(currentNode.getNodeName().equals("div")){
                    //NodeList list =  nodeToFix.getChildNodes();
                    Node firstAnchor = currentNode.getFirstChild();
                    Node secondAnchor = firstAnchor.getNextSibling();
                    String newID = firstAnchor.getAttributes().getNamedItem("name").getNodeValue();
                    newID = newID.replace(ReadConfigurationFileOld.getOntologyNamespaceURI(), "");
                    if(secondAnchor.getNodeName().equals("a")){
                        currentNode.removeChild(secondAnchor);
                    }
                    //we save the the id for derreferencing properly the resource. Note that
                    //if a property has the same name as a Class this could lead to problems                
                    replacements.put(currentNode.getAttributes().getNamedItem("id").getNodeValue(), newID);

                    //we remove the anchor, which make an error in the visualization
                    currentNode.removeChild(firstAnchor);
                }
            }
            return nodeToFix;
        }catch(Exception ex){
            System.out.println("Could not fix node");
            return nodeToFix;
        }
        
    }
    public void generateTemplateWithOutLODE(String saveAsFileName){
        try{
            System.out.println("Generating HTML file "+saveAsFileName+"...");
            FileWriter fstreamTemplate = new FileWriter(saveAsFileName);
            BufferedWriter outTemplate = new BufferedWriter(fstreamTemplate);
            outTemplate.write(TextConstants.opening);
//            outTemplate.write(TextConstants.styles);
//            outTemplate.write(TextConstants.getHeadSection());
            outTemplate.write(TextConstants.abstractSection);
//            outTemplate.write(TextConstants.tableOfContentsSection);
            outTemplate.write(TextConstants.introductionSection);
//            outTemplate.write(TextConstants.getNameSpaceDeclaration());
//            outTemplate.write(TextConstants.nameSpaceDeclarations);
//            outTemplate.write(TextConstants.overviewSection);
//            outTemplate.write(TextConstants.ontologyDescriptionSection);
//            outTemplate.write(TextConstants.crossReferenceSection);
               
            outTemplate.write("</div>\n");
            outTemplate.write(TextConstants.referencesSection);
            outTemplate.write(TextConstants.acknowledgementsSection);
            outTemplate.write(TextConstants.ending);
            outTemplate.close();

                System.out.println("Done!");
        }catch(Exception e){
            System.out.println("An error occurred when creating the template: "+e.getMessage());
        }
    }
    public void generateTemplateWithLODE(String urlOntology, String saveAsFileName){
        ClientResource resource = new ClientResource("http://www.essepuntato.it/lode/owlapi/"+urlOntology);        
        // Send the HTTP GET request
        System.out.println("Querying LODE services for the HTML generation...");
        resource.get();            
        if (resource.getStatus().isSuccess()) {
            System.out.println("Generating HTML file "+saveAsFileName+"...");
            try {
                Representation r = resource.getResponseEntity();
                DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
                DocumentBuilder db = dbf.newDocumentBuilder();                    
                Document doc = db.parse(r.getStream());
                FileWriter fstreamTemplate = new FileWriter(saveAsFileName);
                BufferedWriter outTemplate = new BufferedWriter(fstreamTemplate);

                NodeList c = doc.getElementsByTagName("div");
                String termList = "", propList= "", dataPropList= "", classes= "", properties= "", dataproperties="";
                for(int i = 0; i<c.getLength();i++){
                    String attrID = c.item(i).getAttributes().item(0).getTextContent();
                    if(attrID.equals("classes")){
                        termList += getTermList(c.item(i));
                        classes += nodeToString(c.item(i));
                    }
                    else if(attrID.equals("objectproperties")){
                        propList=getTermList(c.item(i));
                        properties = (nodeToString(c.item(i)));
                    }
                    else if(attrID.equals("dataproperties")){
                        dataPropList = (getTermList(c.item(i)));
                        dataproperties = (nodeToString(c.item(i)));
                    }
                }
                outTemplate.write(TextConstants.opening);
//                outTemplate.write(TextConstants.styles);
//                outTemplate.write(TextConstants.getHeadSection());
                outTemplate.write(TextConstants.abstractSection);
//                outTemplate.write(TextConstants.tableOfContentsSection);
                outTemplate.write(TextConstants.introductionSection);
//                outTemplate.write(TextConstants.getNameSpaceDeclaration());
//                outTemplate.write(TextConstants.nameSpaceDeclarations);
//                outTemplate.write(TextConstants.overviewSection);
                if(!"".equals(termList)){
                        outTemplate.write("<h4>Classes</h4>");
                        outTemplate.write(fixIds(termList));
                    }
                    if(!"".equals(propList)){
                        outTemplate.write("<h4>Properties</h4>");
                        outTemplate.write(fixIds(propList));
                    }
                    if(!"".equals(dataPropList)){
                        outTemplate.write("<h4>Data Properties</h4>");
                        outTemplate.write(fixIds(dataPropList));
                    }                    
                outTemplate.write("</div>\n");//ending of the overview section
//                outTemplate.write(TextConstants.ontologyDescriptionSection);                   

//                outTemplate.write(TextConstants.crossReferenceSection);
                if(!"".equals(termList)){
                    outTemplate.write(fixIds(classes));
                }
                if(!"".equals(termList)){
                    outTemplate.write(fixIds(properties));
                }
                if(!"".equals(termList)){
                    outTemplate.write(fixIds(dataproperties));
                }
                outTemplate.write("</div>\n");//end of overview
                outTemplate.write(TextConstants.referencesSection);
                outTemplate.write(TextConstants.acknowledgementsSection);
                outTemplate.write(TextConstants.ending);
                outTemplate.close();

                System.out.println("Done!");
            } catch (Exception ex) {
                System.out.println("Exception interpreting the resource: "+ ex.getMessage());
            }

        }else{
           System.out.println("An error occurred when executing the process. Status returned: "
               + resource.getStatus());
        }
    }

    /**
     * Method to fix the ids generated automatically by LODE with the URIs of the classes and properties.
     * @param textToBeFixed The input text with the links to be fixed
     * @return 
     */
    private String fixIds(String textToBeFixed){    
        Iterator it = replacements.keySet().iterator();
        while(it.hasNext()){
            String keyToReplace = (String)it.next();
            textToBeFixed = textToBeFixed.replace(keyToReplace, replacements.get(keyToReplace));
            textToBeFixed = textToBeFixed.replace("<span>:", "<span>"); //if there are empty prefixes, we remove them.
        }
        return textToBeFixed;
    }

    public static void main(String [] args){
    //    System.out.println(TextConstants.styles);
        TemplateGeneratorOLD a = new TemplateGeneratorOLD();
//        a.generateTemplateWithLODE("http://purl.org/net/p-plan", "TEST.html");
        a.generateTemplateWithOutLODE("Test1.html");
    }
    
}
