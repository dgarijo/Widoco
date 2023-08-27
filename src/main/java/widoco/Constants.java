/*
 *  Copyright 2012-2013 Ontology Engineering Group, Universidad Politecnica de Madrid, Spain

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
package widoco;

import diff.CompareOntologies;
import diff.OntologyDifferencesRenderer;
import java.io.File;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import widoco.entities.Agent;
import widoco.entities.Ontology;

/**
 *
 * @author Daniel Garijo
 */
public class Constants {

	private static final Logger logger = LoggerFactory.getLogger(Constants.class);

	// constants for the Licensius service
	public static final String LICENSUS_URI_SERVICE_LICENSE = "http://www.licensius.appspot.com/api/license/findlicenseinrdf?uri=";//http://www.licensius.com/api/license/findlicenseinrdf?uri=";// "http://licensius.appspot.com/getLicense?content=";
	public static final String LICENSIUS_URI_SEVICE_LICENSE_INFO = "http://www.licensius.appspot.com/api/license/getlicenseinfo?uri=";// "http://licensius.appspot.com/getLicenseTitle?content=";
	public static final int LICENSIUS_TIME_OUT = 10000;

	public static final int OOPS_TIME_OUT = 10000;
        public static final String OOPS_SERVICE_URL = "https://oops.linkeddata.es/rest";
        public static final String OOPS_NS = "http://oops.linkeddata.es/def#";

	public static final String[] POSSIBLE_VOCAB_SERIALIZATIONS = { "application/rdf+xml", "text/turtle", "text/n3",
			"application/ld+json" };

	// this is left because in the json-ld schema there must be an image url.
	public static final String WEBVOWL_SERVICE = "http://vowl.visualdataweb.org/webvowl/#iri=";

	/**
	 * Constants for loading metadata properties from the ontology
	 */

	public static final String NS_RDFS = "http://www.w3.org/2000/01/rdf-schema#";
	public static final String NS_SCHEMA_HTTPS = "https://schema.org/";
	public static final String NS_SCHEMA_HTTP = "http://schema.org/";
	public static final String NS_DC = "http://purl.org/dc/elements/1.1/";
	public static final String NS_DCTERMS = "http://purl.org/dc/terms/";
	public static final String NS_OWL = "http://www.w3.org/2002/07/owl#";
	public static final String NS_VANN = "http://purl.org/vocab/vann/";
	// public static final String NS_VAEM =
	// "http://www.linkedmodel.org/schema/vaem#";
	public static final String NS_PROV = "http://www.w3.org/ns/prov#";
	public static final String NS_BIBO = "http://purl.org/ontology/bibo/";
	public static final String NS_SKOS = "http://www.w3.org/2004/02/skos/core#";
	public static final String NS_PAV = "http://purl.org/pav/";
	public static final String NS_VCARD = "http://www.w3.org/2006/vcard/ns#";
	public static final String NS_VCARD_OLD = "http://www.w3.org/2001/vcard-rdf/3.0#";
	public static final String NS_FOAF = "http://xmlns.com/foaf/0.1/";
	public static final String NS_ORG = "http://www.w3.org/ns/org#";
	public static final String NS_MOD = "https://w3id.org/mod#";
	public static final String NS_VOAF = "http://purl.org/vocommons/voaf#";
	public static final String NS_WDRS = "http://www.w3.org/2007/05/powder-s#";
	public static final String NS_WIDOCO = "https://w3id.org/widoco/vocab#";

	public static final String PROP_RDFS_LABEL = NS_RDFS + "label";
	public static final String PROP_RDFS_COMMENT = NS_RDFS + "comment";
	public static final String PROP_RDFS_SEE_ALSO = NS_RDFS + "seeAlso";

	public static final String PROP_SCHEMA_NAME_HTTP = NS_SCHEMA_HTTP + "name";
	public static final String PROP_SCHEMA_NAME_HTTPS = NS_SCHEMA_HTTPS + "name";
	public static final String PROP_SCHEMA_ALTERNATE_NAME_HTTP = NS_SCHEMA_HTTP + "alternateName";
	public static final String PROP_SCHEMA_ALTERNATE_NAME_HTTPS = NS_SCHEMA_HTTPS + "alternateName";

	public static final String PROP_SCHEMA_CREATOR_HTTP = NS_SCHEMA_HTTP + "creator";
	public static final String PROP_SCHEMA_CREATOR_HTTPS = NS_SCHEMA_HTTPS + "creator";
	public static final String PROP_SCHEMA_LICENSE_HTTP = NS_SCHEMA_HTTP + "license";
	public static final String PROP_SCHEMA_LICENSE_HTTPS = NS_SCHEMA_HTTPS + "license";
	public static final String PROP_SCHEMA_CONTRIBUTOR_HTTP = NS_SCHEMA_HTTP + "contributor";
	public static final String PROP_SCHEMA_CONTRIBUTOR_HTTPS = NS_SCHEMA_HTTPS + "contributor";
	public static final String PROP_SCHEMA_DESCRIPTION_HTTP = NS_SCHEMA_HTTP + "description";
	public static final String PROP_SCHEMA_DESCRIPTION_HTTPS = NS_SCHEMA_HTTPS + "description";
	public static final String PROP_SCHEMA_CITATION_HTTP = NS_SCHEMA_HTTP + "citation";
	public static final String PROP_SCHEMA_CITATION_HTTPS = NS_SCHEMA_HTTPS + "citation";
	public static final String PROP_SCHEMA_DATE_CREATED_HTTP = NS_SCHEMA_HTTP + "dateCreated";
	public static final String PROP_SCHEMA_DATE_CREATED_HTTPS = NS_SCHEMA_HTTPS + "dateCreated";
	public static final String PROP_SCHEMA_DATE_MODIFIED_HTTP = NS_SCHEMA_HTTP + "dateModified";
	public static final String PROP_SCHEMA_DATE_MODIFIED_HTTPS = NS_SCHEMA_HTTPS + "dateModified";
	public static final String PROP_SCHEMA_PUBLISHER_HTTP = NS_SCHEMA_HTTP + "publisher";
	public static final String PROP_SCHEMA_PUBLISHER_HTTPS = NS_SCHEMA_HTTPS + "publisher";
	public static final String PROP_SCHEMA_FUNDER_HTTP = NS_SCHEMA_HTTP + "funder";
	public static final String PROP_SCHEMA_FUNDER_HTTPS = NS_SCHEMA_HTTPS + "funder";
	public static final String PROP_SCHEMA_FUNDING_HTTP = NS_SCHEMA_HTTP + "funding";
	public static final String PROP_SCHEMA_FUNDING_HTTPS = NS_SCHEMA_HTTPS + "funding";
	public static final String PROP_SCHEMA_SCHEMA_VERSION_HTTP = NS_SCHEMA_HTTP + "schemaVersion";
	public static final String PROP_SCHEMA_SCHEMA_VERSION_HTTPS = NS_SCHEMA_HTTPS + "schemaVersion";
	public static final String PROP_SCHEMA_GIVEN_NAME_HTTP = NS_SCHEMA_HTTP + "givenName";
	public static final String PROP_SCHEMA_GIVEN_NAME_HTTPS = NS_SCHEMA_HTTPS + "givenName";
	public static final String PROP_SCHEMA_FAMILY_NAME_HTTP = NS_SCHEMA_HTTP + "familyName";
	public static final String PROP_SCHEMA_FAMILY_NAME_HTTPS = NS_SCHEMA_HTTPS + "familyName";
	public static final String PROP_SCHEMA_URL_HTTP = NS_SCHEMA_HTTP + "url";
	public static final String PROP_SCHEMA_URL_HTTPS = NS_SCHEMA_HTTPS + "url";
	public static final String PROP_SCHEMA_EMAIL_HTTP = NS_SCHEMA_HTTP + "email";
	public static final String PROP_SCHEMA_EMAIL_HTTPS = NS_SCHEMA_HTTPS + "email";
	public static final String PROP_SCHEMA_AFFILIATION_HTTP = NS_SCHEMA_HTTP + "affiliation";
	public static final String PROP_SCHEMA_AFFILIATION_HTTPS = NS_SCHEMA_HTTPS + "affiliation";
	public static final String PROP_SCHEMA_IMAGE_HTTP = NS_SCHEMA_HTTP + "image";
	public static final String PROP_SCHEMA_IMAGE_HTTPS = NS_SCHEMA_HTTPS + "image";
	public static final String PROP_SCHEMA_DATE_ISSUED_HTTP = NS_SCHEMA_HTTP + "dateIssued";
	public static final String PROP_SCHEMA_DATE_ISSUED_HTTPS = NS_SCHEMA_HTTPS + "dateIssued";
	public static final String PROP_SCHEMA_LOGO_HTTP = NS_SCHEMA_HTTP + "logo";
	public static final String PROP_SCHEMA_LOGO_HTTPS = NS_SCHEMA_HTTPS + "logo";
	public static final String PROP_SCHEMA_STATUS_HTTP = NS_SCHEMA_HTTP + "creativeWorkStatus";
	public static final String PROP_SCHEMA_STATUS_HTTPS = NS_SCHEMA_HTTPS + "creativeWorkStatus";

	public static final String PROP_OWL_VERSION_INFO = NS_OWL + "versionInfo";
	public static final String PROP_OWL_PRIOR_VERSION = NS_OWL + "priorVersion";
	public static final String PROP_OWL_BACKWARDS_COMPATIBLE = NS_OWL + "backwardCompatibleWith";
    public static final String PROP_OWL_INCOMPATIBLE = NS_OWL + "incompatibleWith";

	public static final String PROP_DC_TITLE = NS_DC + "title";
	public static final String PROP_DC_RIGHTS = NS_DC + "rights";
	public static final String PROP_DC_ABSTRACT = NS_DC + "abstract";
	public static final String PROP_DC_DESCRIPTION = NS_DC + "description";
	public static final String PROP_DC_CREATOR = NS_DC + "creator";
	public static final String PROP_DC_REPLACES = NS_DC + "replaces";
	public static final String PROP_DC_CONTRIBUTOR = NS_DC + "contributor";
	public static final String PROP_DC_PUBLISHER = NS_DC + "publisher";
	public static final String PROP_DC_SOURCE = NS_DC + "source";

	public static final String PROP_DCTERMS_REPLACES = NS_DCTERMS + "replaces";
	public static final String PROP_DCTERMS_DESCRIPTION = NS_DCTERMS + "description";
	public static final String PROP_DCTERMS_LICENSE = NS_DCTERMS + "license";
	public static final String PROP_DCTERMS_TITLE = NS_DCTERMS + "title";
	public static final String PROP_DCTERMS_ABSTRACT = NS_DCTERMS + "abstract";
	public static final String PROP_DCTERMS_CREATOR = NS_DCTERMS + "creator";
	public static final String PROP_DCTERMS_CONTRIBUTOR = NS_DCTERMS + "contributor";
	public static final String PROP_DCTERMS_PUBLISHER = NS_DCTERMS + "publisher";
	public static final String PROP_DCTERMS_CREATED = NS_DCTERMS + "created";
	public static final String PROP_DCTERMS_MODIFIED = NS_DCTERMS + "modified";
	public static final String PROP_DCTERMS_ISSUED = NS_DCTERMS + "issued";
	public static final String PROP_DCTERMS_BIBLIOGRAPHIC_CIT = NS_DCTERMS + "bibliographicCitation";
	public static final String PROP_DCTERMS_HAS_VERSION = NS_DCTERMS + "hasVersion";
	public static final String PROP_DCTERMS_SOURCE = NS_DCTERMS + "source";

	public static final String PROP_BIBO_DOI = NS_BIBO + "doi";
	public static final String PROP_BIBO_STATUS = NS_BIBO + "status";

