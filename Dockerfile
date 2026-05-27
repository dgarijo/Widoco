# ----
FROM maven:3.9.12-eclipse-temurin-11-alpine AS build_image

WORKDIR /var/build/widoco

COPY . .

RUN mvn package && \
    mv ./JAR/widoco*.jar ./JAR/widoco.jar

# ----
FROM eclipse-temurin:11-jdk-noble

RUN apt-get update
RUN apt-get install -y libfreetype6 fontconfig

RUN useradd widoco
RUN mkdir -p /usr/local/widoco
RUN chown -R widoco:widoco /usr/local/widoco

# allow execution of widoco with another UID while using the container's GID for writing the tmp files
# UPDATE: all users need to have write permissions to the widoco folder, otherwise issues with .devcontainers
RUN chmod -R 0777 /usr/local/widoco

USER widoco

WORKDIR /usr/local/widoco

COPY --from=build_image /var/build/widoco/JAR/widoco.jar .

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar widoco.jar ${0} ${@}"]
