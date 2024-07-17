const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

let users = [];

app.use(express.json());

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password };
  
  // Save user to array (simulating database)
  users.push(newUser);

  try {
    await fs.writeFile('users.json', JSON.stringify(users));
    res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Login failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
