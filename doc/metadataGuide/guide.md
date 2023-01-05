# Metadata usage in WIDOCO
There are two ways to make WIDOCO aware of the metadata of your ontology: 

* **Recommended option**: Add metadata annotations in your ontology. This makes ontology maintenance easier when you publish new versions, as metadata is included in the ontology. In our [best practice document](https://w3id.org/widoco/bestPractices) we show which properties you should add in your ontology for this purpose. 
* Declare a `.properties` file: Key value pair where all the metadata is specified. Since it's a specific file, it has to be maintained separately from the ontology.

In this document we illustrate how does Widoco use metadata in the final documentation of your ontology, using both options specified above

## Namespaces used in this document
Add a table here with all namespaces

## Metadata usage and propagation in WIDOCO

This section explains the metadata recognized by WIDOCO for both ontology annotations and term annotations.

### <span id="table">Vocabulary annotations</span>

The table below explains how ontology metadata is recognized in WIDOCO:

| Metadata category | Ontology annotation property* | `config.properties` field** | Good practices document | Accepted property value | Example |
| -- | -- | -- | -- | -- | -- |
| Name | [rdfs:label](http://www.w3.org/2000/01/rdf-schema#label), [vann:namespacePrefix](http://purl.org/vocab/vann/preferredNamespacePrefix) | ontologyName | [Sec 3.1.3](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#name) **[RECOMMENDED]** | [Text](#text) | [ontology](), [config](#config), [result]() |
| Namespace prefix | [vann:namespacePrefix](http://purl.org/vocab/vann/preferredNamespacePrefix) | ontologyPrefix | [Sec 3.1.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#prefix) **[RECOMMENDED]** | [Text](#text) | [ontology](), [config](#config), [result]() |
| Namespace URI | [vann:namespaceURI](http://purl.org/vocab/vann/preferredNamespaceURI) | ontologyNamespaceURI | [Sec 3.1.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#namespaceURI) **[RECOMMENDED]** | [URI](#uri) | [ontology](), [config](#config), [result]() |
| Title                          | [dc:title](http://purl.org/dc/elements/1.1/title), [dcterms:title](http://purl.org/dc/terms/title), [schema:name](http://schema.org/name)              | ontologyTitle                    | [Sec 3.2.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#title) **[RECOMMENDED]** | [Text](#text) | [ontology](), [config](#config), [result]()|
| Abstract / Description                          | [dc:description](http://purl.org/dc/elements/1.1/description), [dcterms:description](http://purl.org/dc/terms/description), [schema:description](http://schema.org/description), [dc:abstract](http://purl.org/dc/elements/1.1/abstract), [dcterms:abstract](http://purl.org/dc/terms/abstract), [rdfs:comment](http://www.w3.org/2000/01/rdf-schema#comment), [skos:note](http://www.w3.org/2004/02/skos/core#note)| abstract                    | [Sec 3.2.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#description), [Sec 3.2.3](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#abstract) **[OPTIONAL]**| [Text](#text) | [ontology](), [config](#config), [result]() |
| Status                          | [bibo:status](http://purl.org/ontology/bibo/status) | status                    | [Sec 3.2.4](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#status) **[OPTIONAL]**| [Text](#text) or [Status](#status) | [ontology](), [config](#config), [result]()|
| Version IRI                          | [owl:versionIRI](http://www.w3.org/2002/07/owl#versionIRI) | thisVersionURI                    | [Sec 3.3.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#versionIRI) **[RECOMMENDED]** | [URI](#uri) | [ontology](), [config](#config), [result]()|
| Version number                          | [owl:versionInfo](http://www.w3.org/2002/07/owl#versionInfo), [schema:schemaVersion](https://schema.org/schemaVersion) | ontologyRevisionNumber                    | [Sec 3.3.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#versionInfo) **[RECOMMENDED]**| [Text](#text) | [ontology](), [config](#config), [result]()|
| Backwards compatible                          | [owl:backwardCompatibleWith](http://www.w3.org/2002/07/owl#backwardCompatibleWith) | TO DO                    | [Sec 3.3.3](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#backwardCompatibility) **[OPTIONAL]**| [URI](#uri) | [ontology](), [config](#config), [result]()|
| Incompatible with                          | [owl:incompatibleWith](http://www.w3.org/2002/07/owl#incompatibleWith) | TO DO                    | [Sec 3.3.4](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#incompatibility) **[OPTIONAL]**| [URI](#uri) | [ontology](), [config](#config), [result]()|
| Previous version                          | [dc:replaces](http://purl.org/dc/elements/1.1/replaces), [dcterms:replaces](http://purl.org/dc/terms/replaces), [prov:wasRevisionOf](http://www.w3.org/ns/prov#wasRevisionOf), [pav:previousVersion](http://purl.org/pav/previousVersion), [owl:priorVersion](http://www.w3.org/2002/07/owl#priorVersion)              | TO DO                    | [Sec 3.4.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#previousVersion) **[RECOMMENDED]**| [URI](#uri) | [ontology](), [config](#config), [result]()|
| Creation date                          | [dcterms:created](http://purl.org/dc/terms/created), [schema:dateCreated](http://schema.org/dateCreated), [prov:generatedAtTime](http://www.w3.org/ns/prov#generatedAtTime), [pav:createdOn](http://purl.org/pav/createdOn) | TO DO                    | [Sec 3.4.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#creationDate) **[OPTIONAL]**| [Text](#text) | [ontology](), [config](#config), [result]()|
| Modification date                          | [dcterms:modified](http://purl.org/dc/terms/modified), [schema:dateModified](http://schema.org/dateModified) | TO DO                    | [Sec 3.3.4](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#modificationDate) **[OPTIONAL]**| [Text](#text) | [ontology](), [config](#config), [result]()|
| Issued date                          | [dcterms:issued](http://purl.org/dc/terms/issued), [schema:dateIssued](http://schema.org/dateIssued) | TO DO                    | [Sec 3.4.4](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#issuedDate) **[OPTIONAL]**| [Text](#text) | [ontology](), [config](#config), [result]()|
| Creators            | [dcterms:creator](http://purl.org/dc/terms/creator), [dc:creator](http://purl.org/dc/elements/1.1/creator), [schema:creator](http://schema.org/creator), [pav:createdBy](http://purl.org/pav/createdBy), [prov:wasAttributedTo](http://www.w3.org/ns/prov#wasAttributedTo) | TO DO                    | [Sec 3.5.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#creators) **[RECOMMENDED]**| [Text](#text) or [Person](#person) or [BNode](#bnode) | [ontology](), [config](#config), [result]()|
| Contributors            | [dcterms:contributor](http://purl.org/dc/terms/contributor), [dc:contributor](http://purl.org/dc/elements/1.1/contributor), [schema:contributor](http://schema.org/contributor), [pav:contributedBy](http://purl.org/pav/contributedBy) | TO DO                    | [Sec 3.5.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#contributors) **[RECOMMENDED]**| [Text](#text) or [Person](#person) or [BNode](#bnode)| [ontology](), [config](#config), [result]()|
| Publisher            | [dcterms:publisher](http://purl.org/dc/terms/issued), [dc:publisher](http://purl.org/dc/elements/1.1/publisher) [schema:publisher](http://schema.org/publisher) | TO DO                    | [Sec 3.5.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#publisher) **[OPTIONAL]**| [Text](#text) or [Organization](#organization) or [BNode](#bnode)| [ontology](), [config](#config), [result]()|
| DOI                          | [bibo:doi](http://purl.org/ontology/bibo/doi) | TO DO                    | [Sec 3.6.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#doi) **[OPTIONAL]**| [Text](#text) | [ontology](), [config](#config), [result]()|
| Bibliographic citation                          | [dcterms:bibliographicCitation](http://purl.org/dc/terms/bibliographicCitation), [schema:citation](http://schema.org/citation) | TO DO                    | [Sec 3.6.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#biblio) **[OPTIONAL]**| [Text](#text) | [ontology](), [config](#config), [result]()|
| License                          | [dc:rights](http://purl.org/dc/elements/1.1/rights), [dcterms:license](http://purl.org/dc/terms/license), [schema:license](http://schema.org/license), [cc:license](http://creativecommons.org/ns#) | TO DO                    | [Sec 3.7](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#license) **[OPTIONAL]**| [Text](#text) or [URI](#uri) | [ontology](), [config](#config), [result]()|
| Logo [TO DO IN WIDOCO]                          | [foaf:logo](http://xmlns.com/foaf/0.1/logo), [schema:logo](http://schema.org/logo) | TO DO                    | [Sec 3.6.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#logo) **[OPTIONAL]**| [URI](#uri) | [ontology](), [config](#config), [result]()|
| Diagram                          | [foaf:image](http://xmlns.com/foaf/0.1/image), [foaf:depiction](http://xmlns.com/foaf/0.1/depiction), [schema:image](http://schema.org/image) | TO DO                    | [Sec 3.6.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#diagram) **[OPTIONAL]**| [Text](#text) | [ontology](), [config](#config), [result]()|

**\*** Any of the listed properties is supported by WIDOCO.

**\*\*** Configuration properties do not support [URI](#uri)s or blank nodes.

### Term (classes, properties and data properties) annotations

The table below summarizes all the metadata annotations recognized for ontology terms. Note that there are no `config.properties` annotations here, as these annotations are only read from the ontology.

| Metadata category | Ontology annotation property | Good practices document | Accepted property value | Example |
| -- | -- | -- | -- | -- |
| Label | [rdfs:label](http://www.w3.org/2000/01/rdf-schema#label), [skos:prefLabel](http://www.w3.org/2004/02/skos/core#prefLabel), [obo:IAO_0000118](http://purl.obolibrary.org/obo/IAO_0000118) | [Sec 4.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#label) **[RECOMMENDED]** | [Text](#text) | [ontology](), [result]() |
| Definition | [rdfs:comment](http://www.w3.org/2000/01/rdf-schema#comment), [skos:definition](http://www.w3.org/2004/02/skos/core#definition) | [Sec 4.2](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#def) **[RECOMMENDED]**| [Text](#text) | [ontology](),  [result]()|
| Original source | [rdfs:isDefinedBy](http://www.w3.org/2000/01/rdf-schema#isDefinedby), [dc:source](http://purl.org/dc/elements/1.1/source) | [Sec 4.3](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#osource) **[OPTIONAL]**| [URI](#uri) | [ontology](),  [result]()|
| Example | [vann:example](http://purl.org/vocab/vann/example), [skos:example](http://www.w3.org/2004/02/skos/core#example) | [Sec 4.4](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#deprecation) **[OPTIONAL]**| [Text](#text) | [ontology](),  [result]()|
| Deprecation status | [owl:deprecated](http://www.w3.org/2002/07/owl#deprecated) | [Sec 4.5.1](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#deprecation) **[OPTIONAL]**| [Boolean](#boolean) | [ontology](), [result]()|
| Status | [sw:term_status](http://www.w3.org/2003/06/sw-vocab-status/ns#), [obo:IAO_0000114](http://purl.obolibrary.org/obo/IAO_0000114) | [Sec 4.5.2](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#status1) **[OPTIONAL]**| [Text](#text) | [ontology](),  [result]()|
| Rationale | [vaem:rationale](http://www.linkedmodel.org/schema/vaem#rationale) | [Sec 4.6](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#rationale) **[OPTIONAL]**| [Text](#text) | [ontology](),  [result]()|


## Example: Using ontology annotations (<a href="#table">Back to table</a>)
The following ontology shows 

```
<https://w3id.org/example> rdf:type owl:Ontology ;
    owl:versionIRI <https://w3id.org/example/1.0.1> ;
    <http://purl.org/dc/terms/abstract> "An example vocabulary designed to illustrate how to publish vocabularies on the Web following the FAIR principles"@en ;
    <http://purl.org/dc/elements/1.1/description> "This is an example ontology to illustrate some of the annotations that should be included"@en ;
    <http://purl.org/dc/elements/1.1/title> "The example ontology"@en ;
    <http://purl.org/dc/terms/created> "February 5th, 2020"@en ;
    <http://purl.org/dc/terms/creator> "Daniel Garijo"@en ,
                                        "Maria Poveda-Villalon"@en ;
    <http://purl.org/dc/terms/license> <http://creativecommons.org/licenses/by/2.0/> ;
    <http://purl.org/vocab/vann/preferredNamespacePrefix> "exo"@en ;
    <http://purl.org/vocab/vann/preferredNamespaceUri> "https://w3id.org/example" ;
    <http://schema.org/citation> "Cite this vocabulary as: Garijo, D. and Poveda-Villalon, M. The example ontology 1.0.1."@en ;
    rdfs:comment "An example vocabulary designed to illustrate how to publish vocabularies on the Web following the FAIR principles. This vocabulary describes three simple classes with 3 properties and a data property."@en ;
    owl:backwardCompatibleWith <https://w3id.org/example/1.0.0> ;
    owl:priorVersion <https://w3id.org/example/1.0.0> ;
    owl:versionInfo "1.0.1"@en .
```
And here how it would be seen in the HTML

### Annotating authors:

### Annotating organizations:

## <span id="config"> Example: Using a configuration file (<a href="#table">Back to table</a>)
```
abstract=The abstract of your ontology goes here. 
ontologyTitle=The Test Ontology
ontologyName=Test
ontologyPrefix=test
ontologyNamespaceURI=http://purl.org/net/p-plan#
dateOfRelease=11 July 2013
thisVersionURI=http://purl.org/net/p-plan
latestVersionURI=http://example.org/latestVersion
previousVersionURI=http://example.org/previousVersion
ontologyRevisionNumber=1.0.0
authors=First Author;Second Author
authorsURI=http://example.org/author1;http://example.org/author2
authorsInstitution=First author institution;Second author institution
authorsInstitutionURI=http://firstAuthorinstitution.org; http://secondAuthorinstitution.org
contributors=First contributor;Second contributor
contributorsURI=http://example.org/contributor1;http://example.org/contributor2
contributorsInstitution=First contributor institution;Second contributor institution
contributorsInstitutionURI=http://firstConstributorinstitution.org;
publisher=publisherName
publisherURI=http://example.com/publisher1
publisherInstitution=OEG
publisherInstitutionURI=http://oeg-upm.es
importedOntologyNames=Imported Ontology 1; Imported Ontology 2
importedOntologyURIs=http://example.org/test11; http://example.org/test22
extendedOntologyNames=test1; test2
extendedOntologyURIs=http://example.org/test1; http://example.org/test2
licenseName=License name. E.g.: Creative Commons Attribution-NonCommercial-ShareAlike 2.0 Generic License
licenseURI=http://creativecommons.org/licenses/by-nc-sa/2.0/
licenseIconURL=http://i.creativecommons.org/l/by-nc-sa/2.0/88x31.png
citeAs=Insert here how you want to cite your ontology.
DOI=DOI of for your ontology publication goes here.
status=Ontology Draft
RDFXMLSerialization=http://vocab.linkeddata.es/p-plan/p-plan.owl
TurtleSerialization=
N3Serialization=
JSONLDSerialization=
GoogleAnalyticsCode=UA-TestCodeGoesHere
contextURI=http://purl.org/net/p-plan/context
```

And add a link to an existing file


## Glossary (<a href="#table">Back to table</a>)

<span id="text">**Text**:</span> A literal written in a textual manner

<span id="uri">**URI**:</span> A URL that describes the target resource

<span id="boolean">**Boolean**:</span> True or False.

<span id="status">**Status**:</span> 

<span id="person">**Person**:</span>

<span id="organization">**Organization**:</span>

<span id="bnode">**BNode**:</span>