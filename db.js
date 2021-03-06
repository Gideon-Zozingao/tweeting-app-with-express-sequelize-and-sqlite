const {
  Sequelize
} = require('sequelize')

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "onzaec-twits-db.db",
  logging: false
});
sequelize.authenticate().then(() => {
  console.log("Database server Connection Established");
}).catch(error => console.error(`Unable to conect to the Database ${error}`))

module.exports = sequelize
