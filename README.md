WIzard for DOCumenting Ontologies (Widoco)
===================
Author: Daniel Garijo

Contributors: Idafen Santana, Almudena Ruiz, Miguel Angel García and Oscar Corcho.

Description
This project has been created to help you to create a complete documentation of your ontology.
The purpose of this project is not to cover any of the functionalities created by other tools like LODE 
(which describe the classes and properties of a given ontology). Instead, this project reuses 
LODE (if the user wants to) to create a template that will later be filled with all the details of the ontology.
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
java -jar widoco.jar [-ontFile file] or [-ontURI uri] [-outFolder folderName] [-confFile propertiesFile]

Browser problems
==========
The result of executing Widoco is an html file. We have tested it in Mozilla, IE and Chrome, and when the page is stored in a server all the browsers work correctly. If you view the file locally, we recommend you to use Mozilla Firefox (or Internet Explorer, if you must). Google Chrome will not show the contents correctly, as it doesn't allow  XMLHttpRequest without HTTP. If you want to view the page locally with Google Chrome you have two possibilities:

a) Place the file in a server and access it via its URL (for example, put it in dropbox and access through its public url).

b) Execute Chrome with the following commands (Thanks to Alejandro Fernandez Carrera):

(WIN) chrome.exe --allow-file-access-from-files,

(OSX) open /Applications/Google\ Chrome.app/ --args --allow-file-access-from-files

(UNX) /usr/bin/google-chrome --allow-file-access-from-files

Encoding issues
==========
If you have problems with accents or strange characters, please use the -Dfile.encoding=utf-8 option when running the .jar.
	
Current updates: Make the application a wizard, being able to load separate sections independently, publish the provenance of the vocabulary, possibility of adding a diagram, possibility of checking the ontology with OOPS
	
