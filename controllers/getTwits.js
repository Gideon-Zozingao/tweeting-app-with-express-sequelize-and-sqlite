const models=require("../models/models")
exports.viewTwits= async (req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID
  const twits = await models.Twits.findAll({
  }).then((twits) => {
    if (twits.length > 0) {
      //let twits_data=JSON.stringify(twits)
      res.render('pages/twits', { data: twits });
      //console.log(twits_data);
    } else {
      res.render('pages/twits', { data: "" });
      console.log("No twits Awialable");
    }
  }).catch((error) => {
    console.log(`Error: ${error}`);
    res.render("pages/errors", { errorr: 500, err_msg: `Error: You cannot view the Twits Due to some internal Error. Try again later ` })
  })

}
