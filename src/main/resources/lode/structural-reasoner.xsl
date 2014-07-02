<?xml version="1.0" encoding="UTF-8"?>
<!--
Copyright (c) 2010-2013, Silvio Peroni <essepuntato@gmail.com>

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
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs"
    xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl" version="2.0"
    xmlns:f="http://www.essepuntato.it/xslt/function"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:owl="http://www.w3.org/2002/07/owl#">
    
    <!-- DISJOINT: begin -->
    <xsl:variable name="disjoints">
        <xsl:variable name="temp">
                <xsl:for-each select="/rdf:RDF/(owl:Class|owl:ObjectProperty|owl:DatatypeProperty|owl:AnnotationProperty|owl:NamedIndividual)[owl:disjointWith[@*:resource]]">
                    <xsl:variable name="id" select="@*:about|@*:ID" />
                    <xsl:for-each select="owl:disjointWith/@*:resource">
                        <disjoint rdf:about="{$id}" rdf:resource="{.}" />
                    </xsl:for-each>
                </xsl:for-each>
                <xsl:for-each select="/rdf:RDF/rdf:Description[exists(rdf:type[@*:resource = 'http://www.w3.org/2002/07/owl#AllDisjointClasses'])]">
                    <xsl:variable name="descriptions" select="(owl:members/rdf:Description/(@*:about|@*:ID))" as="attribute()+" />
                    <xsl:variable name="last" select="count($descriptions) - 1" as="xs:integer" />
                    <xsl:for-each select="1 to $last">
                        <xsl:variable name="pos" select="." />
                        <xsl:variable name="id" select="$descriptions[$pos]" />
                        <xsl:for-each select="$pos to $last">
                            <xsl:variable name="current" select=". + 1" as="xs:integer" />
                            <disjoint rdf:about="{$id}" rdf:resource="{$descriptions[$current]}" />
                        </xsl:for-each>
                    </xsl:for-each>
                </xsl:for-each>
        </xsl:variable>
        <xsl:call-template name="removeDuplicates">
            <xsl:with-param name="temp" select="$temp" />
        </xsl:call-template>
    </xsl:variable>
    
    <xsl:function name="f:getDisjoints" as="attribute()*">
        <xsl:param name="element" as="element()" />
        <xsl:sequence select="f:getSomething($disjoints,$element)" />
    </xsl:function>
    
    <xsl:function name="f:hasDisjoints" as="xs:boolean">
        <xsl:param name="element" as="element()" />
        <xsl:sequence select="f:hasSomething($disjoints,$element)" />
    </xsl:function>
    <!-- DISJOINT: end -->
    
    <!-- SAME AS: begin -->
    <xsl:variable name="sameas">
        <xsl:variable name="temp">
            <xsl:for-each select="/rdf:RDF/(owl:Class|owl:ObjectProperty|owl:DatatypeProperty|owl:AnnotationProperty|owl:NamedIndividual)[owl:sameAs[@*:resource]]">
                <xsl:variable name="id" select="@*:about|@*:ID" />
                <xsl:for-each select="owl:sameAs/@*:resource">
                    <sameas rdf:about="{$id}" rdf:resource="{.}" />
                </xsl:for-each>
            </xsl:for-each>
        </xsl:variable>
        <xsl:call-template name="removeDuplicates">
            <xsl:with-param name="temp" select="$temp" />
        </xsl:call-template>
    </xsl:variable>
    
    <xsl:function name="f:getSameAs" as="attribute()*">
        <xsl:param name="element" as="element()" />
        <xsl:sequence select="f:getSomething($sameas,$element)" />
    </xsl:function>
    
    <xsl:function name="f:hasSameAs" as="xs:boolean">
        <xsl:param name="element" as="element()" />
        <xsl:sequence select="f:hasSomething($sameas,$element)" />
    </xsl:function>
    <!-- SAME AS: end -->
    
    <!-- EQUIVALENT ENTITY: begin -->
    <xsl:variable name="equivalent">
        <xsl:variable name="temp">
            <xsl:for-each select="/rdf:RDF/(owl:Class|owl:ObjectProperty|owl:DatatypeProperty)[(owl:equivalentClass|owl:equivalentProperty)[@*:resource]]">
                <xsl:variable name="id" select="@*:about|@*:ID" />
                <xsl:for-each select="(owl:equivalentClass|owl:equivalentProperty)/@*:resource">
                    <equivalent rdf:about="{$id}" rdf:resource="{.}" />
                </xsl:for-each>
            </xsl:for-each>
        </xsl:variable>
        <xsl:call-template name="removeDuplicates">
            <xsl:with-param name="temp" select="$temp" />
        </xsl:call-template>
    </xsl:variable>
    
    <xsl:function name="f:getEquivalent" as="attribute()*">
        <xsl:param name="element" as="element()" />
        <xsl:sequence select="f:getSomething($equivalent,$element)" />
    </xsl:function>
    
    <xsl:function name="f:hasEquivalent" as="xs:boolean">
        <xsl:param name="element" as="element()" />
        <xsl:sequence select="exists($element/(owl:equivalentClass | owl:equivalentProperty)) or f:hasSomething($equivalent,$element)" />
    </xsl:function>
    <!-- EQUIVALENT ENTITY: end -->
    
    <!-- INVERSE PROPERTY: begin -->
    <xsl:variable name="inverseproperty">
        <xsl:variable name="temp">
            <xsl:for-each select="/rdf:RDF/(owl:ObjectProperty|owl:DatatypeProperty|owl:AnnotationProperty)[owl:inverseOf]">
                <xsl:variable name="id" select="@*:about|@*:ID" />
                <xsl:for-each select="owl:inverseOf[@*:resource]">
                    <inverseproperty rdf:about="{$id}" rdf:resource="{@*:resource}" />
                </xsl:for-each>
            </xsl:for-each>
        </xsl:variable>
        <xsl:call-template name="removeDuplicates">
            <xsl:with-param name="temp" select="$temp" />
        </xsl:call-template>
    </xsl:variable>
    
    <xsl:function name="f:getInverseOf" as="attribute()*">
        <xsl:param name="element" as="element()" />
        <xsl:sequence select="f:getSomething($inverseproperty,$element)" />
    </xsl:function>
    
    <xsl:function name="f:hasInverseOf" as="xs:boolean">
        <xsl:param name="element" as="element()" />
        <xsl:sequence select="f:hasSomething($inverseproperty,$element)" />
    </xsl:function>
    <!-- INVERSE PROPERTY: end -->
    
    <!-- GENERAL FUNCTIONS AND TEMPLATES: begin -->
    <xsl:function name="f:getSomething" as="attribute()*">
        <xsl:param name="doc" />
        <xsl:param name="element" as="element()" />
        <xsl:variable name="uri" select="$element/(@*:about|@*:ID)" as="attribute()"/>
        <xsl:sequence select="$doc//((element()[$uri = @*:resource]/@*:about)|(element()[$uri = @*:about]/@*:resource))" />
    </xsl:function>
    
    <xsl:function name="f:hasSomething" as="xs:boolean">
        <xsl:param name="doc" />
        <xsl:param name="element" as="element()" />
        <xsl:variable name="uri" select="$element/(@*:about|@*:ID)" as="attribute()"/>
        <xsl:value-of select="exists($doc//element()[$uri = @*:resource or $uri = @*:about])" />
    </xsl:function>
    
    <xsl:template name="removeDuplicates">
        <xsl:param name="temp" />
        <xsl:for-each select="$temp//element()">
            <xsl:variable name="currentAbout" select="@*:about" as="attribute()" />
            <xsl:variable name="currentResource" select="@*:resource" as="attribute()" />
            
            <xsl:if test="not(some $prec in preceding-sibling::element() satisfies $prec/@*:about = $currentResource and $prec/@*:resource = $currentAbout)">
                <xsl:copy>
                    <xsl:copy-of select="@*" />
                </xsl:copy>
            </xsl:if>
        </xsl:for-each>
    </xsl:template>
    <!-- GENERAL FUNCTIONS AND TEMPLATES: end -->
</xsl:stylesheet>