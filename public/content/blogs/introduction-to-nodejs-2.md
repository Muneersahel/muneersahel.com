---
num: "05"
slug: "introduction-to-nodejs-2"
title: "Building RESTful APIs with Node.js and Express"
date: "2024-08-17"
brief: "Master REST API development with Node.js. Learn routing, middleware, validation, error handling, and best practices for building production-ready APIs."
tags: ["nodejs", "express", "api", "rest", "middleware", "crud"]
---

Welcome to **Part 2** of our Node.js series! In [Part 1](/blogs/introduction-to-nodejs), we covered the fundamentals of Node.js. Now we'll build on that foundation to create production-ready RESTful APIs using Express.js.

This tutorial covers everything from basic routing to advanced middleware patterns. After completing this guide, continue with [Part 3: Database Integration](/blogs/connect-nodejs-to-mysql) to add MySQL persistence to your API.

<br />

## What You'll Learn

By the end of this tutorial, you'll be able to:

- ✅ Build a complete RESTful API with Express.js
- ✅ Implement all CRUD operations (Create, Read, Update, Delete)
- ✅ Use middleware for logging, validation, and error handling
- ✅ Structure your code with modular routing
- ✅ Apply REST API best practices
- ✅ Handle errors gracefully
- ✅ Validate incoming data

<br />

## Prerequisites

Before starting, make sure you have:

- Node.js and npm installed ([Part 1 covers installation](/blogs/introduction-to-nodejs))
- Basic understanding of JavaScript and HTTP concepts
- A code editor (VS Code recommended)
- Postman or similar API testing tool

<br />

## Understanding REST APIs

**REST** (Representational State Transfer) is an architectural style for building web services. A RESTful API uses HTTP methods to perform operations on resources.

### HTTP Methods and CRUD Operations

| HTTP Method | CRUD Operation | Description               | Example               |
| ----------- | -------------- | ------------------------- | --------------------- |
| **GET**     | Read           | Retrieve resource(s)      | `GET /api/todos`      |
| **POST**    | Create         | Create new resource       | `POST /api/todos`     |
| **PUT**     | Update         | Replace entire resource   | `PUT /api/todos/1`    |
| **PATCH**   | Update         | Partially update resource | `PATCH /api/todos/1`  |
| **DELETE**  | Delete         | Remove resource           | `DELETE /api/todos/1` |

### RESTful URL Structure

```
Good REST URLs:
✅ GET    /api/todos           // Get all todos
✅ GET    /api/todos/123       // Get specific todo
✅ POST   /api/todos           // Create todo
✅ PUT    /api/todos/123       // Update todo
✅ DELETE /api/todos/123       // Delete todo

Bad URLs:
❌ GET /getTodos
❌ POST /createTodo
❌ GET /todos/delete/123
```

<br />

## Project Setup

### Step 1: Initialize Your Project

Create a new directory and initialize a Node.js project:

```bash
mkdir todo-api
cd todo-api
npm init -y
```

### Step 2: Install Dependencies

```bash
# Production dependencies
npm install express

# Development dependencies
npm install --save-dev nodemon
```

**Why nodemon?** It automatically restarts your server when files change, improving development workflow.

### Step 3: Configure package.json Scripts

Update your `package.json`:

```json
{
  "name": "todo-api",
  "version": "1.0.0",
  "description": "RESTful Todo API with Express",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

<br />

## Building Your First Express API

### Step 1: Create a Basic Express Server

Create `index.js`:

```javascript
const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Todo API",
    version: "1.0.0",
    endpoints: {
      todos: "/api/todos",
    },
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
```

Run your server:

```bash
npm run dev
```

Visit `http://localhost:3000` - you should see the welcome message!

<br />

## Implementing CRUD Operations

Let's build a complete Todo API with in-memory storage (we'll add database in Part 3).

### Step 2: Define Data Model and Storage

Add this after your imports in `index.js`:

```javascript
// In-memory database (temporary storage)
let todos = [
  {
    id: 1,
    title: "Learn Node.js",
    description: "Master the fundamentals of Node.js",
    completed: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    title: "Build REST API",
    description: "Create a production-ready API",
    completed: false,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
];

// Helper to generate unique IDs
let nextId = 3;
```

### Step 3: GET - Retrieve All Todos

```javascript
// GET /api/todos - Get all todos with optional filtering
app.get("/api/todos", (req, res) => {
  const { completed } = req.query;

  let filteredTodos = todos;

  // Filter by completion status if provided
  if (completed !== undefined) {
    const isCompleted = completed === "true";
    filteredTodos = todos.filter((todo) => todo.completed === isCompleted);
  }

  res.json({
    success: true,
    count: filteredTodos.length,
    data: filteredTodos,
  });
});
```

