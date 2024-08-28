# To-Do List API

## Overview

The To-Do List API allows users to manage their to-do items. It includes endpoints for user registration, login, and CRUD operations on to-do items. Users can create, update, delete, and list their to-dos. The API is secured using JWT for authentication, and Prisma is used for database interactions.

The project follows a modular approach with separate files for routing, authentication, and database operations.

## Endpoints

### 1 - 📝 User Registration

**POST** `/api/register`

- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
## Response:
```
{
  "token": "string",
  "message": "User registered successfully!"
}
```
##  2 - 📜 User Login POST /api/login

## Request Body:
```
{
  "email": "string",
  "password": "string"
}
```
## Response:
```
{
  "token": "string",
  "message": "User logged in successfully!"
}
```
### 3 - 🗒️ Create a To-Do Item POST /api/todos

## Request Headers:
Authorization: Bearer <token>
## Request Body:
```
{
  "title": "string",
  "description": "string",
  "status": "string"  // Optional
}
```

## Response:
```
{
  "message": "Todo created successfully!"
}
```
### 4 - ✏️ Update a To-Do Item PUT /api todos:id

## Request Headers:

Authorization: Bearer <token>
URL Parameters: id: The ID of the to-do item to update

## Request Body:

```
{
  "title": "string",
  "description": "string",
  "status": "string"  // Optional
}
```

## Response:

```
{
  "message": "Updated todo successfully!"
}
```

### 5 - 🗑️ Delete a To-Do Item DELETE /api/todos/:id

## Request Headers:

Authorization: Bearer <token>
URL Parameters: id: The ID of the to-do item to delete

## Response:
```
{
  "message": "Todo deleted successfully!"
}
```

### 6 - 📋 Get To-Do Items GET /api/todos?page=1&limit=10

## Request Headers:

Authorization: Bearer <token>
Query Parameters:

page: The page number to retrieve (default: 1)
limit: The number of items per page (default: 10)
## Response:
```
{
  "todos": [
    {
      "id": "integer",
      "title": "string",
      "description": "string",
      "status": "string"
    }
  ],
  "page": "integer",
  "limit": "integer",
  "total": "integer"
}
```

## Authentication
JWT Token: Used to secure endpoints. Tokens are generated during login and registration.
verifyUser Middleware: Validates JWT tokens and attaches user info to the request object.
## Database
### Database: PostgreSQL
### ORM: Prisma

Schema:
prisma
```
model User {
  id       String   @id @default(cuid())
  name     String
  email    String   @unique
  password String   @unique
  todos    Todo[]
}

model Todo {
  id          Int     @id @default(autoincrement())
  title       String
  description String
  status      Status  @default(NotStarted)
  userId      String
  user        User    @relation(fields: [userId], references: [id])
}

enum Status {
  NotStarted
  InProgress
  Done
}

```


also check the link: https://roadmap.sh/projects/todo-list-api
