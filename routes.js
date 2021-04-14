const express = require('express');
const router = express.Router();
const controllers = require("./controllers/controllers");

//home route
router.get('/', controllers.homeRoute)
  //gte user login page
router.get("/user-login", controllers.login)
  //recive login request and preocess login
router.post("/login", controllers.userLogin)
  //view Twits
router.get("/twits", controllers.viewTwits)
  //post request for user Registration
  // posting Twits
router.post("/add-twit", controllers.addTwits)
  //recive post request fro registration of new users and process them
router.post("/register", controllers.registerUser)
  // get the add-twit form
router.get("/add-twit", controllers.getAddTwit)
  //view individual twits
router.get("/twit/:twit_id", controllers.twitDetails)
router.get("/register", controllers.createUser)
  // View the  Active users
router.get("/users", controllers.viewUser)
router.get("/user/:user_name", controllers.userDetails)
  //handels logoute request
router.get("/logout", controllers.logout)
  //bad get requests get captured here
router.get('*', controllers.invalidGetRequest)
  //bad post request get captured here
router.post('*', controllers.invalidPostRequest)
  //export the router middleware to be ussed on the application
module.exports = router
