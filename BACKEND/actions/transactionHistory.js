const Transaction = require('../models/Transaction');

const getTransactionHistory = async (req, res) => {
    try {
        const accountNumber = req.user.accountNumber;

        const transactions = await Transaction.find({
            $or: [{ fromAccount: accountNumber }, { toAccount: accountNumber }]
        }).sort({ date: -1 }).limit(50);

        res.status(200).json({ currentAccount: accountNumber, transactions });
    } catch (error) {
        console.error('Transaction history error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getTransactionHistory;
