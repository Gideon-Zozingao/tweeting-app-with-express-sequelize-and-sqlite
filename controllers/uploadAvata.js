const models = require("../models/models")
exports.uploadAvata = async(req, res) => {
  let user = await models.User.findOne({
    where: {
      username: req.user.user_name
    }
  }).then((user) => {
    if (user) {
      res.render("pages/changerAvata", {
        user: user
      })
    } else {
      res.send("<h4>  You Accoutn is Not Availale</h4>")
    }

  })

}
