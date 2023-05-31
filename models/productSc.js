const mongoose = require('mongoose')

const productSc = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
   price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    quantity:{
        type:Number
    },
})

const productsc =mongoose.model('productsc',productSc)
module.exports =productsc