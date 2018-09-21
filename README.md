WIzard for DOCumenting Ontologies (WIDOCO)
===================
[![DOI](https://zenodo.org/badge/11427075.svg)](https://zenodo.org/badge/latestdoi/11427075)

![Logo](src/main/resources/logo/logo2.png)

**Author**: Daniel Garijo Verdejo (@dgarijo)

**Contributors**: María Poveda, Idafen Santana, Almudena Ruiz, Miguel Angel García, Oscar Corcho, Daniel Vila, Sergio Barrio, Martin Scharm, Maxime Lefrancois, @kartgk.

**Citing WIDOCO**: Please cite the latest version of WIDOCO in Zenodo: https://zenodo.org/badge/latestdoi/11427075.
Also see our ISWC 2017 paper: https://iswc2017.semanticweb.org/paper-138

Downloading the executable
===================

To download WIDOCO, you need to download a JAR executable file. Check the latest release for more details: (https://github.com/dgarijo/WIDOCO/releases/latest).

Description
==========
WIDOCO helps you to publish and create an enriched and customized documentation of your ontology, by following a series of steps in a wizard. We extend the LODE framework by Silvio Peroni to describe the classes, properties and data properties of the ontology, the OOPS! webservice by María Poveda to print an evaluation and the Licensius service by Victor Rodriguez Doncel to determine the license URI and title being used. In addition, we use WebVowl to visualize the ontology and have extended Bubastis to show a complete changelog between different versions of your ontology.

Features of WIDOCO:
* Automatic documentation of the terms in your ontology (based on [LODE](http://www.essepuntato.it/lode/))
* Automatic annotation in JSON-LD snippets of the html produced.
* Association of a provenance page which includes the history of your vocabulary (W3C PROV-O compliant).
* Metadata extraction from the ontology plus the means to complete it on the fly when generating your ontology. Check the [best practice document](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html) to know more about the terms recognized by WIDOCO.
* Guidelines on the main sections that your document should have and how to complete them.
* Integration with diagram creators ([WebVOWL](http://vowl.visualdataweb.org/webvowl/)).
* Automatic changelog of differences between the actual and the previous version of the ontology (based on [Bubastis](http://www.ebi.ac.uk/efo/bubastis/)).
* Separation of the sections of your html page so you can write them independently and replace only those needed.
* Content negotiation and serialization of your ontology according to W3C best practices

Examples
==========
Examples of the features of WIDOCO can be seen on [the gallery](http://dgarijo.github.io/Widoco/doc/gallery/)	
	
Tutorial
==========
A tutorial explaining the main features of the GUI can be found [here](http://dgarijo.github.io/Widoco/doc/tutorial/)    
    
How to use WIDOCO
==========
Download all the files of the "JAR" folder into the same folder. Then just double click the .jar file.

Now you can execute WIDOCO through the console. Usage:

	java -jar widoco-VERSION-jar-with-dependencies.jar [-ontFile file] or [-ontURI uri] [-outFolder folderName] [-confFile propertiesFile] or [-getOntologyMetadata] [-oops] [-rewriteAll] [-crossRef] [-saveConfig configOutFile] [-useCustomStyle] [-lang lang1-lang2] [-includeImportedOntologies] [-htaccess] [-webVowl] [-licensius] [-ignoreIndividuals] [-analytics analyticsCode] [-doNotDisplaySerializations][-displayDirectImportsOnly] [-rewriteBase rewriteBasePath]

The `ontFile` and `ontURI` options allow you to choose the ontology file or ontology URI of your ontology.

The `-outFolder` option specifies where you want to place the output.

The `-confFile` allows you to choose your own configuration file for the ontology metadata. However you can tell WIDOCO to try to extract some of the metadata from the ontology with getOntologyMetadata.

The `-oops` flag creates an html page with the evaluation from the OOPS service (http://oops.linkeddata.es/)

The `-rewriteAll` option will tell WIDOCO to rewrite files if the new generate files are replacing existing files. Otherwise the tool will promt a window asking the user.

The `-crossRef` option will ONLY generate the overview and cross reference sections. The index document will NOT be generated. The htaccess, provenance page, etc., will not be generated unless requested by other flags. This flag in intended to be used only after a first version of the documentation exists.

The `-saveConfig` option allows you to save a configuration file on the "configOutFile" route with the properties of a given ontology.

The `-useCustomStyle` option allows exporting the documentation using alternate css files (thanks to Daniel Vila).

The `-lang` option allows showing the languages in which the documentation will be published (separated by "-"). Note that if the language is not supported, the system will load the labels in english. For example: en-pt-es

The `-includeImportedOntologies` flag indicates whether the terms of the imported ontologies of the current ontology should be documented as well or not.

The `-htaccess` flag creates a bundle for publication ready to be deployed on your apache server.

The `-webVowl` flag provides a link to a visualization based on WebVowl (http://vowl.visualdataweb.org/webvowl/index.html#).

The `-licensius` flag uses the Licensius web services (http://licensius.com/apidoc/index.html) to retrieve license metadata. Only works if the `-getOntologyMetadata` flag is enabled.

The `-ignoreIndividuals` flag allows you to ignore the named individuals in the ontology.

The `-includeAnnotationProperties` flag will include annotation properties defined in your ontology (by default they are not included)

The `-analytics` flag will add a code snippet for Google analytics to track your page. You need to add your code next to it. For example: UA-1234

The `-doNotDisplaySerializations` flag allows not displaying available serializations of the ontology.

The `-displayDirectImportsOnly` flag allows displaying only those imported ontologies that are directly imported in the ontology being documented.

The `-rewriteBase` flag allows changing the default rewrite base path (until the documentation folder). By default it is "/".

How can I make WIDOCO automatically recognize my vocabulary annotations?
==========
There are two ways for making WIDOCO get your vocabulary metadata annotations and use them automatically to document the ontology. 

* Add them in your OWL file. For guidelines on which ones to include, follow our [Best Practices document](https://w3id.org/widoco/bestPractices), which indicates which ones we recommend.
* Edit the project properties of /config/config.properties. This is a key-value pair file with metadata properties. Some people consider it easier than adding the property annotations to the OWL file, although I recommend doing the former option. Note that the character ";" is used for lists (for instance first author; second author; third author).

Browser issues
==========
The result of executing WIDOCO is an HTML file. We have successfully tested it in Mozilla, IE, Safari and Chrome.  **When the page is stored in a server, WIDOCO's HTML  works correctly in all browsers**. If you view the file **on your local browser**, we recommend you to use Mozilla Firefox, Safari or Internet Explorer. Google Chrome will not show the contents correctly, as it doesn't allow  XMLHttpRequest without HTTP. If you want to view the page locally with Google Chrome you have two possibilities:

a) Place the file in a server and access it via its URL (for example, put it in dropbox and access through its public url, or on a Github page).

b) Execute Chrome with the following commands (Thanks to Alejandro Fernandez Carrera):

(WIN) chrome.exe --allow-file-access-from-files,

(OSX) open /Applications/Google\ Chrome.app/ --args --allow-file-access-from-files

(UNX) /usr/bin/google-chrome --allow-file-access-from-files
	
Current improvements
==========
We are working on the following features:
* Means to add examples to your ontology terms.
* Previsualization of the terms that will be generated.

For a complete list, check the [project open issues](https://github.com/dgarijo/Widoco/issues).

Requirements
==========
You will need Java 1.8 or higher (SDK 1.8 or JRE 8) for WIDOCO to work
Otherwise, you will probably experience an "Unsupported major.minor version 52.0" exception when executing the JAR file.

Contribution guidelines
==========
Contributions to address any of the current issues are welcome. In order to push your contribution, just **push your pull request to the develop branch**. The master branch has only the code associated to the latest release. 
