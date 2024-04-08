const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const signup = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User is already there' });
        }
r
        const newUser = new User({ email, name, password });
        await newUser.save();
        
        res.status(201).json({ message: 'Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid User Name or Password' });
        }

        const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};

module.exports = { signup, login };
