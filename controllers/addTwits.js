const {
  v4: uuidv4
} = require('uuid')
const {
  Sequelize, Op
} = require("sequelize")
const models = require("../models/models")
  //route handle for addTwits post request
exports.addTwits = async(req, res) => {
  const body = req.body
  const user = req.user
  console.log(user);
  if (body.twit == "") {
    res.render("pages/errors", {
      errorr: 400,
      err_msg: "Form fileds are empty"
    })
  } else {
    const user = req.user
    let twit = models.Twits.create({
      twitId: uuidv4(),
      twits: body.twit,
      user: user.uid
    }).then((twit) => {
      if (twit) {
        console.log(twit)
        console.log(user);
        res.redirect("/twits");
      } else {
        res.render("pages/errors", {
          errorr: 500,
          err_msg: "Twits Not Added"
        })
      }
    }).catch((error) => {
      console.log(`Error: ${error}`)
      res.render("pages/errors", {
        errorr: 500,
        err_msg: `Twits Not Added ${error}`
      })
    })
  }
}
