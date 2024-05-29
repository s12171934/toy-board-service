const Board = require('../models/Board');

const createBoard = (req) => {
  const boardData = req.body;
  Board.create(boardData);
  return boardData;
};

const getBoardById = (req) => {
  const boardId = parseInt(req.params.id);
  return Board.findByPk(boardId).then(board => {
    return board
  });
};

const getAllBoard = (req) => {
  const page = parseInt(req.params.page);
  return Board.findAll({
    order: [
      ['id','asc']
    ],
    offset: (page - 1) * 3,
    limit: 3
  }).then(boards => {
    return boards
  });
};

const editBoard = (req) => {
  const boardId = parseInt(req.params.id);
  const boardData = req.body;
  Board.update(boardData, {
    where: {
      id: boardId
    } 
  });
  return boardData;
};

const deleteBoard = (req) => {
  const boardId = parseInt(req.params.id);
  Board.destroy({
    where: {
      id: boardId
    }
  });
};

module.exports = {
  createBoard,
  getBoardById,
  getAllBoard,
  editBoard,
  deleteBoard,
};