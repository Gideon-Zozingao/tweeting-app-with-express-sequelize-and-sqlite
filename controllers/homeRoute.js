const secretKey =
  "88EDD9DF1936988138D5BFB0E045AD2C298F47B6BF1D8CEBDB3E915125FDDBEBCC304F0C7380BDEA9C9D1876EF324D6D6AFEBB066BB964A60781E4EAFE3A2FB5";
//imports JWT Library
const jwt = require("jsonwebtoken")

const models = require("../models/models")
exports.homeRoute = async(req, res) => {
  const auth = req.cookies.Auth;
  const twiters = await models.User.findAndCountAll().then((twiters) => {
    let json_data = JSON.stringify(twiters);
    let twitors_count = JSON.parse(json_data)
    if (auth === undefined) {
      res.render('pages', {
        twitors: twitors_count.count,
        user: req.user
      })
      console.log("Accessing the Landing Page")
    } else {
      //const token = auth && auth.split(' ')[1]
      jwt.verify(auth, secretKey, (err, user) => {
        if (err) {
          console.log(err)
          res.render("pages/errors", {
            errorr: 403,
            err_msg: "Access Denied"
          })
        } else {
          req.user = user
          res.render("pages/members", {
            user: req.user
          })
          console.log(
              `User:${JSON.stringify(user)} Accessing the Members Page`
            )
            //console.log(user)
        }
      })


    }
  })
}
