const express = require('express');

const router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {Sequelize,Op}=require("sequelize");

//home route
router.get('/',(req,res)=>{
  res.render('pages/index');
})


router.get("/register",(req,res)=>{
res.render('pages/createuser');
})


router.get("/user-login",(req,res)=>{
res.render('pages/login');
})

//post request for user Registration
router.post("/register",async(req,res)=>{
    let body=req.body;
    let username=body.username,password=body.password,confirmpass=body.cpassword;
      if(username===""||password===""||confirmpass===""){
          res.render('pages/errors',{title:"Error",errorr:400,err_msg:" All form fields mus not be Empty"})
    }else{
      if(password!==confirmpass){
        res.render('pages/errors',{errorr:400,err_msg:" Passwords Do not Match"})

      }else{

        const User=require("./models/User.js");
        let existUser= await User.findOne({
          where:{
            username:username,
          }
        }

      ).then((existUser)=>{
        if(existUser){
          console.log(`Cannot Regsiter User: Username ${username} is already being used`)
          res.render("pages/errors",{errorr:500,err_msg:`Cannot Regsiter User: Username ${username} is already being used`})
        }else{
          let hashPass=bcrypt.hashSync(password, 10);
          let user=User.create({
            userId:uuidv4(),
            username:username,password:hashPass

          }).then((user)=>{console.log(user.toJSON())
              res.redirect("/")
          }).catch((error)=>{
            console.log(`User  Registration Not Succesful: ${error}`)
            res.render('pages/errors',{errorr:500,err_msg:`User  Registration Not Succesful: ${error}`})
          })
        }
      })
      }
    }
//res.send("Registration");
})




router.post("/login",(req,res)=>{
let body=req.body;
if(body.username==""||body.password==""){
res.render('pages/errors',{title:"Error",errorr:400,err_msg:"Username or Password Missing"})
}else{

}
res.send("Login");
})
router.get('*',(req,res)=>{
  res.render('pages/errors',{title:"Error",errorr:404,err_msg:"The page or reaource you are looking for is not found"})
})
//export the router middleware to be ussed on the application
module.exports=router
