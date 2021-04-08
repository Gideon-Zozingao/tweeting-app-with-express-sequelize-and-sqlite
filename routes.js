const express = require('express');

const router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const {Sequelize,Op}=require("sequelize");
//home route
router.get('/',(req,res)=>{

  res.render('pages/index',{title:"Twit Clone App>>Home"});
})


router.get("/register",(req,res)=>{
res.render('pages/createuser',{title:"Twit Clone App>>User Registration"});
})


router.get("/user-login",(req,res)=>{
res.render('pages/login',{title:"Twit Clone App>>User Login"});
})


//post request for user Registration
router.post("/register",(req,res)=>{
    let body=req.body;
    let username=body.username,password=body.password,confirmpass=body.cpassword;
      if(username===""||password===""||confirmpass===""){
          res.render('pages/errors',{title:"Error",errorr:400,err_msg:" All form fields mus not be Empty"})
    }else{
      if(password!==confirmpass){
        res.render('pages/errors',{title:"Error",errorr:400,err_msg:" Passwords Do not Match"})

      }else{
        res.render("pages/index");

      }

    }
//res.send("Registration");
})




router.post("/login",(req,res)=>{
let body=req.body;
res.send("Login");
})
//export the router middleware to be ussed on the application
module.exports=router
