import { randomUUID } from 'crypto';

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../schemas/userSchema';

const router = express.Router();

router.post('/user/register', async (req: any, res: any) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    let uuid = randomUUID();

    try {

        let existing = await User.findOne({ uuid });
        let attempts = 0;
        const maxAttempts = 10;

        while(existing && attempts < maxAttempts) { // prevent duplicate uuids
            uuid = randomUUID();
            existing = await User.findOne({ uuid });
            attempts++;
        }

        if (attempts === maxAttempts) {
            throw new Error('Unable to generate a unique UUID after multiple attempts');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            uuid,
            username,
            password: hashedPassword,
            balance: 10000,
            schemaVersion: 1
        });

        await user.save();
        return res.status(200).json({ message: "User registered" });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

router.post('/user/login', async (req: any, res: any) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username }); // Find user by username
        if(!user) { // If user not found
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const match = await bcrypt.compare(password, user.password); // Compare passwords
        if (!match) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        if(!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "Internal server error (JWT_SECRET undefined)" });
        }

        // TODO: change to uuids
        const token = jwt.sign({ id: user.uuid, username: user.username, role: "user" }, process.env.JWT_SECRET, {expiresIn: "30d"}); // Create token expires in 30 days; possibly change to uuids

        res.cookie("token", token, { 
            httpOnly: true, // Prevent cookie from being accessed by client-side scripts
            secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
            sameSite: "strict", // CSRF protection
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days 
        }); // Set token as cookie

        return res.status(200).json({ message: "Logged in" });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

export default router;
