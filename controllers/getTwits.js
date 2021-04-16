const models = require("../models/models")
exports.viewTwits = async(req, res) => {
  let auth = req.cookies.Auth;
  res.locals.user = req.user;
  res.locals.auth = auth;

  const twits = await models.Twits.findAll({
    include: models.User,
    order: [
      ['createdAt', 'DESC'],
      ["updatedAt", "DESC"]
    ]
  }).then((twits) => {
    if (twits.length > 0) {
      res.render('pages/twits', {
        data: twits
      });
    } else {
      res.render('pages/twits', {
        data: ""
      });
      console.log("No twits Awialable");
    }
  }).catch((error) => {
    console.log(`Error: ${error}`);
    res.render("pages/errors", {
      errorr: 500,
      err_msg: `Error: ${error} `
    })
  })
}
