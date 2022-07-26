export default function createBoard() {
  const board = [];
  for (let i = 0; i < 15; i++) {
    board.push([]);
    for (let j = 0; j < 10; j++) {
      board[i].push({type: 'empty'});
    }
  }
  return board;
}