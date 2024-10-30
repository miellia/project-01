const express = require('express');
const app = express();
const PORT = 8000;
const users = require('./MOCK_DATA.json');

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get all users in JSON format
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Route to create a new user (dummy implementation)
app.post('/api/users', (req, res) => {
    res.json({ status: "pending" });
});

// Route to handle user operations by ID
app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    })
    .patch((req, res) => {
        res.json({ status: "pending" });
    })
    .delete((req, res) => {
        res.json({ status: "pending" });
    });

// Route to display users in HTML format
app.get('/users', (req, res) => {
    const userListItems = users.map(user => `<li>${user.first_name}</li>`).join('');
    const html = `
    <ul>
        ${userListItems}
    </ul>
    `;
    res.send(html);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
