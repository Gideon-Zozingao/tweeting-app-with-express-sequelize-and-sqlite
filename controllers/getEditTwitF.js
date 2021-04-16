const models = require("../models/models")

exports.getEditTwitForm = async(req, res) => {
  //const twitID = req.twit_id;
  console.log(req.twit_id)
  let twit = await models.Twits.findOne({
    where: {
      twitId: req.params.twit_id
    }
  }).then((twit) => {
    if (twit) {
      res.render("pages/editTwit", {
        twitData: twit
      })
    } else {
      res.render("pages/errors", {
        errorr: 404,
        err_msg: "This Information Does Not Exist Anymore"
      })
    }
  }).catch((error) => {
    console.log(`Error: ${error}`)
    res.render("pages/errors", {
      errorr: 500,
      err_msg: `Error:${error}`
    })
  })

}
