const User = require('../models/User');

const addBeneficiary = async (req, res) => {
    try {
        const { name, accountNumber } = req.body;

        if (!name || !accountNumber) {
            return res.status(400).json({ message: 'Beneficiary name and account number are required' });
        }

        if (accountNumber === req.user.accountNumber) {
            return res.status(400).json({ message: 'Cannot add yourself as a beneficiary' });
        }

        const beneficiaryUser = await User.findOne({ accountNumber });
        if (!beneficiaryUser) {
            return res.status(404).json({ message: 'Account number does not exist in our system' });
        }

        const user = await User.findById(req.user.userId);
        
        const exists = user.beneficiaries.some(b => b.accountNumber === accountNumber);
        if (exists) {
            return res.status(409).json({ message: 'Beneficiary already added' });
        }

        user.beneficiaries.push({ name, accountNumber });
        await user.save();

        res.status(201).json({ message: 'Beneficiary added successfully', beneficiaries: user.beneficiaries });
    } catch (error) {
        console.error('Add beneficiary error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = addBeneficiary;
