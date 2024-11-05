# Getting Started with UW ChatBot Backend

The UW ChatBot backend service is built with Java and Spring Boot. It handles user queries, data retrieval, and integrates with MongoDB, with optional support for AWS services.

## Directory Layout

- **Backend/**: Main backend service code.
  - **controllers/**: Handles HTTP requests and defines API endpoints.
  - **services/**: Contains business logic and interacts with repositories.
  - **repositories/**: Manages data access and integrates with MongoDB.
  - **models/**: Defines data models and entities.
  - **test/**: Includes test cases for different components.
    - **unit/**: Unit tests for individual functions and classes.
    - **integration/**: Integration tests for verifying components work together.

## Available Commands

In the `Backend` directory, you can run the following commands:

### Run Tests

```bash
./gradlew test
```

Launches the test runner to execute all unit and integration tests.  

### Run the Server

```bash
./gradlew bootRun
```

Runs the backend server in development mode.  
The server will start at [http://localhost:8080](http://localhost:8080).


### Build for Production

```bash
./gradlew clean build
```

Builds the backend for production.  
This command compiles the code, packages dependencies, and prepares the application for deployment.

## Adding New Tests

### Location

- **Unit Tests**: Place unit tests in the `test/unit` directory. Unit tests should focus on testing individual methods and small pieces of functionality in isolation.
- **Integration Tests**: Place integration tests in the `test/integration` directory. Integration tests verify that different parts of the application work together as expected, such as checking the functionality of the entire service layer with dependencies.

### Naming Convention

Follow the naming convention `<ComponentName>Test.java` for Java test files. For example, if you are testing a class called `UserService`, the corresponding test file should be named `UserServiceTest.java`.

### Test Framework

The project uses **JUnit 5** (Jupiter) for testing. Ensure that each test case is annotated with `@Test`. 

JUnit 5 dependencies are included in the build configuration. To use JUnit 5, write your tests within the `test` directory, and Spring Boot’s test starter (`spring-boot-starter-test`) will automatically configure the environment for running both unit and integration tests.

## Configuration

Before running the backend, create a `.env` file in the `Backend` directory with the following configuration:

```bash
# MongoDB Configuration
MONGODB_URI=your_mongodb_uri

# AWS Configuration (optional)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
```