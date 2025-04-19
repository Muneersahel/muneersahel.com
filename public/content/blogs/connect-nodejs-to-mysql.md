# **Node.js: Integrating MySQL Database**

## **Objectives:**

- Learn how to connect a Node.js application to a MySQL database.
- Understand how to perform CRUD operations using MySQL.
- Implement data validation, error handling, and secure database interactions.

<br />

## **Prerequisites:**

- Node.js and npm installed on your machine.
- MySQL installed and running on your machine (or a remote server).
- Basic understanding of SQL and relational databases.

---

<br />

## **Setting Up the Project**

### **Step 1: Initialize a New Node.js Project**

1. Create a new directory for your project.
2. Navigate to the directory and initialize a new Node.js project:

   ```bash
   npm init -y
   ```

3. Install the necessary packages:

   ```bash
   npm install express mysql2
   ```

   - `express`: For creating the server and handling routes.
   - `mysql2`: A MySQL client for Node.js that supports promises.

<br />

### **Step 2: Set Up MySQL**

1. Create a new database in MySQL:

   ```sql
   CREATE DATABASE books_db;
   USE books_db;
   ```

2. Create a `books` table:
   ```sql
   CREATE TABLE books (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       author VARCHAR(255) NOT NULL,
       genre VARCHAR(100),
       year INT
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

<br />

### **Step 3: Connect Node.js to MySQL**

1. In your `index.js` file, set up the connection to the MySQL database:

```javascript
const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "root", // Your MySQL password
  database: "nodejs_mysql",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database");
});

// Basic Route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js MySQL API");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

Run the server and ensure that it connects to the MySQL database without any errors.

---

<br />

## **Performing CRUD Operations**

### **Step 4: Create Routes for CRUD Operations**

#### **1. GET /books: Fetch All Books**

```javascript
app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
```

<br />

#### **2. GET /books/:id: Fetch a Book by ID**

```javascript
app.get("/books/:id", (req, res) => {
  const sql = "SELECT * FROM books WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.json(result[0]);
  });
});
```

<br />

#### **3. POST /books: Add a New Book**

```javascript
app.post("/books", (req, res) => {
  const { title, author, genre, year } = req.body;
  const sql = "INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, author, genre, year], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, title, author, genre, year });
  });
});
```

<br />

#### **4. PUT /books/:id: Update a Book by ID**

```javascript
app.put("/books/:id", (req, res) => {
  const { title, author, genre, year } = req.body;
  const sql = "UPDATE books SET title = ?, author = ?, genre = ?, year = ? WHERE id = ?";
  db.query(sql, [title, author, genre, year, req.params.id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).send("Book not found");
    }
    res.json({ id: req.params.id, title, author, genre, year });
  });
});
```

<br />

#### **5. DELETE /books/:id: Delete a Book by ID**

```javascript
app.delete("/books/:id", (req, res) => {
  const sql = "DELETE FROM books WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).send("Book not found");
    }
    res.status(204).send();
  });
});
```

<br />

### **Step 5: Test the API**

Use **Postman** to test the CRUD operations:

- **GET /books**: Fetch all books.
- **POST /books**: Add a new book by sending JSON data in the request body.
- **PUT /books/:id**: Update an existing book by ID.
- **DELETE /books/:id**: Delete a book by ID.

Example **POST** request body to add a book:

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Novel",
  "year": 1925
}
```

---

<br />

## **Data Validation and Error Handling**

### **Step 6: Implement Data Validation**

To ensure that incoming data is valid, you can add basic validation before interacting with the database. For instance, ensure that the title and author fields are not empty:

```javascript
app.post("/books", (req, res) => {
  const { title, author, genre, year } = req.body;
  if (!title || !author) {
    return res.status(400).send("Title and Author are required");
  }
  const sql = "INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, author, genre, year], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, title, author, genre, year });
  });
});
```

<br />

### **Step 7: Add Error Handling**

To handle unexpected errors gracefully, you can wrap your database queries in `try-catch` blocks or add a global error handler middleware:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
```

Place this at the end of your `index.js` file to ensure that it catches any errors from the other routes.

---

<br />

## **Homework**

1. Expand the API to include more data fields (e.g., `publisher`, `ISBN`).
2. Implement more complex queries, such as searching for books by title or author.
3. Add authentication to your API using a package like `jsonwebtoken` or `passport.js`.
4. Deploy your application to a platform like Heroku or DigitalOcean.

---

This lesson builds on the previous lessons by integrating a MySQL database with Node.js, allowing for more dynamic and persistent data management. It also introduces important concepts like data validation, error handling, and secure database interactions.
