---
num: "06"
slug: "connect-nodejs-to-mysql"
title: "Connect Node.js to MySQL: Complete Database Integration Guide"
date: "2024-08-21"
brief: "Master MySQL database integration with Node.js. Learn connection pooling, prepared statements, transactions, and security best practices for production applications."
tags: ["nodejs", "mysql", "database", "sql", "backend", "crud"]
---

Welcome to **Part 3** of our Node.js series! In [Part 1](/blogs/introduction-to-nodejs), we learned Node.js fundamentals, and in [Part 2](/blogs/introduction-to-nodejs-2), we built a RESTful API with in-memory storage. Now, let's add **persistent data storage** using MySQL.

By the end of this guide, you'll have a production-ready Node.js application with MySQL database integration, complete with connection pooling, prepared statements, and proper error handling.

<br />

## What You'll Learn

- ✅ Connect Node.js to MySQL database
- ✅ Use connection pooling for better performance
- ✅ Implement secure SQL queries with prepared statements
- ✅ Perform CRUD operations with MySQL
- ✅ Handle transactions for data integrity
- ✅ Implement proper error handling
- ✅ Apply database security best practices

<br />

## Prerequisites

Before starting, ensure you have:

- Completed [Part 1](/blogs/introduction-to-nodejs) and [Part 2](/blogs/introduction-to-nodejs-2)
- Node.js and npm installed
- MySQL installed and running (MySQL 5.7+ or MySQL 8.0+)
- Basic knowledge of SQL
- Postman or similar API testing tool

<br />

## Understanding MySQL with Node.js

### Why MySQL?

MySQL is one of the most popular relational databases, offering:

- **ACID Compliance** - Ensures data integrity
- **High Performance** - Optimized for read-heavy workloads
- **Scalability** - Handles millions of records efficiently
- **Reliability** - Battle-tested in production environments
- **Wide Adoption** - Extensive community and resources

### MySQL vs Other Databases

| Feature      | MySQL      | PostgreSQL      | MongoDB          |
| ------------ | ---------- | --------------- | ---------------- |
| Type         | Relational | Relational      | Document         |
| ACID         | ✅         | ✅              | ✅ (with config) |
| Joins        | ✅         | ✅              | ❌               |
| JSON Support | ✅         | ✅✅            | ✅✅             |
| Ease of Use  | ⭐⭐⭐⭐   | ⭐⭐⭐          | ⭐⭐⭐⭐⭐       |
| Best For     | Web apps   | Complex queries | Flexible schemas |

<br />

## Project Setup

### Step 1: Install MySQL

**macOS (Homebrew):**

```bash
brew install mysql
brew services start mysql
```

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

**Windows:**  
Download from [MySQL Downloads](https://dev.mysql.com/downloads/installer/)

### Step 2: Initialize Node.js Project

```bash
mkdir books-api
cd books-api
npm init -y
```

### Step 3: Install Dependencies

```bash
# Production dependencies
npm install express mysql2 dotenv

# Development dependencies
npm install --save-dev nodemon
```

**Package purposes:**

- `express` - Web framework
- `mysql2` - MySQL client with promise support
- `dotenv` - Environment variable management
- `nodemon` - Auto-restart during development

### Step 4: Create Environment Configuration

Create `.env` file:

```bash
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=books_db
DB_PORT=3306

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Important**: Add `.env` to `.gitignore` to keep credentials secure!

```bash
echo ".env" >> .gitignore
```

<br />

## Database Setup

### Step 1: Create Database and Table

Connect to MySQL:

```bash
mysql -u root -p
```

Create database and table:

```sql
-- Create database
CREATE DATABASE books_db;
USE books_db;

-- Create books table
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) UNIQUE,
    genre VARCHAR(100),
    published_year INT,
    pages INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_author (author),
    INDEX idx_genre (genre),
    INDEX idx_title (title)
);

-- Insert sample data
INSERT INTO books (title, author, isbn, genre, published_year, pages, description) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 'Fiction', 1925, 180, 'A classic American novel'),
('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 'Fiction', 1960, 324, 'A novel about racial injustice'),
('1984', 'George Orwell', '9780451524935', 'Science Fiction', 1949, 328, 'Dystopian social science fiction');
```

<br />

## Connecting Node.js to MySQL

### Step 1: Create Database Configuration

Create `config/database.js`:

```javascript
const mysql = require("mysql2");
require("dotenv").config();

// Create connection pool (better than single connection)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, // Maximum connections in pool
  queueLimit: 0, // Unlimited queued requests
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Get promise-based pool
const promisePool = pool.promise();

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    return;
  }
  console.log("✅ Database connected successfully");
  connection.release();
});

module.exports = promisePool;
```

**Why Connection Pooling?**

- Reuses connections instead of creating new ones
- Improves performance significantly
- Handles concurrent requests efficiently
- Automatically manages connection lifecycle

### Step 2: Create Database Service Layer

Create `services/bookService.js`:

```javascript
const db = require("../config/database");

