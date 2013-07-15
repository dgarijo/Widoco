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
package htmlfromowlgenerator;

/**
 *
 * @author Daniel Garijo
 */
public class TextConstants {
    public static final String opening= "<html xmlns=\"http://www.w3.org/1999/xhtml\" prefix=\"dc: http://purl.org/dc/terms/ schema: http://schema.org/ prov: http://www.w3.org/ns/prov# foaf: http://xmlns.com/foaf/0.1/ owl: http://www.w3.org/2002/07/owl#\"><head>\n";
    public static final String styles=
            "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n"+		
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

		"</style> "+
                "</head>\n"+
                //RDF-a Annotations
                "<span resource=\"\" typeOf=\"foaf:Document\">"+
                "<title property=\"dc:title\">"+Configuration.getTitle()+"</title>"+
                "<span property=\"dc:created\" content=\""+Configuration.getDateOfRelease()+"\"></span>"+
                "<span property=\"dc:isVersionOf\" resource=\""+Configuration.getLatestVersion()+"\"></span>"+
                "<span property=\"prov:wasDerivedFrom\" resource=\"http://www.opmw.org/model/p-plan/#\"></span>"+
                "<span property=\"dc:contributor prov:wasAttributedTo\" resource=\"http://delicias.dia.fi.upm.es/members/DGarijo/#me\"></span>"+
                "</span>"+            
                "<body resource=\""+Configuration.getOntologyNamespaceURI()+"\" typeOf=\"owl:Ontology\">";
    public static String getHeadSection(){
        String head = "<div class=\"head\">\n"+
        "<h1 property=\"dc:title\">"+Configuration.getTitle()+"</h1>\n"+
        "<span property=\"dc:modified\" content=\""+Configuration.getDateOfRelease()+"\"></span>"+
        "<h2>Release "+Configuration.getDateOfRelease()+"</h2>\n"+
                "<dl>\n"+
                "<dt>This version:</dt>\n"+
                "<dd><a href=\""+Configuration.getThisVersion()+"\">"+Configuration.getThisVersion()+"</a></dd>\n"+
                "</dl><dl><dt>Latest version:</dt>\n"+
                        "<dd><a href=\""+Configuration.getLatestVersion()+"\">"+Configuration.getLatestVersion()+"</a></dd>\n"+
                "</dl><dl>\n"+
                        getPreviousVersion()+
                "<dt>Revision</dt>\n"+
                        "<dd>"+Configuration.getRevision()+"</dd>\n"+
                        getAuthors()+
                        getContributors()+
                        getImports()+
                        getExtends()+
                        "<dl>This work is licensed under a <a rel=\"license\" href=\""+Configuration.getLicenseURL()+"\">"+Configuration.getLicense()+"</a>.</dl>\n"+
                        "<span property=\"dc:license\" resource=\""+Configuration.getLicenseURL()+"\"></span>"+
                "<hr>"+
        "</div>\n";
        return head;
    }
    public static final String abstractSection="<h2>Abstract</h2><p>Here goes the abstract. A couple of sentences sumamrizing the ontology and its prupose.</p>\n"
            + "<p style=\"text-align: center;\"> <b> Here you should point to the owl encoding of your ontology</b></p>\n";
    public static final String tableOfContentsSection="<div id=\"toc\">"+
            "<h2>Table of Contents</h2>\n"+
            "<ul><li>\n"+
            "<a href=\"#introduction\">1. Introduction</a></li>\n"+
                    "<ul><li><a href=\"#namespacedeclarations\">1.1 Namespace declarations</a></li></ul>\n"+
            "<a href=\"#ontOverview\">2. "+Configuration.getOntologyName()+" Overview</a></li><li>\n"+
            "<a href=\"#ontDescription\">3. "+Configuration.getOntologyName()+" Description</a></li>\n"+	
            "<li><a href=\"#crossReference\">4. Cross reference for "+Configuration.getOntologyName()+" classes, properties and dataproperties</a></li>\n"+
            "<ul>\n"+
            "        <li><a href=\"#classes\">4.1 Classes</a></li>\n"+
            "        <li><a href=\"#objectproperties\">4.2 Object Properties</a></li>\n"+
            "        <li><a href=\"#dataproperties\">4.3 Data Properties</a></li>\n"+
            "</ul\n>"+
            "<li>\n"+
            "<a href=\"#references\">5. References</a></li><li>\n"+
            "<a href=\"#acknowledgements\">6. Acknowledgements</a></li>\n"+
            "</ul>\n"+
            "</div>\n";
            
