const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromAccount: { type: String, required: true },
    toAccount: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 },
    type: { type: String, enum: ['TRANSFER', 'DEPOSIT', 'WITHDRAWAL'], required: true },
    description: { type: String, default: '' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
