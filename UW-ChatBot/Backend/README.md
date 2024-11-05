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

## Available Commands

In the `Backend` directory, you can run the following commands:

### Run the Server

```bash
./gradlew bootRun
```

Runs the backend server in development mode.  
The server will start at [http://localhost:8080](http://localhost:8080).

### Run Tests

```bash
./gradlew test
```

Launches the test runner to execute all unit and integration tests.  
Use this command to verify that the backend services are functioning as expected.

### Build for Production

```bash
./gradlew clean build
```

Builds the backend for production.  
This command compiles the code, packages dependencies, and prepares the application for deployment.