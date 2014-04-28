Html Template Generator
===================
Author: Daniel Garijo

Contributors: Almudena Ruiz, Miguel Angel García and Oscar Corcho.

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
		
	* Abstract
	
	* Table of Contents
	
	* 1. Introduction
	
		* 1.1 Namespace declarations
		
	* 2. Ontology overview
	
	* 3. Ontology description
	
	* 4. Cross reference section (Using LODE)
	
	* 5. References
	
	* 6. Acknowledgements
	
How to use HtmlTemplateGenerator
==========
*Download all the files of the "JAR" folder into the same folder. Then just double click the .jar file.

*For customizing the metadata of your ontology, edit the project properties of /config/config.properties. 

*The character ";" is used for lists (for instance first author; second author; third author)
Encoding issues
==========
If you have problems with accents or strange characters, please use the -Dfile.encoding=utf-8 option when running the .jar.
	
	