	public static final String PROP_PROV_WAS_REVISION_OF = NS_PROV + "wasRevisionOf";
	public static final String PROP_PROV_GENERATED_AT_TIME = NS_PROV + "generatedAtTime";
	public static final String PROP_PROV_ATTRIBUTED_TO = NS_PROV + "wasAttributedTo";
	public static final String PROP_PROV_HAD_PRIMARY_SOURCE = NS_PROV + "hadPrimarySource";

	public static final String PROP_VANN_PREFIX = NS_VANN + "preferredNamespacePrefix";
	public static final String PROP_VANN_URI = NS_VANN + "preferredNamespaceUri";

	public static final String PROP_SKOS_NOTE = NS_SKOS + "note";
	public static final String PROP_SKOS_PREF_LABEL = NS_SKOS + "prefLabel";

	public static final String PROP_PAV_CREATED_BY = NS_PAV + "createdBy";
	public static final String PROP_PAV_CREATED_ON = NS_PAV + "createdOn";
	// public static final String PROP_PAV_CURRENT_VERSION =
	// NS_PAV+"hasCurrentVersion";//we just extract the URI as the latest
	public static final String PROP_PAV_PREVIOUS_VERSION = NS_PAV + "previousVersion";
	public static final String PROP_PAV_CONTRIBUTED_BY = NS_PAV + "contributedBy";
	public static final String PROP_PAV_VERSION = NS_PAV + "version";
	public static final String PROP_PAV_LAST_UPDATED_ON = NS_PAV + "lastUpdatedOn";

	public static final String PROP_CC_LICENSE = "http://creativecommons.org/ns#license";

	public static final String PROP_VCARD_FN = NS_VCARD + "fn";
	public static final String PROP_VCARD_GIVEN_NAME = NS_VCARD + "given-name";
	public static final String PROP_VCARD_FAMILY_NAME = NS_VCARD + "family-name";
	public static final String PROP_VCARD_URL = NS_VCARD + "url";
	public static final String PROP_VCARD_HAS_URL = NS_VCARD + "hasURL";
	public static final String PROP_VCARD_EMAIL = NS_VCARD + "hasEmail";

	public static final String PROP_VCARD_FN_OLD = NS_VCARD_OLD + "FN";
	public static final String PROP_VCARD_FAMILY_OLD = NS_VCARD_OLD + "Family";
	public static final String PROP_VCARD_GIVEN_OLD = NS_VCARD_OLD + "Given";
	public static final String PROP_VCARD_EMAIL_OLD = NS_VCARD_OLD + "EMAIL";

	public static final String PROP_FOAF_NAME = NS_FOAF + "name";
	public static final String PROP_FOAF_GIVEN_NAME = NS_FOAF + "givenname";
	public static final String PROP_FOAF_FAMILY_NAME = NS_FOAF + "family_name";
	public static final String PROP_FOAF_MBOX = NS_FOAF + "mbox";
	public static final String PROP_FOAF_HOME_PAGE = NS_FOAF + "homepage";
	public static final String PROP_FOAF_LOGO = NS_FOAF + "logo";
	public static final String PROP_FOAF_IMAGE = NS_FOAF + "img";
	public static final String PROP_FOAF_DEPICTION = NS_FOAF + "depiction";
	public static final String PROP_FOAF_FUNDED_BY = NS_FOAF + "fundedBy";

	public static final String PROP_ORG_MEMBER_OF = NS_ORG + "memberOf";
	public static final String PROP_MOD_ACRONYM = NS_MOD + "acronym";
	public static final String PROP_MOD_STATUS = NS_MOD + "status";
	public static final String PROP_VOAF_EXTENDS = NS_VOAF + "extends";
	public static final String PROP_WDRS_IS_DESCRIBED_BY = NS_WDRS + "describedBy";
	public static final String PROP_WIDOCO_INTRODUCTION = NS_WIDOCO + "introduction";
	public static final String PROP_WIDOCO_RDF_XML= NS_WIDOCO + "rdfxmlSerialization";
	public static final String PROP_WIDOCO_NT= NS_WIDOCO + "ntSerialization";
	public static final String PROP_WIDOCO_TURTLE = NS_WIDOCO + "turtleSerialization";
	public static final String PROP_WIDOCO_JSON_LD = NS_WIDOCO + "jsonldSerialization";



	// The following properties need additional support (future release)
	// SEE_ALSO (NEEDED INTERFACE UPDATE)
	// foaf: logo schema:logo, foaf:depiction, schema:image
	// issue date
	// source for the vocab

	/**
	 * Constants for the property file (PF) with the ontology metadata
	 */

	public static final String PF_ABSTRACT_SECTION_CONTENT = "abstract";
	public static final String PF_AUTHORS = "authors";
	public static final String PF_AUTHORS_URI = "authorsURI";
	public static final String PF_AUTHORS_INSTITUTION = "authorsInstitution";
	public static final String PF_AUTHORS_INSTITUTION_URI = "authorsInstitutionURI";
	public static final String PF_CITE_AS = "citeAs";
	public static final String PF_CONTEXT_URI = "contextURI";
	public static final String PF_CONTRIBUTORS = "contributors";
	public static final String PF_CONTRIBUTORS_URI = "contributorsURI";
	public static final String PF_CONTRIBUTORS_INSTITUTION = "contributorsInstitution";
	public static final String PF_CONTRIBUTORS_INSTITUTION_URI = "contributorsInstitutionURI";
	public static final String PF_DATE_CREATED = "dateCreated";
	public static final String PF_DATE_MODIFIED = "dateModified";
	public static final String PF_DESCRIPTION = "description";
	public static final String PF_DOI = "DOI";
	public static final String PF_EXTENDED_ONTOLOGY_NAMES = "extendedOntologyNames";
	public static final String PF_EXTENDED_ONTOLOGY_URIS = "extendedOntologyURIs";
	public static final String PF_LATEST_VERSION_URI = "latestVersionURI";
	public static final String PF_LICENSE_ICON_URL = "licenseIconURL";
	public static final String PF_LICENSE_NAME = "licenseName";
	public static final String PF_LICENSE_URI = "licenseURI";
	public static final String PF_LOGO = "logo";
	public static final String PF_IMAGES = "images";
	public static final String PF_IMPORTED_ONTOLOGY_NAMES = "importedOntologyNames";
	public static final String PF_IMPORTED_ONTOLOGY_URIS = "importedOntologyURIs";
	public static final String PF_INCOMPATIBLE_WITH = "incompatibleWith";
	public static final String PF_INTRODUCTION = "introduction";
	public static final String PF_ONT_NAME = "ontologyName";
	public static final String PF_ONT_NAMESPACE_URI = "ontologyNamespaceURI";
	public static final String PF_ONT_REVISION_NUMBER = "ontologyRevisionNumber";
	public static final String PF_ONT_TITLE = "ontologyTitle";
	public static final String PF_ONT_PREFIX = "ontologyPrefix";
	public static final String PF_THIS_VERSION_URI = "thisVersionURI";
	public static final String PF_PREVIOUS_VERSION = "previousVersionURI";
	public static final String PF_PUBLISHER = "publisher";
	public static final String PF_PUBLISHER_URI = "publisherURI";
	public static final String PF_PUBLISHER_INSTITUTION = "publisherInstitution";
	public static final String PF_PUBLISHER_INSTITUTION_URI = "publisherInstitutionURI";
	public static final String PF_SEE_ALSO = "seeAlso";
	public static final String PF_SOURCE = "source";
	public static final String PF_FUNDERS = "funders";
	public static final String PF_FUNDING = "fundingGrants";
	public static final String PF_SERIALIZATION_NT = "NTSerialization";
	public static final String PF_SERIALIZATION_JSON = "JSONLDSerialization";
	public static final String PF_SERIALIZATION_RDF = "RDFXMLSerialization";
	public static final String PF_SERIALIZATION_TTL = "TurtleSerialization";

	/*OWL_API RDF Serializations*/
	public static final String RDF_XML = "RDF/XML";
	public static final String TTL = "TTL";
	public static final String NT = "N-Triples";
	public static final String JSON_LD = "JSON-LD";


	/*
	 * Property that will retrieve the status of the document from the property file
	 */
	public static final String STATUS = "status";
	public static final String COMPATIBLE = "backwardsCompatibleWith";

	// Constants for language tags. These are the names used in the property file
	// This way, if refactoring is needed we only have to change it here.
	public static final String LANG_ABSTRACT = "abstract";
	public static final String LANG_ABSTRACT_PLACEHOLDER = "abstractPlaceHolder";
	public static final String LANG_INTRO_TITLE = "introTitle";
	public static final String LANG_INTRO_PLACEHOLDER = "introPlaceHolder";
	public static final String LANG_REFERENCES_PLACEHOLDER = "referencesPlaceHolder";
	public static final String LANG_AUTHORS = PF_AUTHORS;
	public static final String LANG_CONTRIBUTORS = PF_CONTRIBUTORS;
	public static final String LANG_AC_TEXT = "ackText";
	public static final String LANG_PUBLISHER = PF_PUBLISHER;
	public static final String LANG_IMPORTED = "imported";
	public static final String LANG_EXTENDED = "extended";
	public static final String LANG_NS = "ns";
	public static final String LANG_NS_TEXT = "nsText";
	public static final String LANG_BACK3 = "back3";
	public static final String LANG_DATE = "date";
	public static final String LANG_DATE_MODIFIED = "dateModified";
	public static final String LANG_THIS_VERSION = "thisVersion";
	public static final String LANG_LATEST_VERSION = "latestVersion";
	public static final String LANG_PREVIOUS_VERSION = "previousVersion";
	public static final String LANG_ISSUED = "issued";
	public static final String LANG_REVISION = "revision";
	public static final String LANG_SERIALIZATION = "serialization";
	public static final String LANG_LICENSE_URL_IF_NULL = "licenseURLIfNull";
	public static final String LANG_LICENSE = "license";
	public static final String LANG_LICENSE_IF_NULL = "licenseIfNull";
	public static final String LANG_VISUALIZATION = "visualization";
	public static final String LANG_CITE_AS = "citeAs";
	public static final String LANG_PROV_HEAD = "provHead";
	public static final String LANG_OVERVIEW_PLACEHOLDER = "overviewPlaceHolder";
	public static final String LANG_DESCRIPTION_TITLE = "descriptionTitle";
	public static final String LANG_DESCRIPTION_PLACEHOLDER = "descriptionPlaceHolder";
	public static final String LANG_CROSS_REF_TITLE = "crossRefTitle";
	public static final String LANG_CROSS_REF_TITLE2 = "crossRefTitle2";
	public static final String LANG_CROSS_REF_PLACEHOLDER = "crossRefPlaceHolder";
	public static final String LANG_PROV1 = "prov1";
	public static final String LANG_PROV2 = "prov2";
	public static final String LANG_CREATED_BY = "createdBy";
	public static final String LANG_CONTRIBUTED_BY = "contribBy";
	public static final String LANG_SPEC = "spec";
	public static final String LANG_REV = "rev";
	public static final String LANG_RESULT = "result";
	public static final String LANG_GENERATED = "generated";
	public static final String LANG_BACK = "back";
	public static final String LANG_BACK1 = "back1";
	public static final String LANG_BACK2 = "back2";
	public static final String LANG_NOT_ACC_PAGE = "notAccPage";
	public static final String LANG_CLASSES = "classes";
	public static final String LANG_OBJ_PROP = "objProp";
	public static final String LANG_DATA_PROP = "dataProp";
	public static final String LANG_ANN_PROP = "annProp";
	public static final String LANG_NAMED_INDIV = "namedIndiv";
	public static final String LANG_TABLE_OF_CONTENTS = "tableOfContents";
	public static final String LANG_COMPATIBLE = "compatible";
	public static final String LANG_INCOMPATIBLE = "incompatible";
	public static final String LANG_LEGEND = "legend";
	public static final String LANG_SOURCES = "source";
	public static final String LANG_SEE_ALSO = "seeAlso";
	public static final String LANG_FUNDER = "funder";
	public static final String LANG_FUNDING = "funding";

