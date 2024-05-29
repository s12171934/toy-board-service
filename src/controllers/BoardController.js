const boardService = require('../services/BoardService');

const createBoard = (req, res) => {
  const newBoard = boardService.createBoard(req);
  res.status(201).json(newBoard);
}

const getBoardById = async (req, res) => {
  const board = await boardService.getBoardById(req);
  console.log(board);

  if (board) {
    res.status(200).json(board);
  }
  else {
    res.status(404).json({message: 'Board not found'});
  }
}

const getAllBoard = async (req, res) => {
  const boards = await boardService.getAllBoard(req);

  if (boards) {
    res.status(200).json(boards);
  }
  else {
    res.status(404).json({message: 'No page on boards'})
  }
}

const editBoard = (req, res) => {
  const newBoard = boardService.editBoard(req);

  res.status(200).json(newBoard);
}

const deleteBoard = (req, res) => {
  boardService.deleteBoard(req);
  
  res.status(200).json(req.params.id);
}

module.exports = {
  createBoard,
  getBoardById,
  getAllBoard,
  editBoard,
  deleteBoard,
};