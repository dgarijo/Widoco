# Metadata usage in WIDOCO
There are two ways to make WIDOCO aware of the metadata of your ontology:

* Add metadata annotations in your ontology. This makes ontology maintenance easier when you publish new versions, as metadata is included in the ontology. In our [best practice document](https://w3id.org/widoco/bestPractices) we show which properties you should add in your ontology for this purpose. This is the **recommended option**.
* Declare a `.properties` file: A collection of key-value pairs where all the metadata is specified. Since it's a specific file, it has to be maintained separately from the ontology.

In this document we illustrate how Widoco uses metadata in the final documentation of your ontology, using both options specified above.

## Namespaces used in this document

|Namespace prefix|URI                                                                             |
|----------------|--------------------------------------------------------------------------------|
|bibo            |[http://purl.org/ontology/bibo/](http://purl.org/ontology/bibo/)                |
|cc              |[http://creativecommons.org/ns#](http://creativecommons.org/ns#)                |
|dce             |[http://purl.org/dc/elements/1.1/](http://purl.org/dc/elements/1.1/)            |
|dct             |[http://purl.org/dc/terms/](http://purl.org/dc/terms/)                          |
|doap            |[http://usefulinc.com/ns/doap#](http://usefulinc.com/ns/doap#)                  |
|foaf            |[http://xmlns.com/foaf/0.1/](http://xmlns.com/foaf/0.1/)                        |
|mod             |[https://w3id.org/mod#](https://w3id.org/mod#)
|obo             |[http://purl.obolibrary.org/obo/](http://purl.obolibrary.org/obo/)              |
|org             |[http://www.w3.org/ns/org#](http://www.w3.org/ns/org#)                          |
|owl             |[http://www.w3.org/2002/07/owl#](http://www.w3.org/2002/07/owl#)                |
|pav             |[http://purl.org/pav/](http://purl.org/pav/)                                    |
|prov            |[http://www.w3.org/ns/prov#](http://www.w3.org/ns/prov#)                        |
|rdfs            |[http://www.w3.org/2000/01/rdf-schema#](http://www.w3.org/2000/01/rdf-schema#)  |
|schema          |[https://schema.org/](https://schema.org/)                                      |
|sw              |[http://www.w3.org/2003/06/sw-vocab-status/ns#](http://www.w3.org/2003/06/sw-vocab-status/ns#)|
|skos            |[http://www.w3.org/2004/02/skos/core#](http://www.w3.org/2004/02/skos/core#)      |
|vaem            |[http://www.linkedmodel.org/schema/vaem#](http://www.linkedmodel.org/schema/vaem#)|
|vann            |[http://purl.org/vocab/vann/](http://purl.org/vocab/vann/)                        |
|vcard           |[http://www.w3.org/2006/vcard/ns#](http://www.w3.org/2006/vcard/ns#)              |
|wdrs            |[http://www.w3.org/2007/05/powder-s#](http://www.w3.org/2007/05/powder-s#)        |
|widoco          |[https://w3id.org/widoco/vocab#](https://w3id.org/widoco/vocab#)        |

## Metadata usage in WIDOCO

This section explains the metadata recognized by WIDOCO for both ontology annotations and term annotations.

### <span id="table">Vocabulary annotations</span>

The table below shows which ontology metadata annotations are recognized in WIDOCO in alphabetical order:

|Metadata category|Ontology annotation property*|`config.properties` field(s)**|Good practices document|Accepted property value|Example|
|-----------------|-----------------------------|------------------------------|-----------------------|-----------------------|-------|
|Abstract            |[dce:abstract], [dct:abstract]|abstract        |[Sec 3.2.4] **[OPTIONAL]**|[Text]|[ontology](#onto), [config]|
|Backwards compatible|[owl:backwardCompatibleWith]|backwardCompatibleWith|[Sec 3.3.3] **[OPTIONAL]**|[URI] |[ontology](#onto), [config]|
|Bibliographic citation|[dct:bibliographicCitation], [schema:citation]|citeAs|[Sec 3.6.2] **[OPTIONAL]**|[Text]|[ontology](#onto), [config]|
|Creation date|[dct:created], [schema:dateCreated], [prov:generatedAtTime], [pav:createdOn], [doap:created]|creationDate|[Sec 3.4.2] **[OPTIONAL]**|[Text]|[ontology](#onto), [config]|
|Creators|[dct:creator], [dce:creator], [schema:creator], [pav:createdBy], [pav:authoredBy], [prov:wasAttributedTo], [doap:developer], [foaf:maker]|authors, authorsURI, authorsInstitution, authorsInstitutionURI|[Sec 3.5.1] **[RECOMMENDED]**|[Text] or [Person] or [BNode]|[ontology](#onto), [config]|
|Contributors|[dct:contributor], [dce:contributor], [schema:contributor], [pav:contributedBy], [doap:documenter], [doap:maintainer], [doap:helper], [doap:translator]|contributors, contributorsURI, contributorsInstitution, contributorsInstitutionURI|[Sec 3.5.2] **[RECOMMENDED]**|[Text] or [Person] or [BNode]|[ontology](#onto), [config]|
|Description|[dce:description], [dct:description], [schema:description], [rdfs:comment], [skos:note], [doap:description], [doap:shortdesc]|description|[Sec 3.2.3] **[OPTIONAL]**|[Text]|[ontology](#onto), [config]|
|Diagram |[foaf:image], [foaf:depiction], [schema:image]|diagram         |[Sec 3.8.2] **[OPTIONAL]**|[Text]|[ontology](#onto), [config]|
|DOI     |[bibo:doi]                                    |DOI             |[Sec 3.6.1] **[OPTIONAL]**|[Text]|[ontology](#onto), [config]|
|Extended ontologies| [voaf:extends]                    |extendedOntologyNames, extendedOntologyURIs | [Sec 3.4.6] **[OPTIONAL]**|[URI]|[ontology](#onto), [config]|
|Funders  (org, person)    |[foaf:fundedBy] [schema:funder] |funders             |[Sec 3.5.4] **[OPTIONAL]**|[Text] or [URI]|[ontology](#onto), [config]|
|Funding grants  |[schema:funding]                         |fundingGrant        |[Sec 3.5.5] **[OPTIONAL]**|[Text] or [URI]|[ontology](#onto), [config]|
|Incompatible with|[owl:incompatibleWith]               |incompatibleWith|[Sec 3.3.4] **[OPTIONAL]**|[URI] |[ontology](#onto), [config]|
|Imported ontologies|[owl:imports]                      |importedOntologyNames, importedOntologyURIs|**[RECOMMENDED]** (good practice in ontology engineering) | [URI] |  [ontology](#onto), [config]|
|Issued date      |[dct:issued], [schema:dateIssued]|issued          |[Sec 3.4.4] **[OPTIONAL]**|[Text]|[ontology](#onto), [config]|
|License|[dce:rights], [dct:license], [schema:license], [cc:license], [doap:license]|licenseName, licenseURI, licenseIconURL|[Sec 3.7] **[OPTIONAL]**|[Text] or [URI]|[ontology](#onto), [config]|
|Logo            |[foaf:logo], [schema:logo]     |logo                |[Sec 3.8.1] **[OPTIONAL]**   |[URI] |[ontology](#onto), [config]|
|Name            |[rdfs:label], [mod:acronym], [schema:alternateName], [skos:prefLabel]    |ontologyName        |[Sec 3.2.1] **[RECOMMENDED]**|[Text]|[ontology](#onto), [config]|
|Namespace prefix|[vann:preferredNamespacePrefix]|ontologyPrefix      |[Sec 3.1.2] **[RECOMMENDED]**|[Text]|[ontology](#onto), [config]|
|Namespace URI   |[vann:preferredNamespaceUri]   |ontologyNamespaceURI|[Sec 3.1.1] **[RECOMMENDED]**|[URI] |[ontology](#onto), [config]|
|Modification date|[dct:modified], [schema:dateModified] [pav:lastUpdatedOn] |modified|[Sec 3.4.3] **[OPTIONAL]**   |[Text]|[ontology](#onto), [config]|
|Previous version|[dce:replaces], [dct:replaces], [prov:wasRevisionOf], [pav:previousVersion], [owl:priorVersion]|previousVersionURI|[Sec 3.4.1] **[RECOMMENDED]**|[URI]|[ontology](#onto), [config]|
|Publisher|[dct:publisher], [dce:publisher], [schema:publisher]|publisher, publisherURI, publisherInstitution, publisherInstitutionURI|[Sec 3.5.3] **[OPTIONAL]**|[Text] or [Organization] or [BNode]|[ontology](#onto), [config]|
|Similar resources|[rdfs:seeAlso]            |      |[Sec 3.9] **[OPTIONAL]**  |[Text]                     |[ontology](#onto), [config]|
|Status           |[bibo:status] [mod:status] [schema:creativeWorkStatus]      |status|[Sec 3.2.4] **[OPTIONAL]**|[Text] or [Status](#status)|[ontology](#onto), [config]|
|Source|[dce:source], [dct:source], [prov:hadPrimarySource], [wdrs:describedBy]|source|[Sec 3.4.5] **[OPTIONAL]**   |[URI] |[ontology](#onto), [config]|
|Title |[dce:title], [dct:title], [schema:name]   |ontologyTitle  |[Sec 3.2.2] **[RECOMMENDED]**|[Text]|[ontology](#onto), [config]|
|Version IRI   |[owl:versionIRI]                      |thisVersionURI |[Sec 3.3.1] **[RECOMMENDED]**|[URI] |[ontology](#onto), [config]|
|Version number|[owl:versionInfo], [schema:schemaVersion], [pav:version], [dct:hasVersion]|ontologyRevisionNumber|[Sec 3.3.2] **[RECOMMENDED]**|[Text]|[ontology](#onto), [config]|

**\*** All listed properties are supported by WIDOCO.

**\*\*** Configuration properties do not support [URI](#uri)s or blank nodes. Hence, additional properties are needed (like authorsURI, contributorsURI) to annotate URIs in case they are needed.

### Custom annotations
We prioritize reusing metadata properties defined already. However, a small subset of `OPTIONAL` annotation properties (i.e., `introduction` and the URL to the different serializations) have been introduced by WIDOCO to customize parts of the documentation from the ontology itself:

|Metadata category|Ontology annotation property*|`config.properties` field(s)**|Good practices document|Accepted property value|Example|
|-----------------|-----------------------------|------------------------------|-----------------------|-----------------------|-------|
|Introduction     |[widoco:introduction]        |introduction                     |N/A **[OPTIONAL]**     |[Text]|[ontology](#onto), [config]|
|N-Triples serialization   |[widoco:ntSerialization]     |NTSerialization         |N/A **[OPTIONAL]**     |[URL] |[ontology](#onto), [config]|
|JSON-LD serialization     |[widoco:jsonldSerialization]   |JSONLDSerialization   |N/A **[OPTIONAL]**     |[URL] |[ontology](#onto), [config]|
|RDF-XML serialization     |[widoco:rdfxmlSerialization]   |RDFXMLSerialization   |N/A **[OPTIONAL]**     |[URL] |[ontology](#onto), [config]|
|Turtle serialization      |[widoco:turtleSerialization] |TurtleSerialization     |N/A **[OPTIONAL]**     |[URL] |[ontology](#onto), [config]|

### Term (classes, properties and data properties) annotations

The table below summarizes all the metadata annotations recognized for ontology terms, in alphabetical order. Note that there are no `config.properties` annotations here, as these annotations are only read from the ontology file.

|Metadata category |Ontology annotation property                     |Good practices document    |Accepted property value|Example          |
|------------------|-------------------------------------------------|---------------------------|-----------------------|-----------------|
|Definition        |[rdfs:comment], [skos:definition]                |[Sec 4.2] **[RECOMMENDED]**|[Text]                 |[ontology](#term)|
|Deprecation status|[owl:deprecated]                                 |[Sec 4.5.1] **[OPTIONAL]** |[Boolean]              |[ontology](#term)|
|Editorial note    |[skos:editorialNote]                             |N/A **[OPTIONAL]**         |[Text]                 |[ontology](#term)|
|Example           |[vann:example], [skos:example]                   |[Sec 4.4] **[OPTIONAL]**   |[Text]                 |[ontology](#term)|
|Label             |[rdfs:label], [skos:prefLabel], [obo:IAO_0000118]|[Sec 4.1] **[RECOMMENDED]**|[Text]                 |[ontology](#term)|
|Original source   |[rdfs:isDefinedBy], [dce:source]                 |[Sec 4.3] **[OPTIONAL]**   |[URI]                  |[ontology](#term)|
|Rationale         |[vaem:rationale]                                 |[Sec 4.6] **[OPTIONAL]**   |[Text]                 |[ontology](#term)|
|Status            |[sw:term_status], [obo:IAO_0000114]              |[Sec 4.5.2] **[OPTIONAL]** |[Text]                 |[ontology](#term)|


## <span id="onto">Example: Using ontology annotations (<a href="#table">Back to table</a>)
The following `Turtle` code block shows sample annotations for each of the metadata categories on an ontology with namespace URI `https://w3id.org/example`:

```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix dct: <http://purl.org/dc/terms/> .
@prefix dce: <http://purl.org/dc/elements/1.1/> .
@prefix schema: <https://schema.org/> .
@prefix voaf: <http://purl.org/vocommons/voaf#> .
@prefix vann: <http://purl.org/vocab/vann/> .
@prefix widoco: <https://w3id.org/widoco/vocab#> .
@prefix bibo: <http://purl.org/ontology/bibo/> .

<https://w3id.org/example> rdf:type owl:Ontology ;
    owl:versionIRI <https://w3id.org/example/1.0.1> ;
    dct:abstract "An example vocabulary designed to illustrate how to publish vocabularies on the Web following the FAIR principles"@en ;
    dce:description "This is an example ontology to illustrate some of the annotations that should be included"@en ;
    dce:title "The example ontology"@en ;
    dct:created "February 5th, 2020"@en ;
    dct:creator "Daniel Garijo"@en ,"Maria Poveda-Villalon"@en ;
    dct:license <http://creativecommons.org/licenses/by/2.0/> ;
    vann:preferredNamespacePrefix "exo"@en ;
    vann:preferredNamespaceUri> "https://w3id.org/example" ;
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
    widoco:introduction "A paragraph with the introduction section of the documentation about your resource"@en ;
    widoco:rdfxmlSerialization "https://example.org/serialization/ontology.xml"^^xsd:anyURI ; 
    owl:versionInfo "1.0.1" .
    #If content negotiation is enabled, the widoco:rdfxmlSerialization annotation may not be needed.
```

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
|Affiliation      |[schema:affiliation], [org:memberOf]                        |[Text] or [Organization] or [BNode]|
|Family Name      |[schema:familyName], [vcard:family-name], [foaf:family_name]|[Text]                             |
|Full name        |[rdfs:label], [schema:name], [vcard:fn], [foaf:name]        |[Text]                             |
|Given name       |[schema:givenName], [vcard:given-name], [foaf:givenname]    |[Text]                             |
|Email            |[schema:email], [vcard:hasEmail], [foaf:mbox]               |[Text]                             |
|URL              |[schema:url], [vcard:hasURL], [foaf:homepage]               |[URI]                              |


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

## <span id="config"> Example: Using a configuration file (<a href="#table">Back to table</a>)
Create a `config.properties` file and use the `-confFile` option to invoke Widoco. The metadata is declared with a key=value pair as shown below:

```
abstract=An example ontology
backwardCompatibleWith=https://w3id.org/example/1.0.0
citeAs="add some citattion text here."
creationDate="13 Nov, 2022"
authors=First Author;Second Author
authorsURI=http://example.org/author1;http://example.org/author2
authorsInstitution=First author institution;Second author institution
authorsInstitutionURI=https://www.isi.edu/;https://www.isi.edu/
contributors=First contributor;Second contributor
contributorsURI=http://example.org/contributor1;http://example.org/contributor2
contributorsInstitution=First contributor institution;Second contributor institution
contributorsInstitutionURI=https://isi.edu/;https://isi.edu/
description=A description of what the ontology does goes here
diagram="https://example.org/diagram.svg"
extendedOntologyNames=test1; test2
extendedOntologyURIs=http://example.org/test1; http://example.org/test2
DOI=https://dx.doi.org/SOME/DOI
funder=https://example.org/institution
funding=https://example.org/fundingGrant
incompatibleWith=https://w3id.org/example/0.0.1
importedOntologyNames=Imported Ontology 1; Imported Ontology 2
importedOntologyURIs=http://example.org/test11; http://example.org/test22
introduction=A brief text for the introduction section may be written here.
issued=
licenseURI=http://creativecommons.org/licenses/by/2.0/
licenseName=CC-BY
licenseIconURL=https://i.creativecommons.org/l/by/2.0/88x31.png
logo="https://example.org/logo.svg"
ontologyName=The Cohort Ontology
ontologyPrefix=exo
modified="15 April, 2023"
ontologyNamespaceURI=https://w3id.org/example
previousVersionURI=https://w3id.org/example/1.0.0
publisher=
publisherURI=
publisherInstitution=
publisherInstitutionURI=
ontologyTitle=The Example Ontology
thisVersionURI=https://w3id.org/example/1.0.1
ontologyRevisionNumber=v1.0.0
status=Ontology Specification Draft
RDFXMLSerialization=ontology.xml
TurtleSerialization=ontology.ttl
NTSerialization=ontology.nt
JSONLDSerialization=ontology.nt
```

## Glossary (<a href="#table">Back to table</a>)

<span id="text">**Text**:</span> A literal written in a textual manner.

<span id="uri">**URI**:</span> A URL that describes the target resource.

<span id="boolean">**Boolean**:</span> True or False.

<span id="status">**Status**:</span> Status of a term, or the ontology document. For terms, known statuses are: `unstable`, `testing`, `stable` and `archaic` (see the [W3C sw-vocab](https://www.w3.org/2003/06/sw-vocab-status/ns#) for reference).

<span id="person">**Person**:</span> Entity used to refer to people in general.

<span id="organization">**Organization**:</span> Entity used to represent an insitution or company. Typically used as the range of the `publisher` metadata property.

<span id="bnode">**BNode**:</span> Blank node, used to refer to an entity without assigning an URI to that entity.

[Text]:         #text
[URI]:          #uri
[Boolean]:      #boolean
[Status]:       #status
[Person]:       #person
[Organization]: #organization
[BNode]:        #bnode
[config]:       #config
[Sec 3.1.1]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#namespaceURI
[Sec 3.1.2]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#prefix
[Sec 3.2.1]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#title
[Sec 3.2.2]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#description
[Sec 3.2.3]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#abs
[Sec 3.2.4]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#status
[Sec 3.3.1]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#versionIRI
[Sec 3.3.2]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#versionInfo
[Sec 3.3.3]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#backwardCompatibility
[Sec 3.3.4]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#incompatibility
[Sec 3.4.1]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#previousVersion
[Sec 3.4.2]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#creationDate
[Sec 3.4.3]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#modificationDate
[Sec 3.4.4]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#issuedDate
[Sec 3.4.5]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#source
[Sec 3.4.6]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#extended
[Sec 3.5.1]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#creators
[Sec 3.5.2]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#contributors
[Sec 3.5.3]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#publisher
[Sec 3.5.4]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#funder
[Sec 3.5.5]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#funding
[Sec 3.6.1]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#doi
[Sec 3.6.2]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#biblio
[Sec 3.7]:   https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#lic
[Sec 3.8.1]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#logo
[Sec 3.8.2]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#diagram
[Sec 3.9]:   https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#similar
[Sec 4.1]:   https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#label
[Sec 4.2]:   https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#def
[Sec 4.3]:   https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#osource
[Sec 4.4]:   https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#deprecation
[Sec 4.5.1]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#deprecation
[Sec 4.5.2]: https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#status1
[Sec 4.6]:   https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#rationale
[bibo:doi]:                      http://purl.org/ontology/bibo/doi
[bibo:status]:                   http://purl.org/ontology/bibo/status
[cc:license]:                    http://creativecommons.org/ns#
[dce:abstract]:                  http://purl.org/dc/elements/1.1/abstract
[dce:contributor]:               http://purl.org/dc/elements/1.1/contributor
[dce:creator]:                   http://purl.org/dc/elements/1.1/creator
[dce:description]:               http://purl.org/dc/elements/1.1/description
[dce:publisher]:                 http://purl.org/dc/elements/1.1/publisher
[dce:replaces]:                  http://purl.org/dc/elements/1.1/replaces
[dce:rights]:                    http://purl.org/dc/elements/1.1/rights
[dce:source]:                    http://purl.org/dc/elements/1.1/source
[dce:title]:                     http://purl.org/dc/elements/1.1/title
[dct:abstract]:              http://purl.org/dc/terms/abstract
[dct:bibliographicCitation]: http://purl.org/dc/terms/bibliographicCitation
[dct:contributor]:           http://purl.org/dc/terms/contributor
[dct:created]:               http://purl.org/dc/terms/created
[dct:creator]:               http://purl.org/dc/terms/creator
[dct:description]:           http://purl.org/dc/terms/description
[dct:hasVersion]:            http://purl.org/dc/terms/hasVersion
[dct:issued]:                http://purl.org/dc/terms/issued
[dct:license]:               http://purl.org/dc/terms/license
[dct:modified]:              http://purl.org/dc/terms/modified
[dct:publisher]:             http://purl.org/dc/terms/publisher
[dct:replaces]:              http://purl.org/dc/terms/replaces
[dct:source]:                http://purl.org/dc/terms/source
[dct:title]:                 http://purl.org/dc/terms/title
[doap:created]:                  http://usefulinc.com/ns/doap#
[doap:description]:              http://usefulinc.com/ns/doap#description
[doap:developer]:                http://usefulinc.com/ns/doap#developer
[doap:documenter]:               http://usefulinc.com/ns/doap#documenter
[doap:helper]:                   http://usefulinc.com/ns/doap#helper
[doap:license]:                  http://usefulinc.com/ns/doap#license
[doap:maintainer]:               http://usefulinc.com/ns/doap#maintainer
[doap:shortdesc]:                http://usefulinc.com/ns/doap#shortdesc
[doap:translator]:               http://usefulinc.com/ns/doap#translator
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
