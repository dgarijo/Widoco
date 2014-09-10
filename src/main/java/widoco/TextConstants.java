/*
 *  Copyright 2012-2013 Ontology Engineering Group, Universidad Polit√©cnica de Madrid, Spain

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

import java.io.File;
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
    //missing specialization. Missing alterante
    public static final String abstractSection="<h2>Abstract</h2><p>Here goes the abstract. A couple of sentences sumamrizing the ontology and its prupose.</p>\n"
            + "<p style=\"text-align: center;\"> <b> Here you should point to the owl encoding of your ontology</b></p>\n";

            
    public static final String introductionSection="<h2>1. Introduction <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"+
        "<p>This should talk a bit about your ontology, its motivation, soa and goals</p>\n";
    
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
        return authors +"</dl>\n";                   
    }
    
    private static String getContributors(ArrayList<Agent> contrib) {
        String contributors="<dl><dt>Contributors:</dt>\n";
        contributors+=getAgents(contrib);
        contributors = contributors.replace("dc:creator schema:author", "dc:contributor schema:contributor");//fix of annotations
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
    }
    
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
                    //missing specialization. Missing alterante
                    //I assume the namespace prefix of the ontology is provided
                    "<body resource=\""+c.getMainOntology().getNamespaceURI()+"\" typeOf=\"owl:Ontology schema:TechArticle\">\n"+
//                //RDF-a Annotations
                     "<span resource=\"\" typeOf=\"foaf:Document schema:WebPage\">\n";
        if(c.getReleaseDate()!=null && !"".equals(c.getReleaseDate())){
            document+="<span property=\"dc:created schema:dateCreated\" content=\""+c.getReleaseDate()+"\"></span>\n";
         }
        if(c.getLatestVersion()!=null && !"".equals(c.getLatestVersion())){
            document+="<span property=\"dc:isVersionOf prov:specializationOf\" resource=\""+c.getLatestVersion()+"\"></span>\n";
        }
        if(c.getPreviousVersion()!=null && !"".equals(c.getPreviousVersion())){
            document+="<span property=\"prov:alternateOf prov:revisionOf\" resource=\""+c.getPreviousVersion()+"\"></span>\n";
        }
            document+="<span property=\"dc:contributor prov:wasAttributedTo schema:contributor\" resource=\"http://purl.org/net/dgarijo\"></span>\n"+
                        "</span>\n";
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
                "<img src=\""+c.getLicense().getIcon()+"\" style=\"border-width:0\" alt=\"License\"></img>\n" +
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
    
    public static String getProvenanceHtml(Configuration c){
        String provhtml = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" />\n" +
                " \n" +
                "  </head> \n" +
                "\n" +
                "<body>\n" +
                "<div class=\"head\">\n";
                if(c.getTitle()!=null &&!"".equals(c.getTitle())){
                    provhtml+="<h1>Provenance for"+c.getTitle()+" Documentation ("+c.getProvenanceURI()+")</h1>\n";
                }
                provhtml+="<ul>\n";
                if(!c.getCreators().isEmpty()){
                    provhtml+="	<li>Ontology created by :\n";
                    Iterator<Agent> creators = c.getCreators().iterator();
                    while(creators.hasNext()){
                        Agent currCreator = creators.next();
                        provhtml+= " "+currCreator.getName()+"("+currCreator.getInstitutionName()+"),";
                    }
                    provhtml+="</li>";
                }
                if(!c.getContributors().isEmpty()){
                    provhtml+="	<li>Ontology contributed to by :\n";
                    Iterator<Agent> contrib = c.getContributors().iterator();
                    while(contrib.hasNext()){
                        Agent currContrib = contrib.next();
                        provhtml+= " "+currContrib.getName()+"("+currContrib.getInstitutionName()+"),";
                    }
                    provhtml+="</li>\n";
                }
                if(c.getLatestVersion()!=null &&!"".equals(c.getLatestVersion())){
                    provhtml+="<li>"+c.getProvenanceURI()+ "is a specialization of the generic URI "+ c.getLatestVersion()+"</li>\n";
                }
                if(c.getPreviousVersion()!=null &&!"".equals(c.getPreviousVersion())){
                    provhtml+="<li>"+c.getProvenanceURI()+ "is a revision of the generic URI "+ c.getPreviousVersion()+"</li>\n";
                }                    
                provhtml+="<li>The ontology documentation was the result of using the <a href=\"https://github.com/dgarijo/Widoco\">Widoco tool</a> (which itself uses <a href=\"http://www.essepuntato.it/lode/\">LODE</a> for generating the crossreference section).</li>\n";
                if(c.getReleaseDate()!=null &&!"".equals(c.getReleaseDate())){
                    provhtml+="<li>The documentation was generated at</li>\n" +c.getReleaseDate();
                }
                provhtml+="</ul>\n" +
                "</div>\n" +
                "</body> \n" +
                "</html>";
        return provhtml;
    }
    
    //for content negotiation, if desired. This has been done a bit quickly. Ideally it would change serializations according to what is needed.
    public static String getProvenanceRDF(Configuration c){
        String provrdf = "@prefix prov: <http://www.w3.org/ns/prov#> .\n"
                + "@prefix dc: <http://purl.org/dc/terms/> .\n"
                + "@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n";
                provrdf+="<"+c.getProvenanceURI()+"> a prov:Entity;\n";
                if(c.getTitle()!=null &&!"".equals(c.getTitle())){
                    provrdf+= "\t dc:title \""+c.getTitle()+"\";\n";
                }
                if(!c.getCreators().isEmpty()){
                    Iterator<Agent> creators = c.getCreators().iterator();
                    while(creators.hasNext()){
                        //me quedo aqui. Hay que cambiar todo. Quizas la responsabilidad puedo pasar, o asumir que todos los agentes itenen uris. Si no es un rollo
                        Agent currCreator = creators.next();
                        if(currCreator.getURL()!=null && !"".equals(currCreator.getURL())){
                            provrdf+= "\t prov:wasAttributedTo <"+currCreator.getURL()+">;\n";
                            provrdf+= "\t dc:creator <"+currCreator.getURL()+">;\n";
                        }else{
                            provrdf+= "\t prov:wasAttributedTo [ a prov:Agent; foaf:name \""+currCreator.getName()+"\".];\n";
                        }
                    }
                }
                if(!c.getContributors().isEmpty()){
                    Iterator<Agent> contrib = c.getContributors().iterator();
                    while(contrib.hasNext()){
                        Agent currContrib = contrib.next();
                        if(currContrib.getURL()!=null && !"".equals(currContrib.getURL())){
                            provrdf+= "\t prov:wasAttributedTo <"+currContrib.getURL()+">;\n";
                            provrdf+= "\t dc:contributor <"+currContrib.getURL()+">;\n";
                        }else{
                            provrdf+= "\t prov:wasAttributedTo [ a prov:Agent; foaf:name \""+currContrib.getName()+"\".];\n";
                        }
                    }
                }
                provrdf+= "\t prov:wasAttributedTo <https://github.com/dgarijo/Widoco/>,<http://www.essepuntato.it/lode/>;\n";
                if(c.getLatestVersion()!=null &&!"".equals(c.getLatestVersion())){
                    provrdf+="\t prov:specializationOf <"+c.getLatestVersion()+">;\n";
                }
                if(c.getPreviousVersion()!=null &&!"".equals(c.getPreviousVersion())){
                    provrdf+="\t prov:wasRevisionOf <"+c.getPreviousVersion()+">;\n";
                }                    
                if(c.getReleaseDate()!=null &&!"".equals(c.getReleaseDate())){
                    provrdf+="\t prov:wasGeneratedAt \""+c.getReleaseDate()+"\".\n";
                }
        return provrdf;
    }
    
    //resources to copy to the temporal folder.
    public static final String[] lodeResources = {"/lode/extraction.xsl","/lode/common-functions.xsl", 
        "/lode/pellet.properties", "/lode/structural-reasoner.xsl", "/lode/swrl-module.xsl", "/lode/en.xml"};
    
    public static final String[] oopsResources = {"/oops/js/jquery-1.11.0.js","/oops/js/bootstrap.min.js", 
        "/oops/themes/blue/style.css", "/oops/js/jquery.tablesorter.min.js", "/oops/css/bootstrap.css"};
    
    public static final String configPath = "config"+File.separator+"config.properties";
    
    public static String getEvaluationText(String evaluationContent, Configuration c){
        String eval = "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "  <head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>"+c.getTitle()+"</title>\n" +
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
        "    <meta name=\"description\" content=\"Evaluation of the ontology with the OOPS tool.\">\n" +
        "    <meta name=\"Languaje\" content=\"English\">\n" +
        "    <meta name=\"Keywords\" content=\"ontology, smart city, energy efficiency\">\n" +
        "    \n" +
        "    <script src=\"evaluation/jquery-1.11.0.js\"></script>\n" +
        "    <script src=\"evaluation/bootstrap.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"evaluation/style.css\" type=\"text/css\" media=\"print, projection, screen\" />\n" +
        "    <script type=\"text/javascript\" src=\"evaluation/jquery.tablesorter.min.js\"></script>\n" +
        "    <script type=\"text/javascript\" id=\"js\">\n" +
        "	    $(document).ready(function() \n" +
        "		    { \n" +
        "		    	$(\"#tablesorter-demo\").tablesorter(); \n" +
        "		    	$('.collapse').collapse({ \n" +
        "		    	toggle: false\n" +
        "		    	});\n" +
        "		    } \n" +
        "	    ); \n" +
        "    </script>\n" +
        "\n" +
        "    <link href=\"evaluation/bootstrap.css\" rel=\"stylesheet\">\n" +
        "    <style type=\"text/css\">\n" +
        "      body {\n" +
        //"        padding-top: 60px;\n" +
        "        padding-bottom: 40px;\n" +
        "      }\n" +
        "    </style>\n" +
        "    <link href=\"evaluation/bootstrap-responsive.css\" rel=\"stylesheet\">\n" +
        "    \n" +
        "    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->\n" +
        "    <!--[if lt IE 9]>\n" +
        "      <script src=\"/dist/js/html5shiv.js\"></script>\n" +
        "    <![endif]-->\n" +
        "\n" +
        //"    <!-- Fav and touch icons -->\n" +
        //"    <link rel=\"apple-touch-icon-precomposed\" sizes=\"144x144\" href=\"../dist/ico/apple-touch-icon-144-precomposed.png\">\n" +
        //"    <link rel=\"apple-touch-icon-precomposed\" sizes=\"114x114\" href=\"../dist/ico/apple-touch-icon-114-precomposed.png\">\n" +
        //"    <link rel=\"apple-touch-icon-precomposed\" sizes=\"72x72\" href=\"../dist/ico/apple-touch-icon-72pcomposed.png\">\n" +
        //"    <link rel=\"apple-touch-icon-precomposed\" href=\"dist/ico/apple-touch-icon-57-precomposed.png\">\n" +
        //"    <link rel=\"shortcut icon\" href=\"../dist/ico/favicon.png\">\n" +
        "  </head>\n"
        + "<div class=\"container\">\n" +
            "<h1> <a href=\""+c.getOntologyURI()+"\" target=\"_blank\">"+c.getTitle()+"</a></h1>\n" +
            "<br>\n" +
            "<dl class=\"dl-horizontal\">\n" +
            "<dt>Title</dt>\n" +
            "<dd><a href=\""+c.getOntologyURI()+"\" target=\"_blank\">"+c.getTitle()+"</a></dd>\n" +
            "<dt>URI</dt>\n" +
            "<dd><a href=\""+c.getOntologyURI()+"\" target=\"_blank\">"+c.getOntologyURI()+"</a></dd>\n" +
            "<dt>Version</dt>\n" +
            "<dd>"+c.getRevision()+"</dd>\n" +
            "</dl>"+
            "<p> The following evaluation results have been generated by the <a href = \"http://oops-ws.oeg-upm.net/\" target=\"_blank\">RESTFul web service</a> provided by <a href = \"http://www.oeg-upm.net/oops\" target=\"_blank\">OOPS! (OntOlogy Pitfall Scanner!)</a>.</p>" +
            "<p>\n" +
            "<a href=\"http://www.oeg-upm.net/oops\" target=\"_blank\"><img src=\"http://oeg-lia3.dia.fi.upm.es/oops/images/logoWhite65.png\" alt=\"OOPS! logo\" class=\"img-rounded\" class=\"img-responsive\" /></a>"+
            "It is obvious that not all the pitfalls are equally important; their impact in the ontology " +
            "will depend on multiple factors. For this reason, each pitfall has an importance level " +
            "attached indicating how important it is. We have identified three levels:" +
            "</p>\n" +
            "\n" +
            "<dl class=\"dl-horizontal\">\n" +
            "<dt><span class=\"label label-danger\">Critical</span></dt>\n" +
            "<dd>It is crucial to correct the pitfall. Otherwise, it could affect the ontology consistency, reasoning, applicability, etc.</dd>\n" +
            "\n" +
            "<dt><span class=\"label label-warning\">Important</span></dt> <dd> Though not critical for ontology function, it is important to correct this type of pitfall.</dd>\n" +
            "\n" +
            "<dt><span class=\"label label-minor\">Minor</span></dt> <dd>It is not really a problem, but by correcting it we will make the ontology nicer.</dd>\n" +
            "</dl>"+
             evaluationContent+
            //references
            "<p>References:</p>\n"+
            "    <ul>\n"+
            "    <li>\n"+
            "    [1] GÛmez-PÈrez, A. Ontology Evaluation. Handbook on Ontologies. S. Staab and R. Studer Editors. Springer. International Handbooks on Information Systems. Pp: 251-274. 2004.\n"+
            "    </li> \n"+
            "    <li>\n"+
            "    [2] Noy, N.F., McGuinness. D. L. Ontology development 101: A guide to creating your first ontology. Technical Report SMI-2001-0880, Standford Medical Informatics. 2001.\n"+
            "    </li> \n"+
            "    <li>\n"+
            "    [3] Rector, A., Drummond, N., Horridge, M., Rogers, J., Knublauch, H., Stevens, R.,; Wang, H., Wroe, C. ''Owl pizzas: Practical experience of teaching owl-dl: Common errors and common patterns''. In Proc. of EKAW 2004, pp: 63ñ81. Springer. 2004.\n"+
            "    </li>\n"+
            "    <li>\n"+
            "    [4] Hogan, A., Harth, A., Passant, A., Decker, S., Polleres, A. Weaving the Pedantic Web. Linked Data on the Web Workshop LDOW2010 at WWW2010 (2010).\n"+
            "    </li>\n"+
            "     <li>\n"+
            "    [5] Archer, P., Goedertier, S., and Loutas, N. D7.1.3 ñ Study on persistent URIs, with identification of best practices and recommendations on the topic for the MSs and the EC. Deliverable. December 17, 2012.\n"+
            "    </li>\n"+
            "    <li>\n"+
            "    [6] Heath, T., Bizer, C.: Linked data: Evolving the Web into a global data space (1st edition). Morgan &amp; Claypool (2011).\n"+
            "    </li>\n"+
            "    </ul>\n"+    
            //copy footer here
            "<footer>\n" +
            "            <div class=\"row\">\n" +
            "    	<div class=\"col-md-7\">\n" +
            "    		Developed by 	        <a href = \"http://delicias.dia.fi.upm.es/members/mpoveda/\" target=\"_blank\">Mar&iacutea Poveda</a>\n" +
            "	        <br>\n" +
            "    	Built with <a target=\"_blank\" href=\"http://getbootstrap.com/\">Bootstrap</a>\n" +
            "	        <br>\n" +
            "           Integration with Widoco by <a href=\"http://delicias.dia.fi.upm.es/members/DGarijo/\">Daniel Garijo</a>"+
            "	        <br>\n" +
            "        </div>\n" +
            "    	<div class=\"col-md-5\">\n" +
            "		<p class=\"text-right\"> Developed with: </p>\n" +
            "		<p class=\"text-right\">\n" +
            "     		<a href=\"http://www.oeg-upm.net/oops/\" target=\"_blank\"><img src=\"http://oeg-lia3.dia.fi.upm.es/oops/images/logoWhite65.png\" alt=\"OOPS! logo\" class=\"img-rounded\" class=\"img-responsive\" /></a>\n" +
            "    	</p>\n" +
            "    	</div>\n" +
            "      </div>\n" +
            "      </footer>\n" +
            "    </div> <!-- /container -->\n";
        return eval;
    }
    
}
