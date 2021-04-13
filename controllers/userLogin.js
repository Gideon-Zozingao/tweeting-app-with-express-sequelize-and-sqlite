const { Sequelize, Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const models=require("../models/models")
exports.userLogin=async(req,res)=>{
    let sess_ID = req.cookies.SID;
    res.locals.user = req.locals.user;
    res.locals.S_ID = sess_ID;
    const { username, password } = req.body;
    if (!username || !password) {
      res.render('pages/errors', { title: "Error", errorr: 400, err_msg: "Username or Password Missing" })
    } else {

      let user = await models.User.findOne({
        where: {
          [Op.and]: [{ username: username }, { password: password }]
        }
      }
      ).then((user) => {
        if (!user) {
          console.log(`Ivalid User Credentials`);
          res.render("pages/errors", { errorr: 404, err_msg: "Invalid User Credentials" });
        } else {
          const sessid = uuidv4()
          res.cookie('SID', sessid, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
          })
          let jason_data = JSON.stringify(user)
          const user_data = JSON.parse(jason_data)
          const curr_user = { username: user_data.username, uid: user_data.UserId };
          res.cookie('userID', curr_user.uid, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
          })
          res.cookie('username', curr_user.username, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
          })

          res.locals.user = curr_user;
          res.redirect("/");
          console.log(JSON.stringify(curr_user))
        }
      }).catch((error) => {
        console.log(`Error: ${error}`);
        res.render("pages/errors", { errorr: 500, err_msg: "Your login request cannot be processed Now due to some technical errors. Try again agia later" });
      })
      //res.redirect("/");
    }

}
