const boardService = require('../services/BoardService');

const createBoard = (req, res) => {
  const newBoard = boardService.createBoard(req,body);
  res.status(201).json(newBoard);
}

const getBoardById = (req, res) => {
  const boardId = parseInt(req.params.id);
  const board = boardService.getBoardById(boardId);

  if (board) {
    res.status(200).json(board);
  }
  else {
    res.status(404).json({message: 'User not found'});
  }
}

module.exports = {
  createBoard,
  getBoardById,
}