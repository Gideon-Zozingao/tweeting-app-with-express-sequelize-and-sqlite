const models=require("../models/models")
exports.viewUser=(req, res) => {
  let sess_ID = req.cookies.SID;
  res.locals.user = req.locals.user;
  res.locals.S_ID = sess_ID;
  if (!sess_ID) {
    let user=models.User.findAll().then((user)=>{

        console.log(user)

        res.render('pages/users',{data:user})

    }).catch((error)=>{
      console.log(`Erro: ${error}`)
       res.render("pages/render",{errorr:500,err_msg:"Request Cannot be preocessed at thi stim eot due to an Internal Error. Please Try again Later"})
    })
  } else {
    res.redirect('/');
  }

}
