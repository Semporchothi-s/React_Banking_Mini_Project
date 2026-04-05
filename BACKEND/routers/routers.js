const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');

const signin = require("../actions/signin");
const signup = require("../actions/signup");
const logout = require("../actions/logout");
const getAccountSummary = require("../actions/accountSummary");
const addBeneficiary = require("../actions/addBeneficiary");
const transferMoney = require("../actions/transferMoney");
const getTransactionHistory = require("../actions/transactionHistory");

// Auth Routes
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout);

// Protected account routes
router.get('/account/summary', authMiddleware, getAccountSummary);
router.post('/account/beneficiary', authMiddleware, addBeneficiary);
router.post('/account/transfer', authMiddleware, transferMoney);
router.get('/account/transactions', authMiddleware, getTransactionHistory);

module.exports = router;
