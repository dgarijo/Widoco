# ----
FROM maven:3.8.3-openjdk-17-slim AS build_image

WORKDIR /var/build/widoco

COPY . .

RUN mvn package && \
    mv ./JAR/widoco*.jar ./JAR/widoco.jar

# ----
FROM openjdk:17-slim

RUN apt-get update
RUN apt-get install -y libfreetype6 fontconfig

RUN useradd widoco
RUN mkdir -p /usr/local/widoco
RUN chown -R widoco:widoco /usr/local/widoco

USER widoco

WORKDIR /usr/local/widoco

COPY --from=build_image /var/build/widoco/JAR/widoco.jar .

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar widoco.jar ${0} ${@}"]
