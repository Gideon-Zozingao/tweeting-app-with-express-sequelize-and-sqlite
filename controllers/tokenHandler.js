const jwt = require("jsonwebtoken")
const secretKey = require('../config/config.js')
exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.Auth
  if (token == undefined) {
    res.redirect("/user-login")
  } else {
    jwt.verify(token, secretKey.secretKey, (err, user) => {
      if (err) {
        console.log(err)
        res.redrec("pages/errors", {
          errorr: 403,
          err_msg: "Access Denied",
          user: token
        })
      } else {
        req.user = user
        next()
      }
    })
  }
}
