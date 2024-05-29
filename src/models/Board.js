const { DataTypes } = require("sequelize");
const { initSequelize } = require("../config/SequelizeConfig");

let Board;

const setBoard = async () => {
  if(Board) return Board

  const sequelize = await initSequelize(); 
  return Board = sequelize.define("Board", {
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
}


module.exports = { setBoard };