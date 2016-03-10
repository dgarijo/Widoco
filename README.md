WIzard for DOCumenting Ontologies (Widoco)
===================
Author: Daniel Garijo

Contributors: Idafen Santana, Almudena Ruiz, Miguel Angel García and Oscar Corcho.

Description
===========
Widoco helps you to create a complete documentation of your ontology, by following a series of steps in a wizard. We reuse the LODE framework by Silvio Peroni to describe the classes, properties and data properties of the ontology, the OOPS! webservice by María Poveda to print an evaluation and the Licensius service by Victor Rodriguez Doncel to determine the license URI and title being used.

The purpose of Widoco is to reuse and integrate existing tools for documentation, plus the set of features listed below:
* Separation of the sections of your html page so you can write them independently and replace only those needed.
* Automatic annotation in RDF-a of the html produced.
* Association of a provenance page which includes the history of your vocabulary (W3C PROV-O compliant).
* Metadata extraction from the ontology plus the means to complete it on the fly when generating your ontology.
* Guidelines on the main sections that your document should have and how to complete them.
* Integration with diagram creators (ongoing).

The structure of the template is as follows:

	* Basic Metadata: 
		* Title and release
		* Current version of the ontology  
		* Latest version of the ontology
		* Previous version of the ontology
		* Revision number
		* Authors
		* Contributors
		* Imported Ontologies
		* Extended Ontologies
		* License
	* Abstract
	* Table of Contents
	* 1. Introduction
		* 1.1 Namespace declarations
	* 2. Ontology overview
	* 3. Ontology description
	* 4. Cross reference section (Using LODE)
	* 5. References
	* 6. Acknowledgements
	
How to use Widoco
==========
Download all the files of the "JAR" folder into the same folder. Then just double click the .jar file.

For customizing the metadata of your ontology, edit the project properties of /config/config.properties. 

The character ";" is used for lists (for instance first author; second author; third author).

Now you can execute Widoco through the console. Usage:

	java -jar widoco.jar [-ontFile file] or [-ontURI uri] [-outFolder folderName] [-confFile propertiesFile] or [-getOntologyMetadata] [-oops] [-rewriteAll] [-saveConfig configOutFile] [-useCustomStyle] [-lang lang1;lang2] [-includeImportedOntologies]

The ontFile and ontURI options allow you to choose the ontology file or ontology URI of your ontology.

The -outFolder option specifies where you want to place the output.

The -confFile allows you to choose your own configuration file for the ontology metadata. However you can tell Widoco to try to extract some of the metadata from the ontology with getOntologyMetadata.

The -oops flag creates an html page with the evaluation from the OOPS service (http://oops.linkeddata.es/)

The -rewriteAll option will tell Widoco to rewrite files if the new generate files are replacing existing files. Otherwise the tool will promt a window asking the user.

The -saveConfig option allows you to save a configuration file on the "configOutFile" route with the properties of a given ontology.

The -useCustomStyle option allows exporting the documentation using alternate css files (thanks to Daniel Vila).

The -lang option allows showing the languages in which the documentation will be published (separated by ";"). Note that if the language is not supported, the system will load the labels in english. For example: en;pt;es

The -includeImportedOntologies flag indicates whether the terms of the imported ontologies of the current ontology should be documented as well or not.

Browser problems
==========
The result of executing Widoco is an html file. We have tested it in Mozilla, IE and Chrome, and when the page is stored in a server all the browsers work correctly. If you view the file locally, we recommend you to use Mozilla Firefox (or Internet Explorer, if you must). Google Chrome will not show the contents correctly, as it doesn't allow  XMLHttpRequest without HTTP. If you want to view the page locally with Google Chrome you have two possibilities:

a) Place the file in a server and access it via its URL (for example, put it in dropbox and access through its public url).

b) Execute Chrome with the following commands (Thanks to Alejandro Fernandez Carrera):

(WIN) chrome.exe --allow-file-access-from-files,

(OSX) open /Applications/Google\ Chrome.app/ --args --allow-file-access-from-files

(UNX) /usr/bin/google-chrome --allow-file-access-from-files
	
Current improvements
==========
We are working on the following features:
* Integration with diagram creators to include a diagram of your ontology when generating the documentation
* Possibility of generating the documentation in several languages (now supported: en, es, pt).
* Means to add examples to your ontology terms.
* Previsualization of the terms that will be generated.

For a complete list, check the project open issues.
