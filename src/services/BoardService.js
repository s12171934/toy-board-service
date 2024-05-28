const boardModel = require('../models/BoardModel');

const createBoard = (req) => {
  const boardData = req.body;
  return boardModel.createBoard(boardData);
};

const getBoardById = (req) => {
  const boardId = parseInt(req.params.id);
  return boardModel.getBoardById(boardId);
};

const getAllBoard = (req) => {
  const page = parseInt(req.params.page);
  return boardModel.getAllBoard(page, 10);
};

const editBoard = (req) => {
  const boardId = parseInt(req.params.id);
  const boardData = req.body;
  return boardModel.editBoard(boardData, boardId);
};

const deleteBoard = (req) => {
  const boardId = parseInt(req.params.id);
  boardModel.deleteBoard(boardId);
};

module.exports = {
  createBoard,
  getBoardById,
  getAllBoard,
  editBoard,
  deleteBoard,
}