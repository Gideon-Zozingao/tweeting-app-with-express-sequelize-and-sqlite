
//get the login pages
exports.login=(req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  if (!sess_ID) {
    res.render('pages/login');
  } else {
    res.redirect('/');
  }

}
