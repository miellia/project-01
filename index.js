const express = require('express');
const fs = require('fs').promises; // Use promises for better async handling
const path = require('path'); // For handling file paths
const app = express();
const PORT = 8000;
const usersFilePath = path.join(__dirname, 'MOCK_DATA.json');

let users = [];

// Middleware to parse JSON bodies
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false }));


// Load users data
const loadUsers = async () => {
  try {
    const data = await fs.readFile(usersFilePath);
    users = JSON.parse(data);
  } catch (error) {
    console.error('Error loading users:', error);
    users = []; // Fallback to an empty array if file read fails
  }
};

// Route to get all users in JSON format
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Route to create a new user
app.post('/api/users', async (req, res) => {
  const newUser = { id: users.length + 1, ...req.body }; // Ensure all fields are included
  users.push(newUser);
  try {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2)); // Pretty print JSON
    res.status(201).json({ status: 'success', id: newUser.id });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

// Route to handle user operations by ID
app.route('/api/users/:id')
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  })
  .patch((req, res) => {
    // Placeholder for update logic
    res.json({ status: 'pending' });
  })
  .delete((req, res) => {
    // Placeholder for delete logic
    res.json({ status: 'pending' });
  });

// Route to display users in HTML format
app.get('/users', (req, res) => {
  const userListItems = users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('');
  const html = `<ul>${userListItems}</ul>`;
  res.send(html);
});

// Start the server
const startServer = async () => {
  await loadUsers(); // Load users before starting the server
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer();
