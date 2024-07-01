//this file is for checking the token entered by the user

const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) =>{
    const token = req.header("Authorization");//! here we have to write header not headers not same as postman

    if(!token){
        //if you attempt to use the expired token, you'll recieve a "401" unauthorized HTTP response
        // console.log("checking message",req.header.authorization);
        return res.status(401).json({message: "Unauthorized HTTP, Token not provided"});
    }
    //Assuming token is in the format "Bearer <JwtToken>, Removing the "Bearer" Prefix"
    const jwtToken = token.replace("Bearer", "").trim();//trim also remove spaces
    console.log("token form authMiddleware",jwtToken);
    
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);//check jwt docs for this (userNewToken, secretkey)
        // console.log(isVerified);// it will give the data that we have set in the schema >> jwt.sign()>>it has some data so we will use findOne function to get all the data
        const userData = await User.findOne({email: isVerified.email}).select({password:0,});// it will not give the password for security
        console.log(userData);
        req.user = userData;//! a new prop that contain all the data except the password and it is used in the auth-controller
        req.token = token;//token that user entered or the new one
        req.userID = userData._id;
        next();
    } catch (error) {
        res.status(401).json({message:"Unauthorized token"});
    }

}


module.exports = authMiddleware;