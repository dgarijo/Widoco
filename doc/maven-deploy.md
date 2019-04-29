
## local maven installation

In order to be able to use widoco as a library, and import it as a maven dependency, we have to install it at least on the local maven repository, with the usual syntax:

```bash
mvn clean install
```

## deploy on a local maven repository

The following syntax can be used to deploy the artifact on a local repository, different from the default one:

```bash
mvn clean package

mvn deploy:deploy-file \
    -DgroupId=es.oeg \
    -DartifactId=widoco \
    -Dversion=1.4.9 \
    -Dpackaging=jar \
    -Dfile=target/widoco-1.4.9.jar \
    -Dsources=target/widoco-1.4.9-sources.jar \
    -Djavadoc=target/widoco-1.4.9-javadoc.jar \
    -DgeneratePom=false \
    -DpomFile=pom.xml \
    -DrepositoryId=mvn-local \
    -Durl=file:///mvn-repo
```    
