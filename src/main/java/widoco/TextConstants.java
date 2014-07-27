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

import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import widoco.entities.Agent;
import widoco.entities.Ontology;


/**
 *
 * @author Daniel Garijo
 */
public class TextConstants {
    public static final String opening= "<!DOCTYPE html>\n<html prefix=\"dc: http://purl.org/dc/terms/ schema: http://schema.org/ prov: http://www.w3.org/ns/prov# foaf: http://xmlns.com/foaf/0.1/ owl: http://www.w3.org/2002/07/owl#\">\n"
            + "<head>\n"
            + "<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" />\n";
    public static final String styles=
                "<title property=\"dc:title schema:name\">"+ReadConfigurationFileOld.getTitle()+"</title>\n"+
		"<style type=\"text/css\">\n"+
		"/*This template uses the W3C css for working drafts, with small modifications.\n"+
		   "Original copyright:\n"+
		   "Copyright 1997-2003 W3C (MIT, ERCIM, Keio). All Rights Reserved.\n"+
		   "The following software licensing rules apply:\n"+
		   "http://www.w3.org/Consortium/Legal/copyright-software */\n"+

		"body {\n"+
		  "padding: 2em 1em 2em 70px;\n"+
		  "margin: 0;\n"+
		  "font-family: sans-serif;\n"+
		  "color: black;\n"+
		  "background: white;\n"+
		  "background-position: top left;\n"+
		  "background-attachment: fixed;\n"+
		  "background-repeat: no-repeat;\n"+
		"}\n"+
		":link { color: #00C; background: transparent }\n"+
		":visited { color: #609; background: transparent }\n"+
		"a:active { color: #C00; background: transparent }\n"+

		"a:link img, a:visited img { border-style: none } /* no border on img links */\n"+

		"a img { color: white; }        /* trick to hide the border in Netscape 4 */\n"+
		"@media all {                   /* hide the next rule from Netscape 4 */\n"+
		  "a img { color: inherit; }    /* undo the color change above */\n"+
		"}\n"+

		"th, td { /* ns 4 */\n"+
		  "font-family: sans-serif;\n"+
		"}\n"+

