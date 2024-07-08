const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
var validator = require('validator');

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true, // Corrected from 'Timestamp : true' to 'timestamps: true'
    }
);

UserSchema.statics.signup = async function(email, password) {
    if (!email || !password) {
        throw new Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }

    const exists = await this.findOne({ email: email });
    if (exists) throw new Error("User already exists");

    const salt = await bcrypt.genSalt(10); // Corrected from '0' to '10'
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash });

    return user;
};

UserSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw {
            message: "All fields must be filled",
            status: 400 
        };
    }

    const user = await this.findOne({ email: email });
    if (!user) {
        throw {
            message: "Incorrect email",
            status: 401 
        };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw {
            message: "Incorrect password",
            status: 401 
        };
    }

    return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
