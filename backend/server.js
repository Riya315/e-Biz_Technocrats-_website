const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
console.log(process.env.DB_USER);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database");
});

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Contact API
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  const sql = `
    INSERT INTO contacts (name, email, phone, message)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({
        success: false,
        message: "Database Error"
      });
    }

    res.json({
      success: true,
      message: "Message submitted successfully!"
    });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});