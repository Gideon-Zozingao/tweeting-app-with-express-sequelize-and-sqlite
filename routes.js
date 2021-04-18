const express = require('express');
const router = express.Router();
const controllers = require("./controllers/controllers");

//home route
router.get('/', controllers.homeRoute)
router.post('/', controllers.homeRoute)

//gte user login page
router.get("/user-login", controllers.login)

//recive login request and preocess login
router.post("/login", controllers.userLogin)

//view Twits
router.get("/twits", controllers.authenticateToken, controllers.viewTwits)


//view Twits
router.get("/changerAvata", controllers.authenticateToken, controllers.uploadAvata)
router.post("/uploadAvata", controllers.authenticateToken, controllers.updateAvata)
  // posting Twits
router.post("/add-twit", controllers.authenticateToken, controllers.addTwits)
  //recive post request fro registration of new users and process them
router.post("/register", controllers.registerUser)

router.post("/editTwit/", controllers.authenticateToken, controllers.UpdateTwit)

//delete Twits processing
router.post("/deleteTwit", controllers.authenticateToken, controllers.deleteTwit)


// get the add-twit form
router.get("/add-twit", controllers.getAddTwit)


//view individual twits
router.get("/twit/:twit_id", controllers.authenticateToken, controllers.twitDetails)

router.get("/editTwit/:twit_id", controllers.authenticateToken, controllers.editTwit)

router.get("/deleteTwit/:twit_id", controllers.authenticateToken, controllers.deleteConfirmation)

router.get("/register", controllers.createUser)
  // View the  Active users
router.get("/users", controllers.authenticateToken, controllers.viewUser)

router.get("/user/:user_name", controllers.authenticateToken, controllers.userDetails)
router.get("/userDetails/:user_id", controllers.authenticateToken, controllers.userDetailsSnickPic)

//handels logoute request
router.get("/logout", controllers.logout)
  //bad get requests get captured here
router.get('*', controllers.invalidGetRequest)
  //bad post request get captured here
router.post('*', controllers.invalidPostRequest)
  //export the router middleware to be ussed on the application
module.exports = router
