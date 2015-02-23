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
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs xd dc rdfs swrl owl2xml owl xsd swrlb rdf f dcterms"
    xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl" version="2.0"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
    xmlns:swrl="http://www.w3.org/2003/11/swrl#"
    xmlns:owl2xml="http://www.w3.org/2006/12/owl2-xml#"
    xmlns:owl="http://www.w3.org/2002/07/owl#"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
    xmlns:swrlb="http://www.w3.org/2003/11/swrlb#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:f="http://www.essepuntato.it/xslt/function"
    xmlns:dcterms="http://purl.org/dc/terms/"
    xmlns="http://www.w3.org/1999/xhtml">
    
    <xsl:template match="swrl:Imp | rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#Imp']]">
        <div id="{generate-id()}" class="entity">
            <h3>Rule #<xsl:value-of select="count(preceding-sibling::swrl:Imp | preceding-sibling::rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#Imp']]) + 1" /> <xsl:call-template name="get.backlink.to.top" /></h3>
            <p>
                <xsl:apply-templates select="swrl:body" />
                <xsl:text> -> </xsl:text>
                <xsl:apply-templates select="swrl:head" />
            </p>
        </div>
    </xsl:template>
    
    <xsl:template match="swrl:body | swrl:head | swrl:AtomList/rdf:first | rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#AtomList']]/rdf:first">
        <xsl:apply-templates />
    </xsl:template>
    
    <xsl:template match="swrl:AtomList | rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#AtomList']]">
        <xsl:apply-templates select="rdf:first" />
        <xsl:apply-templates select="rdf:rest" />
    </xsl:template>  
    
    <xsl:template match="swrl:AtomList/rdf:rest | rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#AtomList']]/rdf:rest">
        <xsl:if test="element()">
            <xsl:text> , </xsl:text>
            <xsl:apply-templates />                
        </xsl:if>
    </xsl:template>  
    
    <xsl:template match="swrl:ClassAtom | rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#ClassAtom']]">
        <xsl:apply-templates select="swrl:classPredicate" />
        <xsl:text>(</xsl:text>
        <xsl:apply-templates select="swrl:argument1" />
        <xsl:text>)</xsl:text>
    </xsl:template>  
    
    <xsl:template match="swrl:IndividualPropertyAtom | rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#IndividualPropertyAtom']] | 
    swrl:DatavaluedPropertyAtom | rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#DatavaluedPropertyAtom']]">
        <xsl:apply-templates select="swrl:propertyPredicate" />
        <xsl:text>(</xsl:text>
        <xsl:apply-templates select="swrl:argument1" />
        <xsl:text>,</xsl:text>
        <xsl:apply-templates select="swrl:argument2" />
        <xsl:text>)</xsl:text>
    </xsl:template>  
    
    <xsl:template match="swrl:SameIndividualsAtom | rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#SameIndividualsAtom']]">
        <xsl:text>SameAs(</xsl:text>
        <xsl:apply-templates select="swrl:argument1" />
        <xsl:text>,</xsl:text>
        <xsl:apply-templates select="swrl:argument2" />
        <xsl:text>)</xsl:text>
    </xsl:template>  
    
    <xsl:template match="swrl:DifferentIndividualsAtom | rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#DifferentIndividualsAtom']]">
       <xsl:text>DifferentFrom(</xsl:text>
        <xsl:apply-templates select="swrl:argument1" />
        <xsl:text>,</xsl:text>
        <xsl:apply-templates select="swrl:argument2" />
        <xsl:text>)</xsl:text>
    </xsl:template>
    
    <!-- Use http://www.essepuntato.it/2011/05/overlapping to test it -->
    <xsl:template match="swrl:BuiltinAtom | rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#BuiltinAtom']]">
    	<xsl:value-of select="substring-after(swrl:builtin/@rdf:resource,'http://www.w3.org/2003/11/swrlb#')" />
    	<xsl:text>(</xsl:text>
        <xsl:for-each select="swrl:arguments/rdf:Description">
        	<xsl:value-of select="concat('?',substring-after(@rdf:about,'#'))"/>
        	<xsl:if test="position() != last()">
        		<xsl:text>,</xsl:text>
        	</xsl:if>
        </xsl:for-each>
        <xsl:text>)</xsl:text>
    </xsl:template>
    
    <xsl:template match="swrl:classPredicate">
        <xsl:apply-templates select="@rdf:resource">
            <xsl:with-param name="type" select="'class'" tunnel="yes" as="xs:string" />
        </xsl:apply-templates>
    </xsl:template>  
    
    <xsl:template match="swrl:propertyPredicate">
        <xsl:apply-templates select="@rdf:resource">
            <xsl:with-param name="type" select="'property'" tunnel="yes" as="xs:string" />
        </xsl:apply-templates>
    </xsl:template>   
    
    <xsl:template match="swrl:argument1">
        <xsl:value-of select="concat('?',substring-after(@rdf:resource,'#'))"/>
    </xsl:template>
    
    <xsl:template match="swrl:argument2">
        <xsl:choose>
            <xsl:when test="@rdf:resource">
                <xsl:value-of select="concat('?',substring-after(@rdf:resource,'#'))"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>"</xsl:text>
                <xsl:value-of select="text()" />
                <xsl:text>"</xsl:text>
                <xsl:if test="@rdf:datatype">
                    <xsl:text>^^</xsl:text>
                    <xsl:apply-templates select="@rdf:datatype" />
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
        
    </xsl:template>
    
    <xsl:template name="get.swrlrules">
        <xsl:if test="exists(//(swrl:Imp | rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#Imp']]))">
            <div id="swrlrules">
                <h2>SWRL rules</h2>
                <xsl:apply-templates select="//(swrl:Imp | rdf:Description[rdf:type[@rdf:resource = 'http://www.w3.org/2003/11/swrl#Imp']])" />
            </div>
        </xsl:if>
    </xsl:template>
    
    <xsl:template name="get.backlink.to.top">
        <xsl:param name="toc" select="''" as="xs:string*" tunnel="yes" />
        <xsl:param name="toc.string" select="''" as="xs:string*" tunnel="yes" />
        <span class="backlink">
            <xsl:text>back to </xsl:text>
            <a href="#toc">ToC</a>
            <xsl:if test="$toc != '' and $toc.string != ''">
                <xsl:text> or </xsl:text>
                <a href="#{$toc}">
                    <xsl:value-of select="$toc.string" />
                </a>
            </xsl:if>
        </span>
    </xsl:template>
</xsl:stylesheet>