const {
  Sequelize, Op
} = require("sequelize")
const models = require("../models/models")
exports.updateAvata = async(req, res) => {
  try {
    if (!req.files) {
      res.render("pages/errors", {
        errorr: 400,
        err_msg: "Your Profile Phot Was Not Uploaded. File Missing"
      })
    } else {
      const photo = req.files.new_avata;
      const id = req.body.userid;
      const mimeType = ['image/jpeg', 'image/jpg', 'image/png'];
      if (mimeType.indexOf(photo.mimetype) == -1) {
        res.render("pages/errors", {
          errorr: 400,
          err_msg: "Your Profile Phot Was Not Uploaded. Invalid File Formats. Upload PNG  and JPG  Images only"
        })
      } else {
        const file_name = new Date().getTime() + '_' + photo.name;
        const inserFile = './images/uploads/' + file_name;
        const uplod_dir = './public/images/uploads/' + file_name;
        photo.mv(uplod_dir);
        const user = models.User.findOne({
          where: {
            userid: id
          }
        }).then((user) => {
          user.update({
            avata: inserFile
          }).then(() => {
            res.redirect("/")
          })
        })
      }
    }
  } catch (error) {
    console.log(error)
    res.render("pages/errors", {
      errorr: 500,
      err_msg: "We cannot Process your Request due to Internal Erros. Try Again Later"
    })
  }
}
