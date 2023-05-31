const jwt =require('jsonwebtoken')
const dotenv = require('dotenv');
require("dotenv").config();

const authUsers =(req,res,next)=>{
    const token=req.cookies.token
    
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET );
        if(verified){
            
            req.user=verified
            next()
        }else{
            // Access Denied
            console.err("err")
    res.send("access dened , must be user")
           
        }
    } catch (error) {
        // Access Denied
        console.log('err')
        res.redirect('/login')
    }
    }


    module.exports = authUsers