
# Running Widoco with a Config.properties file
**Please note** that we recommend running Widoco by reading metadata from the ontology itself.

In order to have Widoco accept a configuration file, you need to create a `config.properties` file and use the `-confFile` option to invoke Widoco. The metadata is declared with a key=value pair as shown below:

```
abstract=An example ontology
backwardCompatibleWith=https://w3id.org/example/1.0.0
citeAs="add some citattion text here."
dateCreated="13 Nov, 2022"
dateModified="15 Nov, 2022"
authors=First Author;Second Author
authorsURI=http://example.org/author1;http://example.org/author2
authorsInstitution=First author institution;Second author institution
authorsInstitutionURI=https://www.isi.edu/;https://www.isi.edu/
contributors=First contributor;Second contributor
contributorsURI=http://example.org/contributor1;http://example.org/contributor2
contributorsInstitution=First contributor institution;Second contributor institution
contributorsInstitutionURI=https://isi.edu/;https://isi.edu/
description="A description of what the ontology does goes here"
diagram="https://example.org/diagram.svg"
DOI=
funder=
fundingGrant=
incompatibleWith=
issued=
images=image1.png;image2.png
licenseURI=http://creativecommons.org/licenses/by/2.0/
licenseName=CC-BY
licenseIconURL=https://i.creativecommons.org/l/by/2.0/88x31.png
logo="https://example.org/logo.svg"
ontologyName=Example
ontologyPrefix=exo
modified="15 April, 2023"
ontologyNamespaceURI=https://w3id.org/example
previousVersionURI=https://w3id.org/example/1.0.0
publisher=Ontology Engineering Group
publisherURI=https://oeg-upm.es
publisherInstitution=UPM
publisherInstitutionURI=https://www.upm.es
source=http://source1;http://source2
seeAlso=http://firstResource
ontologyTitle=The Example Ontology
thisVersionURI=https://w3id.org/example/1.0.1
ontologyRevisionNumber=v1.0.0
status=Ontology Specification Draft
```

Additional configuration options include the following
```
importedOntologyNames=Imported Ontology 1; Imported Ontology 2
importedOntologyURIs=http://example.org/test11; http://example.org/test22
extendedOntologyNames=test1; test2
extendedOntologyURIs=http://example.org/test1; http://example.org/test2
RDFXMLSerialization=URL of the file with RDF-XML serialization. E.g., http://my-onto/onto.owl
TurtleSerialization=URL of the file with Turtle serialization. E.g., http://my-onto/onto..ttl;
NTSerialization=URL of the file with N3 serialization. E.g., http://my-onto/onto.n3
JSONLDSerialization=URL of the file with JSON-LD serialization. E.g., http://my-onto/onto.jsonld
GoogleAnalyticsCode=UA-TestCodeGoesHere
contextURI=JSON-LD context URI. 
```

For more information, see the [Widoco readme options](https://github.com/dgarijo/Widoco/#options).

For a complete example, have a look at a sample [config.properties file](config.properties).