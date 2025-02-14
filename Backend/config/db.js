const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the database connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Connected to MySQL database.");
        connection.release(); // Release connection back to the pool
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
    }
})();

module.exports = pool;



// import mysql from "mysql";

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "bank"
// });

// export default db;


// const mysql = require('mysql2');

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//     } else {
//         console.log('Connected to MySQL database');
//     }
// });

// module.exports = db;