	// labels for the changelog
	public static final String LANG_CHANGELOG_HEAD = "changelogHead";
	public static final String LANG_ADDED_CLASS = "addedClass";
	public static final String LANG_MODIFIED_CLASS = "modifiedClass";
	public static final String LANG_DELETED_CLASS = "deletedClass";
	public static final String LANG_ADDED_PROP = "addedProp";
	public static final String LANG_MODIFIED_PROP = "modifiedProp";
	public static final String LANG_DELETED_PROP = "deletedProp";
	public static final String LANG_MODIFIED_DATA_PROP = "modifiedDataProp";
	public static final String LANG_ADDED_DATA_PROP = "addedDataProp";
	public static final String LANG_DELETED_DATA_PROP = "deletedDataProp";
	public static final String LANG_ADDED = "added";
	public static final String LANG_DELETED = "deleted";
	public static final String LANG_SUBCLASS_OF = "subClassOf";
	public static final String LANG_SUBPROP_OF = "subPropOf";
	public static final String LANG_DOMAIN = "domain";
	public static final String LANG_RANGE = "range";
	public static final String LANG_UNION = "unionOf";
	public static final String LANG_INTERSECTION = "intersectionOf";
        public static final String HELP_TEXT ="java -jar widoco-VERSION-jar-with-dependencies.jar [OPTIONS]\n" +
"\n" +
"OPTIONS:\n" +
"    -ontFile PATH  [required (unless -ontURI is used)]: Load a local ontology file (from PATH) to document.\n "
                + "        This option is incompatible with -ontURI\n" +
"    -ontURI  URI   [required (unless -ontFile is used)]: Load an ontology to document from its URI.\n"
                + "        This option is incompatible with -ontFile\n" +
"    -outFolder folderName: Specifies the name of the folder where to save the documentation.\n"
                + "        Default name is 'myDocumentation'\n" +
"    -confFile PATH: Load your own configuration file for the ontology metadata.\n"
                + "        Incompatible with -getOntologyMetadata\n" +
"    -getOntologyMetadata: Extract ontology metadata from the given ontology \n" +
"    -oops: Create an html page with the evaluation from the OOPS service (http://oops.linkeddata.es/)\n" +
"    -rewriteAll: Replace any existing files when documenting an ontology (e.g., from a previous execution)\n" +
"    -crossRef: ONLY generate the overview and cross reference sections. The index document will NOT be generated.\n"
                + "        The htaccess, provenance page, etc., will not be generated unless requested by other flags.\n"
                + "        This flag is intended to be used only after a first version of the documentation exists.\n" +
"    -saveConfig PATH: Save a configuration file on PATH with the properties of a given ontology\n" +
"    -useCustomStyle: Export the documentation using alternate css files (by Daniel Vila).\n" +
"    -lang LANG1-LANG2: Generate documentation in multiple languages (separated by \"-\").\n"
                + "        Note that if the language is not supported, the system will load the labels in english.\n"
                + "        Usage example: en-pt-es\n" +
"    -includeImportedOntologies: Indicates whether the terms of the imported ontologies of the current ontology\n"
                + "        should be documented as well or not.\n" +
"    -htaccess: Create a bundle for publication ready to be deployed on your Apache server.\n" +
"    -webVowl: Create a visualization based on WebVowl in the documentation.\n" +
"    -licensius: Use the Licensius web services to retrieve license metadata.\n"
                + "        Only works if the -getOntologyMetadata flag is enabled.\n" +
"    -ignoreIndividuals: Individuals will not be included in the documentation.\n" +
"    -includeAnnotationProperties: Include annotation properties in the documentation\n" +
"    -analytics CODE: Add a code snippet for Google analytics to track your HTML documentation.\n"
                + "        You need to add your CODE next to the flag. For example: UA-1234\n" +
"    -doNotDisplaySerializations: The serializations of the ontology will not be displayed.\n" +
"    -displayDirectImportsOnly: Include direct imports of the ontology in your documentation.\n" +
"    -rewriteBase PATH: Change the default rewrite base path. The default value is \"/\".\n"
                + "        This flag can only be used with the htaccess option.\n" +
"    -excludeIntroduction: Skip the introduction section in the documentation. \n" +
"    -uniteSections: Write all HTML sections into a single HTML document. \n" +
"    -noPlaceHolderText: Do not add any placeholder text (this will remove intro, abstract (if empty) and " +
				"description sections)." +
"    --help: Shows this message and exit.\n";  

	/**
	 * Head section of the HTML document.
	 */
	public static final String OPENING = "<!DOCTYPE html>\n<html>\n" + "<head>\n"
			+ "<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" />\n";
	// missing specialization. Missing alternate

	public static String getAbstractSection(String abstractContent, Configuration c, Properties langFile) {
		String abstractSection = "<h2>" + langFile.getProperty(LANG_ABSTRACT)
				+ "</h2><span class=\"markdown\">\n";
		if (abstractContent != null && !"".equals(abstractContent)) {
			abstractSection += abstractContent;
		} else {
			abstractSection += langFile.getProperty(LANG_ABSTRACT_PLACEHOLDER);
		}
		abstractSection += "</span>\n";
		return abstractSection;
	}

	/**
	 * Text representing the div of the status.
	 * 
	 * @param c
	 * @return
	 */
	public static String getStatus(Configuration c) {
		String html = "";
		if (c.getMainOntology().getStatus() != null && !c.getMainOntology().getStatus().equals("")) {
			html += "<div class=\"status\">\n" + "<div>\n" + "<span>" + c.getMainOntology().getStatus()
					+ "</span>\n</div>\n</div>";
		}
		return html;
	}

	public static String getIntroductionSectionTitleAndPlaceHolder(Configuration c, Properties lang) {
		String s = "<h2 id=\"intro\" class=\"list\">";
		//check if the content of the intro was found in a metadata property
		if (c.getIntroText() == null || c.getIntroText().isEmpty()){
			s+= lang.getProperty(LANG_INTRO_PLACEHOLDER);
		}else{
			s+= lang.getProperty(LANG_INTRO_TITLE);
			s+= "<span class=\"markdown\">"+ c.getIntroText() + "</span>\n";
		}

		return s;
	}

	public static String getReferencesSection(Configuration c, Properties lang) {
		String s = "\n<h2 id=\"ref\" class=\"list\">" + lang.getProperty(LANG_REFERENCES_PLACEHOLDER)
				+ "\n";
		return s;
	}

	public static String getAcknowledgementsSection(Configuration c, Properties lang) {
		String s = "<div id=\"acknowledgments\">\n" + "<h2 id=\"ack\" class=\"list\">"
				+ lang.getProperty(LANG_AC_TEXT) + "\n";
		return s;
	}

	public static String getChangeLogSection(Configuration c, CompareOntologies comp, Properties lang) {
		String s = "<div id=\"changelog\">\n" + "<h2 id=\"changes\" class=\"list\">"
				+ lang.getProperty(LANG_CHANGELOG_HEAD) + "</h2>\n";
		s += OntologyDifferencesRenderer.differencesToHTML(comp, c.getMainOntology().getNamespaceURI(), lang);
		s += "</div>\n";
		// return lang.getProperty("changeLog");
		return s;
	}

	public static final String ENDING = "</body></html>";

	// given a list of agents, this method gets it as an html String
	private static String getAgents(ArrayList<Agent> auth) {
		String agents = "";
		try {
			Iterator<Agent> it = auth.iterator();
			int i = 1;
			while (it.hasNext()) {
				Agent currAuth = it.next();
				String authorName = currAuth.getName(); // the name should be always there
				if (authorName == null || "".equals(authorName)) {
					authorName = "Agent " + i;
					i++;
				}
				if (currAuth.getURL() != null && !"".equals(currAuth.getURL())) {
					agents += "<dd><a href=\"" + currAuth.getURL() + "\">" + authorName + "</a>";
				} else {
					agents += "<dd>" + authorName;
				}
				if (currAuth.getInstitutionName() != null && !"".equals(currAuth.getInstitutionName())) {
					if (currAuth.getInstitutionURL() != null && !"".equals(currAuth.getInstitutionURL())) {
						agents += ", (<a href=\"" + currAuth.getInstitutionURL() + "\">" + currAuth.getInstitutionName()
								+ "</a>)";
					} else {
						agents += ", " + currAuth.getInstitutionName();
					}
				} else {
					if (currAuth.getInstitutionURL() != null && !"".equals(currAuth.getInstitutionURL())) {
						agents += ", (<a href=\"" + currAuth.getInstitutionURL() + "\">" + currAuth.getInstitutionURL()
								+ "</a>)";
					}
				}
				if(currAuth.getEmail()!=null && !"".equals(currAuth.getEmail())){
					if (!currAuth.getEmail().startsWith("mailto:")){
						currAuth.setEmail("mailto:" + currAuth.getEmail());
					}
					agents += "<a href=\""+currAuth.getEmail()+"\">&#9993;</a>";
				}
				agents += "</dd>";
			}
		} catch (Exception e) {
			logger.error("Error while writing authors, their urls or their instititions.");
		}
		return agents;
	}

	private static String getAuthors(ArrayList<Agent> auth, Properties l) {
		String a = "<dt>" + l.getProperty(LANG_AUTHORS) + "</dt>\n";
		// the same amount of names and institutions is assumed.
		a += getAgents(auth);
		return a + "\n";
	}

	private static String getContributors(ArrayList<Agent> contrib, Properties l) {
		String c = "<dt>" + l.getProperty(LANG_CONTRIBUTORS) + "</dt>\n";
		c += getAgents(contrib);
		return c + "\n";
	}

	private static String getFunders(ArrayList<Agent> contrib, Properties l) {
		String c = "<dt>" + l.getProperty(LANG_FUNDER) + "</dt>\n";
		c += getAgents(contrib);
		return c + "\n";
	}

	private static String getPublisher(Agent publisher, Properties l) {
		if ((publisher.getName() != null && !"".equals(publisher.getName()))
				|| (publisher.getURL() != null && !"".equals(publisher.getURL()))) {
			if (publisher.getName() == null && "".equals(publisher.getName())) {
				publisher.setName(publisher.getURL());
			}
			String c = "<dt>" + l.getProperty(LANG_PUBLISHER) + "</dt>\n";
			ArrayList<Agent> p = new ArrayList<Agent>();
			p.add(publisher);
			c += getAgents(p);
			return c + "\n";
		}
		return "";
	}

	// method for extracting the ontologies from an arraylist.
	private static String getOntologies(ArrayList<Ontology> ontos) {
		String ontologies = "";
		Iterator<Ontology> it = ontos.iterator();
		int i = 1;
		while (it.hasNext()) {
			Ontology currentOnto = it.next();
			String currentOntoName = currentOnto.getName();
			if (currentOntoName == null || "".equals(currentOntoName)) {
				currentOntoName = "Onto" + i;
				i++;
			}
			if (currentOnto.getNamespaceURI() != null && !"".equals(currentOnto.getNamespaceURI())) {
				ontologies += "<dd><a href=\"" + currentOnto.getNamespaceURI() + "\">" + currentOntoName + "</a></dd>";
			} else {
				ontologies += "<dd>" + currentOntoName + "</dd>";
			}
		}
		return ontologies;
	}

	private static String getImports(ArrayList<Ontology> ontos, Properties l) {
		String imports = "<dt>" + l.getProperty(LANG_IMPORTED) + "</dt>\n";
		imports += getOntologies(ontos);
		return imports + "\n";
	}

