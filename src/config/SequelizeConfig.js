const Sequelize = require("sequelize");
const config = {
  'postgreSQL.database' : 'MyBoard',
  'postgreSQL.username' : 'user1',
  'postgreSQL.password' : 'myBoard1!',
  'postgreSQL.host' : 'localhost',
};

const sequelize = new Sequelize(
    config["postgreSQL.database"],
    config["postgreSQL.username"],
    config["postgreSQL.password"],
    {
      host: config["postgreSQL.host"],
      dialect: "postgres",
    }
  );

module.exports = sequelize;