# Django-React-Todo-application
This is a assignment task for Gigatech Apprentice – Software Development Position

# API Documentation
Base URL: http://127.0.0.1:8000/api/auth/

## 1. Register a New User <br>
**URL**: /register/ <br>
**Method**: POST <br>
**Authentication**: Not Required <br>
**Description**: Registers a new user account <br>
**Request Body (JSON)** <br>
<pre>{
  "username": "rakib12345",
  "email": "rakib12345@gmail.com", 
  "password": "1234" 
}</pre>
**Response (json)** <br>
<pre>{
  "username": "rakib12345",
  "email": "rakib12345@gmail.com", 
  "password": "pbkdf2_sha256$1000000$...."
}</pre>


## 2. Login User (Obtain JWT Token) <br>
**URL**: /login/ <br>
**Method**: POST <br>
**Authentication**: Not Required <br>
**Description**: Authenticates a user and returns access and refresh tokens <br>
**Request Body (JSON)** <br>
<pre>{
  "username": "rakib12345",
  "password": "1234" 
} </pre>
**Response (JSON)** <br>
<pre>{
  "refresh": "<refresh_token>", 
  "access": "<access_token>",
  "user": {
    "id": 8, 
    "username": "rakib12345", 
    "email": "rakib12345@gmail.com" 
  }
} </pre>


Todo Endpoints (Protected) <br>


## 3. List All Todos <br>

**URL**: /todo/ <br>
**Method**: GET <br>
**Authentication**:  Required <br>
**Description**: Returns all todos for the authenticated user <br>
**header:** <br>
**Authorization:** Bearer <access_token> <br>
**Response (JSON)** <br>
[ <br>
  <pre> {
    "id": 12, 
    "user": 8,
    "title": "rasdr", 
    "description": "refver",
    "status": "pending", 
    "due_date": "2025-07-17", 
    "created_at": "2025-07-15T19:43:07.194107Z",
    "updated_at": "2025-07-15T19:43:07.194107Z"
  } </pre>
  ...
] <br>


## 4. Create a New Todo <br>
**URL**: /todo/ <br>
**Method**: POST <br>
**Authentication**:  Required <br>
**Description**: Adds a new todo for the logged-in user <br>
**header:** <br>
**Authorization**: Bearer <access_token> <br>
**Request Body (JSON)** <br>
<pre> {
  "title": "New title added", 
  "description": "", 
  "status": "pending", 
  "due_date": "2025-07-17" 
}</pre>
**Response (JSON)** <br>
<pre> {
  "id": 25, 
  "user": 8,
  "title": "New title added", 
  "description": "", 
  "status": "pending", 
  "due_date": "2025-07-17", 
  "created_at": "2025-07-16T05:01:46.514964Z", 
  "updated_at": "2025-07-16T05:01:46.514964Z" 
} </pre>


## 5. Get a Specific Todo (Detail View) <br>
**URL**: /todo/<id>/ <br>
**Method**: GET <br>
**Authentication**:  Required <br>
**Description**: Get detailed information of a single todo <br>
**header:** <br>
**Authorization:** Bearer <access_token> <br>
**Example url:** /todo/12/ <br>
**Response (JSON)** <br>
<pre>{
  "id": 12,
  "user": 8, 
  "title": "rasdr", 
  "description": "refver", 
  "status": "pending", 
  "due_date": "2025-07-17", 
  "created_at": "2025-07-15T19:43:07.194107Z", 
  "updated_at": "2025-07-15T19:43:07.194107Z" 
}</pre>


## 6. Update a Todo <br>
**URL**: /todo/<id>/ <br>
**Method**: PUT <br>
**Authentication**:  Required <br>
**Description**: Update the specified todo <br>
**header**: <br>
**Authorization**: Bearer <access_token> <br>
**Example url:** /todo/25/ <br>
**Request Body (Any or all fields)** <br>
<pre>{
  "title": "Title updated",
  "description": "",
  "status": "pending", 
  "due_date": "2025-07-17" 
}</pre>
**Response (JSON)** <br>
<pre> {
  "id": 25, 
  "user": 8, 
  "title": "Title updated", 
  "description": "", 
  "status": "pending", 
  "due_date": "2025-07-17",
  "created_at": "2025-07-16T05:01:46.514964Z",
  "updated_at": "2025-07-16T05:25:26.870457Z"
}</pre>


## 7. Delete a Todo <br>
**URL**: /todo/<id>/ <br>
**Method**: DELETE <br>
**Authentication**:  Required <br>
**Description**: Deletes a todo owned by the user <br>
**header:** <br>
**Authorization:** Bearer <access_token> <br>
**Response (Success)** <br>
<pre>{
  "message": "Task deleted"
} </pre>
**Response (If not authorized or not the owner)** <br>
<pre> {
  "error": "Task not found"
} </pre>

# Website preview
### Login Page
![Login](site_images/login.png)

### Signup Page
![Signup](site_images/signup.png)

### Todo List
![Todo List](site_images/todo.png)

### Add Todo Page
![Add Todo](site_images/add_todo.png)

### Todo list (after adding a task)
![Dashboard](site_images/dashboard.png)

### Details Page
![Details](site_images/details.png)

### Edit Page
![Edit](site_images/edit.png)

# Watch a demo on youtube
<<<<<<< HEAD
https://youtu.be/g3JYi7Ecd04
=======
https://youtu.be/g3JYi7Ecd04
>>>>>>> 55e72b11a08adc1cac5c5842534a92c3a6971c82
