const mongoose = require('mongoose')

const cartSc = new mongoose.Schema({
   
    name:{
        type:Array
       
    },
    price:{
        type:Array
    },
    quantity:{
        type:Array
    },
    userId:{
        type:String
    },
    buyer:{
        type:String
        
    },
    address:{
        type:String
      
    },
    phone:{
        type:String
       
    },
    
    token:{type:String}
   
})





const cartsc =mongoose.model('cartsc',cartSc)
module.exports =cartsc

