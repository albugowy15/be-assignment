# ConcreteAI BE Assignment

This project comprises a set of microservices designed to manage user accounts and payment processing.

## Project Structure

- `account-manager-service/`: Responsible for managing user accounts and authentication.
- `payment-manager-service/`: Handles payment transactions, including sending and withdrawing funds.

## Prerequisites

Before running the project, ensure that the following tools are installed on your machine:

- **Node.js 20 LTS**
- **Docker**
- **Docker Compose**

## Running the Project Locally

To get the project up and running on your local machine, follow these steps:

1. Clone this repository
   Begin by cloning the repository and navigating into the project directory:

   ```bash
   git clone https://github.com/albugowy15/be-assignment.git
   cd be-assignment
   ```

2. Start the PostgreSQL Docker Container
   Launch the PostgreSQL container using Docker Compose:

   ```bash
   docker-compose up -d postgres
   ```

3. Set Up Database Migrations and Seed Data
   Navigate to the `account-manager-service` directory, copy the environment configuration, install dependencies, and run the migrations:

   ```bash
   cd account-manager-service
   cp .env.example .env
   npm install
   npm run migrate
   cd ..
   ```

4. Launch All Services
   Start all the microservices using Docker Compose:
   ```bash
   docker-compose up
   ```

Once the services are running, you can access all microservices via the Kong API Gateway at [http://localhost:8000](http://localhost:8000):

- Account Service: `http://localhost:8000/account`
- Payment Service: `http://localhost:8000/payment`

Alternatively, you can access each service individually:

- Account Service: `http://localhost:3000`
- Payment Service: `http://localhost:3001`

## Swagger API Documentation

For detailed API documentation, you can refer to the Swagger documentation available at the following URLs:

- Account Manager Documentation: [http://localhost:3000/documentation](http://localhost:3000/documentation)
- Payment Manager Documentation: [http://localhost:3001/documentation](http://localhost:3001/documentation)

### Test Account Credentials

For testing purposes, you can use the following credentials to log in:

- Email: **testuser@gmail.com**
- Password: **testuser**
