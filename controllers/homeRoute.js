const models = require("../models/models")
exports.homeRoute = async(req, res) => {
  let auth = req.cookies.Auth;
  const twiters = await models.User.findAndCountAll().then((twiters) => {
    let json_data = JSON.stringify(twiters);
    let twitors_count = JSON.parse(json_data)
    if (auth === undefined) {
      res.locals.auth = auth;
      res.render('pages', {
        twitors: twitors_count.count,
        auth: auth
      })
      console.log(auth)
    } else {
      res.render("pages/members", {
        auth: auth
      })
      console.log(auth)
    }
  })
}
