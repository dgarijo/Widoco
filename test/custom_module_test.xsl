<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template name="get.custom.class.content">
        <p class="custom812"><xsl:value-of select="concat('IRI=', @*:about)"/></p>
    </xsl:template>
</xsl:stylesheet>