		"h1, h2, h3, h4, h5, h6 { text-align: left }\n"+
		"/* background should be transparent, but WebTV has a bug */\n"+
		"h1, h2, h3 { color: #005A9C; background: white }\n"+
		"h1 { font: 170% sans-serif }\n"+
		"h2 { font: 140% sans-serif }\n"+
		"h3 { font: 120% sans-serif }\n"+
		"h3 {\n"+
			"border-bottom: 1px solid navy;\n"+
			"margin-top: 3px;\n"+
			"padding-bottom: 5px;\n"+
		"}\n"+
		"h4 { font: bold 100% sans-serif }\n"+
		"h5 { font: italic 100% sans-serif }\n"+
		"h6 { font: small-caps 100% sans-serif }\n"+
		".hide { display: none }\n"+
		"div.head { margin-bottom: 1em }\n"+
		"div.head h1 { margin-top: 2em; clear: both }\n"+
		"div.head table { margin-left: 2em; margin-top: 2em }\n"+
		"p.copyright { font-size: small }\n"+
		"p.copyright small { font-size: small }\n"+
		"@media screen {  /* hide from IE3 */\n"+
		"a[href]:hover { background: #ffa }\n"+
		"}\n"+
		"pre { margin-left: 2em }\n"+		
		"p {\n"+
		  "margin-top: 0.6em;\n"+
		  "margin-bottom: 0.6em;		  \n"+
		  "text-align: justify;\n"+
		"}\n"+		
		"dt, dd { margin-top: 0; margin-bottom: 0 } /* opera 3.50 */\n"+
		"dt { font-weight: bold }\n"+
		"ul.toc, ol.toc {\n"+
		  "list-style: disc;		/* Mac NS has problem with 'none' */\n"+
		  "list-style: none;\n"+
		"}\n"+
		"@media aural {  \n"+
		  "h1, h2, h3 { stress: 20; richness: 90 }\n"+
		  ".hide { speak: none }\n"+
		  "p.copyright { volume: x-soft; speech-rate: x-fast }\n"+
		  "dt { pause-before: 20% }\n"+
		  "pre { speak-punctuation: code } \n"+
		"}\n"+		
		"/*Additional css*/\n"+
		".hlist {\n"+
			"background-color: #F4FFFF;\n"+
			"border: 1px solid navy;\n"+
			"padding: 5px;\n"+
		"}\n"+
		".hlist li {\n"+
			"display: inline-table;\n"+
			"list-style-type: none;\n"+
			"padding-right: 20px;\n"+
		"}\n"+
		".backlink {\n"+
			"background-color: #F4FFFF;\n"+
			"border: 1px dotted navy;\n"+
			"color: black;\n"+
			"float: right;\n"+
			"font-size: 10pt;\n"+
			"padding: 2px;\n"+
			"text-align: right;\n"+
		"}\n"+
		".entity {\n"+
			"border: 1px solid navy;\n"+
			"margin: 5px 0;\n"+
			"padding: 5px;\n"+
		"}\n"+
		"table {\n"+
			"background-color: #F4FFFF;\n"+
			"border: 1px solid navy;\n"+
			"margin: 20px;\n"+
		"}\n"+
		"table {\n"+
			"text-align: center;\n"+
			"vertical-align: middle;\n"+
		"}\n"+
		"table td {\n"+
			"padding: 5px 15px;\n"+
			"text-align: left;\n"+
		"}\n"+
		"table th {\n"+
			"background-color: LightGoldenRodYellow;\n"+
		"}\n"+
		"pre {\n"+
			"background-color: #F9F9F9;\n"+
			"border: 1px dashed #2F6FAB;\n"+
			"color: black;\n"+
			"line-height: 1.1em;\n"+
			"padding: 1em;\n"+
		"}\n"+
                ".type-c {\n"+
                    "cursor:help;\n"+
                    "color:orange;\n"+
                "}\n"+

                ".type-op {\n"+
                    "cursor:help;\n"+
                    "color:navy;   \n" +
                "}\n"+

                ".type-dp {\n"+
                    "cursor:help;\n"+
                    "color:green;\n"+
                "}\n"+

		"</style> \n"+
                "</head>\n"+                           
                "<body resource=\""+ReadConfigurationFileOld.getOntologyNamespaceURI()+"\" typeOf=\"owl:Ontology schema:TechArticle\">\n"+
                //RDF-a Annotations
                "<span resource=\"\" typeOf=\"foaf:Document schema:WebPage\">\n"+                
                "<span property=\"dc:created schema:dateCreated\" content=\""+ReadConfigurationFileOld.getDateOfRelease()+"\"></span>\n"+
                "<span property=\"dc:isVersionOf\" resource=\""+ReadConfigurationFileOld.getLatestVersion()+"\"></span>\n"+
                "<span property=\"prov:wasDerivedFrom\" resource=\"http://www.opmw.org/model/p-plan/#\"></span>\n"+
                "<span property=\"dc:contributor prov:wasAttributedTo schema:contributor\" resource=\"http://delicias.dia.fi.upm.es/members/DGarijo/#me\"></span>\n"+
                "</span>\n";
    //missing specialization. Missing alterante
    public static final String abstractSection="<h2>Abstract</h2><p>Here goes the abstract. A couple of sentences sumamrizing the ontology and its prupose.</p>\n"
            + "<p style=\"text-align: center;\"> <b> Here you should point to the owl encoding of your ontology</b></p>\n";
    
//    public static final String tableOfContentsSection="<div id=\"toc\">"+
//            "<h2>Table of Contents</h2>\n"+
//            "<ul><li>\n"+
//            "<a href=\"#introduction\">1. Introduction</a></li>\n"+
//                    "<ul><li><a href=\"#namespacedeclarations\">1.1 Namespace declarations</a></li></ul>\n"+
//            "<a href=\"#ontOverview\">2. "+ReadConfigurationFileOld.getOntologyName()+" Overview</a></li><li>\n"+
//            "<a href=\"#ontDescription\">3. "+ReadConfigurationFileOld.getOntologyName()+" Description</a></li>\n"+	
//            "<li><a href=\"#crossReference\">4. Cross reference for "+ReadConfigurationFileOld.getOntologyName()+" classes, properties and dataproperties</a></li>\n"+
//            "<ul>\n"+
//            "        <li><a href=\"#classes\">4.1 Classes</a></li>\n"+
//            "        <li><a href=\"#objectproperties\">4.2 Object Properties</a></li>\n"+
//            "        <li><a href=\"#dataproperties\">4.3 Data Properties</a></li>\n"+
//            "</ul\n>"+
//            "<li>\n"+
//            "<a href=\"#references\">5. References</a></li><li>\n"+
//            "<a href=\"#acknowledgements\">6. Acknowledgements</a></li>\n"+
//            "</ul>\n"+
//            "</div>\n";
            
