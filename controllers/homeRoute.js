const secretKey = require('../config/config.js')
const jwt = require("jsonwebtoken")
const models = require("../models/models")
exports.homeRoute = async(req, res) => {
  let auth = req.cookies.Auth;
  res.locals.user = req.user;
  res.locals.auth = auth;
  const twiters = await models.User.findAndCountAll().then((twiters) => {
    let json_data = JSON.stringify(twiters);
    let twitors_count = JSON.parse(json_data)
    if (auth === undefined) {
      res.render('pages', {
        twitors: twitors_count.count
      })
    } else {
      jwt.verify(auth, secretKey.secretKey, (err, user) => {
        if (err) {
          res.render("pages/errors", {
            errorr: 403,
            err_msg: "Access Denied"
          })
        } else {
          req.user = user;
          res.locals.user = user;
          const twits = models.Twits.findAll({
            include: models.User,
            order: [
              ['createdAt', 'DESC'],
              ["updatedAt", "DESC"]
            ]
          }).then((twits) => {
            if (twits.length > 0) {
              const cUser = models.User.findOne({
                where: {
                  username: req.user.user_name
                }
              }).then((cUser) => {
                res.render("pages/members", {
                  user: res.locals.user,
                  data: twits,
                  cuser: cUser
                })
              })

            } else {
              res.render('pages/members', {
                user: res.locals.user,
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
