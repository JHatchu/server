// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files from the 'public' directory

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  
  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid data format' });
  }

  let numbers = [];
  let alphabets = [];
  
  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[A-Za-z]$/.test(item)) {
      alphabets.push(item);
    }
  });

  const highestAlphabet = alphabets.length > 0 ? [alphabets.sort().reverse()[0]] : [];

  // Mock user data
  const userData = {
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123'
  };

  res.json({
    is_success: true,
    ...userData,
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet
  });
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