    public static final String introductionSection="<h2>1. Introduction <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"+
        "<p>This should talk a bit about your ontology, its motivation, soa and goals</p>\n";
    
    //delete this
    public static final String nameSpaceDeclarations="<div id=\"namespacedeclarations\">\n"+
        "<h2>1.1. Namespace declarations <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"+
        "</p><div id=\"ns\" align=\"center\">\n"+
         "<table>\n"+
                "<caption> <a href=\"#ns\"> Table 1</a>: Namespaces used in the document </caption>\n"+
                "<tbody>\n"+
                "<tr><td><b>"+ReadConfigurationFileOld.getOntologyPrefix()+"</b></td><td>&lt;"+ReadConfigurationFileOld.getOntologyNamespaceURI()+"&gt;</td></tr>\n"+
                "<tr><td><b>owl</b></td><td>&lt;http://www.w3.org/2002/07/owl#&gt;</td></tr>\n"+
                "<tr><td><b>rdfs</b></td><td>&lt;http://www.w3.org/2000/01/rdf-schema#&gt;</td></tr>\n"+                           
                "<tr><td><b>xsd</b></td><td>&lt;http://www.w3.org/2001/XMLSchema#&gt;</td></tr>\n"+                           
                "<tr><td><b>dcterms</b></td><td>&lt;http://purl.org/dc/terms/#&gt;</td></tr>\n"+
                "</tbody>\n"+
          "</table>\n"+
          "</div>\n"+
        "</div></div>\n";
//    public static final String overviewSection="<div id=\"ontOverview\">\n"+
//	"<h2>2. "+ReadConfigurationFileOld.getOntologyName()+" Overview <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"
//            + "<p>Overview of the ontology goes here: a few sentences explaining the main concepts of the ontology</p>\n";
//    public static final String ontologyDescriptionSection ="<div id=\"ontDescription\">\n"+
//	"<h2>3. "+ReadConfigurationFileOld.getOntologyName()+" Description <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"
//            + "<p>Complete description of the ontology: a diagram explaining how the classes are related, examples of usage, etc.</p></div>\n";
//    public static final String crossReferenceSection="<h2>4. Cross reference for "+ReadConfigurationFileOld.getOntologyName()+" classes and properties</h2>\n"+
//            "This section provides details for each class and property defined by "+ReadConfigurationFileOld.getOntologyName()+".\n";
    public static final String referencesSection="<h2>5. References <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"
            + "<p>Add your references here in a list. It is recommended to have them as a list.</p>\n";
    public static final String acknowledgementsSection="<div id=\"acknowledgements\">\n"+
                    "<h2>6. Acknowledgements <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"
            + "<p>The authors would like to thanks <a href=\"http://palindrom.es/phd/whoami/\">Silvio Peroni</a> for developing <a href=\"http://www.essepuntato.it/lode\">LODE</a>, "
            + "a Live OWL Documentation Environment used for representing the Corss Referencing Section of this document and <a href=\"http://delicias.dia.fi.upm.es/members/dgarijo/\">"
            + "Daniel Garijo</a> for developing the "
            + "script used to create the template of this document.</p>\n</div>\n";
    public static final String changeLogSection="<div id=\"changelog\">"+
                    "<h2>Changes since last release <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>"
            + "<p>This is a changelog. Thi ssection is optional but recommended</p></div>";
    public static final String ending="</body></html>";
    
