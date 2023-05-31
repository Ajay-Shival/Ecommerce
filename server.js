const express = require('express')
const app = express()
const cartRouter=require('./routes/cart')
const contactRouter=require('./routes/contact')
const profileRouter=require('./routes/profile')
const loginRouter=require('./routes/login')
const logoutRouter=require('./routes/logout')



const mongoose=require('mongoose')
const productsc = require('./models/productSc')
const usersc = require('./models/userSc')
const buysc = require('./models/buySc')
const cartsc = require('./models/cartSc')
const bcrypt =require('bcrypt')
const cookieParser=require('cookie-parser')
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
let DOMAIN = process.env.DOMAIN

const jwt =require('jsonwebtoken')
const dotenv = require('dotenv');
require("dotenv").config();

//decodeToken function selfmade test 1
const currentUser = require('./routes/currentUser')
const authUsers = require('./routes/auth')

mongoose.connect(process.env.MONGO_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

app.set('view engine','ejs')

app.use('/contact',contactRouter)
app.use('/profile',profileRouter)
app.use('/login',loginRouter)
app.use('/logout',logoutRouter)
app.use('/cart',cartRouter)



app.get('/',authUsers,currentUser,(req,res)=>{
 productsc.find({}, async function (err,docs){
 
if (err) {throw err}
else{
await res.render('index',{docs:docs})
console.log("done")
}
 })

    
})




app.post('/cart',authUsers,currentUser, async (req, res) => {
const existUser = await cartsc.findOne({userId:req.body.userId})
const existProd = await cartsc.findOne({name:req.body.name,userId:req.body.userId})

if(!existProd){
  if(!existUser){
    const data = new cartsc(req.body)
    data.save()
    res.send("added to th art")
  }
 if(existUser){
  const data = await cartsc.updateMany({userId:req.body.userId},{$push:
    {
      name:req.body.name,
      price:req.body.price,
      quantity:req.body.quantity
    }})
    res.send("added another item")
  }
}
if(existProd){
  if(!existUser){
    const data = new cartsc(req.body)
    data.save()
    res.send("added to th art")
  }
  if(existUser){
    res.send("exists already")
  }
 
 
}



  });

  app.post('/deleteItem',authUsers,currentUser,async (req,res)=>{
  
  
      console.log("delete")
     await cartsc.deleteOne({})
   const data= await cartsc.updateMany({userId:req.body.userId},{$pull:
     {
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity

      }}).exec()

  

       
    console.log("done delete")
    res.redirect('/cart')
})
 


  //buy post.

  app.post('/buy',authUsers,currentUser,async (req,res)=>{

const data = new buysc(req.body)
const price = data.TotalPay

//checkout trial
const YOUR_DOMAIN = process.env.YOUR_DO;


  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: 'INR',
          unit_amount: price*100,
          product_data: {
            name: 'GAMES BOUGHT',
            
           
          },
        },
        quantity: 1,
        
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}success.html`,
    cancel_url: `${YOUR_DOMAIN}cancel.html`,
  });
console.log(session)
  if (session.payment_status == 'paid') {
    cartsc.remove({ user: req.body.user }, function (err) {
        if (err) {
            console.log(err)
        }
    })
    }  



  res.redirect(303, session.url);

  
//cart empty


});






//checkout trail end




app.post("/profile",  async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { name,address,phone,email, password } = req.body;

    // Validate user input
    if (!(email && password && name && address && phone)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await usersc.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await usersc.create({
      
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      name:name,
      address:address,
      phone:phone
    });

    // Create token
    const token = jwt.sign(
      { user },
      // { user },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
    );
    console.log(token)
    // save user token
    res.cookie('tokens',token,{httpOnly:true})

    // return new user
    res.status(201).json(user);
    console.log(user.token)
  } catch (err) {
    console.log(err);
  }
  
  // Our register logic ends here
});

// ...


app.post("/login" , async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await usersc.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign( {user}, process.env.TOKEN_SECRET,{expiresIn: "1h"} );

     
     res.cookie("token",token,{httpOnly:true})

      // user
     res.send("welcome")
      console.log("login sucessful")
     

    }else{
    res.send("Invalid Credentials");}
  } catch (err) {
    
    console.log("no login")
  }
  // Our register logic ends here
});

// ...


// login

  

app.listen(5000)