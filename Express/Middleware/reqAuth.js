const jwt = require("jsonwebtoken")
require('dotenv').config();
const User = require("../Models/userModel")
const {secret}=require("../Controllers/usercontroller")

const reqAuth = async (req,res,next)=>
    {
        const {authorization , host}=req.headers;
        if(!authorization)
            {
                return res.status(401).json({error:"Authentication token required"})

            }
        const token = authorization.split(' ')[1]
        try{
            const {_id} = jwt.verify(token,process.env.key)
            req.user = await User.findOne({_id:_id}).select('_id')
            next()
        }
        catch(error)
        {
            console.log(error)
            res.status(401).json({error:"Request is not authorized"})
        }

    }
module.exports = reqAuth;
