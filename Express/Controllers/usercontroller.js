const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const validator = require('validator');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.key, {
        expiresIn: '1h' 
    });
};

const signupuser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password) {
            throw new Error("All fields must be filled");
        }
        if (!validator.isEmail(email)) {
            throw new Error("Email is not valid");
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error("Password is not strong enough");
        }

        const exists = await User.findOne({ email });
        if (exists) throw new Error("User already exists");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hash, role });

        const token = createToken(user._id);
        res.status(201).json({ name: user.name, email: user.email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginuser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error("All fields must be filled");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Incorrect email");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Incorrect password");
        }

        const token = createToken(user._id);
        res.status(200).json({ email: user.email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    signupuser,
    loginuser
};
