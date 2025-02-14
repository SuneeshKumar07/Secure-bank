const express = require("express");
const router = express.Router();
const { loginBanker, getAllCustomers, getCustomerTransactions } = require("../controllers/bankerController");
const authMiddleware = require("../middleware/authMiddleware");
const { getTransactionHistory } = require("../controllers/bankerController");
// const { getTransactionHistory } = require("../controllers/bankerController");

router.post("/login", loginBanker);
router.get("/customers", getAllCustomers);
router.post("/gettransactionhistory",getTransactionHistory)
router.get("/customers/:id/transactions", authMiddleware, getCustomerTransactions);

module.exports = router;