**Test it:**

```bash
# Get all todos
curl http://localhost:3000/api/todos

# Get only completed todos
curl http://localhost:3000/api/todos?completed=true
```

### Step 4: GET - Retrieve Single Todo

```javascript
// GET /api/todos/:id - Get a specific todo
app.get("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: "Todo not found",
    });
  }

  res.json({
    success: true,
    data: todo,
  });
});
```

**Test it:**

```bash
curl http://localhost:3000/api/todos/1
```

### Step 5: POST - Create New Todo

```javascript
// POST /api/todos - Create a new todo
app.post("/api/todos", (req, res) => {
  const { title, description } = req.body;

  // Validation
  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Title is required",
    });
  }

  // Create new todo
  const newTodo = {
    id: nextId++,
    title: title.trim(),
    description: description?.trim() || "",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  todos.push(newTodo);

  res.status(201).json({
    success: true,
    message: "Todo created successfully",
    data: newTodo,
  });
});
```

**Test it:**

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Write blog post", "description": "About REST APIs"}'
```

### Step 6: PUT - Update Entire Todo

```javascript
// PUT /api/todos/:id - Replace entire todo
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;

  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Todo not found",
    });
  }

  // Validation
  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Title is required",
    });
  }

  // Replace entire todo (keeping id and createdAt)
  const updatedTodo = {
    id,
    title: title.trim(),
    description: description?.trim() || "",
    completed: completed || false,
    createdAt: todos[todoIndex].createdAt,
    updatedAt: new Date(),
  };

  todos[todoIndex] = updatedTodo;

  res.json({
    success: true,
    message: "Todo updated successfully",
    data: updatedTodo,
  });
});
```

### Step 7: PATCH - Partially Update Todo

```javascript
// PATCH /api/todos/:id - Partially update todo
app.patch("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Todo not found",
    });
  }

  // Apply partial updates
  const updatedTodo = {
    ...todos[todoIndex],
    ...updates,
    id, // Prevent ID from being changed
    createdAt: todos[todoIndex].createdAt, // Prevent createdAt from being changed
    updatedAt: new Date(),
  };

  todos[todoIndex] = updatedTodo;

  res.json({
    success: true,
    message: "Todo updated successfully",
    data: updatedTodo,
  });
});
```

**Test it:**

```bash
# Mark todo as completed
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Step 8: DELETE - Remove Todo

```javascript
// DELETE /api/todos/:id - Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Todo not found",
    });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];

  res.json({
    success: true,
    message: "Todo deleted successfully",
    data: deletedTodo,
  });
});
```

**Test it:**

```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

<br />

## Working with Middleware

Middleware functions have access to the request (`req`), response (`res`), and the next middleware function (`next`).

### Custom Request Logger Middleware

```javascript
// Add this before your routes
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  console.log(`[${timestamp}] ${method} ${url}`);

  // Log request body for POST/PUT/PATCH
  if (["POST", "PUT", "PATCH"].includes(method) && req.body) {
    console.log("Body:", JSON.stringify(req.body));
  }

  next(); // Pass control to next middleware
};

app.use(requestLogger);
```

### Request Timing Middleware

```javascript
const requestTimer = (req, res, next) => {
  const start = Date.now();

  // Listen for response finish event
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`⏱️  ${req.method} ${req.url} - ${duration}ms`);
  });

  next();
};