    //given a list of agents, this method gets it as a String
    private static String getAgents(ArrayList<Agent> auth){
        String agents ="";
        try{
            Iterator<Agent> it = auth.iterator();
            int i = 1;
            while(it.hasNext()){
                Agent currAuth = it.next();
                String authorName = currAuth.getName(); //the name should be always there
                if(authorName==null || "".equals(authorName)){
                    authorName = "Author"+i;
                    i++;
                }
                if(currAuth.getURL()!=null &&!"".equals(currAuth.getURL())){
                    agents+="<dd><a property=\"dc:creator schema:author prov:wasAttributedTo\" resource=\""+currAuth.getURL()+"\" href=\""+currAuth.getURL()+"\">"+authorName+"</a>";
                }else{
                    agents+="<dd>"+authorName;
                }
                if(currAuth.getInstitutionName()!=null && !"".equals(currAuth.getInstitutionName()))
                    agents+=", "+currAuth.getInstitutionName();
                agents+="</dd>";
            }   
        }catch(Exception e){
            System.out.println("Error while writing authors, their urls or their instititions.");
        }
        return agents;
    }
    private static String getAuthors(ArrayList<Agent> auth) {
        String authors="<dl><dt>Authors:</dt>\n";
        //the same amount of names and institutions is assumed.
        authors+=getAgents(auth);
        authors = authors.replace("dc:creator schema:author", "dc:contributor schema:contributor");//fix of annotations
        return authors +"</dl>\n";                   
    }
    
    private static String getContributors(ArrayList<Agent> contrib) {
        String contributors="<dl><dt>Contributors:</dt>\n";
        contributors+=getAgents(contrib);
        return contributors +"</dl>\n";                   
    }

    //method for extracting the ontologies from an arraylist.
    private static String getOntologies(ArrayList<Ontology> ontos){
        String ontologies = "";
        Iterator<Ontology> it = ontos.iterator();
        int i=1;
        while(it.hasNext()){
            Ontology currentOnto = it.next();
            String currentOntoName = currentOnto.getName();
            if(currentOntoName==null||"".equals(currentOntoName)){
                currentOntoName = "Onto"+i;
                i++;
            }
            if(currentOnto.getNamespaceURI()!=null && !"".equals(currentOnto.getNamespaceURI())){
                ontologies+="<dd><a property=\"owl:imports schema:mentions\" resource=\""+currentOnto.getNamespaceURI()+"\" href=\""+currentOnto.getNamespaceURI()+"\">"+currentOntoName+"</a></dd>";
            }
            else{
                ontologies+="<dd>"+currentOntoName+"</dd>";
            }
        }
        return ontologies;
    }
    private static String getImports(ArrayList<Ontology> ontos) {
        String imports= "<dl><dt>Imported Ontologies:</dt>\n";
        imports+= getOntologies(ontos);
        return imports+"</dl>\n";
    }

    private static String getExtends(ArrayList<Ontology> ontos) {
        String extended= "<dl><dt>Extended Ontologies:</dt>\n";   
        extended += getOntologies(ontos);
        extended = extended.replace("owl:imports",""); //to remove the import annotation
        return extended+"</dl>\n";
    }

//    private static String getPreviousVersion() {
//        String previousV = ReadConfigurationFileOld.getPreviousVersion();
//        if(previousV!=null &&previousV!=null){
//            return ;
//        }
//        else{ return "";}
//    }
    
