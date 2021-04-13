
exports.getAddTwit=(req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  if (!sess_ID) {
    res.redirect('/user-login');
  } else {
    res.render('pages/add-twits');
  }

}