app.use(requestTimer);
```

### Validation Middleware

```javascript
// Middleware factory for validating todo creation/update
const validateTodo = (req, res, next) => {
  const { title } = req.body;
  const errors = [];

  if (!title) {
    errors.push("Title is required");
  } else if (title.trim().length === 0) {
    errors.push("Title cannot be empty");
  } else if (title.length > 200) {
    errors.push("Title must be less than 200 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

// Use in specific routes
app.post("/api/todos", validateTodo, (req, res) => {
  // ... create todo
});
```

### Error Handling Middleware

```javascript
// Add this at the END of your file, after all routes
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// 404 handler (also add at the end, before error handler)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});
```

<br />

## Code Organization: Modular Routing

As your API grows, keep code organized by moving routes to separate files.

### Step 1: Create Routes Directory

```bash
mkdir routes
```

### Step 2: Create Todo Routes Module

Create `routes/todos.js`:

```javascript
const express = require("express");
const router = express.Router();

// In-memory storage (in production, this would be a database)
let todos = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let nextId = 2;

// GET /api/todos
router.get("/", (req, res) => {
  const { completed } = req.query;

  let filteredTodos = todos;
  if (completed !== undefined) {
    filteredTodos = todos.filter((t) => t.completed === (completed === "true"));
  }

  res.json({
    success: true,
    count: filteredTodos.length,
    data: filteredTodos,
  });
});

// GET /api/todos/:id
router.get("/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({ success: false, error: "Todo not found" });
  }

  res.json({ success: true, data: todo });
});

// POST /api/todos
router.post("/", (req, res) => {
  const { title, description } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({ success: false, error: "Title is required" });
  }

  const newTodo = {
    id: nextId++,
    title: title.trim(),
    description: description?.trim() || "",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  todos.push(newTodo);
  res.status(201).json({ success: true, data: newTodo });
});

// PATCH /api/todos/:id
router.patch("/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));

  if (todoIndex === -1) {
    return res.status(404).json({ success: false, error: "Todo not found" });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    ...req.body,
    id: todos[todoIndex].id,
    createdAt: todos[todoIndex].createdAt,
    updatedAt: new Date(),
  };

  res.json({ success: true, data: todos[todoIndex] });
});

// DELETE /api/todos/:id
router.delete("/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));

  if (todoIndex === -1) {
    return res.status(404).json({ success: false, error: "Todo not found" });
  }

  const deleted = todos.splice(todoIndex, 1)[0];
  res.json({ success: true, data: deleted });
});

module.exports = router;
```

### Step 3: Use the Router in Your Main File

Update `index.js`:

```javascript
const express = require("express");
const todosRouter = require("./routes/todos");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Todo API",
    endpoints: { todos: "/api/todos" },
  });
});

app.use("/api/todos", todosRouter);

// Error handling
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
```

<br />

## REST API Best Practices

### 1. Use Proper HTTP Status Codes

```javascript
// Success responses
200 OK          // Successful GET, PUT, PATCH, DELETE
201 Created     // Successful POST
204 No Content  // Successful DELETE with no body

// Client error responses
400 Bad Request      // Invalid request data
401 Unauthorized     // Authentication required
403 Forbidden        // Authenticated but not authorized
404 Not Found        // Resource doesn't exist
422 Unprocessable    // Validation errors

// Server error responses
500 Internal Server Error
503 Service Unavailable
```

### 2. Consistent Response Format

```javascript
// Success response
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}

// Error response
{
  "success": false,
  "error": "Error message",
  "errors": ["field1 error", "field2 error"] // For validation
}
```

### 3. Versioning Your API

```javascript
app.use("/api/v1/todos", todosRouter);
app.use("/api/v2/todos", todosV2Router);
```

### 4. Add CORS Support

```bash
npm install cors
```

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:4200", // Your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
```

<br />

## Practice Exercises

### Exercise 1: Add Search Functionality

Implement a search endpoint that finds todos by title:

```javascript
GET /api/todos/search?q=keyword
```

### Exercise 2: Add Pagination

Implement pagination for the todos list:

```javascript
GET /api/todos?page=1&limit=10
```

### Exercise 3: Add Sorting

Allow sorting by different fields:

```javascript
GET /api/todos?sortBy=createdAt&order=desc
```

<br />

## Next Steps

Congratulations! You've built a complete RESTful API with Express.js. Continue your learning:

1. **[Part 3: Database Integration](/blogs/connect-nodejs-to-mysql)** - Add MySQL database for persistent storage
2. **Add Authentication** - Implement JWT authentication
3. **Add Testing** - Write unit and integration tests with Jest
4. **Deploy Your API** - Deploy to platforms like Heroku, Railway, or Vercel

<br />

## Complete Code Repository

The complete code for this tutorial is available on my GitHub. Feel free to clone and experiment!

<br />

## Additional Resources

- [Express.js Official Documentation](https://expressjs.com/)
- [RESTful API Design Guide](https://restfulapi.net/)
- [HTTP Status Codes Reference](https://httpstatuses.com/)
- [Postman Learning Center](https://learning.postman.com/)

<br />

## Let's Connect

Building APIs with Node.js? I'd love to hear about your projects!

- **Twitter/X**: [@Muneersahel](https://twitter.com/Muneersahel)
- **LinkedIn**: [linkedin.com/in/muneersahel](https://www.linkedin.com/in/muneersahel/)
- **GitHub**: Check out more Node.js projects and examples

Happy coding! 🚀
