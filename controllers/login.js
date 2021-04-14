//get the login pages
exports.login = (req, res) => {
  let auth = req.cookies.Auth;
  res.locals.user = req.locals.user;
  res.locals.auth = auth;
  if (!auth) {
    res.render('pages/login');
  } else {

    res.redirect('/');
  }
}
