const models = require("../models/models")
exports.userDetails = async(req, res) => {
  let user = await models.User.findOne({
    where: {
      username: req.params.user_name
    }
  }).then((user) => {
    if (user) {
      models.Twits.findAll({
        include: models.User,
        where: {
          UserUserId: user.userId
        },

        order: [
          ['createdAt', 'DESC'],
          ["updatedAt", "DESC"]
        ]
      }).then((twits) => {
        if (twits) {
          res.render("pages/user", {
            user_data: user,
            user: req.user,
            twit_data: twits
          })
        } else {
          res.render("pages/user", {
            user_data: user,
            user: req.user,
            twit_data: ""
          })
        }
      }).catch((error) => {
        res.render("pages/errors", {
          errorr: 500,
          err_msg: "We could not Process Your request Due to Some Internal Issues. Please Tray Again Later;"
        })
      })

    } else {
      res.render("pages/errors", {
        errorr: 404,
        err_msg: "User You have looked for does not exist"
      })
    }
  })
}
