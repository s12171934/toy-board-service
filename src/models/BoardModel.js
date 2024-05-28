let boards = [{id: 1, test: 'test'}];
let idx = boards.length + 1;

const createBoard = (boardData) => {
  const newBoard = {id: idx++, ...boardData};
  boards.push(newBoard);
  return newBoard;
};

const getBoardById = (boardId) => {
  return boards.find(board => board.id == boardId);
};

const getAllBoard = (page, row) => {
  const start = (page - 1) * row;
  const end = page * row;
  return boards.slice(start, end);
}

const editBoard = (boardData, boardId) => {
  const newBoard = {id: boardId, ...boardData};
  boards = boards.filter(board => board.id != boardId);
  boards.push(newBoard);
  boards.sort((board1, board2) => board1.id - board2.id);

  return newBoard;
}

const deleteBoard = (boardId) => {
  boards = boards.filter(board => board.id != boardId);
  idx--;
} 

module.exports = {
  createBoard,
  getBoardById,
  getAllBoard,
  editBoard,
  deleteBoard,
};