const { Model, DataTypes } = require('sequelize')
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../db.js')
const User=require("./User.js")

class Twits extends Model {}
Twits.init(
  {
    twitId:{
      type:DataTypes.UUID,
      primaryKey:true,
      allowNull:false,
      unique:true
    },
  twits:{
      type:DataTypes.STRING,
      allowNull:false
    }},
      {sequelize});
    Twits.associat=(models)=>{
      Twits.belongsTo(models.User,{foreignKey:"UserId",as:"user_id"})
    };

    (async ()=>{
        await sequelize.sync()
    })()
    module.exports = Twits
