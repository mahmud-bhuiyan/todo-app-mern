# Task Management API Documentation

Welcome to the Task Management API documentation. This API is implemented using Node.js, Express.js and MongoDB, providing functionality for managing tasks.

## Introduction
This Task Management API is designed to help you efficiently organize and track tasks. It leverages Node.js for server-side logic, Express.js for routing, and MongoDB for data storage.

## Prerequisites
- Node.js and npm installed on your machine
- MongoDB installed locally or accessible remotely

## Installation And Usage

Follow these steps to set up and run the project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mahmud-bhuiyan/SJI-task-manager-API.git
   ```

2. **Install dependencies:**

   ```bash
   cd SJI-task-manager-API
   npm install
   ```

3. **Create a .env file:**

   Create a `.env` file in the root of your project and add the following information:

   ```
   MONGO_URL=your_mongo_connection_url
   JWT_SECRET_KEY=your_SECRET_KEY
   DB_NAME=your_DB_name
   PORT=3001
   ```

   Replace `your_mongo_connection_url` with your actual MongoDB connection URI and choose a suitable `PORT`.

4. **Start the server:**

   ```bash
   npm start
   or
   nodemon start
   ```

   Access the application in a web browser at `http://localhost:3001`.

## Database Model
### User Model

- **name**: users name
- **email**: users email address
- **password**: users password (password will be hashed)

### Task Model

- **title**: Title of the task
- **description**: Description of the task
- **status**: Current status of the task (Pending, In Progress, Completed)
- **dueDate**: Due date of the task
- **owner**: ID of the user who created the task

## Authentication
To access certain features of the API, you'll need to authenticate using a token. Follow the authentication process to obtain a token and include it in the headers for secure interactions.

## Endpoints

### **Check Health**


```http
GET /health
```

### User registration

```http
POST /api/v1/users/register
```

#### Demo Request

```json
{
  "name": "Mahmud",
  "email": "mahmud@gmail.com",
  "password": "Demopassword123"
}
```

### User login

```http
POST /api/v1/users/login
```

#### Demo Request

```json
{
  "email": "mahmud@gmail.com",
  "password": "Demopassword123"
}
```
### Making Authenticated GET, POST, PATCH, DELETE Requests

For GET, POST, PATCH, DELETE requests that require authentication, you need to include the user's token obtained during the login process. Follow these steps to use the token in your request:

1. **Token Acquisition:**
   - First, ensure that the user is authenticated and has obtained a valid token during the login process.

2. **Include Token in Headers:**
   - In your GET, POST, PATCH, DELETE request, include the token in the headers.
     - **Key:** `Authorization`
     - **Value:** `Bearer YOUR_TOKEN`

   Replace `YOUR_TOKEN` with the actual token obtained during the user login.

**Example:**

```http
POST /api/v1/tasks
```
**Headers:**
```
Content-Type: application/json
Authorization: Bearer demo_token_from_user_login
```

### Create a task

```http
POST /api/v1/tasks
```

#### Demo Request

```json
{
  "title": "Task 1",
  "description": "Description for Task 1",
  "status": "Pending",
  "dueDate": "2023-11-28"
}
```

### Fetch all tasks

```http
GET /api/v1/tasks
```

#### Demo Response

```json
{
  "tasks": [
    {
      "_id": "6564e7b9d4059018a846b1d4",
      "title": "Task 1",
      "description": "Description of Task 1",
      "status": "Completed",
      "owner": "6564d4aead2453846a5d42e4",
      "dueDate": "2023-12-04T17:42:59.035Z",
      "createdAt": "2023-11-27T17:42:59.035Z",
      "updatedAt": "2023-11-27T17:44:25.242Z",
      "__v": 0
    },
    {
      "_id": "6564e7d6d4059018a846b1d7",
      "title": "Task 2",
      "description": "Description of Task 2",
      "status": "in-progress",
      "owner": "6564d4aead2453846a5d42e4",
      "dueDate": "2023-12-04T17:42:59.035Z",
      "createdAt": "2023-11-27T17:42:59.035Z",
      "updatedAt": "2023-11-27T17:44:25.242Z",
      "__v": 0
      }
    ],
    "count": 2,
    "message": "Tasks fetched successfully"
}
```

