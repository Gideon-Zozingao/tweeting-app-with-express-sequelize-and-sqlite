const models = require("../models/models")
exports.deleteNow = (req, res) => {
  let twit_Id = req.body.twit_id
  console.log(twit_Id)
  const twit = models.Twits.findOne({
    where: {
      twitId: twit_Id
    }
  }).then((twit) => {
    twit.destroy()
    res.redirect("/twits");
    //console.log(twit)
  })

}
