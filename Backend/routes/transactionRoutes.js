const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { getTransactions, depositMoney, withdrawMoney } = require("../controllers/transactionController");
const authenticateUser = require("../middleware/authMiddleware");


router.post("/balance", async (req, res) => {
    console.log("Balance hit")
    const { userId } = req.body;

    try {
        const [result] = await db.query(
            "SELECT balance FROM Bank.Accounts WHERE user_id = ?", 
            [userId]
        );

        if (result.length === 0) {
            return res.status(404).json({ error: "User account not found" });
        }
        console.log(result[0].balance)

        return res.json({ balance: result[0].balance });
    } catch (error) {
        console.error("Error fetching balance:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

// 📌 1️⃣ Deposit Money
router.post("/deposit", async (req, res) => {
    console.log("Deposit API hit");

    const { userId, amount } = req.body;
console.log(userId,amount)
    if (!userId || !amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid deposit amount" });
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction(); // Start transaction

        // Check if the account exists
        const [account] = await connection.query(
            "SELECT balance FROM Bank.Accounts WHERE user_id = ?",
            [userId]
        );

        if (account.length === 0) {
            // No account exists, create a new one
            await connection.query(
                "INSERT INTO Bank.Accounts (user_id, balance) VALUES (?, ?)",
                [userId, amount]
            );
        } else {
            // Account exists, update balance
            await connection.query(
                "UPDATE Bank.Accounts SET balance = balance + ? WHERE user_id = ?",
                [amount, userId]
            );
        }

        // Insert transaction record
        await connection.query(
            "INSERT INTO Bank.Transactions (user_id, type, amount, balance) VALUES (?, 'deposit', ?, (SELECT balance FROM Bank.Accounts WHERE user_id = ?))",
            [userId, amount, userId]
        );

        await connection.commit(); // Commit transaction
        return res.json({ message: "Deposit successful" });

    } catch (error) {
        await connection.rollback(); // Rollback transaction if any error occurs
        console.error("Error processing deposit:", error);
        return res.status(500).json({ error: "Server error: " + error.message });
    } finally {
        connection.release(); // Release connection back to pool
    }
});

// 📌 2️⃣ Withdraw Money
router.post("/withdraw", async (req, res) => {
    console.log("API hit")
    const { userId, amount } = req.body;
    console.log(userId,amount)
    if (!userId || !amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid withdrawal amount" });
    }

    try {
        // Get user's current balance
        const [result] = await db.query("SELECT balance FROM Bank.Accounts WHERE user_id = ?", [userId]);

        if (result.length === 0) {
            return res.status(404).json({ error: "User account not found" });
        }

        const currentBalance = result[0].balance;

        if (currentBalance < amount) {
            return res.status(400).json({ error: "Insufficient funds" });
        }

        // Deduct money from the account balance
        await db.query("UPDATE Bank.Accounts SET balance = balance - ? WHERE user_id = ?", [amount, userId]);

        // Insert transaction record
        await db.query(
            "INSERT INTO Bank.Transactions (user_id, type, amount, balance) VALUES (?, 'withdraw', ?, (SELECT balance FROM Bank.Accounts WHERE user_id = ?))",
            [userId, amount, userId]
        );
        return res.json({ message: "Withdrawal successful" });
    } catch (error) {
        console.error("Error processing withdrawal:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

// 📌 3️⃣ Get Transaction History
router.get("/history/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const [transactions] = await db.query("SELECT * FROM Transactions WHERE user_id = ? ORDER BY created_at DESC", [userId]);

        return res.json(transactions);
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

router.post("/historytransactions", async (req, res) => {
    const { userId } = req.body;
    console.log("Fetching transactions for user:", userId);

    try {
        const [transactions] = await db.query(
            "SELECT id, user_id, type, amount, balance, created_at FROM Bank.Transactions WHERE user_id = ? ORDER BY created_at DESC",
            [userId]
        );

        return res.json(transactions);
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        return res.status(500).json({ error: "Server error" });
    }
});



module.exports = router;
