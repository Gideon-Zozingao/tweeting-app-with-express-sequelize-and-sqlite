const {
  Sequelize, Op
} = require("sequelize")
const models = require("../models/models")
exports.UpdateTwit = (req, res) => {
  const body = req.body;
  res.redirect("/twits");
}
