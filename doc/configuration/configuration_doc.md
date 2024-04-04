
# Running Widoco with a Config.properties file
**Please note** that we recommend running Widoco by reading metadata from the ontology itself.

In order to have Widoco accept a configuration file, you need to create a `config.properties` file and use the `-confFile` option to invoke Widoco. The metadata is declared with a key=value pair as shown below:

```
abstract=An example ontology
authors=First Author;Second Author
authorsURI=http://example.org/author1;http://example.org/author2
authorsInstitution=First author institution;Second author institution
authorsInstitutionURI=https://www.isi.edu/;https://www.isi.edu/
backwardCompatibleWith=https://w3id.org/example/1.0.0
citeAs="add some citattion text here."
contributors=First contributor;Second contributor
contributorsURI=http://example.org/contributor1;http://example.org/contributor2
contributorsInstitution=First contributor institution;Second contributor institution
contributorsInstitutionURI=https://isi.edu/;https://isi.edu/
dateCreated="13 Nov, 2022"
dateIssued=
dateModified="15 Nov, 2022"
description="A description of what the ontology does goes here"
DOI=
funder=
funding=
incompatibleWith=
introduction=A brief text for the introduction section may be written here.
images=image1.png;image2.png
licenseURI=http://creativecommons.org/licenses/by/2.0/
licenseName=CC-BY
licenseIconURL=https://i.creativecommons.org/l/by/2.0/88x31.png
logo="https://example.org/logo.svg"
ontologyName=Example
ontologyNamespaceURI=https://w3id.org/example
ontologyRevisionNumber=1.0.0
ontologyTitle=The Example Ontology
ontologyPrefix=exo
previousVersionURI=https://w3id.org/example/1.0.0
publisher=Ontology Engineering Group
publisherURI=https://oeg-upm.es
publisherInstitution=UPM
publisherInstitutionURI=https://www.upm.es
source=http://source1;http://source2
seeAlso=http://firstResource
thisVersionURI=https://w3id.org/example/1.0.1
status=Ontology Specification Draft
```

Additional configuration options include the following
```
contextURI=JSON-LD context URI.
extendedOntologyNames=test1; test2
extendedOntologyURIs=http://example.org/test1; http://example.org/test2
importedOntologyNames=Imported Ontology 1; Imported Ontology 2
importedOntologyURIs=http://example.org/test11; http://example.org/test22
pathToAbstract=abstract.html (superseedes abstract)
pathToDescription=description.html (superseedes description)
pathToIntro=intro.html (supersedes introduction)
pathToOverview=overview.html
pathToReferences=references.html 
GoogleAnalyticsCode=UA-TestCodeGoesHere
JSONLDSerialization=URL of the file with JSON-LD serialization. E.g., http://my-onto/onto.jsonld
NTSerialization=URL of the file with N3 serialization. E.g., http://my-onto/onto.n3
RDFXMLSerialization=URL of the file with RDF-XML serialization. E.g., http://my-onto/onto.owl
TurtleSerialization=URL of the file with Turtle serialization. E.g., http://my-onto/onto..ttl;
```

For more information, see the [Widoco readme options](https://github.com/dgarijo/Widoco/#options).

For a complete example, have a look at a sample [config.properties file](config.properties).