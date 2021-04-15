const {
  Model, DataTypes
} = require('sequelize')
const {
  v4: uuidv4
} = require('uuid');
const sequelize = require('../db.js')
const User = require("./User.js")

class Twits extends Model {}
Twits.init({
  twitId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  twits: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  sequelize
});
module.exports = Twits
