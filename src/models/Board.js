const { DataTypes } = require("sequelize");
const sequelize = require("../config/SequelizeConfig");

const Board = sequelize.define("Board", {
    title: {
      type: DataTypes.STRING,
    },

    writer: {
      type: DataTypes.STRING,
    },

    content: {
      type: DataTypes.TEXT,
    },

    viewCount: {
      type: DataTypes.INTEGER,
    },

    recomendCount: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = Board;