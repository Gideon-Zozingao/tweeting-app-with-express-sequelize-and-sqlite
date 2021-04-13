exports.logout=(req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  if (!sess_ID) {
    res.redirect('/');
  } else {
    res.cookie("SID", "", { expires: new Date(Date.now() - 900000) })
    res.cookie('userID', "", {
      expires: new Date(Date.now() - 900000),
      httpOnly: true
    })
    res.cookie('username', "", {
      expires: new Date(Date.now() - 900000),
      httpOnly: true
    })

    res.redirect('/');
    console.log("Session Cookie Destr0yed and user Loged out")
  }

}
