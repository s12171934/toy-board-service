const { setBoard } = require('../models/Board');

const createBoard = async (req) => {
  const Board = await setBoard();
  const boardData = req.body;
  Board.create(boardData);
  return boardData;
};

const getBoardById = async (req) => {
  const Board = await setBoard();
  const boardId = parseInt(req.params.id);
  return Board.findByPk(boardId).then(board => {
    return board
  });
};

const getAllBoard = async (req) => {
  const Board = await setBoard();
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

const editBoard = async (req) => {
  const Board = await setBoard();
  const boardId = parseInt(req.params.id);
  const boardData = req.body;
  Board.update(boardData, {
    where: {
      id: boardId
    } 
  });
  return boardData;
};

const deleteBoard = async (req) => {
  const Board = await setBoard();
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