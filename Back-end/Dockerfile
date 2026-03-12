FROM maven:3.9-eclipse-temurin-21
WORKDIR /app
COPY . .
RUN chmod +x mvnw && ./mvnw package -DskipTests
EXPOSE 8080
CMD ["java", "-jar", "target/invit-in-0.0.1-SNAPSHOT.jar"]
