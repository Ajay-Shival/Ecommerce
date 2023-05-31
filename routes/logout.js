const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.cookie('token',{maxAge:1})
    res.redirect("/")
})

module.exports = router