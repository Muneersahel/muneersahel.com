# **Node.js: Building Practical Applications (Lesson 2)**

## **Objectives:**

- Build a simple RESTful API using Node.js and Express.
- Learn how to handle routes and HTTP methods (GET, POST, PUT, DELETE).
- Implement middleware for logging and error handling.
- Interact with JSON data for CRUD (Create, Read, Update, Delete) operations.

<br />

## **Prerequisites:**

- Basic understanding of Node.js and Express (covered in Lesson 1).
- Node.js and npm installed on your machine.

<br />

## **Setting Up the Project**

### **Step 1: Initialize a New Node.js Project**

1. Create a new directory for your project.
2. Navigate to the directory and initialize a new Node.js project by running:

   ```bash
   npm init -y
   ```

3. Install Express:
   ```bash
   npm install express
   ```

<br />

### **Step 2: Create the Basic Express Server**

Create a file named `index.js` and set up a basic Express server:

```javascript
const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js API");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

Run the server:

```bash
node index.js
```

Open `http://localhost:3000` in your browser or use a tool like Postman to see the welcome message.

---

## **Working with Routes and HTTP Methods**

### **Step 3: Define Routes for a RESTful API**

Let's create a simple RESTful API to manage a list of todos. We'll define routes for the following operations:

- `GET /todos`: Get a list of all todos.
- `GET /todos/:id`: Get a specific todo by its ID.
- `POST /todos`: Add a new todo.
- `PUT /todos/:id`: Update a todo by its ID.
- `DELETE /todos/:id`: Delete a todo by its ID.

<br />

In your `index.js`, define the routes:

```javascript
let todos = [
  { id: 1, title: "Write a blog post", author: "John Doe", is_completed: true },
  { id: 2, title: "Learn Node.js", author: "Jane Smith", is_completed: false },
];

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Get a todo by ID
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((b) => b.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");
  res.json(todo);
});

// Add a new todo
app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo by ID
app.put("/todos/:id", (req, res) => {
  const todo = todos.find((b) => b.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");

  todo.title = req.body.title;
  todo.author = req.body.author;
  res.json(todo);
});

// Delete a todo by ID
app.delete("/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex((b) => b.id === parseInt(req.params.id));
  if (todoIndex === -1) return res.status(404).send("Todo not found");

  todos.splice(todoIndex, 1);
  res.status(204).send();
});
```

<br />

### **Step 4: Test the API**

Use a tool like **Postman** to test the API. Here are some example requests:

- **GET /todos**: Fetch all todos.
- **POST /todos**: Add a new todo by sending JSON data in the request body.
- **PUT /todos/:id**: Update an existing todo.
- **DELETE /todos/:id**: Remove a todo from the list.

Example **POST** request body to add a todo:

```json
{
  "title": "Do a project",
  "author": "Alice",
  "is_completed": false
}
```

---

<br />

## **Adding Middleware**

### **Step 5: Implement Middleware for Logging**

**Middleware** functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle.

In this step, we’ll add a simple logging middleware that logs the details of each request:

```javascript
// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

This middleware will log the HTTP method and URL for each incoming request.

<br />

### **Step 6: Implement Error Handling Middleware**

Error-handling middleware is used to catch and handle any errors that occur during the request-response cycle.

Here’s a simple example of error-handling middleware:

```javascript
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
```

Place this at the end of your `index.js` file to ensure that it catches any errors from the other routes.

---

<br />

## **Refactoring Code: Organizing Routes into Modules**

### **Step 7: Move Routes to a Separate File**

As your application grows, you’ll want to move the routes into separate modules to keep your code organized.

1. Create a new folder called `routes`.
2. Inside the `routes` folder, create a file named `todos.js`.

Move the todos routes into `todos.js`:

```javascript
const express = require("express");
const router = express.Router();

let todos = [
  { id: 1, title: "Write a blog post", author: "John Doe", is_completed: true },
  { id: 2, title: "Learn Node.js", author: "Jane Smith", is_completed: false },
];

router.get("/", (req, res) => {
  res.json(todos);
});

router.get("/:id", (req, res) => {
  const todo = todos.find((b) => b.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");
  res.json(todo);
});

router.post("/", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.put("/:id", (req, res) => {
  const todo = todos.find((b) => b.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");

  todo.title = req.body.title;
  todo.author = req.body.author;
  res.json(todo);
});

router.delete("/:id", (req, res) => {
  const todoIndex = todos.findIndex((b) => b.id === parseInt(req.params.id));
  if (todoIndex === -1) return res.status(404).send("Todo not found");

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

module.exports = router;
```

Then, in your `index.js` file, require and use the routes:

```javascript
const todosRouter = require("./routes/todos");

app.use("/todos", todosRouter);
```

Now your routes are modularized!

---

<br />

## **Homework**

1. Expand the API to include more data (e.g., add a `timestamp` field to the todo model).
2. Add additional routes, such as a search route for finding todos by author or title.
3. Implement error handling for invalid requests (e.g., trying to update a non-existent todo).
4. Try deploying your application to a platform like Heroku.

---

This lesson builds upon the basics of Node.js and Express by applying practical concepts like route handling, middleware, and modularization. By the end of this lesson, you’ll have created a fully functional RESTful API that can perform CRUD operations.
