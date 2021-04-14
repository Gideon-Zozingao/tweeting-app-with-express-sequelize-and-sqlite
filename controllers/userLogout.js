exports.logout = (req, res) => {
  let auth = req.cookies.Auth;
  res.locals.user = req.user;
  res.locals.auth = auth;
  if (!auth) {
    res.redirect('/');
  } else {
    res.cookie("Auth", "", {
      expires: new Date(Date.now() - 900000)
    })
    res.redirect('/');
    console.log(`Sessions Token : ${auth} destroyed and User loged out`)
  }

}
