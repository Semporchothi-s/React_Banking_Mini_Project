const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const transferMoney = async (req, res) => {
    try {
        const { toAccount, amount, description } = req.body;
        const fromAccount = req.user.accountNumber;

        if (!toAccount || !amount || amount <= 0) {
            return res.status(400).json({ message: 'Valid destination account and numeric amount are required' });
        }

        if (fromAccount === toAccount) {
            return res.status(400).json({ message: 'Cannot transfer to the same account' });
        }

        const sender = await User.findOne({ accountNumber: fromAccount });
        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        const receiver = await User.findOne({ accountNumber: toAccount });
        if (!receiver) {
            return res.status(404).json({ message: 'Destination account not found' });
        }

        // Update balances
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();

        // Record transaction
        const transaction = new Transaction({
            fromAccount,
            toAccount,
            amount,
            type: 'TRANSFER',
            description: description || 'Fund Transfer'
        });

        await transaction.save();

        res.status(200).json({ message: 'Transfer successful', balance: sender.balance });
    } catch (error) {
        console.error('Transfer money error:', error);
        res.status(500).json({ message: 'Internal server error during transfer' });
    }
};

module.exports = transferMoney;
