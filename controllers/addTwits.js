const models=require("../models/models")
//route handle for addTwits post request
exports.addTwits=async(req,res)=>{
    let sess_ID = req.cookies.SID;
    res.locals.user = req.locals.user;
    res.locals.S_ID = sess_ID;
    let body = req.body
    if (body.username == "" || body.password == "" || body.twit == "") {
      res.render("pages/errors", { errorr: 400, err_msg: "Form fileds are empty" })
    } else {

      let user = await models.User.findOne({
        where: { [Op.and]: [{ username: body.username }, { password: body.password }] }
        //console.log(user)
      }).then((user) => {
        if (user) {
          let user_data = JSON.stringify(user)
          let data = JSON.parse(user_data)
          console.log(`Username: ${data.username} UserId:${data.UserId}`)
          let Twits = require("./models/Twits.js")
          let twit = Twits.create({
            twitId: uuidv4(),
            twits: body.twit,
            user: data.userId
          }).then((twit) => {
            if (twit) {
              console.log(twit)
              console.log(req.locals.user);
              res.redirect("/twits");
            } else {
              res.render("pages/error", { errorr: 500, err_msg: "Twits Not Added" })
            }
          }).catch((error) => {
            console.log(`Error: ${error}`)
            res.render("pages/error", { errorr: 500, err_msg: `Twits Not Added ${error}` })
          })


        } else {
          res.render("pages/errors", { errorr: 404, err_msg: "Invalid User Credentials" })
          console.log(`Invalid User Credentials`)

        }
      }).catch((error) => {
        console.log(`Error: ${error}`)
        res.render("pages/errors", { errorr: 500, err_msg: `Internal Server Error: Your Request Could not be Processed at this Time> Try again Later` })
      })
    }
}
