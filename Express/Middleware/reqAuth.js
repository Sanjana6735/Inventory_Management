const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../Models/userModel");

const reqAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authentication token required" });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.KEY); // Ensure you use the correct key name from your .env file
    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token expired" });
    }
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = reqAuth;
