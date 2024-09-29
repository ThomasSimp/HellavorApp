const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: parseInt(process.env.port, 10),
});

const verificationCodes = new Map(); // Store email-verificationCode pairs temporarily

// Setup Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send verification code
app.post('/send-verification', async (req, res) => {
  const { email } = req.body;
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Store the verification code in memory (you may want to use a database for persistence)
    verificationCodes.set(email, verificationCode);

    // Send the email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification Code',
      text: `Your verification code is ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification code sent' });
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ message: 'Error sending verification email' });
  }
});

// Verify code and sign up
app.post('/verify-code', async (req, res) => {
  const { email, password, verificationCode } = req.body;
  
  const storedCode = verificationCodes.get(email);
  if (storedCode !== verificationCode) {
    return res.status(400).json({ message: 'Invalid verification code' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    verificationCodes.delete(email); // Remove the code after successful verification
    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists in the database
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      
      if (result.rows.length === 0) {
        // User not found
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const user = result.rows[0];
      
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        // Invalid password
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // If login is successful, send a success message
      res.status(200).json({ message: 'Login successful', user: { email: user.email } });
  
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
});  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
