const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const usersc = require('../models/userSc')
const cartsc = require('../models/cartSc')
const authUsers = require('./auth')
const currentUser = require('./currentUser')


router.use(express.urlencoded({ extended: true }));



router.get('/',authUsers,currentUser,(req,res)=>{
 const Id=req.user.user.email + ' '

   cartsc.find({userId:Id}, async function(err,docs){
    
    if (err) {
        throw err
    } else {
       await res.render('cart',{docs:docs })
       
    }

   })
   })

  
   







module.exports = router