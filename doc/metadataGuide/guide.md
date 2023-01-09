# Metadata usage in WIDOCO
There are two ways to make WIDOCO aware of the metadata of your ontology: 

* Add metadata annotations in your ontology. This makes ontology maintenance easier when you publish new versions, as metadata is included in the ontology. In our [best practice document](https://w3id.org/widoco/bestPractices) we show which properties you should add in your ontology for this purpose. This is the **recommended option**.
* Declare a `.properties` file: Key value pair where all the metadata is specified. Since it's a specific file, it has to be maintained separately from the ontology.

In this document we illustrate how Widoco uses metadata in the final documentation of your ontology, using both options specified above.

## Namespaces used in this document

| Namespace prefix | URI |
|---|---|
| bibo | [http://purl.org/ontology/bibo/](http://purl.org/ontology/bibo/) |
| cc | [http://creativecommons.org/ns#](http://creativecommons.org/ns#) |
| dc | [http://purl.org/dc/elements/1.1/](http://purl.org/dc/elements/1.1/) |
| dcterms | [http://purl.org/dc/terms/](http://purl.org/dc/terms/) |
|doap|[http://usefulinc.com/ns/doap#](http://usefulinc.com/ns/doap#)|
| foaf | [http://xmlns.com/foaf/0.1/](http://xmlns.com/foaf/0.1/) |
| obo | [http://purl.obolibrary.org/obo/](http://purl.obolibrary.org/obo/) |
| org | [http://www.w3.org/ns/org#](http://www.w3.org/ns/org#) |
| owl | [http://www.w3.org/2002/07/owl#](http://www.w3.org/2002/07/owl#) |
| pav | [http://purl.org/pav/](http://purl.org/pav/) |
| prov | [http://www.w3.org/ns/prov#](http://www.w3.org/ns/prov#) |
| rdfs | [http://www.w3.org/2000/01/rdf-schema#](http://www.w3.org/2000/01/rdf-schema#) |
| schema | [https://schema.org/](https://schema.org/) |
| sw | [http://www.w3.org/2003/06/sw-vocab-status/ns#](http://www.w3.org/2003/06/sw-vocab-status/ns#) |
| skos | [http://www.w3.org/2004/02/skos/core#](http://www.w3.org/2004/02/skos/core#) |
| vaem | [http://www.linkedmodel.org/schema/vaem#](http://www.linkedmodel.org/schema/vaem#) |
| vann | [http://purl.org/vocab/vann/](http://purl.org/vocab/vann/) |
| vcard | [http://www.w3.org/2006/vcard/ns#](http://www.w3.org/2006/vcard/ns#)

## Metadata usage in WIDOCO

This section explains the metadata recognized by WIDOCO for both ontology annotations and term annotations.

### <span id="table">Vocabulary annotations</span>

The table below shows which ontology metadata annotations are recognized in WIDOCO in alphabetical order:

| Metadata category | Ontology annotation property* | `config.properties` field(s)** | Good practices document | Accepted property value | Example |
| -- | -- | -- | -- | -- | -- |
| Abstract                           | [dc:abstract](http://purl.org/dc/elements/1.1/abstract), [dcterms:abstract](http://purl.org/dc/terms/abstract)| abstract                    | [Sec 3.2.3](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#abstract) **[OPTIONAL]**| [Text](#text) | [ontology](#onto), [config](#config) |
| Backwards compatible                          | [owl:backwardCompatibleWith](http://www.w3.org/2002/07/owl#backwardCompatibleWith) | backwardCompatibleWith                   | [Sec 3.3.3](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#backwardCompatibility) **[OPTIONAL]**| [URI](#uri) | [ontology](#onto), [config](#config)|
| Bibliographic citation                          | [dcterms:bibliographicCitation](http://purl.org/dc/terms/bibliographicCitation), [schema:citation](https://schema.org/citation) | citeAs                   | [Sec 3.6.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#biblio) **[OPTIONAL]**| [Text](#text) | [ontology](#onto), [config](#config)|
| Creation date                          | [dcterms:created](http://purl.org/dc/terms/created), [schema:dateCreated](https://schema.org/dateCreated), [prov:generatedAtTime](http://www.w3.org/ns/prov#generatedAtTime), [pav:createdOn](http://purl.org/pav/createdOn), [doap:created](http://usefulinc.com/ns/doap#) | creationDate                    | [Sec 3.4.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#creationDate) **[OPTIONAL]**| [Text](#text) | [ontology](#onto), [config](#config)|
| Creators            | [dcterms:creator](http://purl.org/dc/terms/creator), [dc:creator](http://purl.org/dc/elements/1.1/creator), [schema:creator](https://schema.org/creator), [pav:createdBy](http://purl.org/pav/createdBy), [pav:authoredBy](http://purl.org/pav/authoredBy), [prov:wasAttributedTo](http://www.w3.org/ns/prov#wasAttributedTo), [doap:developer](http://usefulinc.com/ns/doap#developer), [foaf:maker](http://xmlns.com/foaf/0.1/maker) | authors, authorsURI, authorsInstitution, authorsInstitutionURI                    | [Sec 3.5.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#creators) **[RECOMMENDED]**| [Text](#text) or [Person](#person) or [BNode](#bnode) | [ontology](#onto), [config](#config)|
| Contributors            | [dcterms:contributor](http://purl.org/dc/terms/contributor), [dc:contributor](http://purl.org/dc/elements/1.1/contributor), [schema:contributor](https://schema.org/contributor), [pav:contributedBy](http://purl.org/pav/contributedBy), [doap:documenter](http://usefulinc.com/ns/doap#documenter),[doap:maintainer](http://usefulinc.com/ns/doap#maintainer),  [doap:helper](http://usefulinc.com/ns/doap#helper), [doap:translator](http://usefulinc.com/ns/doap#translator) | contributors, contributorsURI, contributorsInstitution, contributorsInstitutionURI                    | [Sec 3.5.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#contributors) **[RECOMMENDED]**| [Text](#text) or [Person](#person) or [BNode](#bnode)| [ontology](#onto), [config](#config)|
| Description                          | [dc:description](http://purl.org/dc/elements/1.1/description), [dcterms:description](http://purl.org/dc/terms/description), [schema:description](https://schema.org/description), [rdfs:comment](http://www.w3.org/2000/01/rdf-schema#comment), [skos:note](http://www.w3.org/2004/02/skos/core#note), [doap:description](http://usefulinc.com/ns/doap#description), [doap:shortdesc](http://usefulinc.com/ns/doap#shortdesc)| description                    | [Sec 3.2.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#description) **[OPTIONAL]**| [Text](#text) | [ontology](#onto), [config](#config) |
| Diagram                          | [foaf:image](http://xmlns.com/foaf/0.1/image), [foaf:depiction](http://xmlns.com/foaf/0.1/depiction), [schema:image](https://schema.org/image) | diagram                    | [Sec 3.6.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#diagram) **[OPTIONAL]**| [Text](#text) | [ontology](#onto), [config](#config)|
| DOI                          | [bibo:doi](http://purl.org/ontology/bibo/doi) | DOI                    | [Sec 3.6.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#doi) **[OPTIONAL]**| [Text](#text) | [ontology](#onto), [config](#config)|
| Incompatible with                          | [owl:incompatibleWith](http://www.w3.org/2002/07/owl#incompatibleWith) | incompatibleWith                    | [Sec 3.3.4](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#incompatibility) **[OPTIONAL]**| [URI](#uri) | [ontology](#onto), [config](#config)|
| Issued date                          | [dcterms:issued](http://purl.org/dc/terms/issued), [schema:dateIssued](https://schema.org/dateIssued) | issued                    | [Sec 3.4.4](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#issuedDate) **[OPTIONAL]**| [Text](#text) | [ontology](#onto), [config](#config)|
| License                          | [dc:rights](http://purl.org/dc/elements/1.1/rights), [dcterms:license](http://purl.org/dc/terms/license), [schema:license](https://schema.org/license), [cc:license](http://creativecommons.org/ns#), [doap:license](http://usefulinc.com/ns/doap#license) | licenseName, licenseURI, licenseIconURL                    | [Sec 3.7](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#license) **[OPTIONAL]**| [Text](#text) or [URI](#uri) | [ontology](#onto), [config](#config)|
| Logo                          | [foaf:logo](http://xmlns.com/foaf/0.1/logo), [schema:logo](https://schema.org/logo) | logo                    | [Sec 3.6.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#logo) **[OPTIONAL]**| [URI](#uri) | [ontology](#onto), [config](#config)|
| Name | [rdfs:label](http://www.w3.org/2000/01/rdf-schema#label), [vann:namespacePrefix](http://purl.org/vocab/vann/preferredNamespacePrefix) | ontologyName | [Sec 3.1.3](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#name) **[RECOMMENDED]** | [Text](#text) | [ontology](#onto), [config](#config) |
| Namespace prefix | [vann:namespacePrefix](http://purl.org/vocab/vann/preferredNamespacePrefix) | ontologyPrefix | [Sec 3.1.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#prefix) **[RECOMMENDED]** | [Text](#text) | [ontology](#onto), [config](#config) |
| Namespace URI | [vann:namespaceURI](http://purl.org/vocab/vann/preferredNamespaceURI) | ontologyNamespaceURI | [Sec 3.1.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#namespaceURI) **[RECOMMENDED]** | [URI](#uri) | [ontology](#onto), [config](#config) |
| Modification date                          | [dcterms:modified](http://purl.org/dc/terms/modified), [schema:dateModified](https://schema.org/dateModified) | modified                    | [Sec 3.3.4](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#modificationDate) **[OPTIONAL]**| [Text](#text) | [ontology](#onto), [config](#config)|
| Previous version                          | [dc:replaces](http://purl.org/dc/elements/1.1/replaces), [dcterms:replaces](http://purl.org/dc/terms/replaces), [prov:wasRevisionOf](http://www.w3.org/ns/prov#wasRevisionOf), [pav:previousVersion](http://purl.org/pav/previousVersion), [owl:priorVersion](http://www.w3.org/2002/07/owl#priorVersion)              | previousVersionURI                    | [Sec 3.4.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#previousVersion) **[RECOMMENDED]**| [URI](#uri) | [ontology](#onto), [config](#config)|
| Publisher            | [dcterms:publisher](http://purl.org/dc/terms/issued), [dc:publisher](http://purl.org/dc/elements/1.1/publisher), [schema:publisher](https://schema.org/publisher) | publisher, publisherURI, publisherInstitution, publisherInstitutionURI                    | [Sec 3.5.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#publisher) **[OPTIONAL]**| [Text](#text) or [Organization](#organization) or [BNode](#bnode)| [ontology](#onto), [config](#config)|
| Status                          | [bibo:status](http://purl.org/ontology/bibo/status) | status                    | [Sec 3.2.4](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#status) **[OPTIONAL]**| [Text](#text) or [Status](#status) | [ontology](#onto), [config](#config)|
| Source                          | [dc:source](http://purl.org/dc/elements/1.1/source), [dcterms:source](http://purl.org/dc/terms/source), [prov:hadPrimarySource](http://www.w3.org/ns/prov#hadPrimarySource) | source                    | [Sec 3.4.5](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#source) **[OPTIONAL]**| [URL](#url) | [ontology](#onto), [config](#config)|
| Title                          | [dc:title](http://purl.org/dc/elements/1.1/title), [dcterms:title](http://purl.org/dc/terms/title), [schema:name](https://schema.org/name)              | ontologyTitle                    | [Sec 3.2.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#title) **[RECOMMENDED]** | [Text](#text) | [ontology](#onto), [config](#config)|
| Version IRI                          | [owl:versionIRI](http://www.w3.org/2002/07/owl#versionIRI) | thisVersionURI                    | [Sec 3.3.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#versionIRI) **[RECOMMENDED]** | [URI](#uri) | [ontology](#onto), [config](#config)|
| Version number                          | [owl:versionInfo](http://www.w3.org/2002/07/owl#versionInfo), [schema:schemaVersion](https://schema.org/schemaVersion) | ontologyRevisionNumber                    | [Sec 3.3.2](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#versionInfo) **[RECOMMENDED]**| [Text](#text) | [ontology](#onto), [config](#config)|


**\*** All listed properties are supported by WIDOCO.

**\*\*** Configuration properties do not support [URI](#uri)s or blank nodes. Hence, additional properties are needed (like authorsURI, contributorsURI) to annotate URIs in case they are needed. 

### Term (classes, properties and data properties) annotations

The table below summarizes all the metadata annotations recognized for ontology terms, in alphabetical order. Note that there are no `config.properties` annotations here, as these annotations are only read from the ontology file.

| Metadata category | Ontology annotation property | Good practices document | Accepted property value | Example |
| -- | -- | -- | -- | -- |
| Definition | [rdfs:comment](http://www.w3.org/2000/01/rdf-schema#comment), [skos:definition](http://www.w3.org/2004/02/skos/core#definition) | [Sec 4.2](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#def) **[RECOMMENDED]**| [Text](#text) | [ontology](#term)|
| Deprecation status | [owl:deprecated](http://www.w3.org/2002/07/owl#deprecated) | [Sec 4.5.1](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#deprecation) **[OPTIONAL]**| [Boolean](#boolean) | [ontology](#term)|
| Example | [vann:example](http://purl.org/vocab/vann/example), [skos:example](http://www.w3.org/2004/02/skos/core#example) | [Sec 4.4](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#deprecation) **[OPTIONAL]**| [Text](#text) | [ontology](#term)|
| Label | [rdfs:label](http://www.w3.org/2000/01/rdf-schema#label), [skos:prefLabel](http://www.w3.org/2004/02/skos/core#prefLabel), [obo:IAO_0000118](http://purl.obolibrary.org/obo/IAO_0000118) | [Sec 4.1](http://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#label) **[RECOMMENDED]** | [Text](#text) | [ontology](#term) |
| Original source | [rdfs:isDefinedBy](http://www.w3.org/2000/01/rdf-schema#isDefinedby), [dc:source](http://purl.org/dc/elements/1.1/source) | [Sec 4.3](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#osource) **[OPTIONAL]**| [URI](#uri) | [ontology](#term)|
| Rationale | [vaem:rationale](http://www.linkedmodel.org/schema/vaem#rationale) | [Sec 4.6](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#rationale) **[OPTIONAL]**| [Text](#text) | [ontology](#term)|
| Status | [sw:term_status](http://www.w3.org/2003/06/sw-vocab-status/ns#), [obo:IAO_0000114](http://purl.obolibrary.org/obo/IAO_0000114) | [Sec 4.5.2](https://dgarijo.github.io/Widoco/doc/bestPractices/index-en.html#status1) **[OPTIONAL]**| [Text](#text) | [ontology](#term)|


## <span id="onto">Example: Using ontology annotations (<a href="#table">Back to table</a>)
The following `Turtle` code block shows sample annotations for each of the metadata categories on an ontology with namespace URI `https://w3id.org/example`:

```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xml: <http://www.w3.org/XML/1998/namespace> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix dc: <http://purl.org/dc/terms/> .
@prefix dce: <http://purl.org/dc/elements/1.1/> .
@prefix schema: <https://schema.org/> .
@prefix vann: <http://www.w3.org/2001/XMLSchema#> .

<https://w3id.org/example> rdf:type owl:Ontology ;
    owl:versionIRI <https://w3id.org/example/1.0.1> ;
    dc:abstract "An example vocabulary designed to illustrate how to publish vocabularies on the Web following the FAIR principles"@en ;
    dce:description "This is an example ontology to illustrate some of the annotations that should be included"@en ;
    dce:title "The example ontology"@en ;
    dc:created "February 5th, 2020"@en ;
    dc:creator "Daniel Garijo"@en ,"Maria Poveda-Villalon"@en ;
    dc:license <http://creativecommons.org/licenses/by/2.0/> ;
    vann:preferredNamespacePrefix "exo"@en ;
    vann:preferredNamespaceUri> "https://w3id.org/example" ;
    schema:citation "Cite this vocabulary as: Garijo, D. and Poveda-Villalon, M. The example ontology 1.0.1."@en ;
    rdfs:comment "An example vocabulary designed to illustrate how to publish vocabularies on the Web following the FAIR principles. This vocabulary describes three simple classes with 3 properties and a data property."@en ;
    owl:backwardCompatibleWith <https://w3id.org/example/1.0.0> ;
    owl:priorVersion <https://w3id.org/example/1.0.0> ;
    owl:versionInfo "1.0.1"@en .
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
        schema:name: "Daniel Garijo"
    ] ,[
        a schema:Person;
        schema:name: "María Poveda"
    ] .
```
Widoco will recognize the following properties when describing agents (persons or organizations):

| Metadata category | Ontology annotation property |  Accepted property value | 
| -- | -- | -- | 
| Affiliation | [schema:affiliation](https://schema.org/affiliation), [org:memberOf](http://www.w3.org/ns/org#memberOf) | [Text](#text) or [Organization](#organization) or [BNode](#bnode)| [ontology](#onto), [config](#config)
| Family Name | [schema:familyName](https://schema.org/familyName), [vcard:family-name](http://www.w3.org/2006/vcard/ns#family-name), [foaf:family_name](http://xmlns.com/foaf/0.1/family_name) | [Text](#text) 
| Full name | [rdfs:label](http://www.w3.org/2000/01/rdf-schema#label), [schema:name](https://schema.org/name), [vcard:fn](http://www.w3.org/2006/vcard/ns#fn), [foaf:name](http://xmlns.com/foaf/0.1/name) | [Text](#text)
| Given name | [schema:givenName](https://schema.org/givenName), [vcard:given-name](http://www.w3.org/2006/vcard/ns#given-name), [foaf:givenname](http://xmlns.com/foaf/0.1/givenname) | [Text](#text) 
| Email | [schema:email](https://schema.org/email), [vcard:hasEmail](http://www.w3.org/2006/vcard/ns#hasEmail), [foaf:mbox](http://xmlns.com/foaf/0.1/mbox) | [Text](#text)  
| URL | [schema:url](https://schema.org/url), [vcard:hasURL](http://www.w3.org/2006/vcard/ns#hasURL), [foaf:homepage](http://xmlns.com/foaf/0.1/homepage) | [URL](#url) 
 

### <span id="term">Annotating ontology terms:
For status, the known values are: `unstable`, `testing`, `stable` and `archaic`
```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix vann: <http://www.w3.org/2001/XMLSchema#> .
@prefix : <https://w3id.org/example#> .

:Researcher rdf:type owl:Class ;
            vann:example "University of Southern California."@en ;
            vaem:rationale "The concept Researcher was added to the ontology to represent those authors of scientific publications that belong to a public institution."@en ;
            rdfs:comment "A researcher is a person who publishes scientific papers, writes research proposals and mentors students"@en ;
            sw:status "unstable";
            rdfs:isDefinedBy <https://w3id.org/example#>
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
description="A description of what the ontology does goes here"
diagram="https://example.org/diagram.svg"
DOI=
incompatibleWith=""
issued=""
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
```

## Glossary (<a href="#table">Back to table</a>)

<span id="text">**Text**:</span> A literal written in a textual manner

<span id="uri">**URI**:</span> A URL that describes the target resource

<span id="boolean">**Boolean**:</span> True or False.

<span id="status">**Status**:</span> Status of a term, or the ontology document. For terms, known status are: `unstable`, `testing`, `stable` and `archaic` (see the [W3C sw-vocab](https://www.w3.org/2003/06/sw-vocab-status/ns#) for reference)

<span id="person">**Person**:</span> Entity used to refer to people in general

<span id="organization">**Organization**:</span> Entity used to represent an insitution or company. Typically used as the range of the `publisher` metadata property.

<span id="bnode">**BNode**:</span> Blank node, used to refer to an entity without assigning an URI to that entity.
