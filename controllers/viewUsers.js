const models=require("../models/models")
exports.viewUser=(req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  if (!sess_ID) {
    res.render('pages/user');
  } else {
    res.redirect('/');
  }

}