class BookService {
  // Get all books with optional filtering
  async getAllBooks(filters = {}) {
    try {
      let query = "SELECT * FROM books WHERE 1=1";
      const params = [];

      // Add filters dynamically
      if (filters.genre) {
        query += " AND genre = ?";
        params.push(filters.genre);
      }

      if (filters.author) {
        query += " AND author LIKE ?";
        params.push(`%${filters.author}%`);
      }

      if (filters.minYear) {
        query += " AND published_year >= ?";
        params.push(filters.minYear);
      }

      query += " ORDER BY created_at DESC";

      const [rows] = await db.execute(query, params);
      return rows;
    } catch (error) {
      throw new Error(`Failed to fetch books: ${error.message}`);
    }
  }

  // Get single book by ID
  async getBookById(id) {
    try {
      const [rows] = await db.execute("SELECT * FROM books WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Failed to fetch book: ${error.message}`);
    }
  }

  // Create new book
  async createBook(bookData) {
    const { title, author, isbn, genre, published_year, pages, description } = bookData;

    try {
      const [result] = await db.execute(
        `INSERT INTO books (title, author, isbn, genre, published_year, pages, description)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, author, isbn, genre, published_year, pages, description],
      );

      // Return the created book
      return await this.getBookById(result.insertId);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("A book with this ISBN already exists");
      }
      throw new Error(`Failed to create book: ${error.message}`);
    }
  }

  // Update book
  async updateBook(id, bookData) {
    const { title, author, isbn, genre, published_year, pages, description } = bookData;

    try {
      const [result] = await db.execute(
        `UPDATE books 
         SET title = ?, author = ?, isbn = ?, genre = ?, 
             published_year = ?, pages = ?, description = ?
         WHERE id = ?`,
        [title, author, isbn, genre, published_year, pages, description, id],
      );

      if (result.affectedRows === 0) {
        return null;
      }

      return await this.getBookById(id);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("A book with this ISBN already exists");
      }
      throw new Error(`Failed to update book: ${error.message}`);
    }
  }

  // Delete book
  async deleteBook(id) {
    try {
      const [result] = await db.execute("DELETE FROM books WHERE id = ?", [id]);

      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Failed to delete book: ${error.message}`);
    }
  }

  // Search books by title
  async searchBooks(searchTerm) {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM books 
         WHERE title LIKE ? OR author LIKE ? OR description LIKE ?
         ORDER BY title`,
        [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`],
      );
      return rows;
    } catch (error) {
      throw new Error(`Failed to search books: ${error.message}`);
    }
  }
}

module.exports = new BookService();
```

<br />

## Building the API Routes

### Step 1: Create Book Routes

Create `routes/books.js`:

```javascript
const express = require("express");
const router = express.Router();
const bookService = require("../services/bookService");

// GET /api/books - Get all books
router.get("/", async (req, res) => {
  try {
    const filters = {
      genre: req.query.genre,
      author: req.query.author,
      minYear: req.query.minYear,
    };

    const books = await bookService.getAllBooks(filters);

    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/books/search - Search books
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Search query is required",
      });
    }

    const books = await bookService.searchBooks(q);

    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/books/:id - Get single book
router.get("/:id", async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }

    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/books - Create new book
router.post("/", async (req, res) => {
  try {
    const { title, author } = req.body;

    // Validation
    if (!title || !author) {
      return res.status(400).json({
        success: false,
        error: "Title and author are required",
      });
    }

    const book = await bookService.createBook(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// PUT /api/books/:id - Update book
router.put("/:id", async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        success: false,
        error: "Title and author are required",
      });
    }

    const book = await bookService.updateBook(req.params.id, req.body);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE /api/books/:id - Delete book
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await bookService.deleteBook(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
```

### Step 2: Create Main Server File

Create `index.js`:

```javascript
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const booksRouter = require("./routes/books");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Books API",
    version: "1.0.0",
    endpoints: {
      books: "/api/books",
      search: "/api/books/search?q=term",
    },
  });
});