    public static String getNameSpaceDeclaration(HashMap<String,String> namesp){
    	String ns="<div id=\"namespacedeclarations\">\n"+
        "<h2>1.1. Namespace declarations <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"+
        "</p><div id=\"ns\" align=\"center\">\n"+
         "<table>\n"+
                "<caption> <a href=\"#ns\"> Table 1</a>: Namespaces used in the document </caption>\n"+
                "<tbody>\n";
        Iterator<String> keys = namesp.keySet().iterator();
        while(keys.hasNext()){
            String current = keys.next();
            ns+="<tr><td><b>"+current+"</b></td><td>&lt;"+namesp.get(current)+"&gt;</td></tr>\n";
        }
        ns+="</tbody>\n"+
          "</table>\n"+
          "</div>\n"+
        "</div>\n";
    	return ns;
//    	String prefixes = "";
//    	
//    	try {
//			Model model = ModelFactory.createDefaultModel();
//			model.read(ReadConfigurationFileOld.getThisVersion());			
//			for (String key:model.getNsPrefixMap().keySet()){
//				String value = model.getNsPrefixMap().get(key);
//				if (!value.isEmpty() && !key.equals("")){
//					System.out.println(key+":"+value);
//					prefixes = prefixes + "<tr><td><b>"+key+"</b></td><td>&lt;"+value+"&gt;</td></tr>\n";
//				}
//			}
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			prefixes = "<tr><td><b>"+ReadConfigurationFileOld.getOntologyPrefix()+"</b></td><td>&lt;"+ReadConfigurationFileOld.getOntologyNamespaceURI()+"&gt;</td></tr>\n"+
//            "<tr><td><b>owl</b></td><td>&lt;http://www.w3.org/2002/07/owl#&gt;</td></tr>\n"+
//            "<tr><td><b>rdfs</b></td><td>&lt;http://www.w3.org/2000/01/rdf-schema#&gt;</td></tr>\n"+                           
//            "<tr><td><b>xsd</b></td><td>&lt;http://www.w3.org/2001/XMLSchema#&gt;</td></tr>\n"+                           
//            "<tr><td><b>dcterms</b></td><td>&lt;http://purl.org/dc/terms/#&gt;</td></tr>\n";
//		}
//		
//		String nameSpaceDeclarations="<div id=\"namespacedeclarations\">\n"+
//        "<h2>1.1. Namespace declarations <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"+
//        "</p><div id=\"ns\" align=\"center\">\n"+
//         "<table>\n"+
//                "<caption> <a href=\"#ns\"> Table 1</a>: Namespaces used in the document </caption>\n"+
//                "<tbody>\n"+
//                prefixes+
//                "</tbody>\n"+
//          "</table>\n"+
//          "</div>\n"+
//        "</div></div>\n";
//    	return nameSpaceDeclarations;
    }
    
    //NEW METHODS START FROM HERE
    
