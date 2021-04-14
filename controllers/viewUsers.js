const models = require("../models/models")
exports.viewUser = (req, res) => {

  let user = models.User.findAll().then((user) => {
    console.log(user)
    res.render('pages/users', {
      data: user,
      user: req.user
    })
  }).catch((error) => {
    console.log(`Erro: ${error}`)
    res.render("pages/render", {
      errorr: 500,
      err_msg: "Request Cannot be preocessed at thi stim eot due to an Internal Error. Please Try again Later"
    })
  })

}
