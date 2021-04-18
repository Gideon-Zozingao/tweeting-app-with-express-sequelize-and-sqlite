const models = require("../models/models")
exports.userDetailsSnickPic = async(req, res) => {
  const uid = req.params.user_id
    //res.send()
  const user = await models.User.findOne({
    where: {
      userId: uid
    }
  }).then((user) => {
    if (user) {
      res.render("pages/userDetails", {
        user: user
      })
    } else {
      res.send("User Does Not exist AnyM ore")
    }
  }).catch((error) => {
    res.send("<h1>An Unknwon Error Occured!</h1>")
  })

}