    public static String getIndexDocument(String resourcesFolderName,Configuration c){
        String document=opening +
                        " <link rel=\"stylesheet\" href=\""+resourcesFolderName+"/primer.css\" media=\"screen\" />   " +
                        " <link rel=\"stylesheet\" href=\""+resourcesFolderName+"/rec.css\" media=\"screen\" />   " +
                        " <link rel=\"stylesheet\" href=\""+resourcesFolderName+"/extra.css\" media=\"screen\" />   " +
                        " <link rel=\"stylesheet\" href=\""+resourcesFolderName+"/owl.css\" media=\"screen\" />   " +
                        "<script src=\""+resourcesFolderName+"/jquery.js\"></script> \n" +
                        "    <script> \n" +
                        "    $(function(){\n";
        if(c.isIncludeAbstract()) document += "      $(\"#abstract\").load(\"sections/abstract.html\"); \n";
        if(c.isIncludeIntroduction()) document += "      $(\"#introduction\").load(\"sections/introduction.html\"); \n";
        if(c.isIncludeOverview()) document += "      $(\"#overview\").load(\"sections/overview.html\"); \n";
        if(c.isIncludeDescription()) document += "      $(\"#description\").load(\"sections/description.html\"); \n";
        if(c.isIncludeCrossReferenceSection()) document += "      $(\"#crossref\").load(\"sections/crossref.html\"); \n";
        if(c.isIncludeReferences()) document += "      $(\"#references\").load(\"sections/references.html\"); \n";
               document+="    });\n" +
                        "    </script> \n" +
                        "  </head> \n" +
                        "\n" +
                        "  <body> \n" +
                        "	 \n" ;
                        //"	 <h1>This is a test combining the different sections</h1>\n";
        document += getHeadSection(c);
        if(c.isIncludeAbstract()) document += "     <div id=\"abstract\"></div>\n";
        document += getTableOfContentsSection(c);
        if(c.isIncludeIntroduction()) document += "     <div id=\"introduction\"></div>\n";
        //else document += "<div id=\"namespacedeclaration\"></div>\n";
        if(c.isIncludeOverview()) document += "     <div id=\"overview\"></div>\n";
        if(c.isIncludeDescription()) document += "     <div id=\"description\"></div>\n";
        if(c.isIncludeCrossReferenceSection()) document +=                 "     <div id=\"crossref\"></div>\n";
        if(c.isIncludeReferences()) document += "     <div id=\"references\"></div>\n";
              document+= acknowledgementsSection+"</body> \n" +
                        "</html>";
        //to do: fix table of contents
        //add the remaining sections (head, anotation, etc)
        //add rdf-a annotations
        return document;
    }
    
    public static String getHeadSection(Configuration c){
//        me quedo aqui. Falta poner opcionales
        String head = "<div class=\"head\">\n";
        if(c.getTitle()!=null &&!"".equals(c.getTitle()))
            head+="<h1 property=\"dc:title schema:name\">"+c.getTitle()+"</h1>\n";
        if(c.getReleaseDate()!=null && !"".equals(c.getReleaseDate()))
            head+="<span property=\"dc:modified schema:dateModified\" content=\""+c.getReleaseDate()+"\"></span>\n"+
                    "<h2>Release "+c.getReleaseDate()+"</h2>\n";
        if(c.getThisVersion()!=null && !"".equals(c.getThisVersion()))
            head+="<dl>\n"+
                    "<dt>This version:</dt>\n"+
                    "<dd><a href=\""+c.getThisVersion()+"\">"+c.getThisVersion()+"</a></dd>\n"+
                    "</dl>";
        if(c.getLatestVersion()!=null && !"".equals(c.getLatestVersion()))
            head+="<dl><dt>Latest version:</dt>\n"+
                    "<dd><a href=\""+c.getLatestVersion()+"\">"+c.getLatestVersion()+"</a></dd>\n"+
                    "</dl>";
        if(c.getPreviousVersion()!=null && !"".equals(c.getPreviousVersion()))
            head+= "<dl>\n"+
                    "<dt>Previous version:</dt>\n"+
                    "<dd><a property=\"schema:significantLink prov:wasRevisionOf\" href=\""+c.getPreviousVersion()+"\">"+c.getPreviousVersion()+"</a></dd>\n"+
                    "</dl>\n";
        if(c.getRevision()!=null && !"".equals(c.getRevision()))
            head +="<dt>Revision</dt>\n"+
                    "<dd property=\"schema:version\">"+c.getRevision()+"</dd>\n";
        if(!c.getCreators().isEmpty())
            head += getAuthors(c.getCreators())+"\n";
        if(!c.getContributors().isEmpty())
            head += getContributors(c.getContributors())+"\n";
        if(!c.getImportedOntolgies().isEmpty())
            head += getImports(c.getImportedOntolgies())+"\n";
        if(!c.getExtendedOntologies().isEmpty())
            head += getExtends(c.getExtendedOntologies())+"\n";
        if(c.getLicense()!=null && c.getLicense().getUrl()!=null && c.getLicense().getName()!=null 
                && !"".equals(c.getLicense().getUrl()) &&!"".equals(c.getLicense().getName())){
            if(c.getLicense().getIcon()!=null && !"".equals(c.getLicense().getIcon())){
                head+="<a property=\"dc:rights\" href=\""+c.getLicense().getUrl()+"\" rel=\"license\">\n" +
                "<img src=\""+c.getLicense().getIcon()+"\" style=\"border-width:0\" alt=\"License\">\n" +
                "</a>\n<br/>";
            }
            head+="<dl>This work is licensed under a <a rel=\"license\" href=\""+c.getLicense().getUrl()+"\">"+c.getLicense().getName()+"</a>.</dl>\n"+
                    "<span property=\"dc:license\" resource=\""+c.getLicense().getUrl()+"\"></span>\n";
        }
        head+= "<hr/>\n"+
                "</div>\n";
        return head;
    }
    
