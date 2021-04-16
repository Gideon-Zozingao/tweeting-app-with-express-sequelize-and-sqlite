const models = require("../models/models")

exports.deleteConfirmation = async(req, res) => {
  const twit_Id = req.params.twit_id;
  await models.Twits.findOne({
    where: {
      twitId: twit_Id
    }
  }).then((twit) => {
    res.render("pages/deleteTwit", {
      data: twit
    })
  })

}
