# node-backend-api

## Requirement
* In this assignment we would like you to build an amazing web API for a frontend Pets web app. 

## User Story
* The existing code was very basic and could be significantly improved to ensure better API functionality, error handling, and flexibility for future updates

## Design Approach
* Separating the project into distinct layers (models, services, controllers, routes, utils), I ensured that each part of the application has a single responsibility. This makes the codebase more maintainable and scalable
* Each module was designed to be reusable and easily testable. This modularity allows for easier enhancements and better code organization
* Created a service layer to handle data operations separately. This makes it easier to switch to a different data store, such as a database, in the future without major code changes
* Added a middleware for validation of post data. This ensures that the API can handle and validate incoming data correctly, reducing the risk of processing invalid data.
* Added unit and End-to-End testing to help catch errors early in the development process, ensuring that new changes do not break existing functionality


# Pets API
Table of Contents
* Overview
* Application Structure
* Features
* Installation
* Usage
* API Endpoints
* Testing

## Overview
The Pets API is a TypeScript API. The api provides endpoints to manage Pets web app frontend, including functionality to create, read, update, and delete pet records. The API also includes end-to-end (E2E) tests using Cypress to ensure the API's functionality.


## Application Structure

```
.
├── src
│   ├── controllers
│   │   └── petController.ts
│   ├── services
│   │   └── petService.ts
│   ├── routes
│   │   └── petRoutes.ts
│   ├── models
│   │   └── pet.ts
│   ├── utils
│   │   └── validation.ts
│   └── index.ts
├── data
│   └── pets.json
├── tests
│   ├── unit
│   └── e2e
│       └── pets.spec.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```


## Features
* TypeScript: Strongly typed language that builds on JavaScript.
* Express: Minimalist web framework for Node.js.
* CRUD Operations: Endpoints to create, read, update, and delete pets.
* E2E Testing: Comprehensive end-to-end tests using Cypress.
* Modular Architecture: Clear separation of concerns with controllers, services, and routes.

## Installation
Prerequisites
* Node.js (v14 or later)
* npm (v6 or later)
* git

Steps
1. Clone the repository:git clone https://github.com/Nimtek123/node-backend-api.git
2. cd node-backend-api
3. Install dependencies: npm install
5. Build the development server: npm run build

## Usage
To start the server, run: npm run serve
The server will be running at http://localhost:8000.

API Endpoints
GET /
* Description: Welcome message
* Response: Express + TypeScript Server

GET /api/pets
* Description: Fetch all pets
* Response: Array of pets

GET /api/pets/{id}
* Description: Fetch a single pet by ID
* Response: Pet object

POST /api/pets/
* Description: Create a new pet
* Request Body: JSON object containing pet details
```
    {
    "id": 1,
    "name": "Daamin",
    "species": "Cat",
    "available": false,
    "birthYear": 2012,
    "dateAdded": "19-06-2021",
    "photoUrl": "https://i.imgur.com/wpfirW7.jpg"
  }
  ```
* Response: Created pet object


PUT /api/pets/{id}
* Description: Update an existing pet by ID
* Request Body: JSON object containing updated pet details
* Response: Updated pet object

DELETE /api/pets/{id}
* Description: Delete a pet by ID
* Response: Success message


## Testing
Prerequisites
* Jest: is a popular testing framework for JavaScript and TypeScript.
```
npm install --save-dev jest ts-jest @types/jest
```

* Cypress: A popular E2E testing framework.
```
npm install cypress --save-dev
```

### Unit Testing
Unit testing is essential for ensuring the individual parts of an application work as expected. The unit tests in the service layer allows to confidently verify the core functionality of the application without needing to interact with the entire system.<br />
<b>Unit tests help catch bugs early in the development process, ensuring more reliable code.</b>
```
npm test
```

### End-to-End Testing
Simulate user interactions to verify the entire system works as expected
```
npx cypress open
```


