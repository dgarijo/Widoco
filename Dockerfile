# ----
FROM maven:3.8.3-openjdk-17-slim AS BUILD_IMAGE

WORKDIR /var/build/widoco

COPY . .

RUN mvn package && \
    mv ./JAR/widoco*.jar ./JAR/widoco.jar

# ----
FROM openjdk:17-slim

WORKDIR /usr/local/widoco

COPY --from=BUILD_IMAGE /var/build/widoco/JAR/widoco.jar .

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar widoco.jar ${0} ${@}"]