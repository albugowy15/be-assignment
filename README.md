# ConcreteAI BE Assignment

This project consists of multiple microservices for managing user accounts and payments.

## Project Structure

- `account-manager-service/`: Manages user accounts and authentication
- `payment-manager-service/`: Manage send and withdraw payments

## Prerequisites

Ensure you have the following tools installed on your machine:

- **Node.js 20 LTS**
- **Docker**
- **Docker Compose**

## Running Locally

Follow these steps to run the project on your local machine:

1. Clone this repository

```bash
git clone https://github.com/albugowy15/be-assignment.git
cd be-assignment
```

2. Start Postgres Docker container

```bash
docker-compose up -d postgres
```

3. Set up the database migrations and seeder

```bash
cd account-manager-service
cp .env.example .env
npm install
npm run migrate
cd ..
```

4. Run all services using Docker Compose

```bash
docker-compose up
```