app.use("/api/books", booksRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

<br />

## Advanced Database Features

### 1. Transactions for Data Integrity

Create `services/transactionExample.js`:

```javascript
const db = require("../config/database");

async function transferBookToAnotherLibrary(bookId, fromLibrary, toLibrary) {
  const connection = await db.getConnection();

  try {
    // Start transaction
    await connection.beginTransaction();

    // Remove from old library
    await connection.execute("DELETE FROM library_books WHERE book_id = ? AND library_id = ?", [bookId, fromLibrary]);

    // Add to new library
    await connection.execute("INSERT INTO library_books (book_id, library_id) VALUES (?, ?)", [bookId, toLibrary]);

    // Update book location
    await connection.execute("UPDATE books SET current_library_id = ? WHERE id = ?", [toLibrary, bookId]);

    // Commit transaction
    await connection.commit();
    return { success: true };
  } catch (error) {
    // Rollback on error
    await connection.rollback();
    throw error;
  } finally {
    // Release connection back to pool
    connection.release();
  }
}
```

### 2. Pagination for Large Datasets

```javascript
async function getBooksPaginated(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  try {
    // Get total count
    const [countResult] = await db.execute("SELECT COUNT(*) as total FROM books");
    const total = countResult[0].total;

    // Get paginated data
    const [rows] = await db.execute("SELECT * FROM books ORDER BY created_at DESC LIMIT ? OFFSET ?", [limit, offset]);

    return {
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw error;
  }
}
```

### 3. Bulk Operations

```javascript
async function createMultipleBooks(booksArray) {
  const values = booksArray.map((book) => [book.title, book.author, book.isbn, book.genre, book.published_year]);

  try {
    const [result] = await db.query(
      `INSERT INTO books (title, author, isbn, genre, published_year) 
       VALUES ?`,
      [values],
    );

    return {
      insertedCount: result.affectedRows,
      firstInsertId: result.insertId,
    };
  } catch (error) {
    throw error;
  }
}
```

<br />

## Security Best Practices

### 1. Always Use Prepared Statements

```javascript
// ✅ Good - Prepared statement (prevents SQL injection)
const [rows] = await db.execute("SELECT * FROM books WHERE author = ?", [userInput]);

// ❌ Bad - String concatenation (vulnerable to SQL injection)
const query = `SELECT * FROM books WHERE author = '${userInput}'`;
const [rows] = await db.query(query);
```

### 2. Input Validation

```javascript
function validateBook(bookData) {
  const errors = [];

  if (!bookData.title || bookData.title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (bookData.isbn && !/^\d{13}$/.test(bookData.isbn)) {
    errors.push("ISBN must be 13 digits");
  }

  if (bookData.published_year && (bookData.published_year < 1000 || bookData.published_year > new Date().getFullYear())) {
    errors.push("Invalid publication year");
  }

  return errors;
}
```

### 3. Environment Variables

Never hardcode credentials:

```javascript
// ✅ Good
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

// ❌ Bad
const config = {
  host: "localhost",
  user: "root",
  password: "MyPassword123",
};
```

<br />

## Testing Your API

### Using Postman

**Get all books:**

```http
GET http://localhost:3000/api/books
```

**Filter by genre:**

```http
GET http://localhost:3000/api/books?genre=Fiction
```

**Search books:**

```http
GET http://localhost:3000/api/books/search?q=gatsby
```

**Create a book:**

```http
POST http://localhost:3000/api/books
Content-Type: application/json

{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "isbn": "9780547928227",
  "genre": "Fantasy",
  "published_year": 1937,
  "pages": 310,
  "description": "A fantasy adventure novel"
}
```

<br />

## Performance Optimization Tips

1. **Use Connection Pooling** - Already implemented ✅
2. **Add Database Indexes** - On frequently queried columns
3. **Implement Caching** - Redis for frequently accessed data
4. **Use SELECT Specific Columns** - Avoid `SELECT *` in production
5. **Batch Operations** - Group multiple inserts/updates
6. **Monitor Slow Queries** - Use MySQL slow query log

<br />

## Common Issues and Solutions

### Issue 1: "Too Many Connections"

**Solution**: Adjust pool size in `database.js`:

```javascript
connectionLimit: 5; // Reduce if hitting limits
```

### Issue 2: Connection Timeouts

**Solution**: Add timeout configuration:

```javascript
const pool = mysql.createPool({
  // ... other config
  connectTimeout: 10000,
  acquireTimeout: 10000,
});
```

### Issue 3: "ER_ACCESS_DENIED_ERROR"

**Solution**: Check MySQL user permissions:

```sql
GRANT ALL PRIVILEGES ON books_db.* TO 'your_user'@'localhost';
FLUSH PRIVILEGES;
```

<br />

## Practice Exercises

1. **Add User Reviews** - Create a reviews table and implement one-to-many relationship
2. **Implement Full-Text Search** - Use MySQL FULLTEXT indexes
3. **Add Book Categories** - Implement many-to-many relationships
4. **Create Analytics Endpoint** - Show statistics (books per genre, average pages, etc.)
5. **Implement Soft Deletes** - Add `deleted_at` column instead of hard deletes

<br />

## Next Steps

Congratulations! You now have a complete Node.js application with MySQL database integration. Here's what to explore next:

1. **Add Authentication** - Implement JWT authentication
2. **Learn ORMs** - Explore Sequelize or TypeORM
3. **Add Testing** - Write integration tests with Jest
4. **Deploy** - Deploy to platforms like Heroku, Railway, or AWS
5. **Explore NoSQL** - Try MongoDB for different use cases

<br />

## Additional Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [mysql2 Package Documentation](https://github.com/sidorares/node-mysql2)
- [SQL Best Practices](https://www.sqlstyle.guide/)
- [Database Design Fundamentals](https://www.mysqltutorial.org/mysql-database-design/)

<br />

## Let's Connect

Building database-driven applications? Share your projects!

- **Twitter/X**: [@Muneersahel](https://twitter.com/Muneersahel)
- **LinkedIn**: [linkedin.com/in/muneersahel](https://www.linkedin.com/in/muneersahel/)
- **GitHub**: Check out complete code examples and more projects

Happy coding! 🚀
