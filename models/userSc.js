const mongoose = require('mongoose')


const userSc = new mongoose.Schema({
    name:{
        type:String
        
    },
    address:{
        type:String
      
    },
  email:{
        type:String
      
        
    },
    password:{
        type:String
     
    },
    phone:{
        type:String
       
    },
          
   
    token:{type:String}
})




const usersc =mongoose.model('usersc',userSc,'userscs')
module.exports =usersc