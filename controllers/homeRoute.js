const models=require("../models/models")
exports.homeRoute=async(req,res)=>{
      const twiters = await models.User.findAndCountAll().then((twiters)=>{
      let json_data = JSON.stringify(twiters);
      let twitors_count = JSON.parse(json_data)
      let sess_ID = req.cookies.SID;
      res.locals.user = req.locals.user;
      res.locals.S_ID = sess_ID;
      if (!sess_ID) {
        res.render('pages', { twitors: twitors_count.count })
      } else {
        res.render("pages/members")
      }
    })}
