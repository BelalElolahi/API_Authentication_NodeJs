const express = require('express');
const app  = express(); 

const dotenv = require('dotenv')
dotenv.config();

const mogoose = require('mongoose')

// Middleware  
app.use(express.json());

// Import Routes 
const authRoute = require('./routes/auth');

//Route Middlewares 
app.use('/api/user',authRoute)



//Database connect  

mogoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},()=>{
  console.log("DB connection running...")
});




app.listen(3000,()=>{
 console.log("3000 server")
});