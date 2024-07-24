const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, 'Invalid email'],
        },
        password: {
            type: String,
            required: true,
            minlength: 8, // Adjust as per your password policy
        },
        role: {
            type: String,
            enum: ['admin', 'manager', 'staff'],
            default: 'staff',
            required:false
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.statics.signup = async function(email, password, role = 'staff') {
    if (!email || !password) {
        throw new Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }

    const exists = await this.findOne({ email });
    if (exists) throw new Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash, role });

    return user;
};

UserSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw new Error("All fields must be filled");
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("Incorrect password");
    }

    return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
