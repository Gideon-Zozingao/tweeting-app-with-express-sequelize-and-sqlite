//secret key for JWT Token Varification
const secretKey =
  "88EDD9DF1936988138D5BFB0E045AD2C298F47B6BF1D8CEBDB3E915125FDDBEBCC304F0C7380BDEA9C9D1876EF324D6D6AFEBB066BB964A60781E4EAFE3A2FB5"
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
  //importing server sonfigartion modul
const config = require("../config/config")

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
        const token = jwt.sign(curr_user, secretKey)
        res.cookie('Auth', token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true
        })
        res.locals.user = curr_user;
        res.redirect("/");
      }
    }).catch((error) => {
      res.render("pages/errors", {
        errorr: 500,
        err_msg: "Your login request cannot be processed Now due to some technical errors. Try again agia later",
        user: req.user
      });
    })
  }

}
