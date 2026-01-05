const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const board = document.getElementById('board');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleMove(cell, index));
});

function handleMove(cell, index) {
  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    highlightWin();
    return;
  }

  if (boardState.every(Boolean)) {
    statusText.textContent = "It's a draw!";
    board.classList.add('draw');
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}’s turn`;
}

function checkWin() {
  return winPatterns.some(pattern =>
    pattern.every(i => boardState[i] === currentPlayer)
  );
}

function highlightWin() {
  winPatterns.forEach(pattern => {
    if (pattern.every(i => boardState[i] === currentPlayer)) {
      pattern.forEach(i => cells[i].classList.add('win'));
    }
  });
}

restartBtn.addEventListener('click', () => {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
  board.classList.remove('draw');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = "Player X’s turn";
});
