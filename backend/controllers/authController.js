import express from 'express';
import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- SignUp Controller ---
const SignUp = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User Already Exists' });
        }

        // 2. Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // 3. Create and save new user
        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();

        // 4. Send success response
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// --- SignIn Controller ---
const SignIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // 2. Compare password
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        // 3. Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // 4. Send token back
        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { SignUp, SignIn };