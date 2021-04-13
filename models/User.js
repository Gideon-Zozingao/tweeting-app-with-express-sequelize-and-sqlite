const { Model, DataTypes } = require('sequelize')
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../db.js')
//const Twits=require("./Twits.js")
class User extends Model { }
User.init({
  UserId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize });

module.exports = User