	private static String getExtends(ArrayList<Ontology> ontos, Properties l) {
		String extended = "<dt>" + l.getProperty(LANG_EXTENDED) + "</dt>\n";
		extended += getOntologies(ontos);
		extended = extended.replace("owl:imports", ""); // to remove the import annotation
		return extended + "\n";
	}

	private static String getURLs(ArrayList<String> resources, String label) {
		StringBuilder elem = new StringBuilder("<dt>" + label + "</dt>\n");
		for (String e : resources) {
			elem.append("<dd><a href=\"").append(e).append("\">").append(e).append("</a></dd>");
		}
		elem.append("\n");
		return elem.toString() ;
	}

	// Removes '#' and last '/' to avoid namespace duplication.
	public static String stripTrailingNamespaceChars(String namespace) {
		final String removedSlash = namespace.endsWith("/")
				? namespace.substring(0, namespace.length() - 1)
				: namespace;

		return removedSlash.replace("#", "");
	}

	public static String getNameSpaceDeclaration(HashMap<String, String> namesp, Configuration c, Properties lang) {
		String ns = "<div id=\"namespacedeclarations\">\n" + "<h3 id=\"ns\" class=\"list\">" + lang.getProperty(LANG_NS)
				+ lang.getProperty(LANG_NS_TEXT);
		String nsPrefix = c.getMainOntology().getNamespacePrefix();
		String nsURI = c.getMainOntology().getNamespaceURI();
		//order all ns alphabetically
		if (!namesp.containsKey(nsPrefix)){
			namesp.put(nsPrefix,stripTrailingNamespaceChars(nsURI));
		}
		TreeMap<String, String> sortedMap = new TreeMap<>(namesp);
		for (Map.Entry<String, String> entry : sortedMap.entrySet()) {
			ns += "<tr><td><b>" + entry.getKey() + "</b></td><td>&lt;" + entry.getValue() + "&gt;</td></tr>\n";
		}

		ns += "</tbody>\n" + "</table>\n" + "</div>\n" + "</div>\n";
		return ns;
	}

	/**
	 * Serialization of the JSON LD for the ontology specification. Given that I
	 * have faced some serialization issues, I serialize it by hand, using basic
	 * properties.
	 * 
	 * @param c
	 * @return
	 */
	public static String getJSONLDSnippet(Configuration c) {
		Ontology o = c.getMainOntology();
		String metadata = "\n\n<!-- SCHEMA.ORG METADATA -->\n<script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\","
				+ "\"url\":\"" + o.getNamespaceURI() + "\"," + "\"image\":\"" + WEBVOWL_SERVICE
				+ c.getMainOntology().getNamespaceURI() + "\",";
		// name (mandatory)
		metadata += "\"name\":";
		if (o.getTitle() != null && !"".equals(o.getTitle())) {
			metadata += "\"" + o.getTitle() + "\"";
		} else {
			metadata += "\"" + o.getNamespaceURI() + "\"";
		}
		// headline (mandatory)
		metadata += ", \"headline\":";
		if (c.getAbstractSection() != null && !"".equals(c.getAbstractSection())) {
			metadata += "\"" + c.getAbstractSection().replace("\n", "").trim() + "\"";
		} else {
			metadata += "\"Document describing the ontology " + o.getNamespaceURI() + "\"";
		}
		// release date (mandatory)
		metadata += ", \"dateReleased\":";
		if (o.getCreationDate() != null && !"".equals(o.getCreationDate())) {
			metadata += "\"" + o.getCreationDate() + "\"";
		} else {
			metadata += "\"" + (new Date()).toString() + "\"";
		}
		if (o.getModifiedDate() != null && !"".equals(o.getModifiedDate())) {
			metadata += ", \"dateModified\":\"" + o.getModifiedDate() + "\"";
		}
		// version (optional)
		if (o.getRevision() != null && !"".equals(o.getRevision())) {
			metadata += ", \"version\":\"" + o.getRevision() + "\"";
		}
		// license (optional)
		if (o.getLicense() != null && o.getLicense().getUrl() != null && !"".equals(o.getLicense().getUrl())) {
			metadata += ", \"license\":\"" + o.getLicense().getUrl() + "\"";
		}
		// authors (optional)
		ArrayList<Agent> a = o.getCreators();
		if (!a.isEmpty()) {
			metadata += ", \"author\":[";
			Iterator<Agent> it = a.iterator();
			while (it.hasNext()) {
				Agent aux = it.next();
				metadata += "{\"@type\":\"Person\",";
				if (aux.getName() != null && !"".equals(aux.getName())) {
					metadata += "\"name\":\"" + aux.getName() + "\"";
				}
				if (aux.getURL() != null && !"".equals(aux.getURL())) {
					metadata += ",\"url\":\"" + aux.getURL() + "\"";
				}
				metadata += "}";
				if (it.hasNext()) {
					metadata += ",";
				}
			}
			metadata += "]";
		}
		// contributors (optional)
		ArrayList<Agent> co = o.getContributors();
		if (!co.isEmpty()) {
			metadata += ", \"contributor\":[";
			Iterator<Agent> it = co.iterator();
			while (it.hasNext()) {
				Agent aux = it.next();
				metadata += "{\"@type\":\"Person\",";
				if (aux.getName() != null && !"".equals(aux.getName())) {
					metadata += "\"name\":\"" + aux.getName() + "\"";
				}
				if (aux.getURL() != null && !"".equals(aux.getURL())) {
					metadata += ",\"url\":\"" + aux.getURL() + "\"";
				}
				metadata += "}";
				if (it.hasNext()) {
					metadata += ",";
				}
			}
			metadata += "]";
		}
		metadata += "}</script>\n\n";
		return metadata;
		// note to self: should clean up to avoid doing the same loop twice.
	}

	/**
         * Function that creates an index document assuming sections have been created separately
         * @param resourcesFolderName folder with the css and js
         * @param c WIDOCO configuration
         * @param l lode parser
         * @param lang language file
         * @return document to be generated
         */
        public static String getIndexDocument(String resourcesFolderName, Configuration c, LODEParser l, Properties lang) {
		String document = OPENING;
		/* Style selection */
		if (c.isUseW3CStyle()) {
			document += " <link rel=\"stylesheet\" href=\"" + resourcesFolderName
					+ "/primer.css\" media=\"screen\" />   \n" +
					" <link rel=\"stylesheet\" href=\"" + resourcesFolderName
					+ "/rec.css\" media=\"screen\" />   \n" + " <link rel=\"stylesheet\" href=\"" + resourcesFolderName
					+ "/extra.css\" media=\"screen\" />   \n" + " <link rel=\"stylesheet\" href=\"" + resourcesFolderName
					+ "/owl.css\" media=\"screen\" />   \n";

		} else {
			document += " <link rel=\"stylesheet\" href=\"" + resourcesFolderName + "/yeti.css\" media=\"screen\" />   \n"
					+ " <link rel=\"stylesheet\" href=\"" + resourcesFolderName + "/site.css\" media=\"screen\" />\n";
		}
		// add a favicon (rdf logo)
		document += "<link rel=\"icon\" type=\"image/png\" href=\"" + resourcesFolderName + "/rdf.icon\"/>";

		// add a title to the document
		if (c.getMainOntology().getTitle() != null && !"".equals(c.getMainOntology().getTitle()))
			document += " <title>" + c.getMainOntology().getTitle() + "</title>\n";
		else
			document += " <title>Ontology Documentation generated by WIDOCO</title>\n";

		// Google analytics code
		String analyticsCode = c.getGoogleAnalyticsCode();
		if (analyticsCode != null && !analyticsCode.isEmpty()) {
			document += getAnalyticsCode(c.getGoogleAnalyticsCode());
		}

		// JSON-LD snippet
		document += getJSONLDSnippet(c);
		document += "<script src=\"" + resourcesFolderName + "/jquery.js\"></script> \n" + "<script src=\""
				+ resourcesFolderName + "/marked.min.js\"></script> \n" + "    <script> \n" + "function loadHash() {\n"
				+ "  jQuery(\".markdown\").each(function(el){jQuery(this).after(marked.parse(jQuery(this).text())).remove()});\n"
				+ "	var hash = location.hash;\n" + "	if($(hash).offset()!=null){\n"
				+ "	  $('html, body').animate({scrollTop: $(hash).offset().top}, 0);\n" + "}\n" + "	loadTOC();\n"
				+ "}\n" + "function loadTOC(){\n" + "	//process toc dynamically\n" + "	  var t='<h2>"
				+ lang.getProperty(LANG_TABLE_OF_CONTENTS) + "</h2><ul>';i = 1;j=0;\n"
				+ "	  jQuery(\".list\").each(function(){\n" + "		if(jQuery(this).is('h2')){\n"
				+ "			if(j>0){\n" + "				t+='</ul>';\n" + "				j=0;\n" + "			}\n"
				+ "			t+= '<li>'+i+'. <a href=#'+ jQuery(this).attr('id')+'>'+ jQuery(this).ignore(\"span\").text()+'</a></li>';\n"
				+ "			i++;\n" + "		}\n" + "		if(jQuery(this).is('h3')){\n" + "			if(j==0){\n"
				+ "				t+='<ul>';\n" + "			}\n" + "			j++;\n"
				+ "			t+= '<li>'+(i-1)+'.'+j+'. '+'<a href=#'+ jQuery(this).attr('id')+'>'+ jQuery(this).ignore(\"span\").text()+'</a></li>';\n"
				+ "		}\n" + "	  });\n" + "	  t+='</ul>';\n" + "	  $(\"#toc\").html(t); \n" + "}\n"
				+ " $.fn.ignore = function(sel){\n" + "        return this.clone().find(sel||\">*\").remove().end();\n"
				+ " };" + "    $(function(){\n";
		// the script for loading the table is called after loading everything else,
		// after the loadHash function
		if (c.isIncludeAbstract()) {
			if(c.getAbstractPath()!=null && !c.getAbstractPath().isEmpty()){
				document += "      $(\"#abstract\").load(\""+c.getAbstractPath()+"\"); \n";
			}else {
				document += "      $(\"#abstract\").load(\"sections/abstract-" + c.getCurrentLanguage() + ".html\"); \n";
			}
		}
		if (c.isIncludeIntroduction()){
			if(c.getIntroductionPath()!=null && !c.getIntroductionPath().isEmpty()){
				document += "      $(\"#introduction\").load(\""+c.getIntroductionPath()+"\"); \n";
			}else {
				document += "      $(\"#introduction\").load(\"sections/introduction-" + c.getCurrentLanguage()
						+ ".html\"); \n";
			}
			//namespace table is always a separated document
			document += "      $(\"#nstable\").load(\"sections/ns-" + c.getCurrentLanguage()
					+ ".html\"); \n";
		}
		if (c.isIncludeOverview()){
			if(c.getOverviewPath()!=null && !c.getOverviewPath().isEmpty()){
				document += "      $(\"#overview\").load(\""+c.getOverviewPath()+"\"); \n";
			}else {
				document += "      $(\"#overview\").load(\"sections/overview-" + c.getCurrentLanguage() + ".html\"); \n";
			}
		}
		if (c.isIncludeDescription()){
			if(c.getDescriptionPath()!=null && !c.getDescriptionPath().isEmpty()){
				document += "      $(\"#description\").load(\""+c.getDescriptionPath()+"\"); \n";
			}else {
				document += "      $(\"#description\").load(\"sections/description-" + c.getCurrentLanguage()
						+ ".html\"); \n";
			}
		}
		if (c.isIncludeReferences()){
			if(c.getReferencesPath()!=null && !c.getReferencesPath().isEmpty()){
				document += "      $(\"#references\").load(\""+c.getReferencesPath()+"\"); \n";
			}else {
				document += "      $(\"#references\").load(\"sections/references-" + c.getCurrentLanguage()
						+ ".html\"); \n";
			}
		}
		if (c.isIncludeChangeLog()) {
			if (c.getMainOntology().getPreviousVersion() != null && !"".equals(c.getMainOntology().getPreviousVersion())
					&& c.isChangeLogSuccessfullyCreated()) {
				document += "      $(\"#changelog\").load(\"sections/changelog-" + c.getCurrentLanguage()
						+ ".html\"); \n";
			}
		}
		if (c.isIncludeCrossReferenceSection())
			document += "      $(\"#crossref\").load(\"sections/crossref-" + c.getCurrentLanguage()
					+ ".html\", null, loadHash); \n";

		document += "    });\n" + "    </script> \n" + "  </head> \n" + "\n" + "<body>\n";

		// here starts the actual document content
		document += "<div class=\"container\">\n";
		document += getHeadSection(c, lang);
		document += getStatus(c);
		if (c.isIncludeAbstract())
			document += "     <div id=\"abstract\"></div>\n";
		document += "<div id=\"toc\"></div>";
		if (c.isIncludeIntroduction()) {
			document += "     <div id=\"introduction\"></div>\n";
			document += "	  <div id=\"nstable\"></div>\n"; //ns declaration is part of the intro
		}
		if (c.isIncludeOverview())
			document += "     <div id=\"overview\"></div>\n";
		if (c.isIncludeDescription())
			document += "     <div id=\"description\"></div>\n";
		if (c.isIncludeCrossReferenceSection())
			document += "     <div id=\"crossref\"></div>\n";
		if (c.isIncludeReferences())
			document += "     <div id=\"references\"></div>\n";
		if (c.isIncludeChangeLog() && c.getMainOntology().getPreviousVersion() != null
				&& !"".equals(c.getMainOntology().getPreviousVersion())) {
			document += "     <div id=\"changelog\"></div>\n";
		}
		document += getAcknowledgementsSection(c, lang) + "\n";
		document += "</div>\n"; // closing .container
		document += "</body>\n</html>"; // end of page
		// document done

		return document;
	}
        
