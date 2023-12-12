<?xml version="1.0" encoding="UTF-8"?>
<!--
This file has been edited by Daniel Garijo and Varun Ratnakar

Copyright (c) 2010-2014, Silvio Peroni <essepuntato@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                exclude-result-prefixes="xs xd dc rdfs schema swrl owl2xml owl xsd swrlb rdf f dcterms vaem osw vann prov obo skos sw"
                xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl" version="2.0"
                xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
                xmlns:schema="http://schema.org/"
                xmlns:swrl="http://www.w3.org/2003/11/swrl#"
                xmlns:owl2xml="http://www.w3.org/2006/12/owl2-xml#"
                xmlns:owl="http://www.w3.org/2002/07/owl#"
                xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
                xmlns:swrlb="http://www.w3.org/2003/11/swrlb#"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:f="http://www.essepuntato.it/xslt/function"
                xmlns:dcterms="http://purl.org/dc/terms/"
                xmlns:vaem="http://www.linkedmodel.org/schema/vaem#"
                xmlns:osw="http://ontosoft.org/software#"
                xmlns:vann="http://purl.org/vocab/vann/"
                xmlns:prov="http://www.w3.org/ns/prov#"
                xmlns:obo="http://purl.obolibrary.org/obo/"
                xmlns:skos="http://www.w3.org/2004/02/skos/core#"
                xmlns:sw="http://www.w3.org/2003/06/sw-vocab-status/ns#"
                xmlns:widoco="https://w3id.org/widoco/vocab#"
                xmlns="http://www.w3.org/1999/xhtml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.oxygenxml.com/ns/doc/xsl
