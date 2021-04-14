//get the login pages
exports.login = (req, res) => {
  let auth = req.cookies.Auth;
  res.locals.user = req.user;
  res.locals.auth = auth;
  if (!auth) {
    res.render('pages/login');
  } else {

    res.send('<h4>You are currently loged in..</h4>');
  }
}
