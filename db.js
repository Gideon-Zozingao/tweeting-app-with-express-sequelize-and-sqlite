const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage:"tweeting-app-db.db"
});
   sequelize.authenticate().then(()=>{
                                      console.log("Database server Connection Established");
   }).catch(error=>console.error(`Unable to conect to the Database ${error}`))

module.exports = sequelize
