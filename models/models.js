const {
  Model, DataTypes
} = require('sequelize')
const {
  v4: uuidv4
} = require('uuid');

const sequelize = require('../db.js')


class User extends Model {}
User.init({
  userId: {
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
}, {
  sequelize
})


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
  }
}, {
  sequelize
})
User.hasMany(Twits);
Twits.belongsTo(User);
(async() => {
  await sequelize.sync()
})()
const models = {
  User, Twits
}
module.exports = models
