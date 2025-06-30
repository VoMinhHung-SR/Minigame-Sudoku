function generateSudokuPuzzle() {
  
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  
  const clues = 30; 
  
  for (let i = 0; i < clues; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const num = Math.floor(Math.random() * 9) + 1;
    console.log(row, col, num);   
    if (isValidMove(board, row, col, num)) {
      board[row][col] = num;
    }
  }
  
  return board;
}

function isValidMove(board, row, col, num) {
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) return false;
  }
    
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }
  
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  
  return true;
}

let puzzle = generateSudokuPuzzle();

function buildBoard() {
  const board = document.getElementById('sudoku-board');
  board.innerHTML = '';
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 1;
      input.max = 9;
      input.dataset.row = r;
      input.dataset.col = c;
      if (puzzle[r][c] !== 0) {
        input.value = puzzle[r][c];
        input.disabled = true;
      }
      board.appendChild(input);
    }
  }
}

function resetBoard() {
  document.getElementById('result').textContent = "";
  buildBoard();
}

function newGame() {
  document.getElementById('result').textContent = "";
  puzzle = generateSudokuPuzzle();
  buildBoard();
}

function checkSolution() {
  const inputs = document.querySelectorAll('#sudoku-board input');
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  inputs.forEach(input => {
    const r = input.dataset.row;
    const c = input.dataset.col;
    board[r][c] = parseInt(input.value) || 0;
  });

  if (isValid(board)) {
    document.getElementById('result').textContent = "✅ Correct!";
  } else {
    document.getElementById('result').textContent = "❌ Invalid solution.";
  }
}

function isValid(board) {
  const isValidGroup = group => {
    const nums = group.filter(n => n !== 0);
    return nums.length === new Set(nums).size;
  };

  for (let i = 0; i < 9; i++) {
    const row = board[i];
    const col = board.map(r => r[i]);
    if (!isValidGroup(row) || !isValidGroup(col)) return false;
  }

  for (let r = 0; r < 9; r += 3) {
    for (let c = 0; c < 9; c += 3) {
      const block = [];
      for (let dr = 0; dr < 3; dr++) {
        for (let dc = 0; dc < 3; dc++) {
          block.push(board[r+dr][c+dc]);
        }
      }
      if (!isValidGroup(block)) return false;
    }
  }

  return true;
}

buildBoard();