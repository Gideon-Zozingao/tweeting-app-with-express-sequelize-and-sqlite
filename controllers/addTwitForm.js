exports.getAddTwit = (req, res) => {
  let auth = req.cookies.Auth;
  res.locals.user = req.locals.user;
  res.locals.auth = auth;
  if (!auth) {
    res.redirect('/user-login');
  } else {
    res.render('pages/add-twits');
  }

}
