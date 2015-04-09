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
    xmlns:owl="http://www.w3.org/2002/07/owl#"
	xmlns:osw="http://ontosoft.org/software#">
    
    <xsl:template name="get.custom.annotations">
            <xsl:if test="exists(osw:category | osw:isRequired)">
                <br />
                <dt>Property annotation:</dt>
                <div class="description">
                    <dl>
                    <xsl:if test="exists(osw:category)">
                            <dt>category</dt>
                            <xsl:apply-templates select="osw:category" />
                    </xsl:if>
                    <xsl:if test="exists(osw:isRequired)">
                            <dt>isRequired</dt>
                            <dd><xsl:value-of select="osw:isRequired" /></dd>
                    </xsl:if>
                    <!--xsl:if test="exists(osw:uiConfig)">
                            <dt>uiConfig</dt>
                            <dd><xsl:value-of select="osw:uiConfig" /></dd>
                    </xsl:if-->
                    </dl>
                </div>
            </xsl:if>
    </xsl:template> 

    <xsl:template match="osw:category">
        <dd>
            <xsl:apply-templates select="@*:resource | element()">
                <xsl:with-param name="type" select="'class'" as="xs:string" tunnel="yes" />
            </xsl:apply-templates>
        </dd>
    </xsl:template>
    
</xsl:stylesheet>
