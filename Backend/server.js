// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const bankerRoutes = require("./routes/bankerRoutes");

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();


// ✅ Step 3: Use Middleware
app.use(express.json()); // ✅ Parses JSON requests
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded data
app.use(cors()); // ✅ Enables cross-origin requests (CORS)

// ✅ Step 4: Set Up API Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/bankers",bankerRoutes);

app.get("/")



// ✅ Step 5: Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
