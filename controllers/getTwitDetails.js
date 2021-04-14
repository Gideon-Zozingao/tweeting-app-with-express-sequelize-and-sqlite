const models = require("../models/models")
exports.twitDetails = async(req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.user;
  res.locals.S_ID = sess_ID;
  console.log(req.params.twit_id);
  const twit = await models.Twits.findOne({
    where: {
      twitId: req.params.twit_id
    }
  }).then(twit => {
    if (twit) {
      console.log(twit)
      res.render("pages/twitDetails", {
        twit: twit,
        user: req.user
      })
    } else {
      res.render("pages/errors", {
        errorr: 404,
        err_msg: "The Information you are looking for does not exist"
      })
      console.log("The Twit does not exit anymore")
    }
  }).catch(error => {
    res.render("pages/errors", {
      errorr: 500,
      err_msg: "Error: You cannot view the information  Due to some internal Error. Try again later"
    })
    console.log(`Error ${error}`)
  })
}
