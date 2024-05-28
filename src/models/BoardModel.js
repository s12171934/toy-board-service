let boards = [{id: 1, test: 'test'}];

const createBoard = (boardData) => {
  const newBoard = {id: boards.length + 1, ...boardData};
  boards.push(newBoard);
  return newBoard;
};

const getBoardById = (boardId) => {
  return boards.find(board => board.id == boardId);
};

module.exports = {
  createBoard,
  getBoardById,
};