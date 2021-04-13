const { Model, DataTypes,Op } = require('sequelize')
const { v4: uuidv4 } = require('uuid')
const sequelize = require('../db.js')
const User=require("./User")
const Twits=require("./Twits")
User.associate = (modeles) => {
  User.hasMany(models.Twits,{foreignKey:'userId'})
}
Twits.associate = (models) => {
  Twits.belongsTo(models.User,{foreignKey:'user'})
}
(async () => {
  await sequelize.sync()
})()
const models ={User,Twits}
module.exports = models
