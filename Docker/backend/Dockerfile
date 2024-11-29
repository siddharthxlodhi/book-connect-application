# Build stage

FROM maven:3.9.9-openjdk-22 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

#Runtime stage
FROM amazoncorretto:17
#define few things

WORKDIR /app
