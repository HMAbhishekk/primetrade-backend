# PrimeTrade Backend Assignment

## Features

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control
* CRUD Operations for Tasks
* PostgreSQL Database
* Swagger API Documentation
* React Frontend Integration

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* JWT
* bcrypt
* Swagger
* React.js

## Setup

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create `.env`

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

### Run server

```bash
npm run dev
```

## API Endpoints

### Authentication

* POST /api/v1/auth/register
* POST /api/v1/auth/login

### Tasks

* GET /api/v1/tasks
* POST /api/v1/tasks
* PUT /api/v1/tasks/:id
* DELETE /api/v1/tasks/:id

## Scalability

The application follows a modular architecture with controllers, routes, middleware, and database layers. Future improvements include Redis caching, Docker containerization, load balancing, and microservice decomposition.