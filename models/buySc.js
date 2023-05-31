const mongoose = require('mongoose')


const buySc = new mongoose.Schema({
  
   
  email:{
        type:String
      
    },
    name:{
            type:Array
        },
     price:{
            type:Array
           
        },
    quantity:{
            type:Array
    },
    TotalPay:{
        type:Array
    },
    buyer:{
        type:String
        
    },
    address:{
        type:String
      
    },
    phone:{
        type:String
       
    }
})




const buysc =mongoose.model('buysc',buySc,'buyscs')
module.exports =buysc