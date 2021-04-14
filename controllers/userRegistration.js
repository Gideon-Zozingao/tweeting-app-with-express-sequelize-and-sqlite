const {
  Sequelize, Op
} = require("sequelize");
const {
  v4: uuidv4
} = require('uuid')
const models = require("../models/models")
  // handler for post regeut for user registration
exports.registerUser = async(req, res) => {
  let body = req.body;
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  let username = body.username,
    password = body.password,
    confirmpass = body.cpassword;
  if (username === "" || password === "" || confirmpass === "") {
    res.render('pages/errors', {
      title: "Error",
      errorr: 400,
      err_msg: " All form fields mus not be Empty"
    })
  } else {
    if (password !== confirmpass) {
      res.render('pages/errors', {
        errorr: 400,
        err_msg: " Passwords Do not Match"
      })
    } else {
      let existUser = await models.User.findOne({
        where: {
          username: username,
        }
      }).then((existUser) => {
        if (existUser) {
          console.log(
            `Cannot Regsiter User: Username ${username} is already being used`
          )
          res.render("pages/errors", {
            errorr: 500,
            err_msg: `Cannot Regsiter User: Username ${username} is already being used`
          })
        } else {
          let user = models.User.create({
            userId: uuidv4(),
            username: username,
            password: password
          }).then((user) => {
            console.log(user.toJSON())
            res.redirect("/user-login")
          }).catch((error) => {
            console.log(`User  Registration Not Succesful: ${error}`)
            res.render('pages/errors', {
              errorr: 500,
              err_msg: `User  Registration Not Succesful: Due to and Internal Error <br> Please Try again later`
            })
          })
        }
      })
    }
  }

}
