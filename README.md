# WIzard for DOCumenting Ontologies (WIDOCO)
[![DOI](https://zenodo.org/badge/11427075.svg)](https://zenodo.org/badge/latestdoi/11427075) [![](https://jitpack.io/v/dgarijo/Widoco.svg)](https://jitpack.io/#dgarijo/Widoco)

![Logo](src/main/resources/logo/logo2.png)

**Author**: Daniel Garijo Verdejo (@dgarijo)

**Contributors**: María Poveda, Idafen Santana, Almudena Ruiz, Miguel Angel García, Oscar Corcho, Daniel Vila, Sergio Barrio, Martin Scharm, Maxime Lefrancois, Alfredo Serafini, @kartgk.

**Citing WIDOCO**: If you used WIDOCO in your work, please cite the ISWC 2017 paper: https://iswc2017.semanticweb.org/paper-138

```bib
@inproceedings{garijo2017widoco,
  title={WIDOCO: a wizard for documenting ontologies},
  author={Garijo, Daniel},
  booktitle={International Semantic Web Conference},
  pages={94--102},
  year={2017},
  organization={Springer, Cham},
  doi = {10.1007/978-3-319-68204-4_9},
  funding = {USNSF ICER-1541029, NIH 1R01GM117097-01},
  url={http://dgarijo.com/papers/widoco-iswc2017.pdf}
}
```
If you want to cite the latest version of the software, you can do so by using: https://zenodo.org/badge/latestdoi/11427075.

## Downloading the executable

To download WIDOCO, you need to download a JAR executable file. Check the latest release for more details: (https://github.com/dgarijo/WIDOCO/releases/latest).

## Importing WIDOCO as a dependency
Just add the dependency and repository to your `pom.xml` file as follows. See the [WIDOCO JitPack](https://jitpack.io/#dgarijo/Widoco) page to find alternative means to incorporate WIDOCO to your project.

```xml
<dependencies>
  <dependency>
      <groupId>com.github.dgarijo</groupId>
      <artifactId>Widoco</artifactId>
      <version>v1.4.13</version>
  </dependency>
</dependencies>

[ ... ]

<repositories>
	<repository>
	    <id>jitpack.io</id>
	    <url>https://jitpack.io</url>
	</repository>
</repositories>
```

## Description
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

## Examples
Examples of the features of WIDOCO can be seen on [the gallery](http://dgarijo.github.io/Widoco/doc/gallery/)	
	
## Tutorial
A tutorial explaining the main features of the GUI can be found [here](http://dgarijo.github.io/Widoco/doc/tutorial/)    
    
## How to use WIDOCO
Download all the files of the "JAR" folder into the same folder. Then just double click the .jar file.

Now you can execute WIDOCO through the console. Usage:
```bash
java -jar widoco-VERSION-jar-with-dependencies.jar [OPTIONS]
```

**OPTIONS**:

`-ontFile PATH`  [required (unless -ontURI is used)]: Load a local ontology file (from PATH) to document. This option is incompatible with -ontURI

`-ontURI  URI`   [required (unless -ontFile is used)]: Load an ontology to document from its URI. This option is incompatible with -ontFile

`-outFolder folderName`: Specifies the name of the folder where to save the documentation. By default is 'myDocumentation'

`-confFile PATH`: Load your own configuration file for the ontology metadata. Incompatible with -getOntologyMetadata

`-getOntologyMetadata`: Extract ontology metadata from the given ontology 

`-oops`: Create an html page with the evaluation from the OOPS service (http://oops.linkeddata.es/)

`-rewriteAll`: Replace any existing files when documenting an ontology (e.g., from a previous execution)

`-crossRef`: ONLY generate the overview and cross reference sections. The index document will NOT be generated. The htaccess, provenance page, etc., will not be generated unless requested by other flags. This flag is intended to be used only after a first version of the documentation exists.

`-saveConfig PATH`: Save a configuration file on PATH with the properties of a given ontology

`-useCustomStyle`: Export the documentation using alternate css files (by Daniel Vila).

`-lang LANG1-LANG2`: Generate documentation in multiple languages (separated by "-"). Note that if the language is not supported, the system will load the labels in english. For example: en-pt-es

`-includeImportedOntologies`: Indicates whether the terms of the imported ontologies of the current ontology should be documented as well or not.
-htaccess: Create a bundle for publication ready to be deployed on your Apache server.

`-webVowl`: Create a visualization based on WebVowl (http://vowl.visualdataweb.org/webvowl/index.html#) in the documentation.

`-licensius`: Use the Licensius web services (http://licensius.com/apidoc/index.html) to retrieve license metadata. Only works if the -getOntologyMetadata  flag is enabled.

`-ignoreIndividuals`: Individuals will not be included in the documentation.
-includeAnnotationProperties: Include annotation properties defined in your ontology in the documentation (by default they are not included)

`-analytics CODE`: Add a code snippet for Google analytics to track your HTML documentation. You need to add your CODE next to the flag. For example: UA-1234

`-doNotDisplaySerializations`: The serializations of the ontology will not be displayed.

`-displayDirectImportsOnly`: Only those imported ontologies that are directly imported in the ontology being documented.

`-rewriteBase PATH`: Change the default rewrite base path. The default value is "/". This flag can only be used with the htaccess option.

`-excludeIntroduction`: Skip the introduction section in the documentation. 
-uniteSections: Write all HTML sections into a single HTML document. 

`--help`: Shows a help message and exits.


## How can I make WIDOCO automatically recognize my vocabulary annotations?
There are two ways for making WIDOCO get your vocabulary metadata annotations and use them automatically to document the ontology. 

* Add them in your OWL file. For guidelines on which ones to include, follow our [Best Practices document](https://w3id.org/widoco/bestPractices), which indicates which ones we recommend.
* Edit the project properties of /config/config.properties. This is a key-value pair file with metadata properties. Some people consider it easier than adding the property annotations to the OWL file, although I recommend doing the former option. Note that the character ";" is used for lists (for instance first author; second author; third author).

## Browser issues (Why can't I see the generated documentation / visualization?)
The result of executing WIDOCO is an HTML file. We have successfully tested it in Mozilla, IE, Safari and Chrome.  **When the page is stored in a server, WIDOCO's HTML  works correctly in all browsers**. If you view the file **on your local browser**, we recommend you to use Mozilla Firefox, Safari or Internet Explorer. Google Chrome will not show the contents correctly, as it doesn't allow  XMLHttpRequest without HTTP. If you want to view the page locally with Google Chrome you have two possibilities:

* a) Place the file in a server and access it via its URL (for example, put it in dropbox and access through its public url, or on a Github page).
* b) Execute Chrome with the following commands (Thanks to Alejandro Fernandez Carrera):
  * (WIN) `chrome.exe --allow-file-access-from-files`
  * (OSX) `open /Applications/Google\ Chrome.app/ --args --allow-file-access-from-files`
  * (UNX) `/usr/bin/google-chrome --allow-file-access-from-files`
	
## Current improvements
For a complete list of the current improvements and next features, check the [project open issues](https://github.com/dgarijo/Widoco/issues) and [milestones](https://github.com/dgarijo/Widoco/milestones) in the repository.

## Requirements
You will need Java 1.8 or higher (SDK 1.8 or JRE 8) for WIDOCO to work
Otherwise, you will probably experience an "Unsupported major.minor version 52.0" exception when executing the JAR file.

## Contribution guidelines
Contributions to address any of the current issues are welcome. In order to push your contribution, just **push your pull request to the develop branch**. The master branch has only the code associated to the latest release. 
