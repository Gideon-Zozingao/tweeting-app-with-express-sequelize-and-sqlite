const Sequelize = require('sequelize')
exports.sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "onzaec-twits-db.db",
  logging: false
}).authenticate().then(() => {
  console.log("Database server Connection Established");
}).catch(error => console.error(`Unable to conect to the Database ${error}`))
