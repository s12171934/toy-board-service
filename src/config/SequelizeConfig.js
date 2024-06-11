//DB와 통신을 위한 Sequelize 설정
const Sequelize = require("sequelize");
const { getConfig } = require("./SpringConfigClient");

let sequelize;

const getSequelize = async () => {
  if(sequelize) {
    return sequelize;
  }

  const config = await getConfig();

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

module.exports = { getSequelize };