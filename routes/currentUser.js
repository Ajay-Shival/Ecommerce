const jwt =require('jsonwebtoken')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
require("dotenv").config();
const usersc = require('../models/userSc')

const currentUser = (req,res,next)=>{
    let token=req.cookies.token
    
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET,async(err,decodedToken)=>{
if(err){
    console.log("current user not working")
    res.locals.user=null
    next()
    return

}else{

    let user = await usersc.findById(decodedToken.user._id)
    res.locals.user=user
   
    console.log("is it")
    console.log( res.locals.user)
    console.log("current userworking")
    next()
    return

}
} )
    }
    else{
        console.log("current user not working")
        res.locals.user=null
        next()
        return

    };
       
}

module.exports = currentUser