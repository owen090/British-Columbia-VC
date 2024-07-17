const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  // Example: Save user data to a file (for demonstration purposes)
  fs.appendFile('users.txt', `${username}:${password}\n`, (err) => {
    if (err) {
      console.error('Error saving user data:', err);
      res.status(500).json({ error: 'Failed to save user data' });
    } else {
      console.log('User data saved successfully');
      res.json({ message: 'Signup successful' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
