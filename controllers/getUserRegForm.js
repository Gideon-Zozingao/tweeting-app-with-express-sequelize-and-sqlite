exports.createUser = (req, res) => {
  let auth = req.cookies.Auth;
  res.locals.user = req.user;
  res.locals.auth = auth;
  if (auth !== undefined) {
    res.send('<h4>You are an Active User</h4>')
  } else {
    res.render('pages/createuser');
  }


}
