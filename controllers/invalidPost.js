exports.invalidPostRequest = (req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.user;
  res.locals.S_ID = sess_ID;
  res.render('pages/errors', {
    title: "Error",
    errorr: 400,
    err_msg: "The Request you Submites is Forbiden"
  })
}
