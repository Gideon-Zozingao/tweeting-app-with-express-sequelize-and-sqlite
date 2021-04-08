const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db.js')
​
class User extends Model {}
User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize});
​
(async ()=>{
    await sequelize.sync()
})()
​
module.exports = User