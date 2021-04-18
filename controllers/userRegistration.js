const {
  Sequelize, Op
} = require("sequelize");
const {
  v4: uuidv4
} = require('uuid')
const models = require("../models/models")
  // handler for post regeut for user registration
exports.registerUser = async(req, res) => {
  const body = req.body;
  const userName = body.username;
  const password = body.password;
  const firstName = body.firstName;
  const surName = body.surName;
  const uPhone = body.phone;
  const uEmail = body.email;
  const uCountry = body.country;
  const confirmpass = body.cpassword;
  const defaultAvata = './images/DefaultAvatar.jpg'
  if (userName === "" || password === "" || confirmpass === "" || firstName ==
    "" || surName == "" || uPhone == "" || uEmail == "" || uCountry == "") {
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
      console.log(userName)
      let existUser = await models.User.findOne({
        where: {
          username: userName
        }
      }).then((existUser) => {
        if (existUser) {
          res.render("pages/errors", {
            errorr: 500,
            err_msg: `Cannot Regsiter User: Username ${userName} is already being used`
          })
        } else {
          models.User.findOne({
            where: {
              phone: uPhone
            }
          }).then((phone) => {
            if (phone) {
              res.render("pages/errors", {
                errorr: 500,
                err_msg: `Phone number:${phone} is already in use`
              })
            } else {
              models.User.findOne({
                where: {
                  email: uEmail
                }
              }).then((email) => {
                if (email) {
                  res.render("pages/errors", {
                    errorr: 500,
                    err_msg: `The Emial${email} is already in User`
                  })
                } else {
                  let user = models.User.create({
                    userId: uuidv4(),
                    username: userName,
                    password: password,
                    name: firstName,
                    surName: surName,
                    country: uCountry,
                    phone: uPhone,
                    email: uEmail,
                    avata: defaultAvata
                  }).then((user) => {
                    console.log(user)
                    res.redirect("/")
                  }).catch((error) => {
                    console.log(
                      `User  Registration Not Succesful: ${error}`
                    )
                    res.render('pages/errors', {
                      errorr: 500,
                      err_msg: `User  Registration Not Succesful: Due to and Internal Error <br> Please Try again later`
                    })
                  })
                }
              })
            }
          })
        }
      }).catch((error) => {
        console.log("Error:" + error)
        res.render('pages/errors', {
          errorr: 500,
          err_msg: `User  Registration Not Succesful: Due to and Internal Error <br> Please Try again later`
        })
      })
    }
  }
}
