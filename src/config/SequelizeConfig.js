const Sequelize = require("sequelize");
const { getConfigData } = require("./SpringConfigClient");

let sequelize;

const initSequelize = async () => {
  if(sequelize) return sequelize;

  const config = await getConfigData();

  sequelize = new Sequelize(
    config["postgreSQL.database"],
    config["postgreSQL.username"],
    config["postgreSQL.password"],
    {
      host: config["postgreSQL.host"],
      dialect: "postgres",
    }
  );

  return sequelize;
};

module.exports = { initSequelize };