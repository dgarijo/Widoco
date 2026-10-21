<?xml version="1.0" encoding="UTF-8"?>
<!--
Default (empty) extension point for the description of classes.
Users can replace this file with their own version (see the -customXSLT option)
to add extra content to each class. Inside this template the current node
is the class being described.
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs rdf"
    version="2.0"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns="http://www.w3.org/1999/xhtml">

    <xsl:template name="get.custom.class.content"/>

</xsl:stylesheet>