const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const router = express.Router();
require('dotenv').config();

// Generate random 36-character token
function generateAccessToken() {
    return [...Array(36)].map(() => Math.random().toString(36)[2]).join('');
}

// Login Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Fetch user from database
    db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        // Generate access token
        const accessToken = generateAccessToken();

        // Store token in database (for reference)
        db.query('UPDATE Users SET access_token = ? WHERE id = ?', [accessToken, user.id]);

        res.json({
            message: 'Login successful',
            access_token: accessToken,
            role: user.role
        });
    });
});

module.exports = router;
