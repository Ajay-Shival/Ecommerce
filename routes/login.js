const express = require('express')
const currentUser =require('./currentUser')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('login')
})



module.exports = router