### Fetch a single task by id

```http
GET /api/v1/tasks/:id
```

#### Demo Response

```json
{
  "task": {
      "_id": "6564e7b9d4059018a846b1d4",
      "title": "Task 1",
      "description": "Description of Task 1",
      "status": "Completed",
      "owner": "6564d4aead2453846a5d42e4",
      "dueDate": "2023-12-04T17:42:59.035Z",
      "createdAt": "2023-11-27T17:42:59.035Z",
      "updatedAt": "2023-11-27T17:44:25.242Z",
      "__v": 0
    },
    "message": "Task fetched successfully"
}
```

### Update a task by id

```http
PATCH /api/v1/tasks/:id
```

#### Demo Request

```json
{
  "title": "Task 1 updated",
  "description": "Description of Task 1 updated.",
  "status": "Completed",
  "dueDate": "2023-11-28"
}
```

#### Demo Response

```json
{
  "task": {
      "_id": "6564e7b9d4059018a846b1d4",
      "title": "Task 1 updated",
      "description": "Description of Task 1 updated",
      "status": "Completed",
      "owner": "6564d4aead2453846a5d42e4",
      "dueDate": "2023-11-28T00:00:00.000Z",
      "createdAt": "2023-11-27T17:42:59.035Z",
      "updatedAt": "2023-11-27T17:44:25.242Z",
      "__v": 0
    },
    "message": "Task updated successfully"
}
```

### Delete a task by id

```http
DELETE /api/v1/tasks/:id
```

#### Demo Response

```json
{
    "task": {
        "title": "task 4",
        "status": "Completed",
        "description": "Description of Task 4",
        "dueDate": "2023-11-28T00:00:00.000Z"
    },
    "message": "task 4 - task deleted successfully"
}
```

## Error Handling

The API is designed to handle various error scenarios, including:

- **Route Not Found (404):** The requested API route does not exist.

- **User Already Exists (400):** Attempting to register a user with an email that already exists in the system.

- **User Not Found (404):** The specified user could not be found.

- **Invalid User Credentials (401):** The provided credentials during user login are incorrect.

- **Invalid Token (401):** The authentication token provided is invalid or expired.

- **Invalid Token Signature (401):** The token signature does not match the expected signature.

- **Task Not Found (404):** The requested task could not be found.

- **Invalid Task Data (400):** The data provided for creating or updating a task is invalid or incomplete.

- **Other Potential Errors (status varies):** Additional errors may occur, each accompanied by an appropriate HTTP status code and a detailed error message.

## Folder Structure

```plaintext
project-root/
│
├── controllers/
│ ├── taskController.js
│ ├── userController.js
│
├── db/
│ ├── connect.js
│
├── errors/
│ ├── customError.js
│
├── middleware/
│ ├── asyncWrapper.js
│ ├── auth.js
│ ├── customErrorHandler.js
│ ├── notFound.js
│
├── models/
│ ├── Task.js
│ ├── User.js
│
├── public/
│ ├── favicon.png
│ ├── index.html
│ ├── main.css
│
├── routes/
│ ├── taskRoutes.js
│ ├── userRoutes.js
│
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

## Libraries Used
### Server
- **Node**
- **Express**
### Additional Libraries
- **bcrypt:** Library for hashing passwords.
- **body-parser:** Middleware for parsing incoming request bodies in Express.
- **cors:** Middleware for handling Cross-Origin Resource Sharing in Express.
- **dotenv:** Loads environment variables from a .env file into process.env.
- **express:** Web application framework for Node.js.
- **jsonwebtoken:** Library for generating and verifying JSON Web Tokens (JWT).
- **mongoose:** MongoDB object modeling for Node.js.
- **nodemon:** Utility that monitors for changes in files and automatically restarts the server.


## The END

Many Thanks to `SJ Innovation` and `Project MearnifyU Team` For Your Support!
