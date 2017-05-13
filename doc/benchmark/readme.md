Benchmark of ontologies
===================

This folder includes a benchmark with 35+ ontologies that have been using for testing Widoco's capabilities, ot that resulted to be problematic at some point when running with Widoco. They cover the following cases:

* Size: Some of the ontologies have more than 1000 classes. Used to test Widoco in cases where the web services can't handle the result.
* Multilinguality: Some ontologies are produced in multiple languages. Used to test Widoco's capabilities to produce the documentation in several languages at the same time.
* Changelog: Part of the benchmark includes ontologies for different ontology versions, in order to test the changelog
* Wrong metadata: Some ontologies have wrong or missing metadata. Used to test the robustness of Widoco
* Wrong imports: Some ontologies include imports that don't resolve. Used to test the robustness of Widoco.
* Importing local ontologies//external ontologies: Used to test local imports versus online imports for vocabularies.
* Different serializations: Used to test the robustness of Widoco, independently of the input serialization in which the ontology is provided.
* Individuals: Widoco can filter individuals in the documentation. Some ontologies with annotated individuals have been added.
* Regular ontologies: some ontologies don't present any issues, but are useful to identify corner cases. For example, having only properties and data properties with no clases, missing labels, etc.