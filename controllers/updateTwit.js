const {
  Sequelize, Op
} = require("sequelize")
const models = require("../models/models")
exports.UpdateTwit = async(req, res) => {
  const body = req.body;
  await models.Twits.findOne({
    where: {
      twitId: body.twit_id
    }
  }).then((twit) => {
    twit.update({
      twits: body.twit
    }).then(() => {
      res.redirect("/")
    })
  }).catch((error) => {
    console.log(`Error: ${error}`)
    res.render("pages/errors", {
      errorr: 500,
      err_msg: "You canot Update yoout Twit at this time Due to adn Internal Error. Try again Later"
    })
  })

}
