# Metadata
There are two ways to make WIDOCO aware of the metadata of your ontology:

* Add metadata annotations in your ontology. This makes ontology maintenance easier when you publish new versions, as metadata is included in the ontology. In our [best practice document](https://w3id.org/widoco/bestPractices) we show which properties you should add in your ontology for this purpose. This is the **recommended option**.
* Declare a `.properties` file: A collection of key-value pairs where all the metadata is specified. Since it's a specific file, it has to be maintained separately from the ontology.

In this document we illustrate how Widoco uses metadata in the final documentation of your ontology, using both options specified above.

## Namespaces used in this document

|Namespace prefix|URI                                            |
|----------------|-----------------------------------------------|
|bibo            |<http://purl.org/ontology/bibo/>               |
|cc              |<http://creativecommons.org/ns#>               |
|dc              |<http://purl.org/dc/elements/1.1/>             |
|dcterms         |<http://purl.org/dc/terms/>                    |
|doap            |<http://usefulinc.com/ns/doap#>                |
|foaf            |<http://xmlns.com/foaf/0.1/>                   |
|mod             |<https://w3id.org/mod#>                        |
|obo             |<http://purl.obolibrary.org/obo/>              |
|org             |<http://www.w3.org/ns/org#>                    |
|owl             |<http://www.w3.org/2002/07/owl#>               |
|pav             |<http://purl.org/pav/>                         |
|prov            |<http://www.w3.org/ns/prov#>                   |
|rdfs            |<http://www.w3.org/2000/01/rdf-schema#>        |
|schema          |<https://schema.org/>                          |
|sw              |<http://www.w3.org/2003/06/sw-vocab-status/ns#>|
|skos            |<http://www.w3.org/2004/02/skos/core#>         |
|vaem            |<http://www.linkedmodel.org/schema/vaem#>      |
|vann            |<http://purl.org/vocab/vann/>                  |
|vcard           |<http://www.w3.org/2006/vcard/ns#>             |
|wdrs            |<http://www.w3.org/2007/05/powder-s#>          |
|widoco          |<https://w3id.org/widoco/vocab#>               |

## Metadata usage in WIDOCO

This section explains the metadata recognized by WIDOCO for both ontology annotations and term annotations.

### <span id="table">Vocabulary annotations</span>

The table below shows which ontology metadata annotations are recognized in WIDOCO in alphabetical order. The links in the first column redirect to the corresponding sections of the [good practice document](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html).

|Metadata category|Obligation|Ontology annotation property*|`config.properties` field(s)**|Accepted property value|Example|
|-----------------|----------|-----------------------------|------------------------------|-----------------------|-------|
|**[Abstract]**   |OPTIONAL  |[dc:abstract], [dcterms:abstract]    |abstract        |[Text]|[ontology](#onto), [config]|
|**[Backwards compatible with]**|OPTIONAL|[owl:backwardCompatibleWith]  |backwardCompatibleWith |[URI] |[ontology](#onto), [config]|
|**[Bibliographic citation]**|OPTIONAL|[dcterms:bibliographicCitation], [schema:citation]|citeAs|[Text]|[ontology](#onto), [config]|
|**[Code repository]**|OPTIONAL|[schema:codeRepository], [doap:repository]|codeRepository|[URI]|[ontology](#onto), [config]|
|**[Contributors]**|RECOMMENDED|[dcterms:contributor], [dc:contributor], [schema:contributor], [pav:contributedBy], [doap:documenter], [doap:maintainer], [doap:helper], [doap:translator]|contributors, contributorsURI, contributorsInstitution, contributorsInstitutionURI|[Text] or [Person] or [BNode]|[ontology](#onto), [config]|
|**[Creation date]**|OPTIONAL|[dcterms:created], [schema:dateCreated], [prov:generatedAtTime], [pav:createdOn], [doap:created]|dateCreated|[Text]|[ontology](#onto), [config]|
|**[Creators]**|RECOMMENDED|[dcterms:creator], [dc:creator], [schema:creator], [pav:createdBy], [pav:authoredBy], [prov:wasAttributedTo], [doap:developer], [foaf:maker]|authors, authorsURI, authorsInstitution, authorsInstitutionURI|[Text] or [Person] or [BNode]|[ontology](#onto), [config]|
|**[Description]**|OPTIONAL|[dc:description], [dcterms:description], [schema:description], [rdfs:comment], [skos:note], [doap:description], [doap:shortdesc]|description|[Text]|[ontology](#onto), [config]|
|**[Diagram]**|OPTIONAL|[foaf:image], [foaf:depiction], [schema:image]|diagram|      [Text]|[ontology](#onto), [config]|
|**[DOI]**    |OPTIONAL|[bibo:doi]                                    |DOI    |      [Text]|[ontology](#onto), [config]|
|**[Extended ontologies]**|OPTIONAL|[voaf:extends] |extendedOntologyNames, extendedOntologyURIs |[URI] |[ontology](#onto), [config]|
|**[Funders]** (org/person)|OPTIONAL|[foaf:fundedBy], [schema:funder]|funders|[Text] or [URI]|[ontology](#onto), [config]|
|**[Funding grants]**   |OPTIONAL|[schema:funding]      |fundingGrant    |[Text] or [URI]|[ontology](#onto), [config]|
|**[Incompatible with]**|OPTIONAL|[owl:incompatibleWith]|incompatibleWith|[URI]          |[ontology](#onto), [config]|
|**Imported ontologies**|RECOMMENDED (good practice in ontology engineering)|[owl:imports]|importedOntologyNames, importedOntologyURIs|[URI]|[ontology](#onto), [config]|
|**[Publication date]** |OPTIONAL|[dcterms:issued], [schema:dateIssued]|dateIssued  |[Text]|[ontology](#onto), [config]|
|**[License]**          |OPTIONAL|[dc:rights], [dcterms:license], [schema:license], [cc:license], [doap:license]|licenseName, licenseURI, licenseIconURL|[Text] or [URI]|[ontology](#onto), [config]|
|**[Logo]**             |OPTIONAL|[foaf:logo], [schema:logo]     |logo               |[URI]|[ontology](#onto), [config]|
|**[Name]**|RECOMMENDED|[rdfs:label], [mod:acronym], [schema:alternateName], [skos:prefLabel]|ontologyName|[Text]|[ontology](#onto), [config]|
|**[Namespace prefix]**|RECOMMENDED|[vann:preferredNamespacePrefix]|ontologyPrefix  |[Text]|[ontology](#onto), [config]|
|**[Namespace URI]**   |RECOMMENDED|[vann:preferredNamespaceUri]|ontologyNamespaceURI|[URI]|[ontology](#onto), [config]|
|**[Modification date]**|OPTIONAL|[dcterms:modified], [schema:dateModified] [pav:lastUpdatedOn]|dateModified|[Text]  |[ontology](#onto), [config]|
|**[Previous version]**|RECOMMENDED|[dc:replaces], [dcterms:replaces], [prov:wasRevisionOf], [pav:previousVersion], [owl:priorVersion]|previousVersionURI|[URI]|[ontology](#onto), [config]|
|**[Publisher]**|OPTIONAL|[dcterms:publisher], [dc:publisher], [schema:publisher]|publisher, publisherURI, publisherInstitution, publisherInstitutionURI|[Text] or [Organization] or [BNode]|[ontology](#onto), [config]|
|**[Similar resources]**|OPTIONAL|[rdfs:seeAlso]                 |                  |[Text]|[ontology](#onto), [config]|
|**[Status][SO]**|OPTIONAL|[bibo:status] [mod:status] [schema:creativeWorkStatus]|status|[Text] or [Status](#status)|[ontology](#onto), [config]|
|**[Source]**|OPTIONAL|[dc:source], [dcterms:source], [prov:hadPrimarySource], [wdrs:describedBy]|source|[URI]  |[ontology](#onto), [config]|
|**[Title]** |RECOMMENDED|[dc:title], [dcterms:title], [schema:name]|ontologyTitle  |[Text]|[ontology](#onto), [config]|
|**[Version IRI]**   |RECOMMENDED|[owl:versionIRI]                  |thisVersionURI |[URI] |[ontology](#onto), [config]|
|**[Version number]**|RECOMMENDED|[owl:versionInfo], [schema:schemaVersion], [pav:version], [dcterms:hasVersion]|ontologyRevisionNumber|[Text]|[ontology](#onto), [config]|

**\*** All listed properties are supported by WIDOCO.

**\*\*** Configuration properties do not support [URI](#uri)s or blank nodes. Hence, additional properties are needed (like authorsURI, contributorsURI) to annotate URIs in case they are needed.

### Custom annotations
We prioritize reusing metadata properties already defined elsewhere. However, a small subset of `OPTIONAL` annotation properties (i.e., `introduction` and the URL to the different serializations) have been introduced by WIDOCO to customize parts of the documentation from the ontology itself:

|Metadata category|Obligation|Ontology annotation property*|`config.properties` field(s)**|Accepted property value|Example|
|-----------------|----------|-----------------------------|------------------------------|-----------------------|-------|
|**Introduction**           |OPTIONAL|[widoco:introduction]     |introduction      |[Text]|[ontology](#onto), [config]|
|**N-Triples serialization**|OPTIONAL|[widoco:ntSerialization]  |NTSerialization    |[URL]|[ontology](#onto), [config]|
|**JSON-LD serialization**|OPTIONAL|[widoco:jsonldSerialization]|JSONLDSerialization|[URL]|[ontology](#onto), [config]|
|**RDF-XML serialization**|OPTIONAL|[widoco:rdfxmlSerialization]|RDFXMLSerialization|[URL]|[ontology](#onto), [config]|
|**Turtle serialization** |OPTIONAL|[widoco:turtleSerialization]|TurtleSerialization|[URL]|[ontology](#onto), [config]|

### Term annotations (concerning classes, properties and data properties)

The table below summarizes all the metadata annotations recognized for ontology terms, in alphabetical order. Note that there are no `config.properties` annotations here, as these annotations are only read from the ontology file. The links in the first column redirect to the corresponding sections of the [good practice document](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html).

|Metadata category       |Obligation |Ontology annotation property       |Accepted property value|Example          |
|------------------------|-----------|-----------------------------------|-----------------------|-----------------|
|**[Definition]**        |RECOMMENDED|[rdfs:comment], [skos:definition]  |[Text]                 |[ontology](#term)|
|**[Deprecation status]**|OPTIONAL   |[owl:deprecated]                   |[Boolean]              |[ontology](#term)|
|**Editorial note**      |OPTIONAL   |[skos:editorialNote]               |[Text]                 |[ontology](#term)|
|**[Example]**           |OPTIONAL   |[vann:example], [skos:example]     |[Text]                 |[ontology](#term)|
|**[Label]**             |RECOMMENDED|[rdfs:label], [skos:prefLabel], [obo:IAO_0000118]|[Text]   |[ontology](#term)|
|**[Original source]**   |OPTIONAL   |[rdfs:isDefinedBy], [dc:source]    |[URI]                  |[ontology](#term)|
|**[Rationale]**         |OPTIONAL   |[vaem:rationale]                   |[Text]                 |[ontology](#term)|
|**[Status][ST]**        |OPTIONAL   |[sw:term_status], [obo:IAO_0000114]|[Text]                 |[ontology](#term)|


## <span id="onto">Example: Using ontology annotations
The following `Turtle` code block shows sample annotations for each of the metadata categories on an ontology with namespace URI `https://w3id.org/example`:

```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix dc: <http://purl.org/dc/elements/1.1/> .
@prefix schema: <https://schema.org/> .
@prefix voaf: <http://purl.org/vocommons/voaf#> .
@prefix vann: <http://purl.org/vocab/vann/> .
@prefix widoco: <https://w3id.org/widoco/vocab#> .
@prefix bibo: <http://purl.org/ontology/bibo/> .

<https://w3id.org/example> rdf:type owl:Ontology ;
    owl:versionIRI <https://w3id.org/example/1.0.1> ;
    dcterms:abstract "An example vocabulary designed to illustrate how to publish vocabularies on the Web following the FAIR principles"@en ;
    dc:description "This is an example ontology to illustrate some of the annotations that should be included"@en ;
    dc:title "The example ontology"@en ;
    dcterms:created "February 5th, 2020"@en ;
    dcterms:creator "Daniel Garijo"@en ,"Maria Poveda-Villalon"@en ;
    dcterms:license <http://creativecommons.org/licenses/by/2.0/> ;
    vann:preferredNamespacePrefix "exo"@en ;
    vann:preferredNamespaceUri "https://w3id.org/example" ;
    schema:citation "Cite this vocabulary as: Garijo, D. and Poveda-Villalón, M. The example ontology 1.0.1."@en ;
    rdfs:comment "An example vocabulary designed to illustrate how to publish vocabularies on the Web following the FAIR principles. This vocabulary describes three simple classes with 3 properties and a data property."@en ;
    rdfs:label "Example" ;
    owl:backwardCompatibleWith <https://w3id.org/example/1.0.0> ;
    owl:priorVersion <https://w3id.org/example/1.0.0> ;
    voaf:extends <https://w3id.org/otherOntology> ;
    owl:imports <http://www.w3.org/2000/01/rdf-schema> ;
    bibo:status <http://purl.org/ontology/bibo/status/draft> ;
    foaf:fundedBy <https://example.org/fundingOrganization> ;
    schema:funding <https://example.org/fundingGrant> ;
    schema:codeRepository "https://github.com/dgarijo/example"^^xsd:anyURI;
    widoco:introduction "A paragraph with the introduction section of the documentation about your resource"@en ;
    widoco:rdfxmlSerialization "https://example.org/serialization/ontology.xml"^^xsd:anyURI ; 
    owl:versionInfo "1.0.1" .
    #If content negotiation is enabled, the widoco:rdfxmlSerialization annotation may not be needed.
```

([Back to table](#table))

### Annotating the ontology using entities:
Certain categories like `Authors`, `Contributors` and `Publisher` can be annotated as RDF entities.  If a `URI` or a `blank node` are used in these categories, Widoco will look for the the resource within the ontology itself (resolving external URIs is not currently supported). An example using a URI and a blank node can be seen below:

If URIs are used to define the creators of an ontology, the result would be similar to the snippet below:
```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix schema: <https://schema.org/> .

<https://w3id.org/example> rdf:type owl:Ontology ;
    schema:creator <https://w3id.org/example/ind/dgarijo> ,<https://w3id.org/example/ind/mpoveda> .
```

If blank nodes are used, then the the result should look similar to the following snippet:
```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix schema: <https://schema.org/> .

<https://w3id.org/example> rdf:type owl:Ontology ;
    schema:creator [
        a schema:Person;
        schema:name "Daniel Garijo"
    ] ,[
        a schema:Person;
        schema:name "María Poveda"
    ] .
```
Widoco will recognize the following properties when describing agents (persons or organizations):

|Metadata category|Ontology annotation property                                |Accepted property value            |
|-----------------|------------------------------------------------------------|-----------------------------------|
|**Affiliation**  |[schema:affiliation], [org:memberOf]                        |[Text] or [Organization] or [BNode]|
|**Family Name**  |[schema:familyName], [vcard:family-name], [foaf:family_name]|[Text]                             |
|**Full name**    |[rdfs:label], [schema:name], [vcard:fn], [foaf:name]        |[Text]                             |
|**Given name**   |[schema:givenName], [vcard:given-name], [foaf:givenname]    |[Text]                             |
|**E-mail**       |[schema:email], [vcard:hasEmail], [foaf:mbox]               |[Text]                             |
|**URL**          |[schema:url], [vcard:hasURL], [foaf:homepage]               |[URI]                              |


### <span id="term">Annotating ontology terms:
For status, the known values are: `unstable`, `testing`, `stable` and `archaic`
```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix vann: <http://purl.org/vocab/vann/> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .
@prefix sw: <http://www.w3.org/2003/06/sw-vocab-status/ns#> .
@prefix : <https://w3id.org/example#> .

:Researcher rdf:type owl:Class ;
            vann:example "Daniel Garijo."@en ;
            vaem:rationale "The concept Researcher was added to the ontology to represent those authors of scientific publications that belong to a public institution."@en ;
            rdfs:comment "A researcher is a person who publishes scientific papers, writes research proposals and mentors students"@en ;
            sw:status "unstable";
            rdfs:isDefinedBy <https://w3id.org/example#> ;
            skos:editorialNote "Some editorial note by the creator of the term" ;
            rdfs:label "Researcher"@en .
```

## <span id="config"> Example: Using a configuration file
Create a `config.properties` file and use the `-confFile` option to invoke Widoco. The metadata is declared with a key=value pair as shown below:

```
abstract=An example ontology
authors=First Author;Second Author
authorsURI=http://example.org/author1;http://example.org/author2
authorsInstitution=First author institution;Second author institution
authorsInstitutionURI=https://www.isi.edu/;https://www.isi.edu/
backwardCompatibleWith=https://w3id.org/example/1.0.0
citeAs="add some citattion text here."
codeRepository=https://github.com/dgarijo/example
contributors=First contributor;Second contributor
contributorsURI=http://example.org/contributor1;http://example.org/contributor2
contributorsInstitution=First contributor institution;Second contributor institution
contributorsInstitutionURI=https://isi.edu/;https://isi.edu/
dateCreated="13 Nov, 2022"
dateIssued="14 Nov, 2022"
dateModified="15 April, 2023"
description=A description of what the ontology does goes here
extendedOntologyNames=test1; test2
extendedOntologyURIs=http://example.org/test1; http://example.org/test2
DOI=https://dx.doi.org/SOME/DOI
funder=https://example.org/institution
funding=https://example.org/fundingGrant
incompatibleWith=https://w3id.org/example/0.0.1
images=image1.png;image2.png
importedOntologyNames=Imported Ontology 1; Imported Ontology 2
importedOntologyURIs=http://example.org/test11; http://example.org/test22
introduction=A brief text for the introduction section may be written here.
licenseURI=http://creativecommons.org/licenses/by/2.0/
licenseName=CC-BY
licenseIconURL=https://i.creativecommons.org/l/by/2.0/88x31.png
logo="https://example.org/logo.svg"
ontologyName=The Cohort Ontology
ontologyNamespaceURI=https://w3id.org/example
ontologyTitle=The Example Ontology
ontologyPrefix=exo
ontologyRevisionNumber=1.0.0
pathToAbstract=abstract.html (superseedes abstract)
pathToDescription=description.html (superseedes description)
pathToIntro=intro.html (supersedes introduction)
pathToOverview=overview.html
pathToReferences=references.html
previousVersionURI=https://w3id.org/example/1.0.0
publisher=Ontology Engineering Group
publisherURI=https://oeg-upm.es
publisherInstitution=UPM
publisherInstitutionURI=https://www.upm.es
thisVersionURI=https://w3id.org/example/1.0.1
source=http://source1;http://source2
seeAlso=http://firstResource
status=Ontology Specification Draft
JSONLDSerialization=ontology.nt
NTSerialization=ontology.nt
RDFXMLSerialization=ontology.xml
TurtleSerialization=ontology.ttl
```

([Back to table](#table))

## Glossary

<span id="text">**Text**:</span> A literal written in a textual manner.

<span id="uri">**URI**:</span> A URL that describes the target resource.

<span id="boolean">**Boolean**:</span> True or False.

<span id="status">**Status**:</span> Status of a term, or the ontology document. For terms, known statuses are: `unstable`, `testing`, `stable` and `archaic` (see the [W3C sw-vocab](https://www.w3.org/2003/06/sw-vocab-status/ns#) for reference).

<span id="person">**Person**:</span> Entity used to refer to people in general.

<span id="organization">**Organization**:</span> Entity used to represent an insitution or company. Typically used as the range of the `publisher` metadata property.

<span id="bnode">**BNode**:</span> Blank node, used to refer to an entity without assigning an URI to that entity.

([Back to table](#table))

[Text]:         #text
[URI]:          #uri
[Boolean]:      #boolean
[Status]:       #status
[Person]:       #person
[Organization]: #organization
[BNode]:        #bnode
[config]:       #config
[Namespace URI]:             https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#namespaceURI
[Namespace prefix]:          https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#prefix
[Name]:                      https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#name
[Title]:                     https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#title
[Description]:               https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#description
[Abstract]:                  https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#abs
[SO]:                        https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#status
[Version IRI]:               https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#versionIRI
[Version number]:            https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#versionInfo
[Backwards compatible with]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#backwardCompatibility
[Incompatible with]:         https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#incompatibility
[Previous version]:          https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#previousVersion
[Creation date]:             https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#creationDate
[Modification date]:         https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#modificationDate
[Publication date]:          https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#issuedDate
[Source]:                    https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#source
[Extended ontologies]:       https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#extended
[Creators]:                  https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#creators
[Contributors]:              https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#contributors
[Publisher]:                 https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#publisher
[Funders]:                   https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#funder
[Funding grants]:            https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#funding
[DOI]:                       https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#doi
[Bibliographic citation]:    https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#biblio
[License]:                   https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#lic
[Logo]:                      https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#logo
[Diagram]:                   https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#diagram
[Similar resources]:         https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#similar
[Code repository]:           https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#code
[Label]:              https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#label
[Definition]:         https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#def
[Original source]:    https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#osource
[Example]:            https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#example
[Deprecation status]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#deprecation
[ST]:                 https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#status1
[Rationale]:          https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#rationale
[bibo:doi]:                      http://purl.org/ontology/bibo/doi
[bibo:status]:                   http://purl.org/ontology/bibo/status
[cc:license]:                    http://creativecommons.org/ns#
[dc:abstract]:                   http://purl.org/dc/elements/1.1/abstract
[dc:contributor]:                http://purl.org/dc/elements/1.1/contributor
[dc:creator]:                    http://purl.org/dc/elements/1.1/creator
[dc:description]:                http://purl.org/dc/elements/1.1/description
[dc:publisher]:                  http://purl.org/dc/elements/1.1/publisher
[dc:replaces]:                   http://purl.org/dc/elements/1.1/replaces
[dc:rights]:                     http://purl.org/dc/elements/1.1/rights
[dc:source]:                     http://purl.org/dc/elements/1.1/source
[dc:title]:                      http://purl.org/dc/elements/1.1/title
[dcterms:abstract]:              http://purl.org/dc/terms/abstract
[dcterms:bibliographicCitation]: http://purl.org/dc/terms/bibliographicCitation
[dcterms:contributor]:           http://purl.org/dc/terms/contributor
[dcterms:created]:               http://purl.org/dc/terms/created
[dcterms:creator]:               http://purl.org/dc/terms/creator
[dcterms:description]:           http://purl.org/dc/terms/description
[dcterms:hasVersion]:            http://purl.org/dc/terms/hasVersion
[dcterms:issued]:                http://purl.org/dc/terms/issued
[dcterms:license]:               http://purl.org/dc/terms/license
[dcterms:modified]:              http://purl.org/dc/terms/modified
[dcterms:publisher]:             http://purl.org/dc/terms/publisher
[dcterms:replaces]:              http://purl.org/dc/terms/replaces
[dcterms:source]:                http://purl.org/dc/terms/source
[dcterms:title]:                 http://purl.org/dc/terms/title
[doap:created]:                  http://usefulinc.com/ns/doap#
[doap:description]:              http://usefulinc.com/ns/doap#description
[doap:developer]:                http://usefulinc.com/ns/doap#developer
[doap:documenter]:               http://usefulinc.com/ns/doap#documenter
[doap:helper]:                   http://usefulinc.com/ns/doap#helper
[doap:license]:                  http://usefulinc.com/ns/doap#license
[doap:maintainer]:               http://usefulinc.com/ns/doap#maintainer
[doap:shortdesc]:                http://usefulinc.com/ns/doap#shortdesc
[doap:translator]:               http://usefulinc.com/ns/doap#translator
[doap:repository]:               http://usefulinc.com/ns/doap#repository
[foaf:depiction]:                http://xmlns.com/foaf/0.1/depiction
[foaf:family_name]:              http://xmlns.com/foaf/0.1/family_name
[foaf:fundedBy]:                 http://xmlns.com/foaf/0.1/fundedBy
[foaf:givenname]:                http://xmlns.com/foaf/0.1/givenname
[foaf:homepage]:                 http://xmlns.com/foaf/0.1/homepage
[foaf:image]:                    http://xmlns.com/foaf/0.1/image
[foaf:logo]:                     http://xmlns.com/foaf/0.1/logo
[foaf:maker]:                    http://xmlns.com/foaf/0.1/maker
[foaf:mbox]:                     http://xmlns.com/foaf/0.1/mbox
[foaf:name]:                     http://xmlns.com/foaf/0.1/name
[mod:acronym]:                   https://w3id.org/mod#acronym
[mod:status]:                    https://w3id.org/mod#status
[obo:IAO_0000114]:               http://purl.obolibrary.org/obo/IAO_0000114
[obo:IAO_0000118]:               http://purl.obolibrary.org/obo/IAO_0000118
[org:memberOf]:                  http://www.w3.org/ns/org#memberOf
[owl:backwardCompatibleWith]:    http://www.w3.org/2002/07/owl#backwardCompatibleWith
[owl:deprecated]:                http://www.w3.org/2002/07/owl#deprecated
[owl:incompatibleWith]:          http://www.w3.org/2002/07/owl#incompatibleWith
[owl:imports]:                   http://www.w3.org/2002/07/owl#imports
[owl:priorVersion]:              http://www.w3.org/2002/07/owl#priorVersion
[owl:versionIRI]:                http://www.w3.org/2002/07/owl#versionIRI
[owl:versionInfo]:               http://www.w3.org/2002/07/owl#versionInfo
[pav:authoredBy]:                http://purl.org/pav/authoredBy
[pav:contributedBy]:             http://purl.org/pav/contributedBy
[pav:createdBy]:                 http://purl.org/pav/createdBy
[pav:createdOn]:                 http://purl.org/pav/createdOn
[pav:lastUpdatedOn]:             http://purl.org/pav/lastUpdatedOn
[pav:previousVersion]:           http://purl.org/pav/previousVersion
[pav:version]:                   http://purl.org/pav/version
[prov:generatedAtTime]:          http://www.w3.org/ns/prov#generatedAtTime
[prov:hadPrimarySource]:         http://www.w3.org/ns/prov#hadPrimarySource
[prov:wasAttributedTo]:          http://www.w3.org/ns/prov#wasAttributedTo
[prov:wasRevisionOf]:            http://www.w3.org/ns/prov#wasRevisionOf
[rdfs:comment]:                  http://www.w3.org/2000/01/rdf-schema#comment
[rdfs:isDefinedBy]:              http://www.w3.org/2000/01/rdf-schema#isDefinedby
[rdfs:label]:                    http://www.w3.org/2000/01/rdf-schema#label
[rdfs:seeAlso]:                  http://www.w3.org/2000/01/rdf-schema#seeAlso
[schema:affiliation]:            https://schema.org/affiliation
[schema:citation]:               https://schema.org/citation
[schema:contributor]:            https://schema.org/contributor
[schema:codeRepository]:         https://schema.org/codeRepository
[schema:creator]:                https://schema.org/creator
[schema:creativeWorkStatus]:     https://schema.org/creativeWorkStatus
[schema:dateCreated]:            https://schema.org/dateCreated
[schema:dateIssued]:             https://schema.org/dateIssued
[schema:dateModified]:           https://schema.org/dateModified
[schema:description]:            https://schema.org/description
[schema:alternateName]:          https://schema.org/alternateName
[schema:email]:                  https://schema.org/email
[schema:familyName]:             https://schema.org/familyName
[schema:givenName]:              https://schema.org/givenName
[schema:image]:                  https://schema.org/image
[schema:license]:                https://schema.org/license
[schema:logo]:                   https://schema.org/logo
[schema:name]:                   https://schema.org/name
[schema:publisher]:              https://schema.org/publisher
[schema:schemaVersion]:          https://schema.org/schemaVersion
[schema:url]:                    https://schema.org/url
[schema:funder]:                 https://schema.org/funder
[schema:funding]:                https://schema.org/funding
[skos:definition]:               http://www.w3.org/2004/02/skos/core#definition
[skos:editorialNote]:            http://www.w3.org/2004/02/skos/core#editorialNote
[skos:example]:                  http://www.w3.org/2004/02/skos/core#example
[skos:note]:                     http://www.w3.org/2004/02/skos/core#note
[skos:prefLabel]:                http://www.w3.org/2004/02/skos/core#prefLabel
[sw:term_status]:                http://www.w3.org/2003/06/sw-vocab-status/ns#
[vaem:rationale]:                http://www.linkedmodel.org/schema/vaem#rationale
[vann:example]:                  http://purl.org/vocab/vann/example
[vann:preferredNamespacePrefix]: http://purl.org/vocab/vann/preferredNamespacePrefix
[vann:preferredNamespaceURI]:    http://purl.org/vocab/vann/preferredNamespaceURI
[vcard:family-name]:             http://www.w3.org/2006/vcard/ns#family-name
[vcard:fn]:                      http://www.w3.org/2006/vcard/ns#fn
[vcard:given-name]:              http://www.w3.org/2006/vcard/ns#given-name
[vcard:hasEmail]:                http://www.w3.org/2006/vcard/ns#hasEmail
[vcard:hasURL]:                  http://www.w3.org/2006/vcard/ns#hasURL
[voaf:extends]:                  http://purl.org/vocommons/voaf#extends
[wdrs:describedBy]:              http://www.w3.org/2007/05/powder-s#describedBy
[widoco:introduction]:           https://w3id.org/widoco/vocab#introduction
[widoco:rdfxmlSerialization]:    https://w3id.org/widoco/vocab#rdfxmlSerialization
[widoco:turtleSerialization]:    https://w3id.org/widoco/vocab#turtleSerialization
[widoco:ntSerialization]:        https://w3id.org/widoco/vocab#ntSerialization
[widoco:jsonldSerialization]:    https://w3id.org/widoco/vocab#jsonldSerialization
