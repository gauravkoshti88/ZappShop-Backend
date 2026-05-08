import { generateToken, generateToken1 } from '../config/token.js';
import User from '../model/userModel.js'
import validator from 'validator'
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid Email"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            })
        }

        let hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        })

        let token = await generateToken(newUser._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        const safeUser = newUser.toObject();
        delete safeUser.password;

        return res.status(201).json({ message: "User registered successfully", user: safeUser });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        let existUser = await User.findOne({ email });

        if (!existUser) {
            return res.status(400).json({
                message: "User does not exist"
            })
        }

        let isMatch = await bcrypt.compare(password, existUser.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }

        let token = await generateToken(existUser._id)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        const safeUser = existUser.toObject();
        delete safeUser.password;

        return res.status(200).json({ message: "User login successfully", user: safeUser });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        return res.status(200).json({
            message: "Logout Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

export const googleLogin = async (req, res) => {
    try {
        let { name, email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name, email
            })
        }

        let token = await generateToken(user._id)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            message: "Google Authentication Successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Google Login Error", error
        })
    }
}

export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let token = await generateToken1(email);
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json({
                message: "Admin Login Successfully",
                token
            })
        }
        return res.status(400).json({ message: "Invalid Creadintials" })

    } catch (error) {
        return res.status(500).json({ message: "Admin Login Error", error })
        return
    }
}