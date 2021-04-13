const express = require('express');
const app = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { Sequelize, Op } = require("sequelize");
const User=require("./models/User")
const Twits = require("./models/Twits")
//home route
router.get('/', async (req, res) => {
  //let User = require("./models/User.js");

  const twiters = await User.findAndCountAll(
  )
  let json_data = JSON.stringify(twiters);
  let twitors_count = JSON.parse(json_data)
  //console.log(twitors_count.count);
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;

  if (!sess_ID) {

    res.render('pages', { twitors: twitors_count.count })
  } else {

    res.render("pages/members")
  }

})
router.get("/register", (req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  res.render('pages/createuser');
})


router.get("/user-login", (req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  if (!sess_ID) {
    res.render('pages/login');
  } else {
    res.redirect('/');
  }

})


// View the  Active users
router.get("/users", (req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  if (!sess_ID) {
    res.render('pages/user');
  } else {
    res.redirect('/');
  }

})

//handels logoute request
router.get("/logout", (req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  if (!sess_ID) {
    res.redirect('/');
  } else {
    res.cookie("SID", "", { expires: new Date(Date.now() - 900000) })
    res.cookie('userID', "", {
      expires: new Date(Date.now() - 900000),
      httpOnly: true
    })
    res.cookie('username', "", {
      expires: new Date(Date.now() - 900000),
      httpOnly: true
    })

    res.redirect('/');
    console.log("Session Cookie Destr0yed and user Loged out")
  }

})

//view Twits
router.get("/twits", async (req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID
  const User = require("./models/User.js")
  const Twits = require("./models/Twits.js")
  const twits = await Twits.findAll({
    include:[{
      required:true,
      model:User,
      where:{
        UserId:User.UserId
      }
    }]
  }).then((twits) => {
    if (twits.length > 0) {
      //let twits_data=JSON.stringify(twits)
      res.render('pages/twits', { data: twits });
      //console.log(twits_data);
    } else {
      res.render('pages/twits', { data: "" });
      console.log("No twits Awialable");
    }
  }).catch((error) => {
    console.log(`Error: ${error}`);
    res.render("pages/errors", { errorr: 500, err_msg: `Error: You cannot view the Twits Due to some internal Error. Try again later ` })
  })

})
//add-twit
router.get("/add-twit", (req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;

  if (!sess_ID) {
    res.redirect('/user-login');
  } else {
    res.render('pages/add-twits');
  }

})

//post request for user Registration
router.post("/register", async (req, res) => {
  let body = req.body;
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  let username = body.username, password = body.password, confirmpass = body.cpassword;
  if (username === "" || password === "" || confirmpass === "") {
    res.render('pages/errors', { title: "Error", errorr: 400, err_msg: " All form fields mus not be Empty" })
  } else {
    if (password !== confirmpass) {
      res.render('pages/errors', { errorr: 400, err_msg: " Passwords Do not Match" })

    } else {

      //const User = require("./models/User.js");
      let existUser = await User.findOne({
        where: {
          username: username,
        }
      }
      ).then((existUser) => {
        if (existUser) {
          console.log(`Cannot Regsiter User: Username ${username} is already being used`)
          res.render("pages/errors", { errorr: 500, err_msg: `Cannot Regsiter User: Username ${username} is already being used` })
        } else {

          let user = User.create({
            UserId: uuidv4(),
            username: username, password: password

          }).then((user) => {
            console.log(user.toJSON())
            res.redirect("/user-login")
          }).catch((error) => {
            console.log(`User  Registration Not Succesful: ${error}`)
            res.render('pages/errors', { errorr: 500, err_msg: `User  Registration Not Succesful: Due to and Internal Error <br> Please Try again later` })
          })
        }
      })
    }
  }
  //res.send("Registration");
})

router.post("/login", async (req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  const { username, password } = req.body;
  if (!username || !password) {
    res.render('pages/errors', { title: "Error", errorr: 400, err_msg: "Username or Password Missing" })
  } else {
    let User = require("./models/User.js")
    let user = await User.findOne({
      where: {
        [Op.and]: [{ username: username }, { password: password }]
      }
    }
    ).then((user) => {
      if (!user) {
        console.log(`Ivalid User Credentials`);
        res.render("pages/errors", { errorr: 404, err_msg: "Invalid User Credentials" });
      } else {
        const sessid = uuidv4()
        res.cookie('SID', sessid, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true
        })
        let jason_data = JSON.stringify(user)
        const user_data = JSON.parse(jason_data)
        const curr_user = { username: user_data.username, uid: user_data.UserId };
        res.cookie('userID', curr_user.uid, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true
        })
        res.cookie('username', curr_user.username, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true
        })

        res.locals.user = curr_user;
        res.redirect("/");
        console.log(JSON.stringify(curr_user))
      }
    }).catch((error) => {
      console.log(`Error: ${error}`);
      res.render("pages/errors", { errorr: 500, err_msg: "Your login request cannot be processed Now due to some technical errors. Try again agia later" });
    })
    //res.redirect("/");
  }
  //res.send("Login");
})





// posting Twits
router.post("/add-twit", async (req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  let body = req.body
  if (body.username == "" || body.password == "" || body.twit == "") {
    res.render("pages/errors", { errorr: 400, err_msg: "Form fileds are empty" })
  } else {
    let User = require("./models/User.js");
    let user = await User.findOne({
      where: { [Op.and]: [{ username: body.username }, { password: body.password }] }
      //console.log(user)
    }).then((user) => {
      if (user) {
        let user_data = JSON.stringify(user)
        let data = JSON.parse(user_data)
        console.log(`Username: ${data.username} UserId:${data.UserId}`)
        let Twits = require("./models/Twits.js")
        let twit = Twits.create({
          twitId: uuidv4(),
          twits: body.twit,
          UserId: data.UserId

        }).then((twit) => {
          if (twit) {
            console.log(twit)
            console.log(req.locals.user);
            res.redirect("/twits");
          } else {
            res.render("pages/error", { errorr: 500, err_msg: "Twits Not Added" })
          }
        }).catch((error) => {
          console.log(`Error: ${error}`)
          res.render("pages/error", { errorr: 500, err_msg: `Twits Not Added ${error}` })
        })


      } else {
        res.render("pages/errors", { errorr: 404, err_msg: "Invalid User Credentials" })
        console.log(`Invalid User Credentials`)

      }
    }).catch((error) => {
      console.log(`Error: ${error}`)
      res.render("pages/errors", { errorr: 500, err_msg: `Internal Server Error: Your Request Could not be Processed at this Time> Try again Later` })
    })
    //res.redirect('/add-twit');
  }

})




//bad get requests get captured here
router.get('*', (req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  res.render('pages/errors', { title: "Error", errorr: 404, err_msg: "The page or reaource you are looking for is not found" })
})

//bad post request get captured here
router.post('*', (req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  res.render('pages/errors', { title: "Error", errorr: 400, err_msg: "The Request you Submites is Forbiden" })
})
//export the router middleware to be ussed on the application
module.exports = router