        /**
         * Function that includes all the sections as part of the index document.
         * This makes the documentation more difficult to edit, but simpler for production
         * @param resourcesFolderName folder with the css and js
         * @param c WIDOCO configuration
         * @param l lode parser
         * @param lang language file
         * @param abs abstract section
         * @param intro introduction section
         * @param overview overview section
         * @param des description section 
         * @param references references section
         * @param changelog changelog section
         * @param crossRef cross reference section
         * @return string document to be generated
         */
        public static String getUnifiedIndexDocument(String resourcesFolderName, Configuration c, LODEParser l, Properties lang, String abs,
                String intro, String overview, String des, String references, String changelog, String crossRef) {
		String document = OPENING;
		/* Style selection */
		if (c.isUseW3CStyle()) {
			document += " <link rel=\"stylesheet\" href=\"" + resourcesFolderName
					+ "/primer.css\" media=\"screen\" />   " + " <link rel=\"stylesheet\" href=\"" + resourcesFolderName
					+ "/rec.css\" media=\"screen\" />   " + " <link rel=\"stylesheet\" href=\"" + resourcesFolderName
					+ "/extra.css\" media=\"screen\" />   " + " <link rel=\"stylesheet\" href=\"" + resourcesFolderName
					+ "/owl.css\" media=\"screen\" />   ";
		} else {
			document += " <link rel=\"stylesheet\" href=\"" + resourcesFolderName + "/yeti.css\" media=\"screen\" />   "
					+ " <link rel=\"stylesheet\" href=\"" + resourcesFolderName + "/site.css\" media=\"screen\" />";
		}
		// add a title to the document
		if (c.getMainOntology().getTitle() != null && !"".equals(c.getMainOntology().getTitle()))
			document += " <title>" + c.getMainOntology().getTitle() + "</title>\n";
		else
			document += " <title>Ontology Documentation generated by WIDOCO</title>\n";
		// Google analytics code
		String analyticsCode = c.getGoogleAnalyticsCode();
		if (analyticsCode != null && !analyticsCode.isEmpty()) {
			document += getAnalyticsCode(c.getGoogleAnalyticsCode());
		}
		// JSON-LD snippet
		document += getJSONLDSnippet(c);
		document += "<script src=\"" + resourcesFolderName + "/jquery.js\"></script> \n" + "<script src=\""
				+ resourcesFolderName + "/marked.min.js\"></script> \n" + "    "
                        + "<script> \n" + "function loadHash() {\n"
				+ "  jQuery(\".markdown\").each(function(el){jQuery(this).after(marked(jQuery(this).text())).remove()});\n"
				+ "	var hash = location.hash;\n" + "	if($(hash).offset()!=null){\n"
				+ "	  $('html, body').animate({scrollTop: $(hash).offset().top}, 0);\n" + "}\n" + "	loadTOC();\n"
				+ "}\n" + "function loadTOC(){\n" + "	//process toc dynamically\n" + "	  var t='<h2>"
				+ lang.getProperty(LANG_TABLE_OF_CONTENTS) + "</h2><ul>';i = 1;j=0;\n"
				+ "	  jQuery(\".list\").each(function(){\n" + "		if(jQuery(this).is('h2')){\n"
				+ "			if(j>0){\n" + "				t+='</ul>';\n" + "				j=0;\n" + "			}\n"
				+ "			t+= '<li>'+i+'. <a href=#'+ jQuery(this).attr('id')+'>'+ jQuery(this).ignore(\"span\").text()+'</a></li>';\n"
				+ "			i++;\n" + "		}\n" + "		if(jQuery(this).is('h3')){\n" + "			if(j==0){\n"
				+ "				t+='<ul>';\n" + "			}\n" + "			j++;\n"
				+ "			t+= '<li>'+(i-1)+'.'+j+'. '+'<a href=#'+ jQuery(this).attr('id')+'>'+ jQuery(this).ignore(\"span\").text()+'</a></li>';\n"
				+ "		}\n" + "	  });\n" + "	  t+='</ul>';\n" + "	  $(\"#toc\").html(t); \n" + "}\n"
                                + "$(function(){\n" 
                                + "    loadHash();\n" 
                                + "});"
				+ " $.fn.ignore = function(sel){\n" + "        return this.clone().find(sel||\">*\").remove().end();\n"
				+ " };" + " \n";
		document += "   </script> \n" + "  </head> \n" + "\n" + "<body>\n";
		// here starts the actual document content
		document += "<div class=\"container\">\n";
		document += getHeadSection(c, lang);
		document += getStatus(c);
		if (c.isIncludeAbstract())
			document += "     <div id=\"abstract\">"+abs+"</div>\n";
		document += "<div id=\"toc\"></div>";
		if (c.isIncludeIntroduction())
			document += " \n\n<!--INTRODUCTION SECTION-->\n    <div id=\"introduction\">"+intro+"</div>\n";
		// else document += "<div id=\"namespacedeclaration\"></div>\n";
		if (c.isIncludeOverview())
			document += "  \n\n<!--OVERVIEW SECTION-->\n    <div id=\"overview\">"+overview+"</div>\n";
		if (c.isIncludeDescription())
			document += "  \n\n<!--DESCRIPTION SECTION-->\n    <div id=\"description\">"+des+"</div>\n";
		if (c.isIncludeCrossReferenceSection())
			document += "   \n\n<!--CROSSREF SECTION-->\n   <div id=\"crossref\">"+crossRef+"</div>\n";
		if (c.isIncludeReferences())
			document += "    \n\n<!--REFERENCES SECTION-->\n  <div id=\"references\">"+references+"</div>\n";
		if (c.isIncludeChangeLog() && c.getMainOntology().getPreviousVersion() != null
				&& !"".equals(c.getMainOntology().getPreviousVersion())) {
			document += "   \n\n<!--CHANGELOG SECTION-->\n   <div id=\"changelog\">"+changelog+"</div>\n";
		}
		document += getAcknowledgementsSection(c, lang) + "\n";
		document += "</div>\n"; // closing .container
		document += "</body>\n</html>"; // end of page
		return document;
	}

