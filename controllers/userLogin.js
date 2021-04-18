//secret key for JWT Token Varification
const secretKey = require('../config/config.js')
  //inports sequelize library
const {
  Sequelize, Op
} = require("sequelize");
//imports uuid library and uuiv4
const {
  v4: uuidv4
} = require('uuid');
//imports JWT Library
const jwt = require("jsonwebtoken")
  //imports the models module
const models = require("../models/models")
  //user login controller function
exports.userLogin = async(req, res) => {
  let auth = req.cookies.Auth;
  res.locals.user = req.user;
  res.locals.auth = auth;
  const {
    username, password
  } = req.body;
  if (!username || !password) {
    res.render('pages/errors', {
      errorr: 400,
      err_msg: "Username or Password Missing"
    })
  } else {
    let user = await models.User.findOne({
      where: {
        [Op.and]: [{
          username: username
        }, {
          password: password
        }]
      }
    }).then((user) => {
      if (!user) {
        res.render("pages/errors", {
          errorr: 404,
          err_msg: "Invalid User Credentials"
        });
      } else {
        const curr_user = {
          user_name: user.username,
          uid: user.userId
        };
        const token = jwt.sign(curr_user, secretKey.secretKey)
        res.cookie('Auth', token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true
        })
        res.locals.user = curr_user;

        res.redirect("/");
      }
    }).catch((error) => {
      console.log(error)
      res.render("pages/errors", {
        errorr: 500,
        err_msg: "Your login request cannot be processed Now due to some technical errors. Try again agia later",
        user: req.user
      });
    })
  }

}
