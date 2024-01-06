const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Express
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mern_login_db',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Login Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.json({ success: false, message: 'Error during login' });
    } else if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Registration Route
// Registration Route
app.post('/api/register', (req, res) => {
  const { username, password, email, name } = req.body;
  const query = 'INSERT INTO users (username, password, email, name) VALUES (?, ?, ?, ?)';

  db.query(query, [username, password, email, name], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.json({ success: false, message: 'Error during registration' });
    } else {
      console.log('User registered successfully');
      res.json({ success: true, message: 'Registration successful' });
    }
  });
});
