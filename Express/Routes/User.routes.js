const express = require("express")
const router = express.Router();
const user  = require("../Models/userModel")
const {signupuser,loginuser}=require("../Controllers/usercontroller")



router.post('/login',loginuser)
router.post('/signup',signupuser)

module.exports = router