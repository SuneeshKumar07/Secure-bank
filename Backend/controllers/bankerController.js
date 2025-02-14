const db = require("../config/db");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/authRoutes");

exports.loginBanker = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        console.log(`SELECT * FROM Bank.Bankers WHERE email = '${email}' and password='${password}';`)
        const [banker] = await db.query(`SELECT * FROM Bank.Bankers WHERE email = '${email}' and password='${password}';`);

        if (banker.length === 0 ) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: banker[0].id, role: "banker" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log(token)

        return res.json({ token,role:"banker", banker: { id: banker[0].id, name: banker[0].name } });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};
exports.getTransactionHistory = async (req, res) => {
    const { id } = req.body;
    console.log("Hitting trx history for user",id);
    try {
        const [transactions] = await db.query(
            "SELECT type, amount, balance, created_at FROM Bank.Transactions WHERE user_id = ? ORDER BY created_at DESC",
            [id]
        );

        return res.json(transactions);
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        return res.status(500).json({ error: "Server error" });
    }
    
};


exports.getAllCustomers = async (req, res) => {
    try {
        const [customers] = await db.query(`SELECT 
            u.id AS user_id,
    u.name AS username, 
    a.balance 
FROM Bank.Users u
JOIN Bank.Accounts a ON u.id = a.user_id;
`);
        console.log(customers)
        return res.json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        return res.status(500).json({ error: "Server error" });
    }
};




exports.getCustomerTransactions = async (req, res) => {
    const userId = req.params.id;
    try {
        const [transactions] = await db.promise().query(
            "SELECT * FROM Transactions WHERE user_id = ? ORDER BY created_at DESC",
            [userId]
        );
        return res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return res.status(500).json({ error: "Server error" });
    }
};