    public static final String introductionSection="<div id=\"introduction\">\n"+
	"<h2>1. Introduction <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"+
        "<p>This should talk a bit about your ontology, its motivation, soa and goals</p>\n";
    public static final String nameSpaceDeclarations="<div id=\"namespacedeclarations\">\n"+
        "<h2>1.1. Namespace declarations <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"+
        "</p><div id=\"ns\" align=\"center\">\n"+
         "<table>\n"+
                "<caption> <a href=\"#ns\"> Table 1</a>: Namespaces used in the document </caption>\n"+
                "<tbody>\n"+
                "<tr><td><b>owl</b></td><td>&lt;http://www.w3.org/2002/07/owl#&gt;</td></tr>\n"+
                "<tr><td><b>rdfs</b></td><td>&lt;http://www.w3.org/2000/01/rdf-schema#&gt;</td></tr>\n"+           
                "<tr><td><b>"+Configuration.getOntologyPrefix()+"</b></td><td>&lt;"+Configuration.getOntologyNamespaceURI()+"&gt;</td></tr>\n"+
                "</tbody>\n"+
          "</table>\n"+
          "</div>\n"+
        "</div></div>\n";
    public static final String overviewSection="<div id=\"ontOverview\">\n"+
	"<h2>2. "+Configuration.getOntologyName()+" Overview <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"
            + "<p>Overview of the ontology goes here: a few sentences explaining the main concepts of the ontology</p>\n";
    public static final String ontologyDescriptionSection ="<div id=\"ontDescription\">\n"+
	"<h2>3. "+Configuration.getOntologyName()+" Description <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"
            + "<p>Complete description of the ontology: a diagram explaining how the classes are related, examples of usage, etc.</p></div>\n";
    public static final String crossReferenceSection="<div id=\"crossReference\">\n"+
            "<h2>4. Cross reference for "+Configuration.getOntologyName()+" classes and properties</h2>\n"+
            "This section provides details for each class and property defined by "+Configuration.getOntologyName()+".\n";
    public static final String referencesSection="<div id=\"references\">\n"+
                    "<h2>5. References <span class=\"backlink\"> back to <a href=\"#toc\">ToC</a></span></h2>\n"
            + "<p>Add your references here in a list. It is recommended to have them as a list.</p></div>\n";
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
    

    private static String getAuthors() {
        String authors="</dl><dl><dt>Authors:</dt>\n";
        String[] names = Configuration.getAuthors().split(";");
        String[] urls = Configuration.getAuthorsURL().split(";");
        String[] authorInst = Configuration.getAuthorInstitution().split(";");
        //the same amount of names and institutions is assumed.
        try{
            for(int i=0; i<names.length;i++){
                authors+="<dd><a property=\"dc:creator prov:wasAttributedTo\" resource=\""+urls[i]+"\" href=\""+urls[i]+"\">"+names[i]+"</a>, "+authorInst[i]+"</dd>";
            }   
        }catch(Exception e){
            System.out.println("Authors, their urls or the instititions are not consistent");
        }
        return authors +"</dl>\n";                   
    }
    
    private static String getContributors() {
        String authors="</dl><dl><dt>Contributors:</dt>\n";
        try{
            String[] names = Configuration.getContributors().split(";");
            String[] urls = Configuration.getContributorsURL().split(";");
            String[] authorInst = Configuration.getContributorsInstitution().split(";");
            //the same amount of names and institutions is assumed.
            for(int i=0; i<names.length;i++){
                authors+="<dd><a property=\"dc:contributor\" resource=\""+urls[i]+"\" href=\""+urls[i]+"\">"+names[i]+"</a>, "+authorInst[i]+"</dd>";
            }   
        }catch(Exception e){
            System.out.println("No contributors added.");
            return("");
        }
        return authors +"</dl>\n";                   
    }

    private static String getImports() {
        String imports= "<dl><dt>Imported Ontologies:</dt>\n";
        String [] importsNames = Configuration.getImportsNames().split(";");
        String [] importsURLS = Configuration.getImportsURLs().split(";");
        try{
            for(int i = 0; i< importsNames.length;i++){
                imports+="<dd><a property=\"owl:imports\" resource=\""+importsURLS[i]+"\" href="+importsURLS[i]+">"+importsNames[i]+"</a></dd>";
            }
        }catch(Exception e){
            System.out.println("No imports produced (or error processing the imports)!");
            return("");
        }
        return imports+"</dl>\n";
    }

    private static String getExtends() {
        String extended= "<dl><dt>Extended Ontologies:</dt>\n";        
        try{
            String [] extendedNames = Configuration.getExtendsNames().split(";");
            String [] extendedURLS = Configuration.getExtendsURLS().split(";");            
            for(int i = 0; i< extendedNames.length;i++){
                extended+="<dd><a href="+extendedURLS[i]+">"+extendedNames[i]+"</a></dd>";
            }                        
        }catch(Exception e){
            System.out.println("No extensions produced...");
            return("");
        }
        return extended+"</dl>\n";
    }

    private static String getPreviousVersion() {
        String previousV = Configuration.getPreviousVersion();
        if(previousV!=null &&previousV!=null){
            return "</dl><dl><dt>Previous version:</dt>\n"+
                      "<dd><a href=\""+Configuration.getPreviousVersion()+"\">"+Configuration.getPreviousVersion()+"</a></dd>\n"+
                    "</dl><dl>\n";
        }
        else{ return "";}
    }
    
}
