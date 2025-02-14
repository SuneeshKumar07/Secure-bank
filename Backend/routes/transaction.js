const express = require('express');
const db = require('./db');
const authenticateToken = require('./middleware');
const router = express.Router();

// Fetch customer transactions
router.get('/api/transactions', (req, res) => {
    const userId = req.user.id;
    console.log("transactions api hit !",userId)
    
    db.query('SELECT * FROM Accounts WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });

        res.json(results);
    });
});

module.exports = router;
