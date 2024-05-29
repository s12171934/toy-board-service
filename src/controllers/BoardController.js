const boardService = require('../services/BoardService');
const passportUsername = require('../services/PassportCheckService');

const createBoard = async (req, res) => {
  const username = await passportUsername.checkUsername(req);

  if (username) {
    const newBoard = await boardService.createBoard(req);

    if (newBoard) {
      res.status(201).json(newBoard);
    }
    else {
      res.status(404).json({message: 'Fail to Save'});
    }
  }
  else {
    res.status(404).json({message: 'User not found'});
  }
}

const getBoardById = async (req, res) => {
  const board = await boardService.getBoardById(req);
  
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

const editBoard = async (req, res) => {
  const username = await passportUsername.checkUsername(req);

  if (username) {
    const newBoard = await boardService.editBoard(req);

    if (newBoard) {
      res.status(200).json(newBoard);
    }
    else {
      res.status(404).json({message: 'Fail to Save'});
    }
  }
  else {
    res.status(404).json({message: 'User not found'});
  }
}

const deleteBoard = async (req, res) => {
  const username = await passportUsername.checkUsername(req);

  if (username) {
    boardService.deleteBoard(req);
    res.status(201).json(res.params.id);
  }
  else {
    res.status(404).json({message: 'User not found'});
  }
}

const deleteAllBoardsByUser = (req, res) => {
  boardService.deleteAllBoardsByUser(req);

  res.status(201).json(JSON.parse(req.headers.passport).username);
}

module.exports = {
  createBoard,
  getBoardById,
  getAllBoard,
  editBoard,
  deleteBoard,
  deleteAllBoardsByUser,
};