	public static String getHeadSection(Configuration c, Properties l) {
		String head = "<div class=\"head\">\n";
		head += "<div style=\"float:right\">language ";
		Iterator<String> lang = c.getLanguagesToGenerateDoc().iterator();
		while (lang.hasNext()) {
			String nextLang = lang.next();
			head += "<a href=\"index-" + nextLang + ".html\"><b>" + nextLang + "</b></a> ";
		}
		head += "</div>\n";
		if (c.getMainOntology().getTitle() != null && !"".equals(c.getMainOntology().getTitle()))
			head += "<h1>" + c.getMainOntology().getTitle() + "</h1>\n";
		//logo setup
		if (c.getMainOntology().getLogo() != null && !"".equals(c.getMainOntology().getLogo()))
			head += "<img src=\""+c.getMainOntology().getLogo()+"\" width=\"50/\">\n";

		if (c.getMainOntology().getCreationDate() != null && !"".equals(c.getMainOntology().getCreationDate()))
			head += "<h2>" + l.getProperty(LANG_DATE) + " " + c.getMainOntology().getCreationDate() + "</h2>\n";

		// start definition list
		head += "\n\n<dl>\n";
		if (c.getMainOntology().getModifiedDate() != null && !"".equals(c.getMainOntology().getModifiedDate()))
			head += "<dt>" + l.getProperty(LANG_DATE_MODIFIED) + " " + c.getMainOntology().getModifiedDate() + "</dt>\n";

		if (c.getMainOntology().getThisVersion() != null && !"".equals(c.getMainOntology().getThisVersion()))
			head += "<dt>" + l.getProperty(LANG_THIS_VERSION) + "</dt>\n" + "<dd><a href=\""
					+ c.getMainOntology().getThisVersion() + "\">" + c.getMainOntology().getThisVersion()
					+ "</a></dd>\n";
		if (c.getMainOntology().getLatestVersion() != null && !"".equals(c.getMainOntology().getLatestVersion()))
			head += "<dt>" + l.getProperty(LANG_LATEST_VERSION) + "</dt>\n" + "<dd><a href=\""
					+ c.getMainOntology().getLatestVersion() + "\">" + c.getMainOntology().getLatestVersion()
					+ "</a></dd>\n";
		if (c.getMainOntology().getPreviousVersion() != null && !"".equals(c.getMainOntology().getPreviousVersion()))
			head += "<dt>" + l.getProperty(LANG_PREVIOUS_VERSION) + "</dt>\n" + "<dd><a href=\""
					+ c.getMainOntology().getPreviousVersion() + "\">" + c.getMainOntology().getPreviousVersion()
					+ "</a></dd>\n";
		if (c.getMainOntology().getRevision() != null && !"".equals(c.getMainOntology().getRevision()))
			head += "<dt>" + l.getProperty(LANG_REVISION) + "</dt>\n" + "<dd>" + c.getMainOntology().getRevision()
					+ "</dd>\n";
		if (c.getMainOntology().getIssuedDate() != null && !"".equals(c.getMainOntology().getIssuedDate()))
			head += "<dt>" + l.getProperty(LANG_ISSUED) + "</dt>\n" + "<dd>" + c.getMainOntology().getIssuedDate()
					+ "</dd>\n";
		if (!c.getMainOntology().getCreators().isEmpty())
			head += getAuthors(c.getMainOntology().getCreators(), l) + "\n";
		if (!c.getMainOntology().getContributors().isEmpty())
			head += getContributors(c.getMainOntology().getContributors(), l) + "\n";
		if (c.getMainOntology().getPublisher() != null)
			head += getPublisher(c.getMainOntology().getPublisher(), l);
		if (!c.getMainOntology().getImportedOntologies().isEmpty())
			head += getImports(c.getMainOntology().getImportedOntologies(), l) + "\n";
		if (!c.getMainOntology().getExtendedOntologies().isEmpty())
			head += getExtends(c.getMainOntology().getExtendedOntologies(), l) + "\n";
		if (!c.getMainOntology().getSources().isEmpty())
			head += getURLs(c.getMainOntology().getSources(), l.getProperty(Constants.LANG_SOURCES)) + "\n";
		if (!c.getMainOntology().getSeeAlso().isEmpty())
			head += getURLs(c.getMainOntology().getSeeAlso(), l.getProperty(Constants.LANG_SEE_ALSO)) + "\n";
		if (!c.getMainOntology().getFunders().isEmpty())
			head += getFunders(c.getMainOntology().getFunders(), l) + "\n";
		if (!c.getMainOntology().getFundingGrants().isEmpty())
			head += getURLs(c.getMainOntology().getFundingGrants(), l.getProperty(Constants.LANG_FUNDING)) + "\n";

		if (c.isDisplaySerializations()) {
			HashMap<String, String> availableSerializations = c.getMainOntology().getSerializations();
			head += "<dt>" + l.getProperty(LANG_SERIALIZATION) + "</dt><dd>";
			for (String serialization : availableSerializations.keySet()) {
				head += "<span><a href=\"" + availableSerializations.get(serialization)
						+ "\" target=\"_blank\"><img src=\"https://img.shields.io/badge/Format-"
						+ serialization.replace("-", "_") + "-blue.svg\" alt=\"" + serialization + "\" /></a> </span>";
			}
			head += "</dd>";
		}
		String context = c.getContextURI();
		if (context != null && !context.equals("")) {
			head += "<dt>JSON-LD Context</dt><dd><a href=\"" + context + "\">" + context + "</a></dd>";
		}

		if (c.getMainOntology().getLicense() != null) {
			String lname = c.getMainOntology().getLicense().getName();// "license name goes here";
			String licenseURL = c.getMainOntology().getLicense().getUrl();// "http://insertlicenseURIhere.example.org";
			if (licenseURL == null || "".equals(licenseURL))
				licenseURL = l.getProperty(LANG_LICENSE_URL_IF_NULL);
			if (lname == null || "".equals(lname))
				lname = l.getProperty(LANG_LICENSE_IF_NULL);
			head += "<dt>" + l.getProperty(LANG_LICENSE) + "</dt><dd>" + "<a href=\"" + licenseURL
					+ "\" target=\"_blank\"><img src=\"https://img.shields.io/badge/License-"
					+ lname.replace("-", "_").replace(" ", "%20") + "-blue.svg\" alt=\"" + licenseURL + "\" /></a>\n";
			if (c.getMainOntology().getLicense().getIcon() != null
					&& !"".equals(c.getMainOntology().getLicense().getIcon())) {
				head += "<a href=\"" + licenseURL + "\" rel=\"license\" target=\"_blank\">\n" + "<img src=\""
						+ c.getMainOntology().getLicense().getIcon()
						+ "\" style=\"border-width:0\" alt=\"License\" />\n" + "</a>\n<br/>";
			}
			head += "</dd>";
		}
		// add lang tags here
		if (c.isCreateWebVowlVisualization()) {
			head += "<dt>" + l.getProperty(LANG_VISUALIZATION) + "</dt>" + "<dd>"
					+ "<a href=\"webvowl/index.html#\" target=\"_blank\"><img src=\"https://img.shields.io/badge/Visualize_with-WebVowl-blue.svg\" alt=\"Visualize with WebVowl\" /></a>"
					+ "</dd>\n";
		}
                //add commented a reference in case the evaluation is to be included
                head+="<!-- <dt>Evaluation:</dt><dd><a href=\"OOPSevaluation/oopsEval.html#\" target=\"_blank\"><img src=\"https://img.shields.io/badge/Evaluate_with-OOPS! (OntOlogy Pitfall Scanner!)-blue.svg\" alt=\"Evaluate with OOPS!\" /></a></dd> -->";
		if (!"".equals(c.getMainOntology().getCiteAs()) && c.getMainOntology().getCiteAs() != null) {
			head += "<dt>" + l.getProperty(LANG_CITE_AS) + "</dt>\n<dd>" + c.getMainOntology().getCiteAs() + "</dd>\n";
		}
		if (!"".equals(c.getMainOntology().getDoi()) && c.getMainOntology().getDoi() != null) {
			// doi is common for all languages
			head += "<dt>DOI:</dt>\n<dd><a href=\"http://dx.doi.org/" + c.getMainOntology().getDoi()
					+ "\"><img src =\"https://img.shields.io/badge/DOI-" + c.getMainOntology().getDoi()
					+ "-blue.svg\" alt=\"" + c.getMainOntology().getDoi() + "\" /></a></dd>\n";
		}
		if (!"".equals(c.getMainOntology().getBackwardsCompatibleWith())
				&& c.getMainOntology().getBackwardsCompatibleWith() != null) {
			// doi is common for all languages
			head += "<dt>" + l.getProperty(LANG_COMPATIBLE) + ":</dt>\n<dd>"
					+ "<a href=\""+c.getMainOntology().getBackwardsCompatibleWith()+"\">"
					+ c.getMainOntology().getBackwardsCompatibleWith() +"</a>" + "</dd>\n";
		}
                if (!"".equals(c.getMainOntology().getIncompatibleWith())
				&& c.getMainOntology().getIncompatibleWith() != null) {
			// doi is common for all languages
			head += "<dt>" + l.getProperty(LANG_INCOMPATIBLE) + ":</dt>\n<dd>"
					+ "<a href=\""+c.getMainOntology().getIncompatibleWith()+"\">"
					+ c.getMainOntology().getIncompatibleWith() +"</a>" + "</dd>\n";
		}

		// end definition list
		head += "</dl>\n\n";

		if (c.isPublishProvenance()) {
			head += "<a href=\"provenance/provenance-" + c.getCurrentLanguage() + ".html\" target=\"_blank\">"
					+ l.getProperty(LANG_PROV_HEAD) + "</a>";
		}
		head += "<hr/>\n" + "</div>\n";
		return head;
	}

	public static String getOverviewSectionTitleAndPlaceHolder(Configuration c, Properties lang) {
		return "<h2 id=\"overv\" class=\"list\">" + c.getMainOntology().getName() + ": "
				+ lang.getProperty(LANG_OVERVIEW_PLACEHOLDER);
	}

	public static String getDescriptionSectionTitleAndPlaceHolder(Configuration c, Properties lang) {
		StringBuilder descriptionString = new StringBuilder(
				"<h2 id=\"desc\" class=\"list\">" + c.getMainOntology().getName() + ": ");
		descriptionString.append(lang.getProperty(LANG_DESCRIPTION_TITLE)).append("\n");
		String ontologyDescription = c.getMainOntology().getDescription();
		//add description body from ontology or default
		descriptionString.append("<span class=\"markdown\">");
		if (ontologyDescription != null && !ontologyDescription.isEmpty()){
			descriptionString.append(ontologyDescription);
		}else{
			descriptionString.append(lang.getProperty(LANG_DESCRIPTION_PLACEHOLDER)).append("\n");
		}
		descriptionString.append("</span>");
		for (String image: c.getMainOntology().getImages()){
			descriptionString.append("<img src=\"").append(image).append("\">");
		}
		return descriptionString.toString();
	}

	public static String getCrossReferenceSectionTitleAndPlaceHolder(Configuration c, Properties lang) {
		return "<h2 id=\"crossreference\" class=\"list\">" + lang.getProperty(LANG_CROSS_REF_TITLE) + " "
				+ c.getMainOntology().getName() + " " + lang.getProperty(LANG_CROSS_REF_TITLE2) + "</h2>" + "\n"
				+ lang.getProperty(LANG_CROSS_REF_PLACEHOLDER) +" "+ c.getMainOntology().getName() + ".\n";
	}

	public static String getProvenanceHtml(Configuration c, Properties lang) {
		String provhtml = "<!DOCTYPE html>\n" + "<html>\n" + "<head>\n"
				+ "<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" />\n" + " \n" + "  </head> \n"
				+ "\n" + "<body>\n" + "<div class=\"head\">\n";
		String provURI = c.getMainOntology().getThisVersion();
		if (provURI == null || provURI.equals("")) {
			provURI = c.getDocumentationURI();
		}
		if (c.getMainOntology().getTitle() != null && !"".equals(c.getMainOntology().getTitle())) {
			provhtml += "<h1>" + lang.getProperty(LANG_PROV1) + " " + c.getMainOntology().getTitle() + " "
					+ lang.getProperty(LANG_PROV2) + " (" + provURI + ")</h1>\n";
		}
		provhtml += "<ul>\n";
		if (!c.getMainOntology().getCreators().isEmpty()) {
			provhtml += "	<li>" + lang.getProperty(LANG_CREATED_BY);
			Iterator<Agent> creators = c.getMainOntology().getCreators().iterator();
			provhtml = appendAgentCollectionAsHtml(provhtml, creators);
			provhtml += "</li>";
		}
		if (!c.getMainOntology().getContributors().isEmpty()) {
			provhtml += "	<li>" + lang.getProperty(LANG_CONTRIBUTED_BY);
			Iterator<Agent> contrib = c.getMainOntology().getContributors().iterator();
			provhtml = appendAgentCollectionAsHtml(provhtml, contrib);

			provhtml += "</li>\n";
		}
		if (c.getMainOntology().getLatestVersion() != null && !"".equals(c.getMainOntology().getLatestVersion())) {
			provhtml += "<li>" + provURI + " " + lang.getProperty(LANG_SPEC) + " "
					+ c.getMainOntology().getLatestVersion() + "</li>\n";
		}
		if (c.getMainOntology().getPreviousVersion() != null && !"".equals(c.getMainOntology().getPreviousVersion())) {
			provhtml += "<li>" + provURI + " " + lang.getProperty(LANG_REV) + " "
					+ c.getMainOntology().getPreviousVersion() + "</li>\n";
		}
		provhtml += "<li>" + lang.getProperty(LANG_RESULT);
		if (c.getMainOntology().getCreationDate() != null && !"".equals(c.getMainOntology().getCreationDate())) {
			provhtml += "<li>" + lang.getProperty(LANG_GENERATED) + " " + c.getMainOntology().getCreationDate();
		}
		provhtml += "</ul>\n" + "</div>\n<p>" + lang.getProperty(LANG_BACK) + " <a href=\"..\\index-"
				+ c.getCurrentLanguage() + ".html\">" + lang.getProperty(LANG_BACK1) + "</a>. <a href=\"provenance-"
				+ c.getCurrentLanguage() + ".ttl\">" + lang.getProperty(LANG_BACK2) + "</a></p>" + "</div>\n</body> \n"
				+ "</html>";
		return provhtml;
	}

	private static String appendAgentCollectionAsHtml(String html, Iterator<Agent> agents) {
		while (agents.hasNext()) {
			Agent currCreator = agents.next();
			html += " " + currCreator.getName();
			if (currCreator.getInstitutionName() != null) {
				html += " (" + currCreator.getInstitutionName() + ")";
			}

			if (agents.hasNext()) {
				html += ",";
			}
		}
		return html;
	}

