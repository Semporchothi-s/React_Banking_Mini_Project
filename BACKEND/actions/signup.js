const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
    try {
        const { name, email, password, accountNumber } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a 10-digit random account number
        // const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

        const user = new User({
            name,
            email,
            password: hashedPassword,
            accountNumber,
            balance: 500 // Initial bonus balance for demo
        });

        await user.save();

        const token = jwt.sign(
            { userId: user._id, accountNumber: user.accountNumber },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600 * 1000 // Same length as jwt declaration
        });

        res.status(201).json({
            message: 'User created successfully',
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = signup;