# ---- Build Stage ----
FROM maven:3.9.9-openjdk-22 AS build
WORKDIR /build

# Copy and download dependencies first
COPY pom.xml .
RUN mvn dependency:go-offline

# Now copy the rest of the source
COPY src ./src

# Build the app (no tests for faster build)
RUN mvn clean package -DskipTests

# ---- Runtime Stage ----
FROM amazoncorretto:17

WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /build/target/book-connect-0.0.1-SNAPSHOT.jar app.jar

# Set environment variable to activate the correct Spring profile
ARG PROFILE=prod
ENV SPRING_PROFILES_ACTIVE=${PROFILE}

# Expose port that Spring Boot runs on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
