const secretKey =
  "88EDD9DF1936988138D5BFB0E045AD2C298F47B6BF1D8CEBDB3E915125FDDBEBCC304F0C7380BDEA9C9D1876EF324D6D6AFEBB066BB964A60781E4EAFE3A2FB5";
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
    } else {
      jwt.verify(auth, secretKey, (err, user) => {
        if (err) {
          res.render("pages/errors", {
            errorr: 403,
            err_msg: "Access Denied"
          })
        } else {
          const twits = models.Twits.findAll({
            include: models.User,
            order: [
              ['createdAt', 'DESC'],
              ["updatedAt", "DESC"]
            ]
          }).then((twits) => {
            if (twits.length > 0) {
              req.user = user
              res.render("pages/members", {
                user: req.user,
                data: twits
              })

            } else {
              res.render('pages/twits', {
                data: ""
              });
            }
          }).catch((error) => {
            res.render("pages/errors", {
              errorr: 500,
              err_msg: `Error: ${error} `
            })
          })
        }
      })
    }
  })
}
