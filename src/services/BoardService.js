const boardModel = require('../models/BoardModel');

const createBoard = (boardData) => {
  return boardModel.createBoard(boardData);
};

const getBoardById = (boardId) => {
  return boardModel.getBoardById(boardId);
};

module.exports = {
  createBoard,
  getBoardById,
}