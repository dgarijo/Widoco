WIzard for DOCumenting Ontologies (WIDOCO)
===================
[![DOI](https://zenodo.org/badge/11427075.svg)](https://zenodo.org/badge/latestdoi/11427075)

Author: Daniel Garijo Verdejo

Contributors: Idafen Santana, Almudena Ruiz, Miguel Angel García, Oscar Corcho, Daniel Vila and Sergio Barrio.

Download the executable
===================

To download WIDOCO JAR, check the latest release (https://github.com/dgarijo/WIDOCO/releases/latest).

Citing WIDOCO
===================

Please cite the latest version of WIDOCO in Zenodo: https://zenodo.org/badge/latestdoi/11427075

Description
==========
WIDOCO helps you to publish and create an enriched and customized documentation of your ontology, by following a series of steps in a wizard. We extend the LODE framework by Silvio Peroni to describe the classes, properties and data properties of the ontology, the OOPS! webservice by María Poveda to print an evaluation and the Licensius service by Victor Rodriguez Doncel to determine the license URI and title being used. In addition, we use WebVowl to visualize the ontology and have extended Bubastis to show a complete changelog between different versions of your ontology.

Features of WIDOCO:
* Automatic documentation of the terms in your ontology (based on LODE)
* Automatic annotation in JSON-LD snippets of the html produced.
* Association of a provenance page which includes the history of your vocabulary (W3C PROV-O compliant).
* Metadata extraction from the ontology plus the means to complete it on the fly when generating your ontology. Check the [best practice document](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html) to know more about the terms recognized by WIDOCO.
* Guidelines on the main sections that your document should have and how to complete them.
* Integration with diagram creators (WebVOWL).
* Automatic changelog of differences between the actual and the previous version of the ontology.
* Separation of the sections of your html page so you can write them independently and replace only those needed.
* Content negotiation and serialization of your ontology according to W3C best practices

[See some examples](http://dgarijo.github.io/WIDOCO/doc/gallery/)

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
		* Ontology serializations
		* License
		* Diagram
	* Abstract
	* Table of Contents
	* 1. Introduction
		* 1.1 Namespace declarations
	* 2. Ontology overview
	* 3. Ontology description
	* 4. Cross reference section (Using LODE)
	* 5. References
	* 6. Changelog
	* 7. Acknowledgements
	
	
How to use WIDOCO
==========
Download all the files of the "JAR" folder into the same folder. Then just double click the .jar file.

For customizing the metadata of your ontology, edit the project properties of /config/config.properties. 

The character ";" is used for lists (for instance first author; second author; third author).

Now you can execute WIDOCO through the console. Usage:

	java -jar WIDOCO.jar [-ontFile file] or [-ontURI uri] [-outFolder folderName] [-confFile propertiesFile] or [-getOntologyMetadata] [-oops] [-rewriteAll] [-crossRef] [-saveConfig configOutFile] [-useCustomStyle] [-lang lang1-lang2] [-includeImportedOntologies] [-htaccess] [-webVowl] [-licensius] [-ignoreIndividuals]

The ontFile and ontURI options allow you to choose the ontology file or ontology URI of your ontology.

The -outFolder option specifies where you want to place the output.

The -confFile allows you to choose your own configuration file for the ontology metadata. However you can tell WIDOCO to try to extract some of the metadata from the ontology with getOntologyMetadata.

The -oops flag creates an html page with the evaluation from the OOPS service (http://oops.linkeddata.es/)

The -rewriteAll option will tell WIDOCO to rewrite files if the new generate files are replacing existing files. Otherwise the tool will promt a window asking the user.

The -crossRef option will ONLY generate the overview and cross reference sections. The index document will NOT be generated. The htaccess, provenance page, etc., will not be generated unless requested by other flags. This flag in intended to be used only after a first version of the documentation exists.

The -saveConfig option allows you to save a configuration file on the "configOutFile" route with the properties of a given ontology.

The -useCustomStyle option allows exporting the documentation using alternate css files (thanks to Daniel Vila).

The -lang option allows showing the languages in which the documentation will be published (separated by "-"). Note that if the language is not supported, the system will load the labels in english. For example: en-pt-es

The -includeImportedOntologies flag indicates whether the terms of the imported ontologies of the current ontology should be documented as well or not.

The -htaccess flag creates a bundle for publication ready to be deployed on your apache server.

The -webVowl flag provides a link to a visualization based on WebVowl (http://vowl.visualdataweb.org/webvowl/index.html#).

The -licensius flag uses the Licensius web services (http://licensius.com/apidoc/index.html) to retrieve license metadata. Only works if the -getOntologyMetadata flag is enabled.

The -ignoreIndividuals allows you to ignore the named individuals in the ontology.

Browser problems
==========
The result of executing WIDOCO is an html file. We have tested it in Mozilla, IE and Chrome, and when the page is stored in a server all the browsers work correctly. If you view the file locally, we recommend you to use Mozilla Firefox or Safari (or Internet Explorer, if you must). Google Chrome will not show the contents correctly, as it doesn't allow  XMLHttpRequest without HTTP. If you want to view the page locally with Google Chrome you have two possibilities:

a) Place the file in a server and access it via its URL (for example, put it in dropbox and access through its public url).

b) Execute Chrome with the following commands (Thanks to Alejandro Fernandez Carrera):

(WIN) chrome.exe --allow-file-access-from-files,

(OSX) open /Applications/Google\ Chrome.app/ --args --allow-file-access-from-files

(UNX) /usr/bin/google-chrome --allow-file-access-from-files
	
Current improvements
==========
We are working on the following features:
* Means to add examples to your ontology terms.
* Previsualization of the terms that will be generated.

For a complete list, check the project open issues.

Requirements
==========
Java 1.8