	public static String getProvenanceRDF(Configuration c) {
		String provURI = c.getMainOntology().getThisVersion();
		if (provURI == null || provURI.equals("")) {
			provURI = "..\\index-" + c.getCurrentLanguage() + ".html";
		}
		String provrdf = "@prefix prov: <http://www.w3.org/ns/prov#> .\n"
				+ "@prefix dc: <http://purl.org/dc/terms/> .\n" 
                                + "@prefix foaf: <http://xmlns.com/foaf/0.1/> .\n"
                                + "@prefix : <> .\n";
		provrdf += "<" + provURI + "> a prov:Entity;\n";
		if (c.getMainOntology().getTitle() != null && !"".equals(c.getMainOntology().getTitle())) {
			provrdf += "\t dc:title \"" + c.getMainOntology().getTitle() + "\";\n";
		}
		String agents = "";
		int i = 0;
		if (!c.getMainOntology().getCreators().isEmpty()) {
			Iterator<Agent> creators = c.getMainOntology().getCreators().iterator();
			while (creators.hasNext()) {
				// me quedo aqui. Hay que cambiar todo. Quizas la responsabilidad puedo pasar, o
				// asumir que todos los agentes itenen uris. Si no es un rollo
				Agent currCreator = creators.next();
				if (currCreator.getURL() != null && !"".equals(currCreator.getURL())) {
					provrdf += "\t prov:wasAttributedTo <" + currCreator.getURL() + ">;\n";
					provrdf += "\t dc:creator <" + currCreator.getURL() + ">;\n";
				} else {
					provrdf += "\t prov:wasAttributedTo :agent" + i + ";\n";// [ a prov:Agent; foaf:name
																			// \""+currCreator.getName()+"\".];\n";
					agents += ":agent" + i + " a prov:Agent; foaf:name \"" + currCreator.getName() + "\".\n";
					i++;
				}
			}
		}
		if (!c.getMainOntology().getContributors().isEmpty()) {
			Iterator<Agent> contrib = c.getMainOntology().getContributors().iterator();
			while (contrib.hasNext()) {
				Agent currContrib = contrib.next();
				if (currContrib.getURL() != null && !"".equals(currContrib.getURL())) {
					provrdf += "\t prov:wasAttributedTo <" + currContrib.getURL() + ">;\n";
					provrdf += "\t dc:contributor <" + currContrib.getURL() + ">;\n";
				} else {
					provrdf += "\t prov:wasAttributedTo :agent" + i + ";\n";// [ a prov:Agent; foaf:name
																			// \""+currContrib.getName()+"\".];\n";
					agents += ":agent" + i + " a prov:Agent; foaf:name \"" + currContrib.getName() + "\".\n";
					i++;
				}
			}
		}
		provrdf += "\t prov:wasAttributedTo <https://github.com/dgarijo/Widoco/>,<http://www.essepuntato.it/lode/>;\n";
		if (c.getMainOntology().getLatestVersion() != null && !"".equals(c.getMainOntology().getLatestVersion())) {
			provrdf += "\t prov:specializationOf <" + c.getMainOntology().getLatestVersion() + ">;\n";
		}
		if (c.getMainOntology().getPreviousVersion() != null && !"".equals(c.getMainOntology().getPreviousVersion())) {
			provrdf += "\t prov:wasRevisionOf <" + c.getMainOntology().getPreviousVersion() + ">;\n";
		}
		if (c.getMainOntology().getCreationDate() != null && !"".equals(c.getMainOntology().getCreationDate())) {
			provrdf += "\t prov:wasGeneratedAt \"" + c.getMainOntology().getCreationDate() + "\";\n";
		}
		provrdf += ".\n";
		provrdf += agents;
		return provrdf;
	}

	public static final String LODE_RESOURCES = "/lode.zip";
	public static final String OOPS_RESOURCES = "/oops.zip";
	public static final String WEBVOWL_RESOURCES = "/webvowl_1.1.7_patched.zip";

	public static final String CONFIG_PATH = "config" + File.separator + "config.properties";

	public static String getEvaluationText(String evaluationContent, Configuration c) {
		String eval = "<!DOCTYPE html>\n" + "<html lang=\"en\">\n" + "  <head>\n" + "    <meta charset=\"UTF-8\">\n"
				+ "    <title>" + c.getMainOntology().getTitle() + "</title>\n"
				+ "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
				+ "    <meta name=\"description\" content=\"Evaluation of the ontology with the OOPS tool.\">\n"
				+ "    <meta name=\"Languaje\" content=\"English\">\n" + "    \n"
				+ "    <script src=\"evaluation/jquery-1.11.0.js\"></script>\n"
				+ "    <script src=\"evaluation/bootstrap.min.js\"></script>\n"
				+ "    <link rel=\"stylesheet\" href=\"evaluation/style.css\" type=\"text/css\" media=\"print, projection, screen\" />\n"
				+ "    <script type=\"text/javascript\" src=\"evaluation/jquery.tablesorter.min.js\"></script>\n"
				+ "    <script type=\"text/javascript\" id=\"js\">\n" + "	    $(document).ready(function() \n"
				+ "		    { \n" + "		    	$(\"#tablesorter-demo\").tablesorter(); \n"
				+ "		    	$('.collapse').collapse({ \n" + "		    	toggle: false\n"
				+ "		    	});\n" + "		    } \n" + "	    ); \n" + "    </script>\n" + "\n"
				+ "    <link href=\"evaluation/bootstrap.css\" rel=\"stylesheet\">\n"
				+ "    <style type=\"text/css\">\n" + "      body {\n" +
				// " padding-top: 60px;\n" +
				"        padding-bottom: 40px;\n" + "      }\n" + "    </style>\n"
				+ "    <link href=\"evaluation/bootstrap-responsive.css\" rel=\"stylesheet\">\n" + "    \n"
				+ "    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->\n" + "    <!--[if lt IE 9]>\n"
				+ "      <script src=\"/dist/js/html5shiv.js\"></script>\n" + "    <![endif]-->\n" + "\n"
				+ "  </head>\n" + "<div class=\"container\">\n" + "<h1> <a href=\"" + c.getOntologyURI()
				+ "\" target=\"_blank\">" + c.getMainOntology().getTitle() + "</a></h1>\n" + "<br>\n"
				+ "<dl class=\"dl-horizontal\">\n" + "<dt>Title</dt>\n" + "<dd><a href=\"" + c.getOntologyURI()
				+ "\" target=\"_blank\">" + c.getMainOntology().getTitle() + "</a></dd>\n" + "<dt>URI</dt>\n"
				+ "<dd><a href=\"" + c.getOntologyURI() + "\" target=\"_blank\">" + c.getOntologyURI() + "</a></dd>\n"
				+ "<dt>Version</dt>\n" + "<dd>" + c.getMainOntology().getRevision() + "</dd>\n" + "</dl>"
				+ "<p> The following evaluation results have been generated by the <a href = \"http://oops-ws.oeg-upm.net/\" target=\"_blank\">RESTFul web service</a> provided by <a href = \"http://oops.linkeddata.es\" target=\"_blank\">OOPS! (OntOlogy Pitfall Scanner!)</a>.</p>"
				+ "<p>\n"
				+ "<a href=\"http://oops.linkeddata.es\" target=\"_blank\"><img src=\"http://vocab.linkeddata.es/ontologies/oops/logomini.png\" alt=\"OOPS! logo\" class=\"img-rounded\" class=\"img-responsive\" /></a>"
				+ "It is obvious that not all the pitfalls are equally important; their impact in the ontology "
				+ "will depend on multiple factors. For this reason, each pitfall has an importance level "
				+ "attached indicating how important it is. We have identified three levels:" + "</p>\n" + "\n"
				+ "<dl class=\"dl-horizontal\">\n" + "<dt><span class=\"label label-danger\">Critical</span></dt>\n"
				+ "<dd>It is crucial to correct the pitfall. Otherwise, it could affect the ontology consistency, reasoning, applicability, etc.</dd>\n"
				+ "\n"
				+ "<dt><span class=\"label label-warning\">Important</span></dt> <dd> Though not critical for ontology function, it is important to correct this type of pitfall.</dd>\n"
				+ "\n"
				+ "<dt><span class=\"label label-minor\">Minor</span></dt> <dd>It is not really a problem, but by correcting it we will make the ontology nicer.</dd>\n"
				+ "</dl>" + evaluationContent +
				// references
				"<p>References:</p>\n" + 
				"    <ul>\n" + 
                "<li>\n"+
				"    [1] Aguado-De Cea, G., Montiel-Ponsoda, E., Poveda-Villalón, M., and Giraldo-Pasmin, O.X. (2015). Lexicalizing Ontologies: The issues behind the labels. In Multimodal communication in the 21st century: Professional and academic challenges. 33rd Conference of the Spanish Association of Applied Linguistics (AESLA), XXXIII AESLA." +
                "</li>\n"+
                "<li>\n"+
				"	[2] Noy, N. F., McGuinness, D. L., et al. (2001). Ontology development 101: A guide to creating your first ontology."+
                "</li>\n"+
                "<li>\n"+
                "	[3] Gómez-Pérez, A. (1999). Evaluation of Taxonomic Knowledge in Ontologies and Knowledge Bases. Proceedings of the Banff Knowledge Acquisition for Knowledge-Based Systems Workshop. Alberta, Canada."+
                "</li>\n"+
                "<li>\n"+
				"	[4] Montiel-Ponsoda, E., Vila Suero, D., Villazón-Terrazas, B., Dunsire, G., Escolano Rodríguez, E., Gómez-Pérez, A. (2011). Style guidelines for naming and labeling ontologies in the multilingual web."+
                "</li>\n"+
                "<li>\n"+
				"	[5] Vrandecic, D. (2010). Ontology Evaluation. PhD thesis."+
                "</li>\n"+
                "<li>\n"+
				"	[6] Gómez-Pérez, A. (2004). Ontology evaluation. In Handbook on ontologies, pages 251-273. Springer."+
                "</li>\n"+
                "<li>\n"+
				"	[7] Rector, A., Drummond, N., Horridge, M., Rogers, J., Knublauch, H., Stevens, R., Wang, H., and Wroe, C. (2004). Owl pizzas: Practical experience of teaching owl-dl: Common errors &amp; common patterns. In Engineering Knowledge in the Age of the Semantic Web, pages 63-81. Springer."+
                "</li>\n"+
                "<li>\n"+
				"	[8] Hogan, A., Harth, A., Passant, A., Decker, S., and Polleres, A. (2010). Weaving the pedantic web. In Proceedings of the WWW2010 Workshop on Linked Data on the Web, LDOW 2010, Raleigh, USA, April 27, 2010."+
                "</li>\n"+
                "<li>\n"+
				"	[9] Archer, P., Goedertier, S., and Loutas, N. (2012). D7. 1.3-study on persistent URIs, with identification of best practices and recommendations on the topic for the Mss and the EC. PwC EU Services."+
                "</li>\n"+
                "<li>\n"+
				"	[10] Bernes-Lee Tim. (2006). “Linked Data - Design issues”. http://www.w3.org/DesignIssues/LinkedData.html"+
                "</li>\n"+
                "<li>\n"+
				"	[11] Heath, T. and Bizer, C. (2011). Linked Data: Evolving the Web into a Global Data Space. Morgan &amp; Claypool, 1st edition."+
                "</li>\n"+
                "<li>\n"+
				"	[12] Vatant, B. (2012). Is your linked data vocabulary 5-star?. http://bvatant.blogspot.fr/2012/02/is-your-linked-data-vocabulary-5-star_9588.html"+
                "</li>\n"+
				  "    </ul>\n" +
				// copy footer here
				"<footer>\n" + "            <div class=\"row\">\n" + "    	<div class=\"col-md-7\">\n"
				+ "    		Developed by 	        <a href = \"http://delicias.dia.fi.upm.es/members/mpoveda/\" target=\"_blank\">Mar&iacutea Poveda</a>\n"
				+ "	        <br>\n"
				+ "    	Built with <a target=\"_blank\" href=\"http://getbootstrap.com/\">Bootstrap</a>\n"
				+ "	        <br>\n"
				+ "           Integration with Widoco by <a href=\"https://w3id.org/people/dgarijo\">Daniel Garijo</a>"
				+ "	        <br>\n" + "        </div>\n" + "    	<div class=\"col-md-5\">\n"
				+ "		<p class=\"text-right\"> Developed with: </p>\n" + "		<p class=\"text-right\">\n"
				+ "     		<a href=\"http://oops.linkeddata.es\" target=\"_blank\"><img src=\"http://vocab.linkeddata.es/ontologies/oops/logomini.png\" alt=\"OOPS! logo\" class=\"img-rounded\" class=\"img-responsive\" /></a>\n"
				+ "    	</p>\n" + "    	</div>\n" + "      </div>\n" + "      </footer>\n"
				+ "    </div> <!-- /container -->\n";
		return eval;
	}

