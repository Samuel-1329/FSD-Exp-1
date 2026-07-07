const express = require('express');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory data storage (temporary for demo)
let users = [];

// POST: Create a new user
app.post('/users', (req, res) => {
    const { id, name, email } = req.body;

    // Validate input
    if (id === undefined || !name || !email) {
        return res.status(400).json({
            error: 'All fields (id, name, email) are required'
        });
    }

    // Convert ID to number
    const userId = Number(id);

    // Check if ID is valid
    if (isNaN(userId)) {
        return res.status(400).json({
            error: 'ID must be a number'
        });
    }

    // Check for duplicate ID
    const existingUser = users.find(user => user.id === userId);
    if (existingUser) {
        return res.status(409).json({
            error: 'User with this ID already exists'
        });
    }

    // Add new user
    users.push({
        id: userId,
        name,
        email
    });

    res.status(201).json({
        message: 'User added successfully'
    });
});

// GET: Retrieve all users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// DELETE: Remove a user by ID
app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
        return res.status(400).json({
            error: 'Invalid ID'
        });
    }

    const index = users.findIndex(user => user.id === userId);

    if (index === -1) {
        return res.status(404).json({
            error: 'User not found'
        });
    }

    const deletedUser = users.splice(index, 1);

    res.status(200).json({
        message: `User ${deletedUser[0].name} deleted successfully`
    });
});

// Default route
app.get('/', (req, res) => {
    res.send('User Management API is running...');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});