    public static String getTableOfContentsSection(Configuration c){
        int i=1;
        String table ="<div id=\"toc\">"+
            "<h2>Table of Contents</h2>\n"+
            "<ul>\n";
            if(c.isIncludeIntroduction()){
                table+="<li><a href=\"#introduction\">"+i+". Introduction</a></li>\n"+
                    "<ul><li><a href=\"#namespacedeclarations\">"+i+".1 Namespace declarations</a></li></ul>\n";
                i++;
            }
            if(c.isIncludeOverview()) {
                table+="<li><a href=\"#overview\">"+i+". "+c.getMainOntology().getName()+" Overview</a></li>\n";
                i++;
            }
            if(c.isIncludeDescription()){
                table+="<li><a href=\"#description\">"+i+". "+c.getMainOntology().getName()+" Description</a></li>\n";
                i++;
            }	
            if(c.isIncludeCrossReferenceSection()){
                table+="<li><a href=\"#crossref\">"+i+". Cross reference for "+c.getMainOntology().getName()+" classes, properties and dataproperties</a></li>\n"+
                    "<ul>\n"+
                    "        <li><a href=\"#classes\">"+i+".1 Classes</a></li>\n"+
                    "        <li><a href=\"#objectproperties\">"+i+".2 Object Properties</a></li>\n"+
                    "        <li><a href=\"#dataproperties\">"+i+".3 Data Properties</a></li>\n"+
                    "</ul>\n";
                i++;
            }
            if(c.isIncludeReferences()){
                table+="<li><a href=\"#references\">"+i+". References</a></li>\n";
                i++;
            }
            table+="<li><a href=\"#acknowledgements\">"+i+". Acknowledgements</a></li>\n"+
            "</ul>\n"+
            "</div>\n";
        return table;
    }
    
    public static String getOverviewSection(Configuration c){
        return "<h2>2. "+c.getMainOntology().getName()+" Overview <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"
            + "<p>Overview of the ontology goes here: a few sentences explaining the main concepts of the ontology</p>\n";
    }
    
    public static String getDescriptionSection(Configuration c){
        return "<h2>3. "+c.getMainOntology().getName()+" Description <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"
            + "<p>Complete description of the ontology: a diagram explaining how the classes are related, examples of usage, etc.</p>\n";
    }
    
    public static String getCrossReferenceSection(Configuration c){
        return "<h2>4. Cross reference for "+c.getMainOntology().getName()+" classes and properties</h2>"+"\n" +
               "This section provides details for each class and property defined by "+c.getMainOntology().getName()+".\n";
    }
    
}
