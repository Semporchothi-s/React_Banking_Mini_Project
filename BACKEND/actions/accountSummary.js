const User = require('../models/User');

const getAccountSummary = async (req, res) => {
    try {
        console.log("req.user 1234", req.user)
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({
            name: user.name,
            accountNumber: user.accountNumber,
            balance: user.balance,
            beneficiaries: user.beneficiaries
        });
    } catch (error) {
        console.error('Account summary error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getAccountSummary;
