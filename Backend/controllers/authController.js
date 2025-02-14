const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

// 📌 1️⃣ Register User
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const [existingUser] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const [result] = await db.query("INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)", 
                                        [name, email, hashedPassword, role]);

        // Create an account for the user with a balance of 0
        await db.query("INSERT INTO Accounts (user_id, balance) VALUES (?, ?)", [result.insertId, 0.00]);

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

// 📌 2️⃣ Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Check if the user exists
        const [user] = await db.query("SELECT * FROM Bank.Users WHERE email = ?", [email]);

        if (user.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Validate password
        // const isMatch = await bcrypt.compare(password, user[0].password);
        // if (!isMatch) {
        //     return res.status(401).json({ error: "Invalid email or password" });
        // }

        // Generate JWT token
        const token = jwt.sign(
            { id: user[0].id, role: user[0].role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({ token, user: { id: user[0].id, name: user[0].name, role: user[0].role } });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

// 📌 3️⃣ Get User Profile
exports.getProfile = async (req, res) => {
    const userId = req.user.id; // Extracted from JWT middleware

    try {
        const [user] = await db.query("SELECT id, name, email, role FROM Users WHERE id = ?", [userId]);

        if (user.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json(user[0]);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ error: "Server error" });
    }
};



// import db from "../config/db.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const register = (req, res) => {
//     const { email, password, role } = req.body;
//     const hashedPassword = bcrypt.hashSync(password, 10);
//     const sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
    
//     db.query(sql, [email, hashedPassword, role], (err, result) => {
//         if (err) return res.status(500).json(err);
//         res.status(201).json({ message: "User registered successfully" });
//     });
// };

// export const login = (req, res) => {
//     const { email, password } = req.body;
//     const sql = "SELECT * FROM users WHERE email = ?";

//     db.query(sql, [email], (err, results) => {
//         if (err || results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

//         const user = results[0];
//         const isValid = bcrypt.compareSync(password, user.password);
//         if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//         res.json({ token, user: { id: user.id, email: user.email } });
//     });
// };
