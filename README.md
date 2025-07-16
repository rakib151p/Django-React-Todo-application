# Django-React-Todo-application
This is a assignment task for Gigatech Apprentice – Software Development Position

# API Documentation
Base URL: http://127.0.0.1:8000/api/auth/

1. Register a New User

**URL:** /register/ <br>
**Method:** POST <br>
**Authentication:** Not Required <br>
**Description:** Registers a new user account <br>

Request Body (JSON)
{
  "username": "rakib12345",
  "email": "rakib12345@gmail.com",
  "password": "1234"
}

Response (json)
{
  "username": "rakib12345",
  "email": "rakib12345@gmail.com",
  "password": "pbkdf2_sha256$1000000$...."
}


2. Login User (Obtain JWT Token)

URL: /login/
Method: POST
Authentication: Not Required
Description: Authenticates a user and returns access and refresh tokens

Request Body (JSON)
{
  "username": "rakib12345",
  "password": "1234"
}

Response (JSON)
{
  "refresh": "<refresh_token>",
  "access": "<access_token>",
  "user": {
    "id": 8,
    "username": "rakib12345",
    "email": "rakib12345@gmail.com"
  }
}


Todo Endpoints (Protected)


3. List All Todos

URL: /todo/
Method: GET
Authentication:  Required
Description: Returns all todos for the authenticated user

header:
Authorization: Bearer <access_token>

Response (JSON)
[
  {
    "id": 12,
    "user": 8,
    "title": "rasdr",
    "description": "refver",
    "status": "pending",
    "due_date": "2025-07-17",
    "created_at": "2025-07-15T19:43:07.194107Z",
    "updated_at": "2025-07-15T19:43:07.194107Z"
  }
  ...
]


4. Create a New Todo

URL: /todo/
Method: POST
Authentication:  Required
Description: Adds a new todo for the logged-in user

header:
Authorization: Bearer <access_token>

Request Body (JSON)
{
  "title": "New title added",
  "description": "",
  "status": "pending",
  "due_date": "2025-07-17"
}

Response (JSON)
{
  "id": 25,
  "user": 8,
  "title": "New title added",
  "description": "",
  "status": "pending",
  "due_date": "2025-07-17",
  "created_at": "2025-07-16T05:01:46.514964Z",
  "updated_at": "2025-07-16T05:01:46.514964Z"
}


5. Get a Specific Todo (Detail View)

URL: /todo/<id>/
Method: GET
Authentication:  Required
Description: Get detailed information of a single todo

header:
Authorization: Bearer <access_token>

Example url: /todo/12/

Response (JSON)
{
  "id": 12,
  "user": 8,
  "title": "rasdr",
  "description": "refver",
  "status": "pending",
  "due_date": "2025-07-17",
  "created_at": "2025-07-15T19:43:07.194107Z",
  "updated_at": "2025-07-15T19:43:07.194107Z"
}


6. Update a Todo

URL: /todo/<id>/
Method: PUT
Authentication:  Required
Description: Update the specified todo

header:
Authorization: Bearer <access_token>

Example url: /todo/25/

Request Body (Any or all fields)
{
  "title": "Title updated",
  "description": "",
  "status": "pending",
  "due_date": "2025-07-17"
}

Response (JSON)
{
  "id": 25,
  "user": 8,
  "title": "Title updated",
  "description": "",
  "status": "pending",
  "due_date": "2025-07-17",
  "created_at": "2025-07-16T05:01:46.514964Z",
  "updated_at": "2025-07-16T05:25:26.870457Z"
}


7. Delete a Todo

URL: /todo/<id>/
Method: DELETE
Authentication:  Required
Description: Deletes a todo owned by the user

header:
Authorization: Bearer <access_token>

Response (Success)
{
  "message": "Task deleted"
} 

Response (If not authorized or not the owner)
{
  "error": "Task not found"
}
