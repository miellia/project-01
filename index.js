const express = require('express');
const app = express();
const PORT = 8000;
const users = require('./MOCK_DATA.json');

// Route to get users in JSON format
app.get('/api/users', (req, res) => {
    res.json(users);
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