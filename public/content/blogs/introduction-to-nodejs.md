# Introduction to Node.js

## What is Node.js?

Node.js is a powerful, open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser. Built on the V8 JavaScript engine (the same engine used by Google Chrome), Node.js allows developers to use JavaScript for server-side scripting, enabling the creation of dynamic web pages and applications.

## Why Use Node.js?

- **Single Programming Language**: With Node.js, you can use JavaScript both on the client side and server side, reducing the complexity of using multiple languages in a project.
- **High Performance**: Node.js is built on the V8 engine, which compiles JavaScript directly into machine code, making it fast and efficient.
- **Non-blocking I/O**: Node.js uses an event-driven, non-blocking I/O model, which makes it lightweight and efficient, ideal for data-intensive real-time applications.
- **Scalability**: Node.js is well-suited for building scalable network applications due to its asynchronous nature.

## Core Concepts in Node.js

### 1. Asynchronous Programming

Node.js uses asynchronous programming to handle operations like reading from or writing to a file, making HTTP requests, or interacting with a database. Asynchronous programming means that the program doesn't wait for an operation to complete before moving on to the next one.

**Example:**

```javascript
const fs = require("fs");

console.log("Start reading a file...");
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
console.log("File reading started...");
```

### 2. Event Loop

The event loop is the heart of Node.js. It's a mechanism that handles asynchronous operations by allowing Node.js to perform non-blocking I/O operations. The event loop continuously checks the event queue to see if there are any events to process.

### 3. Modules

Node.js uses modules to manage code in separate files and folders. Modules are JavaScript libraries that can be included in a project using `require()`.

**Example:**

```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };

// main.js
const math = require("./math");

console.log(math.add(2, 3)); // Output: 5
```

### 4. npm (Node Package Manager)

npm is the default package manager for Node.js. It allows developers to install and manage external libraries and tools that can be used in Node.js applications.

- **Installing a Package:**

  ```bash
  npm install express
  ```

- **Creating a `package.json` File:**
  ```bash
  npm init
  ```

### **5. HTTP Server**

Node.js can be used to create a simple HTTP server that listens to client requests and sends back responses.

**Example:**

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
```

### 6. Express.js

Express.js is a popular web framework built on top of Node.js. It simplifies the process of building web applications and APIs by providing a robust set of features for web and mobile applications.

**Example:**

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## When to Use Node.js?

Node.js is ideal for building:

- Real-time applications (e.g., chat applications, online gaming)
- API servers (e.g., RESTful APIs)
- Single Page Applications (SPAs)\*
- Microservices
- Data-intensive applications that need to handle a large number of requests

## Homework:

- Set up Node.js on your machine.
- Create a simple Node.js application that reads a file asynchronously and prints its content to the console.
- Explore the npm website (https://www.npmjs.com/) and find a package that could be useful for your next project.
