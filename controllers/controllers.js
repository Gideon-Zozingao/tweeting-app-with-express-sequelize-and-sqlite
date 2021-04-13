const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const jwt=require("jsonwebtoken");

const models=require("../models/models")
const home=require("./homeRoute")
const loginForm =require("./login")
const addTwitsPost=require("./addTwits")
const addTwitForm=require("./addTwitForm")
const loginUser=require("./userLogin")
const getTwitDetails=require("./getTwitDetails")
const userRegistration=require("./userRegistration")
const getTwits=require("./getTwits")
const getUserRegForm=require("./getUserRegForm")
const viewUsers=require("./viewUsers")
userLogout=require("./userLogout")
const viewUser=require("./viewUserDetail")
//const homeRoute=home.homeRoute
exports.homeRoute=home.homeRoute
exports.login=loginForm.login
exports.addTwits=addTwitsPost.addTwits
exports.getAddTwit=addTwitForm.getAddTwit
exports.userLogin=loginUser.userLogin
exports.twitDetails=getTwitDetails.twitDetails
exports.registerUser=userRegistration.registerUser
exports.viewTwits=getTwits.viewTwits
exports.createUser=getUserRegForm.createUser
exports.viewUser=viewUsers.viewUser
exports.logout=userLogout.logout
exports.userDetails=viewUser.userDetails
exports.invalidGetRequest=(req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  res.render('pages/errors', { title: "Error", errorr: 404, err_msg: "The page or reaource you are looking for is not found" })
}

exports.invalidPostRequest=(req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  res.render('pages/errors', { title: "Error", errorr: 400, err_msg: "The Request you Submites is Forbiden" })
}
