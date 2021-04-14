exports.invalidGetRequest = (req, res) => {
  let sess_ID = req.cookies.Auth;
  res.locals.user = req.user;
  res.locals.S_ID = sess_ID;
  res.render('pages/errors', {
    title: "Error",
    errorr: 404,
    err_msg: "The page or reaource you are looking for is not found"
  })
}
