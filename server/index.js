const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();
const port = 3000;

app.use(cors());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: parseInt(process.env.port, 10),
});

// Middleware to parse request body
app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log('Signup request received:', { email, password }); // Debugging line

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the database
        const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
        [email, hashedPassword]
        );

        console.log('User saved:', result.rows[0]); // Debugging line

        res.status(201).json({
        message: 'User registered successfully',
        user: result.rows[0],
        });
    } catch (err) {
        console.error('Error registering user:', err); // More detailed error logging
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    console.log('Login request received:', { email, password }); // Debugging line
  
    try {
      // Check if the user exists in the database
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      const user = result.rows[0];
  
      // Compare the entered password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      console.log('User logged in:', user); // Debugging line
  
      // Return a success response
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (err) {
      console.error('Error logging in:', err); // More detailed error logging
      res.status(500).json({ message: 'Error logging in' });
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
