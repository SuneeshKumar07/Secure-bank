const db = require("../config/db");

exports.getTransactions = async (req, res) => {
    try {
        const [transactions] = await db.query(
            "SELECT * FROM Accounts WHERE user_id = ?",
            [req.user.id]
        );

        res.json({ transactions, balance: 5000 }); // Ensure JSON response
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "Server error" });
    }
};
