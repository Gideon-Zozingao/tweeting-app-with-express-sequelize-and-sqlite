const jwt = require("jsonwebtoken")
const secretKey =
  "88EDD9DF1936988138D5BFB0E045AD2C298F47B6BF1D8CEBDB3E915125FDDBEBCC304F0C7380BDEA9C9D1876EF324D6D6AFEBB066BB964A60781E4EAFE3A2FB5"
exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.Auth
  if (token == undefined) {
    res.render("pages/errors", {
      errorr: 402,
      err_msg: "Acces Denied You You need to Sign In",
      user: token
    })
  } else {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.log(err)
        res.render("pages/errors", {
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
