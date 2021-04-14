const models = require("../models/models")
exports.userDetails = async(req, res) => {
  let user = await models.User.findOne({
    where: {
      username: req.params.user_name
    }
  }).then((user) => {
    if (user) {
      res.render("pages/user", {
        user_data: user,
        user: req.user
      })
    } else {
      console.log("User does not exist")
      res.render("pages/errors", {
        errorr: 404,
        err_msg: "User You have looked for does not exist"
      })
    }
  })
}