http://www.oxygenxml.com/ns/doc/xsl ">

    <xsl:include href="swrl-module.xsl"/>
    <xsl:include href="common-functions.xsl"/>
    <xsl:include href="structural-reasoner.xsl"/>

    <xsl:output encoding="UTF-8" indent="no" method="xhtml"/>

    <xsl:param name="lang" select="'en'" as="xs:string"/>
    <xsl:param name="css-location" select="'./'" as="xs:string"/>
    <xsl:param name="source" as="xs:string" select="''"/>
    <xsl:param name="ontology-url" as="xs:string" select="''"/>

    <xsl:variable name="def-lang" select="'en'" as="xs:string"/>
    <xsl:variable name="n" select="'\n|\r|\r\n'"/>
    <xsl:variable name="rdf" select="/rdf:RDF" as="element()"/>
    <xsl:variable name="root" select="/" as="node()"/>

    <xsl:variable name="default-labels" select="document(concat($def-lang,'.xml'))"/>
    <xsl:variable name="labels" select="document(concat($lang,'.xml'))"/>
    <xsl:variable name="possible-ontology-urls"
                  select="($ontology-url,concat($ontology-url,'/'),concat($ontology-url,'#'))" as="xs:string+"/>
    <xsl:variable name="mime-types" select="('jpg','image/jpg','jpeg','image/jpg','png','image/png')" as="xs:string+"/>

    <xsl:variable name="prefixes-uris" as="xs:string*">
        <xsl:variable name="declared-prefixes" select="in-scope-prefixes($rdf)" as="xs:string*"/>
        <xsl:variable name="declared-uris"
                      select="for $prefix in $declared-prefixes return xs:string(namespace-uri-for-prefix($prefix,$rdf))"
                      as="xs:string*"/>

        <xsl:variable name="existing-uri"
                      select="for $current in distinct-values(//element()/(@*:about | @*:resource | @*:ID | @*:datatype)) return if (starts-with($current,'http')) then $current else ()"
                      as="xs:string*"/>

        <xsl:variable name="non-declared-uris" as="xs:string*">
            <xsl:variable name="temp-non-declared" as="xs:string*">
                <xsl:for-each select="$existing-uri">
                    <xsl:variable name="index"
                                  select="if (contains(.,'#')) then f:string-first-index-of(.,'#') else f:string-last-index-of(replace(.,'://','---'),'/')"
                                  as="xs:integer?"/>
                    <xsl:if test="exists($index) and substring(.,$index + 1) != ''">
                        <xsl:variable name="ns" select="substring(.,1,$index)" as="xs:string?"/>
                        <xsl:if test="empty($declared-uris[. = $ns])">
                            <xsl:sequence select="xs:string($ns)"/>
                        </xsl:if>
                    </xsl:if>
                </xsl:for-each>
            </xsl:variable>
            <xsl:sequence select="distinct-values($temp-non-declared)"/>
        </xsl:variable>

        <xsl:variable name="non-declared-prefixes" as="xs:string*">
            <xsl:for-each select="$non-declared-uris">
                <xsl:variable name="string" select="substring(.,1,string-length(.) - 1)" as="xs:string"/>
                <xsl:variable name="index" select="f:string-last-index-of($string,'/')" as="xs:integer?"/>
                <xsl:variable name="selected" select="if ($index) then substring($string,$index + 1) else $string"
                              as="xs:string"/>
                <xsl:sequence select="lower-case(replace($selected,'\.|_| |:','-'))"/>
            </xsl:for-each>
        </xsl:variable>

        <xsl:variable name="all-prefixes" select="($declared-prefixes,$non-declared-prefixes)" as="xs:string*"/>
        <xsl:variable name="all-uris" select="($declared-uris,$non-declared-uris)" as="xs:string*"/>

        <xsl:for-each select="1 to count($all-prefixes)">
            <xsl:variable name="i" select="." as="xs:integer"/>
            <xsl:sequence select="($all-prefixes[$i],$all-uris[$i])"/>
        </xsl:for-each>
    </xsl:variable>

    <xsl:template match="rdf:RDF">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <xsl:choose>
                <xsl:when test="owl:Ontology">
                    <xsl:apply-templates select="owl:Ontology"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="structure"/>
                </xsl:otherwise>
            </xsl:choose>
        </html>
    </xsl:template>

    <xsl:template name="htmlhead">
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <link href="{$css-location}owl.css" rel="stylesheet" type="text/css"/>
        <link href="{$css-location}Primer.css" rel="stylesheet" type="text/css"/>
        <link href="{$css-location}rec.css" rel="stylesheet" type="text/css"/>
        <link href="{$css-location}extra.css" rel="stylesheet" type="text/css"/>
        <link rel="shortcut icon" href="{$css-location}favicon.ico"/>
        <script src="{$css-location}jquery.js"><!-- Comment for compatibility --></script>
        <script src="{$css-location}jquery.scrollTo.js"><!-- Comment for compatibility --></script>
        <script src="./marked.min.js"><!-- Comment for compatibility --></script>
        <script>
            $(document).ready(
            function () {
            jQuery(".markdown").each(function(el){jQuery(this).after(marked(jQuery(this).text())).remove()});
            var list = $('a[name="<xsl:value-of select="$ontology-url"/>"]');
            if (list.size() != 0) {
            var element = list.first();
            $.scrollTo(element);
            }
            });
        </script>
    </xsl:template>

    <xsl:template name="structure">
        <xsl:variable name="titles" select="dc:title|dcterms:title" as="element()*"/>
        <head>
            <xsl:choose>
                <xsl:when test="$titles">
                    <xsl:apply-templates select="$titles" mode="head"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="rdfs:label|skos:prefLabel|obo:IAO_0000118" mode="head"/>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:apply-templates mode="head"/>
            <xsl:call-template name="htmlhead"/>
        </head>
        <body>
            <div class="head">
                <xsl:choose>
                    <xsl:when test="$titles">
                        <xsl:apply-templates select="$titles" mode="ontology"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:apply-templates select="rdfs:label|skos:prefLabel|obo:IAO_0000118" mode="ontology"/>
                    </xsl:otherwise>
                </xsl:choose>
                <!--            Not needed as WIDOCO does this
                <xsl:call-template name="get.ontology.url" />
                <xsl:call-template name="get.version" />
                <xsl:call-template name="get.author" />
                <xsl:call-template name="get.publisher" />
                <xsl:call-template name="get.imports" />-->
                <dl>
                    <dt><xsl:value-of select="f:getDescriptionLabel('visualisation')"/>:
                    </dt>
                    <dd>
                        <a href="{$source}?url={$ontology-url}">
                            <xsl:value-of select="f:getDescriptionLabel('ontologysource')"/>
                        </a>
                    </dd>
                </dl>
                <xsl:apply-templates select="dc:rights|dcterms:rights"/>
            </div>
            <hr/>
            <xsl:apply-templates select="rdfs:comment" mode="ontology"/>
            <xsl:call-template name="get.toc"/>
            <xsl:apply-templates select="dc:description[normalize-space() != ''] , dc:description[@*:resource]"
                                 mode="ontology"/>
            <xsl:call-template name="get.classes"/>
            <xsl:call-template name="get.objectproperties"/>
            <xsl:call-template name="get.dataproperties"/>
            <xsl:call-template name="get.namedindividuals"/>
            <xsl:call-template name="get.rules"/>
            <xsl:call-template name="get.annotationproperties"/>
            <xsl:call-template name="get.generalaxioms"/>
            <xsl:call-template name="get.swrlrules"/>
            <xsl:call-template name="get.namespacedeclarations"/>

            <p class="endnote">
                <xsl:value-of select="f:getDescriptionLabel('endnote')"/><xsl:text> </xsl:text>
                <a href="http://www.essepuntato.it/lode">LODE</a>
                <xsl:text>, </xsl:text>
                <em>Live OWL Documentation Environment</em>
                <xsl:text>, </xsl:text><xsl:value-of select="f:getDescriptionLabel('developedby')"/><xsl:text> </xsl:text>
                <a href="http://www.essepuntato.it">Silvio Peroni</a>.
            </p>
        </body>
    </xsl:template>

    <xsl:template match="owl:Ontology">
        <xsl:call-template name="structure"/>
    </xsl:template>

    <xsl:template match="dc:description[f:isInLanguage(.)][normalize-space() != '']" mode="ontology">
        <h2 id="introduction">
            <xsl:value-of select="f:getDescriptionLabel('introduction')"/>
        </h2>
        <xsl:call-template name="get.content"/>
    </xsl:template>

    <xsl:template match="dc:description[@*:resource]" mode="ontology">
        <xsl:variable name="url" select="@*:resource"/>
        <xsl:variable name="index" select="f:string-last-index-of($url,'\.')" as="xs:integer?"/>
        <xsl:variable name="extension" select="substring($url,$index + 1)" as="xs:string?"/>

        <p class="image">
            <!-- <span><xsl:value-of select="$index,$extension,string-length($url)" separator=" - " /></span>  -->
            <object data="{@*:resource}">
                <xsl:if test="$extension != ''">
                    <xsl:variable name="mime" select="$mime-types[index-of($mime-types,$extension) + 1]"
                                  as="xs:string?"/>
                    <xsl:if test="$mime != ''">
                        <xsl:attribute name="type" select="$mime"/>
                    </xsl:if>
                </xsl:if>
            </object>
        </p>
    </xsl:template>

    <xsl:template match="dc:description[f:isInLanguage(.)][normalize-space() != '']">
        <div class="info">
            <xsl:call-template name="get.content"/>
        </div>
    </xsl:template>

    <xsl:template match="dc:description[@*:resource]">
        <xsl:variable name="url" select="@*:resource"/>
        <xsl:variable name="index" select="f:string-last-index-of($url,'.')" as="xs:integer?"/>
        <xsl:variable name="extension" select="substring($url,$index + 1)" as="xs:string?"/>

        <p class="image">
            <object data="{@*:resource}">
                <xsl:if test="$extension != ''">
                    <xsl:variable name="mime" select="$mime-types[index-of($mime-types,$extension) + 1]"
                                  as="xs:string?"/>
                    <xsl:if test="$mime != ''">
                        <xsl:attribute name="type" select="$mime"/>
                    </xsl:if>
                </xsl:if>
            </object>
        </p>
    </xsl:template>

    <xsl:template match="rdfs:comment[f:isInLanguage(.)]" mode="ontology">
        <h2>
            <xsl:value-of select="f:getDescriptionLabel('abstract')"/>
        </h2>
        <xsl:call-template name="get.content"/>
    </xsl:template>

    <xsl:template
            match="rdfs:comment[f:isInLanguage(.)] | prov:definition[f:isInLanguage(.)] | skos:definition[f:isInLanguage(.)] |obo:IAO_0000115[f:isInLanguage(.)]">
        <div class="comment">
            <xsl:call-template name="get.content"/>
        </div>
    </xsl:template>

    <xsl:template match="dc:rights[f:isInLanguage(.)]|dcterms:rights[ancestor::owl:Ontology][f:isInLanguage(.)]">
        <div class="copyright">
            <xsl:call-template name="get.content"/>
        </div>
    </xsl:template>

    <xsl:template match="dc:title[f:isInLanguage(.)] | dcterms:title[f:isInLanguage(.)]" mode="ontology">
        <h1>
            <xsl:call-template name="get.title"/>
        </h1>
    </xsl:template>

    <xsl:template
            match="rdfs:label[f:isInLanguage(.)] | skos:prefLabel[f:isInLanguage(.)] | obo:IAO_0000118[f:isInLanguage(.)]"
            mode="ontology">
        <h1>
            <xsl:call-template name="get.title"/>
        </h1>
    </xsl:template>

    <xsl:template match="owl:imports">
        <dd>
            <a href="{@*:resource}">
                <xsl:value-of select="@*:resource"/>
            </a>
            <xsl:text> (</xsl:text>
            <a href="http://www.essepuntato.it/lode/owlapi/{@*:resource}">
                <xsl:value-of select="f:getDescriptionLabel('visualiseitwith')"/> LODE
            </a>
            <xsl:text>)</xsl:text>
        </dd>
    </xsl:template>

    <xsl:template match="dc:title[f:isInLanguage(.)]">
        <xsl:call-template name="get.title"/>
    </xsl:template>

    <xsl:template match="dc:date|dcterms:date[ancestor::owl:Ontology]">
        <dt><xsl:value-of select="f:getDescriptionLabel('date')"/>:
        </dt>
        <dd>
            <xsl:choose>
                <xsl:when test="matches(.,'\d\d\d\d-\d\d-\d\d')">
                    <xsl:variable name="tokens" select="tokenize(.,'-')"/>
                    <xsl:value-of select="$tokens[3],$tokens[2],$tokens[1]" separator="/"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates/>
                </xsl:otherwise>
            </xsl:choose>
        </dd>
    </xsl:template>

    <xsl:template match="owl:versionInfo[f:isInLanguage(.)]">
        <dt><xsl:value-of select="f:getDescriptionLabel('currentversion')"/>:
        </dt>
        <dd>
            <xsl:apply-templates/>
        </dd>
    </xsl:template>

    <xsl:template match="owl:priorVersion | owl:backwardCompatibleWith | owl:incompatibleWith">
        <xsl:variable name="versionLabel"
                      select="if (self::owl:priorVersion) then 'previousversion' else if (self::owl:backwardCompatibleWith) then 'backwardcompatiblewith' else 'incompatibleWith'"/>
        <dt><xsl:value-of select="f:getDescriptionLabel($versionLabel)"/>:
        </dt>
        <dd>
            <xsl:choose>
                <xsl:when test="exists(@*:resource)">
                    <a href="{@*:resource}">
                        <xsl:value-of select="@*:resource"/>
                    </a>
                    <xsl:text> (</xsl:text>
                    <a href="http://www.essepuntato.it/lode/owlapi/{@*:resource}">
                        <xsl:value-of select="f:getDescriptionLabel('visualiseitwith')"/> LODE
                    </a>
                    <xsl:text>)</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates/>
                </xsl:otherwise>
            </xsl:choose>
        </dd>
    </xsl:template>

    <xsl:template
            match="dc:creator|dc:contributor|dcterms:creator[ancestor::owl:Ontology]|dcterms:contributor[ancestor::owl:Ontology]|dc:publisher[ancestor::owl:Ontology]|dcterms:publisher[ancestor::owl:Ontology]">
        <xsl:choose>
            <xsl:when test="@*:resource">
                <dd>
                    <a href="{@*:resource}">
                        <xsl:value-of select="@*:resource"/>
                    </a>
                </dd>
            </xsl:when>
            <xsl:otherwise>
                <dd>
                    <xsl:apply-templates/>
                </dd>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="dc:title[f:isInLanguage(.)]|dcterms:title[f:isInLanguage(.)]" mode="head">
        <title>
            <xsl:value-of select="tokenize(.//text(),$n)[1]"/>
        </title>
    </xsl:template>

    <xsl:template
            match="rdfs:label[f:isInLanguage(.)] | skos:prefLabel[f:isInLanguage(.)] | obo:IAO_0000118[f:isInLanguage(.)]"
            mode="head">
        <title>
            <xsl:value-of select="tokenize(.//text(),$n)[1]"/>
        </title>
    </xsl:template>

    <xsl:template match="element()|text()" mode="head"/>
    <xsl:template match="element()" mode="ontology"/>
    <xsl:template match="element()|text()[normalize-space() = '']"/>

    <xsl:template match="owl:Class|rdfs:Class">
        <div id="{generate-id()}" class="entity">
            <xsl:call-template name="get.entity.name">
                <xsl:with-param name="toc" select="'classes'" tunnel="yes" as="xs:string"/>
                <xsl:with-param name="toc.string" select="f:getDescriptionLabel('classtoc')" tunnel="yes"
                                as="xs:string"/>
            </xsl:call-template>
            <xsl:call-template name="get.entity.url"/>
            <xsl:apply-templates select="rdfs:comment|prov:definition|skos:definition|obo:IAO_0000115"/>
            <xsl:apply-templates select="dc:description[normalize-space() != ''] , dc:description[@*:resource]"/>
            <xsl:call-template name="get.entity.metadata"/>
            <xsl:call-template name="get.rationale"/>
            <xsl:call-template name="get.example"/>
            <xsl:call-template name="get.class.description"/>
        </div>
    </xsl:template>

    <xsl:template match="owl:NamedIndividual">
        <div id="{generate-id()}" class="entity">
            <xsl:call-template name="get.entity.name">
                <xsl:with-param name="toc" select="'namedindividuals'" tunnel="yes" as="xs:string"/>
                <xsl:with-param name="toc.string" select="f:getDescriptionLabel('namedindividualtoc')" tunnel="yes"
                                as="xs:string"/>
            </xsl:call-template>
            <xsl:call-template name="get.entity.url"/>
            <xsl:apply-templates select="rdfs:comment|prov:definition|skos:definition|obo:IAO_0000115"/>
            <xsl:apply-templates select="dc:description[normalize-space() != ''] , dc:description[@*:resource]"/>
            <xsl:call-template name="get.entity.metadata"/>
            <xsl:call-template name="get.individual.description"/>
        </div>
    </xsl:template>

    <xsl:template match="owl:ObjectProperty | owl:DatatypeProperty | owl:AnnotationProperty">
        <div id="{generate-id()}" class="entity">
            <xsl:call-template name="get.entity.name">
                <xsl:with-param name="toc"
                                select="if (self::owl:ObjectProperty) then 'objectproperties' else if (self::owl:AnnotationProperty) then 'annotationproperties' else 'dataproperties'"
                                tunnel="yes" as="xs:string"/>
                <xsl:with-param name="toc.string"
                                select="if (self::owl:ObjectProperty) then f:getDescriptionLabel('objectpropertytoc') else if (self::owl:AnnotationProperty) then f:getDescriptionLabel('annotationpropertytoc') else f:getDescriptionLabel('datapropertytoc')"
                                tunnel="yes" as="xs:string"/>
            </xsl:call-template>
            <xsl:call-template name="get.entity.url"/>
            <xsl:apply-templates select="rdfs:comment|prov:definition|skos:definition|obo:IAO_0000115"/>
            <xsl:apply-templates select="dc:description[normalize-space() != ''] , dc:description[@*:resource]"/>
            <xsl:call-template name="get.entity.metadata"/>
            <xsl:call-template name="get.rationale"/>
            <xsl:call-template name="get.example"/>
            <xsl:call-template name="get.property.description"/>
        </div>
    </xsl:template>

    <xsl:template match="rdfs:domain|schema:domainIncludes | rdfs:range|schema:rangeIncludes">
        <dd>
            <xsl:apply-templates select="@*:resource | element()">
                <xsl:with-param name="type" select="'class'" as="xs:string" tunnel="yes"/>
            </xsl:apply-templates>
        </dd>
    </xsl:template>

    <xsl:template match="owl:propertyChainAxiom">
        <dd>
            <xsl:for-each select="element()">
                <xsl:apply-templates select="."/>
                <xsl:if test="position() != last()">
                    <xsl:text> </xsl:text>
                    <span class="logic">o</span>
                    <xsl:text> </xsl:text>
                </xsl:if>
            </xsl:for-each>
        </dd>
    </xsl:template>

    <xsl:template match="owl:inverseOf">
        <span class="logic">inverse</span>
        <xsl:text> </xsl:text>
        <xsl:apply-templates select="@*:resource"/>
    </xsl:template>

    <xsl:template
            match="rdfs:label[f:isInLanguage(.)] | skos:prefLabel[f:isInLanguage(.)] | obo:IAO_0000118[f:isInLanguage(.)]">
        <h3>
            <xsl:apply-templates/>
            <xsl:call-template name="get.entity.type.descriptor">
                <xsl:with-param name="iri" select="ancestor::element()/(@*:about|@*:ID)"/>
            </xsl:call-template>
            <xsl:if test="exists(dc:title[f:isInLanguage(.)])">
                <br/>
                <xsl:apply-templates select="dc:title"/>
            </xsl:if>
            <xsl:call-template name="get.backlink"/>
        </h3>
    </xsl:template>

    <xsl:template match="element()" mode="toc">
        <li>
            <a href="#{generate-id()}" title="{@*:about|@*:ID}">
                <xsl:choose>
                    <!--<xsl:when test="exists(rdfs:label|skos:prefLabel|obo:IAO_0000118)">
                        <xsl:value-of
                                select="rdfs:label[f:isInLanguage(.)] | skos:prefLabel[f:isInLanguage(.)] | obo:IAO_0000118[f:isInLanguage(.)]"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <span>
                            <xsl:value-of select="f:getLabel(@*:about|@*:ID)"/>
                        </span>
                    </xsl:otherwise>
                </xsl:choose>-->
                    <xsl:when test="exists(rdfs:label|skos:prefLabel|obo:IAO_0000118)">
                        <xsl:choose>
                            <xsl:when test="exists(rdfs:label[f:isInLanguage(.)])">
                                <xsl:value-of select="rdfs:label[f:isInLanguage(.)][1]"/>
                            </xsl:when>
                            <xsl:when test="exists(skos:prefLabel[f:isInLanguage(.)])">
                                <xsl:value-of select="skos:prefLabel[f:isInLanguage(.)][1]"/>
                            </xsl:when>
                            <xsl:when test="exists(obo:IAO_0000118[f:isInLanguage(.)])">
                                <xsl:value-of select="obo:IAO_0000118[f:isInLanguage(.)][1]"/>
                            </xsl:when>
                        </xsl:choose>
                    </xsl:when>
                    <xsl:otherwise>
                        <span>
                            <xsl:value-of select="f:getLabel(@*:about|@*:ID)"/>
                        </span>
                    </xsl:otherwise>
                </xsl:choose>
            </a>
        </li>
    </xsl:template>

    <xsl:template match="owl:equivalentClass | rdfs:subClassOf | rdfs:subPropertyOf">
        <xsl:param name="list" select="true()" tunnel="yes" as="xs:boolean"/>
        <xsl:choose>
            <xsl:when test="$list">
                <dd>
                    <xsl:apply-templates select="attribute() | element()"/>
                </dd>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates select="attribute() | element()"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="owl:hasKey">
        <dd>
            <xsl:for-each select="element()">
                <xsl:if test="exists(preceding-sibling::element())">
                    <xsl:text> , </xsl:text>
                </xsl:if>
                <xsl:apply-templates select=".">
                    <xsl:with-param name="type" select="'property'" as="xs:string" tunnel="yes"/>
                </xsl:apply-templates>
            </xsl:for-each>
        </dd>
    </xsl:template>

    <xsl:template match="rdf:type">
        <dd>
            <xsl:apply-templates select="@*:resource"/>
        </dd>
    </xsl:template>

    <xsl:template match="@*:about | @*:resource | @*:ID | @*:datatype">
        <xsl:param name="type" select="''" as="xs:string" tunnel="yes"/>

        <xsl:variable name="anchor" select="f:findEntityId(.,$type)" as="xs:string"/>
        <xsl:variable name="label" select="f:getLabel(.)" as="xs:string"/>
        <xsl:choose>
            <xsl:when test="$anchor = ''">
                <!-- Change to make the external links open in a new window 
                instead of being dotted
                <span class="dotted" title="{.}">
                    <xsl:value-of select="$label" />
                </span>
                -->
                <a href="{.}" title="{.}" target="_blank">
                    <xsl:value-of select="$label"/>
                </a>
            </xsl:when>
            <xsl:otherwise>
                <a href="#{$anchor}" title="{.}">
                    <xsl:value-of select="$label"/>
                </a>
            </xsl:otherwise>
        </xsl:choose>
        <xsl:call-template name="get.entity.type.descriptor">
            <xsl:with-param name="iri" select="." as="xs:string"/>
        </xsl:call-template>
    </xsl:template>

    <xsl:function name="f:findEntityId" as="xs:string">
        <xsl:param name="iri" as="xs:string"/>
        <xsl:param name="type" as="xs:string"/>

        <xsl:variable name="el"
                      select="$root//rdf:RDF/element()[(@*:about = $iri or @*:ID = $iri) and exists(element())]"
                      as="element()*"/>
        <xsl:choose>
            <xsl:when test="exists($el)">
                <xsl:choose>
                    <xsl:when test="$type = 'class'">
                        <xsl:value-of select="generate-id($el[local-name() = 'Class'][1])"/>
                    </xsl:when>
                    <xsl:when test="$type = 'property'">
                        <xsl:value-of
                                select="generate-id($el[local-name() = 'ObjectProperty' or local-name() = 'DatatypeProperty'][1])"/>
                    </xsl:when>
                    <xsl:when test="$type = 'annotation'">
                        <xsl:value-of select="generate-id($el[local-name() = 'AnnotationProperty'][1])"/>
                    </xsl:when>
                    <xsl:when test="$type = 'individual'">
                        <xsl:value-of select="generate-id($el[local-name() = 'NamedIndividual'][1])"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="generate-id($el[1])"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="''"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:function>

    <!-- <xsl:function name="f:getLabel" as="xs:string">
        <xsl:param name="iri" as="xs:string" />
        
        <xsl:variable name="node" select="$root//rdf:RDF/element()[(@*:about = $iri or @*:ID = $iri) and exists(rdfs:label)][1]" as="element()*" />
        <xsl:choose>
            <xsl:when test="exists($node/rdfs:label)">
                <xsl:value-of select="$node/rdfs:label[f:isInLanguage(.)]" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:variable name="prefix" select="f:getPrefixFromIRI($iri)" as="xs:string*" />
                <xsl:choose>
                    <xsl:when test="empty($prefix)">
                        <xsl:value-of select="$iri" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="concat($prefix,':',substring-after($iri, $prefixes-uris[index-of($prefixes-uris,$prefix)[1] + 1]))" />
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:function> -->
    <xsl:function name="f:getLabel" as="xs:string">
        <xsl:param name="iri" as="xs:string"/>

        <xsl:variable name="node"
                      select="$root//rdf:RDF/element()[(@*:about = $iri or @*:ID = $iri) and exists(rdfs:label|skos:prefLabel|obo:IAO_0000118)][1]"
                      as="element()*"/>
        <!-- Modified to include only one type of label if multiple are availble.
        <xsl:choose>
            <xsl:when test="exists($node/rdfs:label|$node/skos:prefLabel|$node/obo:IAO_0000118)">
                <xsl:value-of
                        select="$node/rdfs:label[f:isInLanguage(.)] | $node/skos:prefLabel[f:isInLanguage(.)] | $node/obo:IAO_0000118[f:isInLanguage(.)]"/>
            </xsl:when>
            -->
        <xsl:variable name="labelNode">
            <xsl:for-each select="$node">
                <xsl:choose>
                    <xsl:when test="exists(rdfs:label[f:isInLanguage(.)])">
                        <xsl:sequence select="rdfs:label[f:isInLanguage(.)]"/>
                    </xsl:when>
                    <xsl:when test="exists(skos:prefLabel[f:isInLanguage(.)])">
                        <xsl:sequence select="skos:prefLabel[f:isInLanguage(.)]"/>
                    </xsl:when>
                    <xsl:when test="exists(obo:IAO_0000118[f:isInLanguage(.)])">
                        <xsl:sequence select="obo:IAO_0000118[f:isInLanguage(.)]"/>
                    </xsl:when>
                </xsl:choose>
            </xsl:for-each>
        </xsl:variable>

        <xsl:choose>
            <xsl:when test="string-length(normalize-space($labelNode)) &gt; 0">
                <xsl:value-of select="$labelNode"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:variable name="localName" as="xs:string?">
                    <xsl:variable
                            name="current-index"
                            select="if (contains($iri,'#'))
                                    then f:string-first-index-of($iri,'#') 
                                    else f:string-last-index-of(replace($iri,'://','---'),'/')"
                            as="xs:integer?"/>
                    <xsl:if test="exists($current-index) and string-length($iri) != $current-index">
                        <xsl:sequence select="substring($iri,$current-index + 1)"/>
                    </xsl:if>
                </xsl:variable>

                <xsl:choose>
                    <xsl:when test="string-length($localName) = 0">
                        <xsl:variable name="prefix" select="f:getPrefixFromIRI($iri)" as="xs:string*"/>
                        <xsl:choose>
                            <xsl:when test="empty($prefix)">
                                <xsl:value-of select="$iri"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of
                                        select="concat($prefix,':',substring-after($iri, $prefixes-uris[index-of($prefixes-uris,$prefix)[1] + 1]))"/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:variable name="camelCase" select="replace($localName,'([A-Z])',' $1')"/>
                        <xsl:variable name="underscoreOrDash" select="replace($camelCase,'(_|-)',' ')"/>
                        <xsl:value-of select="normalize-space(lower-case($underscoreOrDash))"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:function>

    <xsl:template
            match="owl:Class[not(parent::rdf:RDF)] | rdfs:Class[not(parent::rdf:RDF)] | rdfs:Datatype[not(parent::rdf:RDF)] | owl:DataRange[not(parent::rdf:RDF)]">
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="owl:Restriction">
        <xsl:call-template name="exec.owlRestriction"/>
    </xsl:template>

    <xsl:template match="owl:oneOf">
        <xsl:text>{ </xsl:text>
        <xsl:for-each select="element()">
            <xsl:apply-templates select=".">
                <xsl:with-param name="type" select="'namedindividual'" tunnel="yes"/>
            </xsl:apply-templates>
            <xsl:if test="position() != last()">
                <xsl:text> , </xsl:text>
            </xsl:if>
        </xsl:for-each>
        <xsl:text> }</xsl:text>
    </xsl:template>

    <xsl:template
            match="rdf:Description[rdf:type/@*:resource = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#List'] | rdf:List">
        <xsl:apply-templates select="rdf:first , rdf:rest"/>
    </xsl:template>

    <xsl:template match="rdf:first">
        <xsl:choose>
            <xsl:when test="normalize-space()">
                <xsl:text>"</xsl:text>
                <xsl:value-of select="normalize-space()"/>
                <xsl:text>"</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates select="@*:resource"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="rdf:rest">
        <xsl:if test="rdf:Description[rdf:type/@*:resource = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#List'] | rdf:List">
            <xsl:text> , </xsl:text>
        </xsl:if>
        <xsl:apply-templates
                select="rdf:Description[rdf:type/@*:resource = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#List'] | rdf:List"/>
    </xsl:template>

    <xsl:template
            match="/rdf:RDF/rdf:Description[exists(rdf:type[@*:resource = 'http://www.w3.org/2002/07/owl#AllDisjointClasses'])]">
        <div id="{generate-id()}" class="entity">
            <h3>
                <xsl:value-of select="f:getDescriptionLabel('disjointclasses')"/><xsl:text> </xsl:text>
                <xsl:call-template name="get.backlink"/>
            </h3>
            <p>
                <xsl:for-each select="owl:members/rdf:Description/(@*:about|@*:ID)">
                    <xsl:apply-templates select=".">
                        <xsl:with-param name="type" select="'class'" as="xs:string" tunnel="yes"/>
                    </xsl:apply-templates>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </p>
        </div>
    </xsl:template>

    <xsl:template match="/rdf:RDF/owl:Restriction[exists(rdfs:subClassOf)]">
        <div id="{generate-id()}" class="entity">
            <h3>
                <xsl:value-of select="f:getDescriptionLabel('subclassdefinition')"/><xsl:text> </xsl:text>
                <xsl:call-template name="get.backlink"/>
            </h3>
            <p>
                <xsl:call-template name="exec.owlRestriction"/>
                <strong>
                    <xsl:text> </xsl:text><xsl:value-of select="f:getDescriptionLabel('issubclassof')"/>
                </strong>
            </p>
            <p style="text-align:right">
                <xsl:apply-templates select="rdfs:subClassOf">
                    <xsl:with-param name="list" select="false()" tunnel="yes"/>
                </xsl:apply-templates>
            </p>
        </div>
    </xsl:template>

    <xsl:template match="/rdf:RDF/owl:Restriction[exists(owl:equivalentClass)]">
        <div id="{generate-id()}" class="entity">
            <h3>
                <xsl:value-of select="f:getDescriptionLabel('equivalentdefinition')"/><xsl:text> </xsl:text>
                <xsl:call-template name="get.backlink"/>
            </h3>
            <p>
                <xsl:call-template name="exec.owlRestriction"/>
                <strong>
                    <xsl:text> </xsl:text><xsl:value-of select="f:getDescriptionLabel('isequivalentto')"/>
                </strong>
            </p>
            <p style="text-align:right">
                <xsl:apply-templates select="owl:equivalentClass">
                    <xsl:with-param name="list" select="false()" tunnel="yes"/>
                </xsl:apply-templates>
            </p>
        </div>
    </xsl:template>

    <xsl:template name="exec.owlRestriction">
        <xsl:apply-templates select="owl:onProperty"/>
        <xsl:apply-templates
                select="element()[not(self::owl:onProperty|self::owl:onClass|self::rdfs:subClassOf|self::owl:equivalentClass)]"/>
        <xsl:apply-templates select="owl:onClass"/>
    </xsl:template>

    <xsl:template match="/rdf:RDF/owl:Class [empty(@*:about | @*:ID) and exists(rdfs:subClassOf)] |
                         /rdf:RDF/rdfs:Class[empty(@*:about | @*:ID) and exists(rdfs:subClassOf)]">
        <div id="{generate-id()}" class="entity">
            <h3>
                <xsl:value-of select="f:getDescriptionLabel('subclassdefinition')"/><xsl:text> </xsl:text>
                <xsl:call-template name="get.backlink"/>
            </h3>
            <p>
                <xsl:apply-templates select="element()[not(self::rdfs:subClassOf)]"/>
                <strong>
                    <xsl:text> </xsl:text><xsl:value-of select="f:getDescriptionLabel('issubclassof')"/>
                </strong>
            </p>
            <p style="text-align:right">
                <xsl:apply-templates select="rdfs:subClassOf">
                    <xsl:with-param name="list" select="false()" tunnel="yes"/>
                </xsl:apply-templates>
            </p>
        </div>
    </xsl:template>

    <xsl:template match="/rdf:RDF/owl:Class [empty(@*:about | @*:ID) and exists(owl:equivalentClass)] |
                         /rdf:RDF/rdfs:Class[empty(@*:about | @*:ID) and exists(owl:equivalentClass)]">
        <div id="{generate-id()}" class="entity">
            <h3>
                <xsl:value-of select="f:getDescriptionLabel('equivalentdefinition')"/><xsl:text> </xsl:text>
                <xsl:call-template name="get.backlink"/>
            </h3>
            <p>
                <xsl:apply-templates select="element()[not(self::owl:equivalentClass)]"/>
                <strong>
                    <xsl:text> </xsl:text><xsl:value-of select="f:getDescriptionLabel('isequivalentto')"/>
                </strong>
            </p>
            <p style="text-align:right">
                <xsl:apply-templates select="owl:equivalentClass">
                    <xsl:with-param name="list" select="false()" tunnel="yes"/>
                </xsl:apply-templates>
            </p>
        </div>
    </xsl:template>

    <xsl:template match="rdf:type[@*:resource = 'http://www.w3.org/2002/07/owl#FunctionalProperty']">
        <xsl:value-of select="f:getDescriptionLabel('functional')"/>
    </xsl:template>

    <xsl:template match="rdf:type[@*:resource = 'http://www.w3.org/2002/07/owl#InverseFunctionalProperty']">
        <xsl:value-of select="f:getDescriptionLabel('inversefunctional')"/>
    </xsl:template>

    <xsl:template match="rdf:type[@*:resource = 'http://www.w3.org/2002/07/owl#ReflexiveProperty']">
        <xsl:value-of select="f:getDescriptionLabel('reflexive')"/>
    </xsl:template>

    <xsl:template match="rdf:type[@*:resource = 'http://www.w3.org/2002/07/owl#IrreflexiveProperty']">
        <xsl:value-of select="f:getDescriptionLabel('irreflexive')"/>
    </xsl:template>

    <xsl:template match="rdf:type[@*:resource = 'http://www.w3.org/2002/07/owl#SymmetricProperty']">
        <xsl:value-of select="f:getDescriptionLabel('symmetric')"/>
    </xsl:template>

    <xsl:template match="rdf:type[@*:resource = 'http://www.w3.org/2002/07/owl#AsymmetricProperty']">
        <xsl:value-of select="f:getDescriptionLabel('asymmetric')"/>
    </xsl:template>

    <xsl:template match="rdf:type[@*:resource = 'http://www.w3.org/2002/07/owl#TransitiveProperty']">
        <xsl:value-of select="f:getDescriptionLabel('transitive')"/>
    </xsl:template>

    <xsl:template match="owl:hasValue">
        <xsl:call-template name="get.cardinality.formula">
            <xsl:with-param name="type" select="'namedindividual'" tunnel="yes"/>
            <xsl:with-param name="op" select="'value'" as="xs:string"/>
        </xsl:call-template>
    </xsl:template>

    <xsl:template match="owl:cardinality | owl:qualifiedCardinality">
        <xsl:call-template name="get.cardinality.formula">
            <xsl:with-param name="op" select="'exactly'" as="xs:string"/>
        </xsl:call-template>
    </xsl:template>

    <xsl:template match="owl:maxCardinality | owl:maxQualifiedCardinality">
        <xsl:call-template name="get.cardinality.formula">
            <xsl:with-param name="op" select="'max'" as="xs:string"/>
        </xsl:call-template>
    </xsl:template>

    <xsl:template match="owl:minCardinality | owl:minQualifiedCardinality">
        <xsl:call-template name="get.cardinality.formula">
            <xsl:with-param name="op" select="'min'" as="xs:string"/>
        </xsl:call-template>
    </xsl:template>

    <xsl:template name="get.cardinality.formula">
        <xsl:param name="op" as="xs:string"/>
        <xsl:text> </xsl:text>
        <span class="logic">
            <xsl:value-of select="$op"/>
        </span>
        <xsl:text> </xsl:text>
        <xsl:choose>
            <xsl:when test="@*:resource">
                <xsl:apply-templates select="@*:resource"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="."/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="owl:onClass">
        <xsl:text> </xsl:text>
        <xsl:apply-templates select="@*:resource">
            <xsl:with-param name="type" as="xs:string" tunnel="yes" select="'class'"/>
        </xsl:apply-templates>
    </xsl:template>

    <xsl:template match="owl:onProperty">
        <xsl:apply-templates select="@*:resource|rdf:Description/owl:inverseOf">
            <xsl:with-param name="type" as="xs:string" tunnel="yes" select="'property'"/>
        </xsl:apply-templates>
    </xsl:template>

    <xsl:template match="owl:allValuesFrom | owl:someValuesFrom">
        <xsl:variable name="logic" select="if (self::owl:allValuesFrom) then 'only' else 'some'" as="xs:string"/>
        <xsl:text> </xsl:text>
        <span class="logic">
            <xsl:value-of select="$logic"/>
        </span>
        <xsl:text> </xsl:text>
        <xsl:choose>
            <xsl:when test="exists(@*:resource)">
                <xsl:apply-templates select="@*:resource"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="rdf:Description">
        <xsl:apply-templates select="@*:about|@*:ID"/>
    </xsl:template>

    <xsl:template match="owl:intersectionOf">
        <xsl:call-template name="get.logical.formula">
            <xsl:with-param name="op" select="'and'" as="xs:string"/>
        </xsl:call-template>
    </xsl:template>

    <xsl:template match="owl:unionOf">
        <xsl:call-template name="get.logical.formula">
            <xsl:with-param name="op" select="'or'" as="xs:string"/>
        </xsl:call-template>
    </xsl:template>

    <xsl:template match="owl:complementOf">
        <span class="logic">not</span>
        <xsl:text> (</xsl:text>
        <xsl:apply-templates select="element() | @*:resource"/>
        <xsl:text>)</xsl:text>
    </xsl:template>

    <xsl:template name="get.logical.formula">
        <xsl:param name="op" as="xs:string"/>
        <xsl:for-each select="element()">
            <xsl:choose>
                <xsl:when test="self::rdf:Description">
                    <xsl:apply-templates select="."/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>(</xsl:text>
                    <xsl:apply-templates select="."/>
                    <xsl:text>)</xsl:text>
                </xsl:otherwise>
            </xsl:choose>

            <xsl:if test="position() != last()">
                <xsl:text> </xsl:text>
                <span class="logic">
                    <xsl:value-of select="$op"/>
                </span>
                <xsl:text> </xsl:text>
            </xsl:if>
        </xsl:for-each>
    </xsl:template>

    <xsl:template name="get.entity.metadata">
        <xsl:call-template name="get.skos.editorial.note"/>
        <xsl:call-template name="get.version"/>
        <xsl:call-template name="get.author"/>
        <xsl:call-template name="get.original.source"/>
        <xsl:call-template name="get.source"/>
        <xsl:call-template name="get.termStatus"/>
        <xsl:call-template name="get.deprecated"/>
        <xsl:call-template name="get.rule.antecedent"/>
        <xsl:call-template name="get.rule.consequent"/>
    </xsl:template>

    <xsl:template name="get.original.source">
        <xsl:if test="exists(rdfs:isDefinedBy)">
            <dl class="definedBy">
                <dt>
                    <xsl:value-of select="f:getDescriptionLabel('isdefinedby')"/>
                </dt>
                <xsl:for-each select="rdfs:isDefinedBy">
                    <dd>
                        <xsl:choose>
                            <xsl:when test="normalize-space(@*:resource) = ''">
                                <!--<xsl:value-of select="$ontology-url"/>-->
                                <xsl:value-of select="text()"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <a href="{@*:resource}">
                                    <xsl:value-of select="@*:resource"/>
                                </a>
                            </xsl:otherwise>
                        </xsl:choose>
                    </dd>
                </xsl:for-each>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.class.description">
        <xsl:if test="exists(rdfs:subClassOf | owl:hasKey) or f:hasDisjoints(.) or f:hasMembers(.) or f:hasSubclasses(.) or f:isInDomain(.) or f:isInRange(.) or f:hasEquivalent(.) or f:hasSameAs(.) or f:hasPunning(.)">
            <dl class="description">
                <xsl:call-template name="get.class.equivalent"/>
                <xsl:call-template name="get.class.superclasses"/>
                <xsl:call-template name="get.class.subclasses"/>
                <xsl:call-template name="get.class.indomain"/>
                <xsl:call-template name="get.class.inrange"/>
                <xsl:call-template name="get.class.members"/>
                <xsl:call-template name="get.class.keys"/>
                <xsl:call-template name="get.entity.sameas">
                    <xsl:with-param name="type" select="'class'" tunnel="yes"/>
                </xsl:call-template>
                <xsl:call-template name="get.entity.disjoint">
                    <xsl:with-param name="type" select="'class'" tunnel="yes"/>
                </xsl:call-template>
                <xsl:call-template name="get.entity.punning"/>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.individual.description">
        <xsl:variable name="hasAssertions"
                      select="some $el in element() satisfies (some $prop in (/rdf:RDF/(owl:ObjectProperty|owl:DatatypeProperty)/(@*:about|@*:ID)) satisfies $prop = concat(namespace-uri($el),local-name($el)))"
                      as="xs:boolean"/>
        <xsl:if test="exists(rdf:type) or f:hasDisjoints(.) or f:hasSameAs(.) or $hasAssertions or f:hasPunning(.)">
            <dl class="description">
                <xsl:call-template name="get.entity.type"/>
                <xsl:call-template name="get.entity.sameas">
                    <xsl:with-param name="type" select="'namedindividual'" tunnel="yes"/>
                </xsl:call-template>
                <xsl:call-template name="get.entity.disjoint">
                    <xsl:with-param name="type" select="'namedindividual'" tunnel="yes"/>
                </xsl:call-template>
                <xsl:call-template name="get.individual.assertions">
                    <xsl:with-param name="type" select="'namedindividual'" tunnel="yes"/>
                </xsl:call-template>
                <xsl:call-template name="get.entity.punning"/>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.entity.type">
        <xsl:if test="exists(rdf:type)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('belongsto')"/>
            </dt>
            <xsl:apply-templates select="rdf:type">
                <xsl:with-param name="type" tunnel="yes" select="'class'" as="xs:string"/>
            </xsl:apply-templates>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.entity.sameas">
        <xsl:variable name="currentSameAs" select="f:getSameAs(.)" as="attribute()*"/>
        <xsl:if test="exists($currentSameAs)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('issameas')"/>
            </dt>
            <dd>
                <xsl:for-each select="$currentSameAs">
                    <xsl:apply-templates select="."/>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </dd>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.entity.punning">
        <xsl:variable name="iri" select="@*:about|@*:ID" as="xs:string"/>
        <xsl:variable name="type" select="f:getType(.)" as="xs:string"/>
        <xsl:variable name="punningsequence"
                      select="/rdf:RDF/element()[@*:about = $iri or @*:ID = $iri][f:getType(.) != $type]"
                      as="element()*"/>

        <xsl:if test="$punningsequence">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('isalsodefinedas')"/>
            </dt>
            <dd>
                <xsl:for-each select="$punningsequence">
                    <xsl:choose>
                        <xsl:when test="element()">
                            <a href="#{generate-id(.)}">
                                <xsl:value-of select="f:getType(.)"/>
                            </a>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="f:getType(.)"/>
                        </xsl:otherwise>
                    </xsl:choose>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </dd>
        </xsl:if>
    </xsl:template>

    <xsl:function name="f:checkPunning" as="xs:boolean">
        <xsl:param name="el" as="element()"/>
        <xsl:variable name="iri" select="$el/@*:about|$el/@*:ID" as="xs:string"/>
        <xsl:variable name="type" select="f:getType($el)" as="xs:string"/>

        <xsl:value-of
                select="some $other in $root/rdf:RDF/element()[@*:about = $iri or @*:ID = $iri] satisfies f:getType($other) != $type"/>
    </xsl:function>

    <xsl:template name="get.individual.assertions">
        <xsl:variable name="assertions">
            <assertions>
                <xsl:for-each select="element()">
                    <xsl:variable name="currentURI" select="concat(namespace-uri(.),local-name(.))" as="xs:string"/>
                    <xsl:if test="some $prop in (/rdf:RDF/(owl:ObjectProperty|owl:DatatypeProperty)/(@*:about|@*:ID)) satisfies $prop = $currentURI">
                        <assertion rdf:about="{$currentURI}">
                            <xsl:choose>
                                <xsl:when test="@*:resource">
                                    <xsl:attribute name="rdf:resource" select="@*:resource"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:if test="@xml:lang">
                                        <xsl:attribute name="xml:lang" select="@xml:lang"/>
                                    </xsl:if>
                                    <xsl:if test="@*:datatype">
                                        <xsl:attribute name="rdf:datatype" select="@*:datatype"/>
                                    </xsl:if>
                                    <xsl:apply-templates/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </assertion>
                    </xsl:if>
                </xsl:for-each>
            </assertions>
        </xsl:variable>
        <xsl:if test="$assertions//@*:about">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('individualassertions')"/>
            </dt>
            <xsl:for-each select="$assertions//element()[@*:about]">
                <dd>
                    <xsl:apply-templates select="@*:about">
                        <xsl:with-param name="type" select="'property'" tunnel="yes"/>
                    </xsl:apply-templates>
                    <xsl:text> </xsl:text>
                    <xsl:choose>
                        <xsl:when test="@*:resource">
                            <xsl:apply-templates select="@*:resource"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <span class="literal">
                                <xsl:text>"</xsl:text>
                                <xsl:value-of select="."/>
                                <xsl:text>"</xsl:text>
                                <xsl:choose>
                                    <xsl:when test="@*:datatype">
                                        <xsl:text>^^</xsl:text>
                                        <xsl:apply-templates select="@*:datatype"/>
                                    </xsl:when>
                                    <xsl:when test="@xml:lang">
                                        <xsl:text>@</xsl:text>
                                        <xsl:value-of select="@xml:lang"/>
                                    </xsl:when>
                                </xsl:choose>
                            </span>
                        </xsl:otherwise>
                    </xsl:choose>
                </dd>
            </xsl:for-each>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.entity.disjoint">
        <xsl:variable name="currentDisjoints" select="f:getDisjoints(.)" as="attribute()*"/>
        <xsl:if test="exists($currentDisjoints)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('isdisjointwith')"/>
            </dt>
            <dd>
                <xsl:for-each select="$currentDisjoints">
                    <xsl:apply-templates select="."/>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </dd>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.class.keys">
        <xsl:if test="exists(owl:hasKey)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('haskeys')"/>
            </dt>
            <xsl:apply-templates select="owl:hasKey"/>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.class.equivalent">
        <xsl:if test="exists(owl:equivalentClass)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('isequivalentto')"/>
            </dt>
            <xsl:apply-templates select="owl:equivalentClass"/>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.class.superclasses">
        <xsl:if test="exists(rdfs:subClassOf)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('hassuperclasses')"/>
            </dt>
            <dd>
                <xsl:for-each select="rdfs:subClassOf/(@*:resource|(owl:Class|rdfs:Class)/@*:about)">
                    <xsl:sort select="f:getLabel(.)" data-type="text" order="ascending"/>
                    <xsl:apply-templates select="."/>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </dd>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.class.subclasses">
        <xsl:variable name="about" select="@*:about|@*:ID" as="xs:string"/>
        <xsl:variable name="sub-classes" as="attribute()*"
                      select="/rdf:RDF/(owl:Class|rdfs:Class)[some $res in rdfs:subClassOf/(@*:resource|(owl:Class|rdfs:Class)/@*:about) satisfies $res = $about]/(@*:about|@*:ID)"/>
        <xsl:if test="exists($sub-classes)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('hassubclasses')"/>
            </dt>
            <dd>
                <xsl:for-each select="$sub-classes">
                    <xsl:sort select="f:getLabel(.)" data-type="text" order="ascending"/>
                    <xsl:apply-templates select="."/>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </dd>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.class.indomain">
        <xsl:variable name="about" select="@*:about|@*:ID" as="xs:string"/>
        <xsl:variable name="properties" as="attribute()*"
                      select="/rdf:RDF/(owl:ObjectProperty|rdf:Property|owl:DatatypeProperty|owl:AnnotationProperty)[some $res in (rdfs:domain|schema:domainIncludes)/(@*:resource|(owl:Class|rdfs:Class)/@*:about) satisfies $res = $about]/(@*:about|@*:ID)"/>
        <xsl:if test="exists($properties)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('isindomainof')"/>
            </dt>
            <dd>
                <xsl:for-each select="$properties">
                    <xsl:sort select="f:getLabel(.)" order="ascending" data-type="text"/>
                    <xsl:apply-templates select=".">
                        <xsl:with-param name="type" as="xs:string" tunnel="yes"
                                        select="if (../owl:AnnotationProperty) then 'annotation' else 'property'"/>
                    </xsl:apply-templates>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </dd>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.class.inrange">
        <xsl:variable name="about" select="(@*:about|@*:ID)" as="xs:string"/>
        <xsl:variable name="properties" as="attribute()*"
                      select="/rdf:RDF/(owl:ObjectProperty|rdf:Property|owl:DatatypeProperty|owl:AnnotationProperty)[some $res in (rdfs:range|schema:rangeIncludes)/(@*:resource|(owl:Class|rdfs:Class)/@*:about) satisfies $res = $about]/(@*:about|@*:ID)"/>
        <xsl:if test="exists($properties)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('isinrangeof')"/>
            </dt>
            <dd>
                <xsl:for-each select="$properties">
                    <xsl:sort select="f:getLabel(.)" order="ascending" data-type="text"/>
                    <xsl:apply-templates select=".">
                        <xsl:with-param name="type" as="xs:string" tunnel="yes"
                                        select="if (../owl:AnnotationProperty) then 'annotation' else 'property'"/>
                    </xsl:apply-templates>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </dd>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.class.members">
        <xsl:variable name="about" select="(@*:about|@*:ID)" as="xs:string"/>
        <xsl:variable name="members" as="attribute()*"
                      select="/rdf:RDF/owl:NamedIndividual[some $res in rdf:type/(@*:resource|(owl:Class|rdfs:Class)/@*:about) satisfies $res = $about]/(@*:about|@*:ID)"/>
        <xsl:if test="exists($members)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('hasmembers')"/>
            </dt>
            <dd>
                <xsl:for-each select="$members">
                    <xsl:sort select="f:getLabel(.)" order="ascending" data-type="text"/>
                    <xsl:apply-templates select=".">
                        <xsl:with-param name="type" as="xs:string" tunnel="yes" select="'individual'"/>
                    </xsl:apply-templates>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </dd>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.property.description">
        <xsl:if test="exists(rdfs:subPropertyOf | (rdfs:domain|schema:domainIncludes) | (rdfs:range|schema:rangeIncludes) | owl:propertyChainAxiom) or f:hasSubproperties(.) or f:hasInverseOf(.) or f:hasDisjoints(.) or f:hasEquivalent(.) or f:hasSameAs(.) or f:hasPunning(.)">
            <div class="description">
                <xsl:call-template name="get.characteristics"/>
                <dl>
                    <xsl:call-template name="get.property.equivalentproperty"/>
                    <xsl:call-template name="get.property.superproperty"/>
                    <xsl:call-template name="get.property.subproperty"/>
                    <xsl:call-template name="get.property.domain"/>
                    <xsl:call-template name="get.property.domainIncludes"/>
                    <xsl:call-template name="get.property.range"/>
                    <xsl:call-template name="get.property.rangeIncludes"/>
                    <xsl:call-template name="get.property.inverse">
                        <xsl:with-param name="type" select="'property'" tunnel="yes" as="xs:string"/>
                    </xsl:call-template>
                    <xsl:call-template name="get.property.chain"/>
                    <xsl:call-template name="get.entity.sameas">
                        <xsl:with-param name="type" select="'property'" tunnel="yes" as="xs:string"/>
                    </xsl:call-template>
                    <xsl:call-template name="get.entity.disjoint">
                        <xsl:with-param name="type" select="'property'" tunnel="yes" as="xs:string"/>
                    </xsl:call-template>
                    <xsl:call-template name="get.entity.punning"/>
                </dl>
            </div>
            <xsl:call-template name="get.custom.annotations"/>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.property.inverse">
        <xsl:variable name="currentInverseOf" select="f:getInverseOf(.)" as="attribute()*"/>
        <xsl:if test="exists($currentInverseOf)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('isinverseof')"/>
            </dt>
            <dd>
                <xsl:for-each select="$currentInverseOf">
                    <xsl:apply-templates select="."/>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </dd>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.property.chain">
        <xsl:if test="exists(owl:propertyChainAxiom)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('hassubpropertychains')"/>
            </dt>
            <xsl:apply-templates select="owl:propertyChainAxiom"/>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.property.equivalentproperty">
        <xsl:variable name="currentEquivalent" select="f:getEquivalent(.)" as="attribute()*"/>
        <xsl:if test="exists($currentEquivalent)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('hasequivalentproperties')"/>
            </dt>
            <dd>
                <xsl:for-each select="$currentEquivalent">
                    <xsl:apply-templates select="."/>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </dd>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.property.superproperty">
        <xsl:if test="exists(rdfs:subPropertyOf)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('hassuperproperties')"/>
            </dt>
            <dd>
                <xsl:for-each
                        select="rdfs:subPropertyOf/(@*:resource|(rdf:Property|owl:ObjectProperty|owl:DatatypeProperty|owl:AnnotationProperty)/@*:about)">
                    <xsl:sort select="f:getLabel(.)" data-type="text" order="ascending"/>
                    <xsl:apply-templates select="."/>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </dd>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.property.subproperty">
        <xsl:variable name="type" select="if (self::owl:AnnotationProperty) then 'annotation' else 'property'"
                      as="xs:string"/>
        <xsl:variable name="about" select="(@*:about|@*:ID)" as="xs:string"/>
        <xsl:variable name="sub-properties" as="attribute()*"
                      select="/rdf:RDF/(if ($type = 'property') then owl:DatatypeProperty | owl:ObjectProperty | rdf:Property else owl:AnnotationProperty)[some $res in rdfs:subPropertyOf/(@*:resource|(owl:Class|rdfs:Class)/@*:about) satisfies $res = $about]/(@*:about|@*:ID)"/>
        <xsl:if test="exists($sub-properties)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('hassubproperties')"/>
            </dt>
            <dd>
                <xsl:for-each select="$sub-properties">
                    <xsl:sort select="f:getLabel(.)" data-type="text" order="ascending"/>
                    <xsl:apply-templates select="."/>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </dd>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.property.domain">
        <xsl:if test="exists(rdfs:domain)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('hasdomain')"/>
            </dt>
            <xsl:apply-templates select="rdfs:domain"/>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.property.domainIncludes">
        <xsl:if test="exists(schema:domainIncludes)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('domainIncludes')"/>
            </dt>
            <xsl:apply-templates select="schema:domainIncludes"/>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.property.range">
        <xsl:if test="exists(rdfs:range)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('hasrange')"/>
            </dt>
            <xsl:apply-templates select="rdfs:range"/>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.property.rangeIncludes">
        <xsl:if test="exists(schema:rangeIncludes)">
            <dt>
                <xsl:value-of select="f:getDescriptionLabel('rangeIncludes')"/>
            </dt>
            <xsl:apply-templates select="schema:rangeIncludes"/>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.content">
        <span class="markdown">
            <xsl:value-of select="text()"/>
        </span>
        <!--
        <xsl:for-each select="text()">
            <xsl:for-each select="tokenize(.,$n)">
                <xsl:if test="normalize-space(.) != ''">
                    <p>
                    	<xsl:variable name="withLinks" select="replace(.,'\[\[([^\[\]]+)\]\[([^\[\]]+)\]\]','@@@$1@@$2@@@')" />
                    	<xsl:for-each select="tokenize($withLinks,'@@@')">
                    		<xsl:choose>
                    			<xsl:when test="matches(.,'@@')">
                    				<xsl:variable name="tokens" select="tokenize(.,'@@')" />
                    				<a href="{$tokens[1]}"><xsl:value-of select="$tokens[2]" /></a>
                    			</xsl:when>
                    			<xsl:otherwise>
                    				<xsl:value-of select="." />
                    			</xsl:otherwise>
                    		</xsl:choose>
                    	</xsl:for-each>
                    </p>
                </xsl:if>
            </xsl:for-each>
        </xsl:for-each>
	-->
    </xsl:template>

    <xsl:template name="get.title">
        <xsl:for-each select="tokenize(.//text(),$n)">
            <xsl:value-of select="."/>
            <xsl:if test="position() != last()">
                <br/>
            </xsl:if>
        </xsl:for-each>
    </xsl:template>

    <xsl:template name="get.ontology.url">
        <xsl:if test="exists((@*:about|@*:ID)[normalize-space() != ''])">
            <dl>
                <dt>IRI:</dt>
                <dd>
                    <xsl:value-of select="@*:about|@*:ID"/>
                </dd>
                <xsl:if test="exists(owl:versionIRI)">
                    <dt>Version IRI:</dt>
                    <dd>
                        <xsl:value-of select="owl:versionIRI/@*:resource"/>
                    </dd>
                </xsl:if>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.version">
        <xsl:if test="exists(owl:versionInfo | owl:priorVersion | owl:backwardCompatibleWith | owl:incompatibleWith | dc:date | dcterms:date)">
            <dl>
                <xsl:apply-templates select="dc:date | dcterms:date"/>
                <xsl:apply-templates select="owl:versionInfo"/>
                <xsl:apply-templates select="owl:priorVersion"/>
                <xsl:apply-templates select="owl:backwardCompatibleWith"/>
                <xsl:apply-templates select="owl:incompatibleWith"/>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.imports">
        <xsl:if test="exists(owl:imports)">
            <dl>
                <dt><xsl:value-of select="f:getDescriptionLabel('importedontologies')"/>:
                </dt>
                <xsl:apply-templates select="owl:imports"/>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.entity.name">
        <xsl:variable name="url" select="@*:about|@*:ID" as="xs:string"/>
        <a name="{$url}"/>
        <xsl:if test="starts-with($url, if (ends-with($ontology-url,'#')) then $ontology-url else concat($ontology-url, '#'))">
            <a name="{substring-after($url, '#')}"/>
        </xsl:if>
        <xsl:choose>
            <!--<xsl:when test="exists(rdfs:label|skos:prefLabel|obo:IAO_0000118)">
                <xsl:apply-templates select="rdfs:label|skos:prefLabel|obo:IAO_0000118"/>
            </xsl:when>-->
            <xsl:when test="exists(rdfs:label|skos:prefLabel|obo:IAO_0000118)">
                <xsl:choose>
                    <xsl:when test="exists(rdfs:label)">
                        <xsl:apply-templates select="rdfs:label"/>
                    </xsl:when>
                    <xsl:when test="exists(skos:prefLabel)">
                        <xsl:apply-templates select="skos:prefLabel"/>
                    </xsl:when>
                    <xsl:when test="exists(obo:IAO_0000118)">
                        <xsl:apply-templates select="obo:IAO_0000118"/>
                    </xsl:when>
                </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
                <h3>
                    <xsl:value-of select="f:getLabel(@*:about|@*:ID)"/>
                    <xsl:call-template name="get.entity.type.descriptor">
                        <xsl:with-param name="iri" select="@*:about|@*:ID" as="xs:string"/>
                    </xsl:call-template>
                    <xsl:call-template name="get.backlink"/>
                </h3>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template name="get.author">
        <xsl:if test="exists(dc:creator | dc:contributor | dcterms:creator[ancestor::owl:Ontology] | dcterms:contributor[ancestor::owl:Ontology])">
            <dl>
                <xsl:if test="exists(dc:creator|dcterms:creator[ancestor::owl:Ontology])">
                    <dt><xsl:value-of select="f:getDescriptionLabel('authors')"/>:
                    </dt>
                    <xsl:apply-templates select="dc:creator|dcterms:creator[ancestor::owl:Ontology]">
                        <xsl:sort select="text()|@*:resource" data-type="text" order="ascending"/>
                    </xsl:apply-templates>
                </xsl:if>
                <xsl:if test="exists(dc:contributor|dcterms:contributor[ancestor::owl:Ontology])">
                    <dt><xsl:value-of select="f:getDescriptionLabel('contributors')"/>:
                    </dt>
                    <xsl:apply-templates select="dc:contributor|dcterms:contributor[ancestor::owl:Ontology]">
                        <xsl:sort select="text()|@*:resource" data-type="text" order="ascending"/>
                    </xsl:apply-templates>
                </xsl:if>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.publisher">
        <xsl:if test="exists(dc:publisher | dcterms:publisher)">
            <dl>
                <dt><xsl:value-of select="f:getDescriptionLabel('publisher')"/>:
                </dt>
                <xsl:apply-templates select="dc:publisher|dcterms:publisher">
                    <xsl:sort select="text()|@*:resource" data-type="text" order="ascending"/>
                </xsl:apply-templates>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.toc">
        <div id="toc">
            <h2>
                <xsl:value-of select="f:getDescriptionLabel('toc')"/>
            </h2>
            <ol>
                <xsl:if test="exists(//owl:Ontology/dc:description[normalize-space() != ''])">
                    <li>
                        <a href="#introduction">
                            <xsl:value-of select="f:getDescriptionLabel('introduction')"/>
                        </a>
                    </li>
                </xsl:if>
                <xsl:if test="exists(/rdf:RDF/(owl:Class|rdfs:Class)/element())">
                    <li>
                        <a href="#classes">
                            <xsl:value-of select="f:getDescriptionLabel('classes')"/>
                        </a>
                    </li>
                </xsl:if>
                <xsl:if test="exists(//owl:ObjectProperty/element())">
                    <li>
                        <a href="#objectproperties">
                            <xsl:value-of select="f:getDescriptionLabel('objectproperties')"/>
                        </a>
                    </li>
                </xsl:if>
                <xsl:if test="exists(//owl:DatatypeProperty/element())">
                    <li>
                        <a href="#dataproperties">
                            <xsl:value-of select="f:getDescriptionLabel('dataproperties')"/>
                        </a>
                    </li>
                </xsl:if>
                <xsl:if test="exists(//owl:NamedIndividual/element())">
                    <li>
                        <a href="#namedindividuals">
                            <xsl:value-of select="f:getDescriptionLabel('namedindividuals')"/>
                        </a>
                    </li>
                </xsl:if>
                <xsl:if test="exists(//owl:AnnotationProperty)">
                    <li>
                        <a href="#annotationproperties">
                            <xsl:value-of select="f:getDescriptionLabel('annotationproperties')"/>
                        </a>
                    </li>
                </xsl:if>
                <xsl:if test="exists(//rdf:Description[exists(rdf:type[@*:resource = 'http://www.w3.org/2002/07/owl#AllDisjointClasses'])]) or exists(/rdf:RDF/(owl:Class|rdfs:Class|owl:Restriction)[empty(@*:about | @*:ID) and exists(rdfs:subClassOf|owl:equivalentClass)])">
                    <li>
                        <a href="#generalaxioms">
                            <xsl:value-of select="f:getDescriptionLabel('generalaxioms')"/>
                        </a>
                    </li>
                </xsl:if>
                <xsl:if test="exists(/rdf:RDF/(swrl:Imp | rdf:Description[rdf:type[@*:resource = 'http://www.w3.org/2003/11/swrl#Imp']]))">
                    <li>
                        <a href="#swrlrules">
                            <xsl:value-of select="f:getDescriptionLabel('rules')"/>
                        </a>
                    </li>
                </xsl:if>
                <li>
                    <a href="#namespacedeclarations">
                        <xsl:value-of select="f:getDescriptionLabel('namespaces')"/>
                    </a>
                </li>
            </ol>
        </div>
    </xsl:template>

    <xsl:template name="get.entity.url">
        <p>
            <strong>IRI:</strong>
            <xsl:text> </xsl:text>
            <xsl:value-of select="@*:about|@*:ID"/>
        </p>
    </xsl:template>

    <xsl:template name="get.generalaxioms">
        <xsl:if test="exists(/rdf:RDF/rdf:Description[exists(rdf:type[@*:resource = 'http://www.w3.org/2002/07/owl#AllDisjointClasses'])]) or exists(/rdf:RDF/(owl:Class|rdfs:Class|owl:Restriction)[empty(@*:ID | @*:about) and exists(rdfs:subClassOf|owl:equivalentClass)])">
            <div id="generalaxioms">
                <h2>
                    <xsl:value-of select="f:getDescriptionLabel('generalaxioms')"/>
                </h2>
                <xsl:apply-templates
                        select="/rdf:RDF/(rdf:Description[exists(rdf:type[@*:resource = 'http://www.w3.org/2002/07/owl#AllDisjointClasses'])]|(owl:Class|rdfs:Class|owl:Restriction)[empty(@*:ID | @*:about) and exists(rdfs:subClassOf|owl:equivalentClass)])"/>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.namespacedeclarations">
        <div id="namespacedeclarations">
            <h2>
                <xsl:value-of select="f:getDescriptionLabel('namespaces')"/><xsl:text> </xsl:text>
                <xsl:call-template name="get.backlink"/>
            </h2>
            <dl>
                <xsl:for-each select="distinct-values($prefixes-uris[position() mod 2 = 1])">
                    <xsl:sort select="." data-type="text" order="ascending"/>
                    <xsl:variable name="prefix" select="."/>
                    <xsl:if test=". != 'xml'">
                        <dt>
                            <xsl:choose>
                                <xsl:when test="$prefix = ''">
                                    <em>
                                        <xsl:value-of select="f:getDescriptionLabel('namespace')"/>
                                    </em>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="$prefix"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </dt>
                        <dd>
                            <xsl:value-of select="$prefixes-uris[index-of($prefixes-uris,$prefix)[1] + 1]"/>
                        </dd>
                    </xsl:if>
                </xsl:for-each>
            </dl>
        </div>
    </xsl:template>

    <xsl:template name="get.classes">
        <xsl:if test="exists(/rdf:RDF/(owl:Class|rdfs:Class)/element())">
            <div id="classes">
                <h2>
                    <xsl:value-of select="f:getDescriptionLabel('classes')"/>
                </h2>
                <xsl:call-template name="get.classes.toc"/>
                <xsl:apply-templates
                        select="/rdf:RDF/(owl:Class|rdfs:Class)[exists(element()) and exists(@*:about|@*:ID)]">
                    <xsl:sort select="lower-case(f:getLabel(@*:about|@*:ID))"
                              order="ascending" data-type="text"/>
                    <xsl:with-param name="type" tunnel="yes" as="xs:string" select="'class'"/>
                </xsl:apply-templates>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.classes.toc">
        <ul class="hlist">
            <xsl:apply-templates select="/rdf:RDF/(owl:Class|rdfs:Class)[exists(element()) and exists(@*:about|@*:ID)]"
                                 mode="toc">
                <xsl:sort select="lower-case(f:getLabel(@*:about|@*:ID))"
                          order="ascending" data-type="text"/>
                <xsl:with-param name="type" tunnel="yes" as="xs:string" select="'class'"/>
            </xsl:apply-templates>
        </ul>
    </xsl:template>

    <xsl:template name="get.namedindividuals">
        <xsl:if test="exists(//owl:NamedIndividual/element())">
            <div id="namedindividuals">
                <h2>
                    <xsl:value-of select="f:getDescriptionLabel('namedindividuals')"/>
                </h2>
                <xsl:call-template name="get.namedindividuals.toc"/>
                <xsl:apply-templates select="/rdf:RDF/owl:NamedIndividual[element() and not(rdf:type/@rdf:resource = 'https://w3id.org/widoco/vocab#Rule')]">
                    <xsl:sort select="lower-case(f:getLabel(@*:about|@*:ID))"
                              order="ascending" data-type="text"/>
                    <xsl:with-param name="type" tunnel="yes" as="xs:string" select="'individual'"/>
                </xsl:apply-templates>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.namedindividuals.toc">
        <ul class="hlist">
            <xsl:apply-templates select="/rdf:RDF/owl:NamedIndividual[element() and not(rdf:type/@rdf:resource = 'https://w3id.org/widoco/vocab#Rule')]" mode="toc">
                <xsl:sort select="lower-case(f:getLabel(@*:about|@*:ID))"
                          order="ascending" data-type="text"/>
                <xsl:with-param name="type" tunnel="yes" as="xs:string" select="'individual'"/>
            </xsl:apply-templates>
        </ul>
    </xsl:template>

    <xsl:template name="get.objectproperties">
        <xsl:if test="exists(//owl:ObjectProperty/element())">
            <div id="objectproperties">
                <h2>
                    <xsl:value-of select="f:getDescriptionLabel('objectproperties')"/>
                </h2>
                <xsl:call-template name="get.objectproperties.toc"/>
                <xsl:apply-templates select="/rdf:RDF/(owl:ObjectProperty)[exists(element())]">
                    <xsl:sort select="lower-case(f:getLabel(@*:about|@*:ID))"
                              order="ascending" data-type="text"/>
                    <xsl:with-param name="type" tunnel="yes" as="xs:string" select="'property'"/>
                </xsl:apply-templates>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.objectproperties.toc">
        <ul class="hlist">
            <xsl:apply-templates select="/rdf:RDF/(owl:ObjectProperty)[exists(element())]" mode="toc">
                <xsl:sort select="lower-case(f:getLabel(@*:about|@*:ID))"
                          order="ascending" data-type="text"/>
                <xsl:with-param name="type" tunnel="yes" as="xs:string" select="'annotation'"/>
            </xsl:apply-templates>
        </ul>
    </xsl:template>

    <xsl:template name="get.annotationproperties">
        <xsl:if test="exists(//owl:AnnotationProperty)">
            <div id="annotationproperties">
                <h2>
                    <xsl:value-of select="f:getDescriptionLabel('annotationproperties')"/>
                </h2>
                <xsl:call-template name="get.annotationproperties.toc"/>
                <xsl:apply-templates select="/rdf:RDF/owl:AnnotationProperty">
                    <xsl:sort select="lower-case(f:getLabel(@*:about|@*:ID))"
                              order="ascending" data-type="text"/>
                    <xsl:with-param name="type" tunnel="yes" as="xs:string" select="'annotation'"/>
                </xsl:apply-templates>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.annotationproperties.toc">
        <ul class="hlist">
            <xsl:apply-templates select="/rdf:RDF/owl:AnnotationProperty" mode="toc">
                <xsl:sort select="lower-case(f:getLabel(@*:about|@*:ID))"
                          order="ascending" data-type="text"/>
                <xsl:with-param name="type" tunnel="yes" as="xs:string" select="'property'"/>
            </xsl:apply-templates>
        </ul>
    </xsl:template>

    <xsl:template name="get.dataproperties">
        <xsl:if test="exists(//owl:DatatypeProperty/element())">
            <div id="dataproperties">
                <h2>
                    <xsl:value-of select="f:getDescriptionLabel('dataproperties')"/>
                </h2>
                <xsl:call-template name="get.dataproperties.toc"/>
                <xsl:apply-templates select="/rdf:RDF/owl:DatatypeProperty[exists(element())]">
                    <xsl:sort select="lower-case(f:getLabel(@*:about|@*:ID))"
                              order="ascending" data-type="text"/>
                    <xsl:with-param name="type" tunnel="yes" as="xs:string" select="'property'"/>
                </xsl:apply-templates>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.dataproperties.toc">
        <ul class="hlist">
            <xsl:apply-templates select="/rdf:RDF/owl:DatatypeProperty[exists(element())]" mode="toc">
                <xsl:sort select="lower-case(f:getLabel(@*:about|@*:ID))"
                          order="ascending" data-type="text"/>
                <xsl:with-param name="type" tunnel="yes" as="xs:string" select="'property'"/>
            </xsl:apply-templates>
        </ul>
    </xsl:template>

    <xsl:template name="get.entity.type.descriptor">
        <xsl:param name="iri" as="xs:string"/>
        <xsl:param name="type" as="xs:string" select="''" tunnel="yes"/>
        <xsl:variable name="el" select="$root/rdf:RDF/element()[@*:about = $iri or @*:ID = $iri]" as="element()*"/>
        <xsl:choose>
            <xsl:when
                    test="($type = '' or $type = 'class') and ($el[self::owl:Class] or $el[self::rdfs:Class] or $iri = 'http://www.w3.org/2002/07/owl#Thing')">
                <sup title="{f:getDescriptionLabel('class')}" class="type-c">c</sup>
            </xsl:when>
            <xsl:when test="($type = '' or $type = 'property') and ($el[self::owl:ObjectProperty])">
                <sup title="{f:getDescriptionLabel('objectproperty')}" class="type-op">op</sup>
            </xsl:when>
            <xsl:when test="($type = '' or $type = 'property') and $el[self::owl:DatatypeProperty]">
                <sup title="{f:getDescriptionLabel('dataproperty')}" class="type-dp">dp</sup>
            </xsl:when>
            <xsl:when test="($type = '' or $type = 'annotation') and $el[self::owl:AnnotationProperty]">
                <sup title="{f:getDescriptionLabel('annotationproperty')}" class="type-ap">ap</sup>
            </xsl:when>
            <xsl:when test="($type = '' or $type = 'individual') and $el[self::owl:NamedIndividual]">
                <sup title="{f:getDescriptionLabel('namedindividual')}" class="type-ni">ni</sup>
            </xsl:when>
        </xsl:choose>
    </xsl:template>

    <xsl:template name="get.backlink">
        <xsl:param name="toc" select="''" as="xs:string*" tunnel="yes"/>
        <xsl:param name="toc.string" select="''" as="xs:string*" tunnel="yes"/>
        <span class="backlink">
            <xsl:text> </xsl:text>
            <xsl:value-of select="f:getDescriptionLabel('backto')"/>
            <xsl:text> </xsl:text>
            <a href="#toc">
                <xsl:value-of select="f:getDescriptionLabel('tocabbr')"/>
            </a>
            <xsl:if test="$toc != '' and $toc.string != ''">
                <xsl:text> </xsl:text>
                <xsl:value-of select="f:getDescriptionLabel('or')"/>
                <xsl:text> </xsl:text>
                <a href="#{$toc}">
                    <xsl:value-of select="$toc.string"/>
                </a>
            </xsl:if>
        </span>
    </xsl:template>

    <xsl:template name="get.characteristics">
        <xsl:variable name="nodes"
                      select="rdf:type[some $c in ('http://www.w3.org/2002/07/owl#FunctionalProperty', 'http://www.w3.org/2002/07/owl#InverseFunctionalProperty', 'http://www.w3.org/2002/07/owl#ReflexiveProperty', 'http://www.w3.org/2002/07/owl#IrreflexiveProperty', 'http://www.w3.org/2002/07/owl#SymmetricProperty', 'http://www.w3.org/2002/07/owl#AsymmetricProperty', 'http://www.w3.org/2002/07/owl#TransitiveProperty') satisfies @*:resource = $c]"
                      as="element()*"/>
        <xsl:if test="exists($nodes)">
            <p>
                <strong><xsl:value-of select="f:getDescriptionLabel('hascharacteristics')"/>:
                </strong>
                <xsl:text> </xsl:text>
                <xsl:for-each select="$nodes">
                    <xsl:apply-templates select="."/>
                    <xsl:if test="position() != last()">
                        <xsl:text>, </xsl:text>
                    </xsl:if>
                </xsl:for-each>
            </p>
        </xsl:if>
    </xsl:template>

    <xsl:template match="osw:category">
        <dd>
            <xsl:apply-templates select="@*:resource | element()">
                <xsl:with-param name="type" select="'class'" as="xs:string" tunnel="yes"/>
            </xsl:apply-templates>
        </dd>
    </xsl:template>

    <!--
        input: un elemento tipicamente contenente solo testo
        output: un booleano che risponde se quell'elemento è quello giusto per la lingua considerata        
    -->
    <xsl:function name="f:isInLanguage" as="xs:boolean">
        <xsl:param name="el" as="element()"/>
        <xsl:variable name="isRightLang" select="$el/@xml:lang = $lang" as="xs:boolean"/>
        <xsl:variable name="isDefLang" select="$el/@xml:lang = $def-lang" as="xs:boolean"/>

        <xsl:choose>
            <!-- 
                Ritorno false se:
                - c'è qualche elemento prima di me del linguaggio giusto OR
                - io non sono del linguaggio giusto AND
                    - c'è qualche elemento dopo di me del linguaggio giusto OR
                    - c'è qualche elemento prima di me che è del linguaggio di default OR
                    - io non sono del linguaggio di default AND
                        - c'è qualche elemento dopo di me del linguaggio di default OR
                        - c'è qualche elemento prima di me
            -->
            <xsl:when test="
                (some $item in ($el/preceding-sibling::element()[name() = name($el)]) satisfies $item/@xml:lang = $lang) or
                (not($isRightLang) and
                    (
                        (some $item in ($el/following-sibling::element()[name() = name($el)]) satisfies $item/@xml:lang = $lang) or
                        (some $item in ($el/preceding-sibling::element()[name() = name($el)]) satisfies $item/@xml:lang = $def-lang) or
                        not($isDefLang) and
                            (
                                (some $item in ($el/following-sibling::element()[name() = name($el)]) satisfies $item/@xml:lang = $def-lang) or
                                exists($el/preceding-sibling::element()[name() = name($el)]))
                            ))">
                <xsl:value-of select="false()"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="true()"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:function>

    <xsl:function name="f:getPrefixFromIRI" as="xs:string?">
        <xsl:param name="iri" as="xs:string"/>

        <xsl:if test="not(starts-with($iri,'_:'))">
            <xsl:variable name="iriNew"
                          select="if (contains($iri,'#') or contains($iri,'/')) then $iri else concat(base-uri($root), $iri)"
                          as="xs:string"/>

            <xsl:variable name="ns"
                          select="if (contains($iriNew,'#')) then substring($iriNew,1,f:string-first-index-of($iriNew,'#')) else $iriNew"
                          as="xs:string"/>

            <xsl:variable name="index" select="index-of($prefixes-uris,$ns)[1]" as="xs:integer?"/>
            <xsl:if test="exists($index)">
                <xsl:value-of select="$prefixes-uris[$index - 1]"/>
            </xsl:if>
        </xsl:if>
    </xsl:function>

    <xsl:function name="f:hasSubclasses" as="xs:boolean">
        <xsl:param name="el" as="element()"/>
        <xsl:value-of
                select="exists($rdf/(owl:Class|rdfs:Class)[some $res in rdfs:subClassOf/(@*:resource|(owl:Class|rdfs:Class)/@*:about) satisfies $res = $el/(@*:about|@*:ID)])"/>
    </xsl:function>

    <xsl:function name="f:hasMembers" as="xs:boolean">
        <xsl:param name="el" as="element()"/>
        <xsl:value-of
                select="exists($rdf/owl:NamedIndividual[some $res in rdf:type/@*:resource satisfies $res = $el/(@*:about|@*:ID)])"/>
    </xsl:function>

    <xsl:function name="f:isInRange" as="xs:boolean">
        <xsl:param name="el" as="element()"/>
        <xsl:value-of
                select="exists($rdf/(owl:ObjectProperty|owl:DatatypeProperty|owl:AnnotationProperty)[some $res in (rdfs:range|schema:rangeIncludes)/(@*:resource|(owl:Class|rdfs:Class)/@*:about) satisfies $res = $el/(@*:about|@*:ID)])"/>
    </xsl:function>

    <xsl:function name="f:isInDomain" as="xs:boolean">
        <xsl:param name="el" as="element()"/>
        <xsl:value-of
                select="exists($rdf/(owl:ObjectProperty|owl:DatatypeProperty|owl:AnnotationProperty)[some $res in (rdfs:domain|schema:domainIncludes)/(@*:resource|(owl:Class|rdfs:Class)/@*:about) satisfies $res = $el/(@*:about|@*:ID)])"/>
    </xsl:function>

    <xsl:function name="f:hasSubproperties" as="xs:boolean">
        <xsl:param name="el" as="element()"/>
        <xsl:variable name="type" select="if ($el/self::owl:AnnotationProperty) then 'annotation' else 'property'"
                      as="xs:string"/>
        <xsl:value-of
                select="exists($rdf/(if ($type = 'property') then owl:DatatypeProperty | owl:ObjectProperty else owl:AnnotationProperty)[some $res in rdfs:subPropertyOf/(@*:resource|(owl:Class|rdfs:Class)/@*:about) satisfies $res = $el/(@*:about|@*:ID)])"/>
    </xsl:function>

    <xsl:function name="f:getType" as="xs:string?">
        <xsl:param name="element" as="element()"/>
        <xsl:variable name="type" select="local-name($element)" as="xs:string"/>
        <xsl:choose>
            <xsl:when test="$type = 'Class'">
                <xsl:value-of select="f:getDescriptionLabel('class')"/>
            </xsl:when>
            <xsl:when test="$type = 'ObjectProperty'">
                <xsl:value-of select="f:getDescriptionLabel('objectproperty')"/>
            </xsl:when>
            <xsl:when test="$type = 'DatatypeProperty'">
                <xsl:value-of select="f:getDescriptionLabel('dataproperty')"/>
            </xsl:when>
            <xsl:when test="$type = 'AnnotationProperty'">
                <xsl:value-of select="f:getDescriptionLabel('annotationproperty')"/>
            </xsl:when>
            <xsl:when test="$type = 'DataRange'">
                <xsl:value-of select="f:getDescriptionLabel('datarange')"/>
            </xsl:when>
            <xsl:when test="$type = 'NamedIndividual'">
                <xsl:value-of select="f:getDescriptionLabel('namedindividual')"/>
            </xsl:when>
        </xsl:choose>
    </xsl:function>

    <xsl:function name="f:getDescriptionLabel" as="xs:string">
        <xsl:param name="inputlabel" as="xs:string"/>
        <xsl:variable name="labelname" select="lower-case(replace($inputlabel,' +',''))" as="xs:string"/>
        <xsl:variable name="label" as="xs:string">
            <xsl:variable name="label"
                          select="normalize-space($labels//element()[lower-case(local-name()) = $labelname]/text())"
                          as="xs:string?"/>
            <xsl:choose>
                <xsl:when test="$label">
                    <xsl:value-of select="$label"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of
                            select="normalize-space($default-labels//element()[lower-case(local-name()) = $labelname]/text())"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>

        <xsl:choose>
            <xsl:when test="$label">
                <xsl:value-of select="$label"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="'[ERROR-LABEL]'"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:function>

    <xsl:function name="f:hasPunning" as="xs:boolean">
        <xsl:param name="el" as="element()"/>
        <xsl:variable name="iri" select="$el/(@*:about|@*:ID)" as="xs:string"/>
        <xsl:variable name="type" select="f:getType($el)" as="xs:string"/>
        <xsl:value-of select="exists($rdf/element()[@*:about = $iri or @*:ID = $iri][f:getType(.) != $type])"/>
    </xsl:function>

    <!--CUSTOM ANNOTATIONS-->
    <xsl:template name="get.rationale">
        <xsl:if test="exists(vaem:rationale)">
            <dl>
                <dt>
                    <xsl:value-of select="f:getDescriptionLabel('rationale')"/>
                </dt>
                <xsl:for-each select="vaem:rationale[f:isInLanguage(.)]">
                    <dd>
                        <xsl:value-of select="text()"/>
                    </dd>
                </xsl:for-each>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.example">
        <xsl:if test="exists(vann:example | obo:IAO_0000112 | skos:example)">
            <dl>
                <dt>
                    <xsl:value-of select="f:getDescriptionLabel('example')"/>
                </dt>
                <xsl:for-each select="vann:example | obo:IAO_0000112 | skos:example">
                    <dd>
                        <xsl:choose>
                            <xsl:when test="normalize-space(@*:resource) = ''">
                                <pre>
                                    <xsl:value-of select="text()"/>
                                </pre>
                            </xsl:when>
                            <xsl:otherwise>
                                <a href="{@*:resource}">
                                    <xsl:value-of select="@*:resource"/>
                                </a>
                            </xsl:otherwise>
                        </xsl:choose>
                    </dd>
                </xsl:for-each>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.source">
        <xsl:if test="exists(dcterms:source | obo:IAO_0000119)">
            <dl class="definedBy">
                <dt>
                    <xsl:value-of select="f:getDescriptionLabel('source')"/>
                </dt>
                <xsl:for-each select="dcterms:source | obo:IAO_0000119">
                    <dd>
                        <xsl:choose>
                            <xsl:when test="normalize-space(@*:resource) = ''">
                                <xsl:value-of select="text()"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <a href="{@*:resource}">
                                    <xsl:value-of select="@*:resource"/>
                                </a>
                            </xsl:otherwise>
                        </xsl:choose>
                    </dd>
                </xsl:for-each>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.termStatus">
        <xsl:if test="exists(sw:term_status | obo:IAO_0000114)">
            <dl>
                <dt>
                    <xsl:value-of select="f:getDescriptionLabel('termStatus')"/>
                </dt>
                <xsl:for-each select="sw:term_status | obo:IAO_0000114">
                    <dd>
                        <xsl:choose>
                            <xsl:when test="normalize-space(@*:resource) = ''">
                                <xsl:value-of select="text()"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <a href="{@*:resource}">
                                    <xsl:value-of select="@*:resource"/>
                                </a>
                            </xsl:otherwise>
                        </xsl:choose>
                    </dd>
                </xsl:for-each>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.skos.editorial.note">
        <xsl:if test="exists(skos:editorialNote)">
            <dl>
                <dt>
                    <xsl:value-of select="f:getDescriptionLabel('editorialNote')"/>
                </dt>
                <xsl:for-each select="skos:editorialNote">
                    <dd>
                        <xsl:value-of select="text()"/>
                    </dd>
                </xsl:for-each>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.deprecated">
        <xsl:if test="exists(owl:deprecated)">
            <dl>
                <dt>
                    <xsl:value-of select="f:getDescriptionLabel('deprecated')"/>
                </dt>
                <dd>
                    <xsl:value-of select="owl:deprecated"/>
                </dd>
            </dl>
        </xsl:if>
    </xsl:template>

    <!-- ADDED BY VARUN RATNAKAR FOR EXTRA PROPERTY ANNOTATIONS-->
    <xsl:template name="get.custom.annotations">
        <xsl:if test="exists(osw:category | osw:isRequired)">
            <br/>
            <dt><xsl:value-of select="f:getDescriptionLabel('propertyannotation')"/>:
            </dt>
            <div class="description">
                <dl>
                    <xsl:if test="exists(osw:category)">
                        <dt>
                            <xsl:value-of select="f:getDescriptionLabel('category')"/>
                        </dt>
                        <xsl:apply-templates select="osw:category"/>
                    </xsl:if>
                    <xsl:if test="exists(osw:isRequired)">
                        <dt>
                            <xsl:value-of select="f:getDescriptionLabel('isrequired')"/>
                        </dt>
                        <dd>
                            <xsl:value-of select="osw:isRequired"/>
                        </dd>
                    </xsl:if>
                </dl>
            </div>
        </xsl:if>
    </xsl:template>

    <!-- CUSTOM: ADD FOR LINKING RULES TO TERMS-->
    <xsl:template name="get.rule.antecedent">
        <xsl:if test="exists(widoco:usedByRuleInAntecedent)">
            <dl>
                <dt>
                    <xsl:value-of select="f:getDescriptionLabel('usedByRuleInAntecedent')"/>
                </dt>
                <xsl:for-each select="widoco:usedByRuleInAntecedent">
                    <dd>
                        <xsl:choose>
                            <xsl:when test="normalize-space(@*:resource) = ''">
                                <a href="#{text()}">
                                    <xsl:value-of select="text()"/>
                                </a>
                            </xsl:when>
                            <xsl:otherwise>
                                <a href="{@*:resource}">
                                    <xsl:value-of select="@*:resource"/>
                                </a>
                            </xsl:otherwise>
                        </xsl:choose>
                    </dd>
                </xsl:for-each>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.rule.consequent">
        <xsl:if test="exists(widoco:usedByRuleInConsequent)">
            <dl>
                <dt>
                    <xsl:value-of select="f:getDescriptionLabel('usedByRuleInConsequent')"/>
                </dt>
                <xsl:for-each select="widoco:usedByRuleInConsequent">
                    <dd>
                        <a href="#{text()}">
                            <xsl:value-of select="text()"/>
                        </a>
                    </dd>
                </xsl:for-each>
            </dl>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.rules">
        <xsl:if test="exists(//owl:NamedIndividual/element())">
            <div id="rules">
                <h3 id="rule" class="list">
                    <xsl:value-of select="f:getDescriptionLabel('otherRules')"/>
                </h3>
                <xsl:call-template name="get.rules.toc"/>
                <xsl:apply-templates select="/rdf:RDF/owl:NamedIndividual[element() and (rdf:type/@rdf:resource = 'https://w3id.org/widoco/vocab#Rule')]">
                    <xsl:sort select="lower-case(f:getLabel(@*:about|@*:ID))"
                              order="ascending" data-type="text"/>
                    <xsl:with-param name="type" tunnel="yes" as="xs:string" select="'individual'"/>
                </xsl:apply-templates>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template name="get.rules.toc">
        <ul class="hlist">
            <xsl:apply-templates select="/rdf:RDF/owl:NamedIndividual[element() and (rdf:type/@rdf:resource = 'https://w3id.org/widoco/vocab#Rule')]" mode="toc">
                <xsl:sort select="lower-case(f:getLabel(@*:about|@*:ID))"
                          order="ascending" data-type="text"/>
                <xsl:with-param name="type" tunnel="yes" as="xs:string" select="'individual'"/>
            </xsl:apply-templates>
        </ul>
    </xsl:template>

</xsl:stylesheet>