	/**
	 * Method that writes an htaccess file according to the W3C best practices. Note
	 * that hash is different from slash
	 * 
	 * @param c Configuration parameter with the language parameters
	 * @return a String with the htaccess file
	 */
	public static String getHTACCESS(Configuration c) {
		String projectFolder = c.getDocumentationURI()
				.substring(c.getDocumentationURI().lastIndexOf(File.separator) + 1);
		StringBuilder htAccessFile = new StringBuilder(
				"# Turn off MultiViews\n"
				+ "Options -MultiViews\n" + "\n"
				+ "# Directive to ensure *.rdf files served as appropriate content type,\n"
				+ "# if not present in main apache config\n"
				+ "AddType application/rdf+xml .rdf\n"
				+ "AddType application/rdf+xml .owl\n" + "AddType text/turtle .ttl\n"
				+ "AddType application/n-triples .n3\n" + "AddType application/ld+json .jsonld\n"
				+ "# Rewrite engine setup\n" + "RewriteEngine On\n" + "#Change the path to the folder here\n"
				+ "RewriteBase " + c.getRewriteBase() + projectFolder + " \n\n");

		String htmlAccept = "# Rewrite rule to serve HTML content from the vocabulary URI if requested\n"
				+ "RewriteCond %{HTTP_ACCEPT} !application/rdf\\+xml.*(text/html|application/xhtml\\+xml)\n"
				+ "RewriteCond %{HTTP_ACCEPT} text/html [OR]\n"
				+ "RewriteCond %{HTTP_ACCEPT} application/xhtml\\+xml [OR]\n"
				+ "RewriteCond %{HTTP_USER_AGENT} ^Mozilla/.*\n";
		// this depends on whether the vocab is hash or slash!
		if (c.getMainOntology().isHashOntology()) {
			// moving JSON-LD before HTML (only) so HTTP playground apps work (e.g., JSON-LD playground)
			HashMap<String, String> serializations = c.getMainOntology().getSerializations();
			if (serializations.containsKey("JSON-LD")){
				htAccessFile.append("# Rewrite rule to serve JSON-LD content from the vocabulary URI if requested\n");
				htAccessFile.append("# Placed before HTML to support serving JSON-LD from a browser (e.g., JSON Playground)\n");
				htAccessFile.append("RewriteCond %{HTTP_ACCEPT} application/ld\\+json\n");
				htAccessFile.append("RewriteRule ^$ ").append(serializations.get("JSON-LD")).append(" [R=303,L]\n\n");
			}
			htAccessFile.append(htmlAccept);
			htAccessFile.append("RewriteRule ^$ index-").append(c.getCurrentLanguage()).append(".html [R=303,L]\n\n");
			for (String serialization : serializations.keySet()) {
				String comment = "# Rewrite rule to serve "
						+ serialization + " content from the vocabulary URI if requested\n";
				String rewriteCond = "RewriteRule ^$ "+serializations.get(serialization)+" [R=303,L]\n\n";
				switch (serialization) {
					case "RDF/XML":
						htAccessFile.append(comment).append("RewriteCond %{HTTP_ACCEPT} \\*/\\* [OR]\n" +
								"RewriteCond %{HTTP_ACCEPT} application/rdf\\+xml\n").append(rewriteCond);
						break;
					case "TTL":
						htAccessFile.append(comment).append("RewriteCond %{HTTP_ACCEPT} text/turtle [OR]\n"
								+ "RewriteCond %{HTTP_ACCEPT} text/\\* [OR]\n"
								+ "RewriteCond %{HTTP_ACCEPT} \\*/turtle \n").append(rewriteCond);
						break;
					case "N-Triples":
						htAccessFile.append(comment).append("RewriteCond %{HTTP_ACCEPT} application/n-triples\n")
								.append(rewriteCond);
						break;
				}
			}
			htAccessFile.append("RewriteCond %{HTTP_ACCEPT} .+\n"
					+ "RewriteRule ^$ 406.html [R=406,L]\n"
					+ "# Default response\n"
					+ "# ---------------------------\n"
					+ "# Rewrite rule to serve the RDF/XML content from the vocabulary URI by default\n"
					+ "RewriteRule ^$ ").append(serializations.get("RDF/XML")).append(" [R=303,L]");
		} else {// slash (the structure changes a little)
			String normalSerialization, complexSerialization, condition = "";
			String warning = "############################################################################\n"
					+ "### THIS FILE SHOULD BE PLACED ON THE PARENT FOLDER OF THE DOCUMENTATION ###\n"
					+ "### OTHERWISE THE CONTENT NEGOTIATION WILL NOT WORK                      ###\n"
					+ "### THE URL OF YOUR VOCABULARY WILL BE (domain)/" + projectFolder + "/def    ###\n"
					+ "############################################################################\n";
			htAccessFile.insert(0, warning);
			HashMap<String, String> serializations = c.getMainOntology().getSerializations();
			if (serializations.containsKey("JSON-LD")){
				htAccessFile.append("# Rewrite rule to serve JSON-LD content from the vocabulary URI if requested\n");
				htAccessFile.append("# Placed before HTML to support serving JSON-LD from a browser (e.g., JSON Playground)\n");
				condition = "RewriteCond %{HTTP_ACCEPT} application/ld\\+json\n";
				normalSerialization = "RewriteRule ^def$ doc/" + serializations.get("JSON-LD") + " [R=303,L]\n\n";
				complexSerialization = "RewriteRule ^def/(.+)$ doc/" + serializations.get("JSON-LD")
						+ " [R=303,NE,L]\n\n";
				htAccessFile.append(condition).append(normalSerialization).append(condition).append(complexSerialization);
			}
			htAccessFile.append("RewriteRule ^def$ doc/index-").append(c.getCurrentLanguage()).append(".html [R=303,L]\n");
			htAccessFile.append("RewriteCond %{HTTP_ACCEPT} !application/rdf\\+xml.*(text/html|application/xhtml\\+xml)\n" +
					"RewriteCond %{HTTP_ACCEPT} text/html [OR]\n" + "RewriteCond %{HTTP_ACCEPT} application/xhtml\\+xml [OR]\n" +
					"RewriteCond %{HTTP_USER_AGENT} ^Mozilla/.*\n" +
					"RewriteRule ^def/(.+) doc/index-").append(c.getCurrentLanguage()).append(".html#$1 [R=303,NE,L]\n");

			for (String serialization : serializations.keySet()) {
				condition = "";
				String comment = "# Rewrite rule to serve "
						+ serialization + " content from the vocabulary URI if requested\n";
				switch (serialization) {
					case "RDF/XML":
						condition = comment + "RewriteCond %{HTTP_ACCEPT} \\*/\\* [OR]\n"
								+ "RewriteCond %{HTTP_ACCEPT} application/rdf\\+xml\n";
						break;
					case "TTL":
						condition = comment + "RewriteCond %{HTTP_ACCEPT} text/turtle [OR]\n"
								+ "RewriteCond %{HTTP_ACCEPT} text/\\* [OR]\n" + "RewriteCond %{HTTP_ACCEPT} \\*/turtle \n";
						break;
					case "N-Triples":
						condition = comment + "RewriteCond %{HTTP_ACCEPT} application/n-triples\n";
						break;
				}
				normalSerialization = "RewriteRule ^def$ doc/" + serializations.get(serialization) + " [R=303,L]\n\n";
				complexSerialization = "RewriteRule ^def/(.+)$ doc/" + serializations.get(serialization)
						+ " [R=303,NE,L]\n\n";
				if (!condition.isEmpty()) {
					htAccessFile.append(condition).append(normalSerialization).append(condition).append(complexSerialization);
				}
			}
			htAccessFile.append("RewriteCond %{HTTP_ACCEPT} .+\n" + "RewriteRule ^def$ doc/406.html [R=406,L]\n" + "# Default response\n" + "# ---------------------------\n" + "# Rewrite rule to serve the RDF/XML content from the vocabulary URI by default\n" + "RewriteRule ^def$ doc/").append(serializations.get("RDF/XML")).append(" [R=303,L]");
		}
		return htAccessFile.toString();

	}

	/**
	 * Text for the 406 page
	 * 
	 * @param c
	 * @param lang
	 * @return the content of the 406 page
	 */
	public static String get406(Configuration c, Properties lang) {
		String page406 = "<!DOCTYPE HTML PUBLIC \"-//IETF//DTD HTML 2.0//EN\">\n" + "<html><head>\n"
				+ lang.getProperty(LANG_NOT_ACC_PAGE) + "<ul>";
		HashMap<String, String> serializations = c.getMainOntology().getSerializations();
		page406 += "<li><a href=\"index-" + c.getCurrentLanguage() + ".html\">html</a></li>";
		for (String s : serializations.keySet()) {
			page406 += "<li><a href=\"" + serializations.get(s) + "\">" + s + "</a></li>";
		}
		page406 += "</ul>\n" + "\n" + "</body></html>";
		return page406;
	}

	public static String getLegend(
			Properties lang,
			final boolean includesClass,
			final boolean includesProperty,
			final boolean includesDatatypeProperty,
			final boolean includesAnnotation,
			final boolean includesNamedIndividual) {

		// If our ontology is empty, then no point in a legend at all!
		if (!includesClass && !includesProperty && !includesDatatypeProperty &&
				!includesAnnotation && !includesNamedIndividual) {
			return "";
		}

		// TODO: Currently legend has no entry for Annotations - I don't know if this is intended or
		//  not ...?
		return "<div id=\"legend\">\n" + "<h2>" + lang.getProperty(Constants.LANG_LEGEND)
				+ " <span class=\"backlink\"> " + lang.getProperty(Constants.LANG_BACK)
				+ " <a href=\"#toc\">ToC</a></span></h2>\n"
				+ "<div   class=\"entity\">\n"
				+ (includesClass ?
				  "<sup class=\"type-c\" title=\""
				  + lang.getProperty(Constants.LANG_CLASSES)
				  + "\">c</sup>: " + lang.getProperty(Constants.LANG_CLASSES) + " <br/>\n"
				  : "")
				+ (includesProperty ?
				  "<sup class=\"type-op\" title=\""
				  + lang.getProperty(Constants.LANG_OBJ_PROP) + "\">op</sup>: "
				  + lang.getProperty(Constants.LANG_OBJ_PROP) + " <br/>\n"
				  : "")
				+ (includesDatatypeProperty ?
				  "<sup class=\"type-dp\" title=\""
				  + lang.getProperty(Constants.LANG_DATA_PROP) + "\">dp</sup>: "
				  + lang.getProperty(Constants.LANG_DATA_PROP) + " <br/>\n"
				  : "")
				+ (includesNamedIndividual ?
				  "<sup class=\"type-ni\" title=\""
				  + lang.getProperty(Constants.LANG_NAMED_INDIV) + "\">ni</sup>: "
				  + lang.getProperty(Constants.LANG_NAMED_INDIV) + "\n"
				: "")
				+ "</div>\n" + "</div>"
				+ "\n";
	}

	public static String getAnalyticsCode(String code) {
		return "<!-- Global site tag (gtag.js) - Google Analytics -->\n"
				+ "<script async src=\"https://www.googletagmanager.com/gtag/js?id=" + code + "\"></script>\n"
				+ "<script>\n" + "  window.dataLayer = window.dataLayer || [];\n"
				+ "  function gtag(){dataLayer.push(arguments);}\n" + "  gtag('js', new Date());\n" + "\n"
				+ "  gtag('config', '" + code + "');\n" + "</script>";
	}

}
