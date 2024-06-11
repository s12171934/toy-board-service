const { DataTypes } = require("sequelize");
const { getSequelize } = require("../config/SequelizeConfig");

let Board;

const setBoard = async () => {
  if(Board) return Board

  const sequelize = await getSequelize(); 
  Board = sequelize.define("Board", {
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

  return Board;  
}


module.exports = { setBoard };