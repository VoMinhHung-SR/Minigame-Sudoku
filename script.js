function generateSudokuPuzzle() {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  
  const clues = 35;
  let attempts = 0;
  let placedNumbers = 0;
  
  while (placedNumbers < clues && attempts < 1000) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const num = Math.floor(Math.random() * 9) + 1;
    
    if (board[row][col] === 0 && isValidMove(board, row, col, num)) {
      board[row][col] = num;
      placedNumbers++;
    }
    attempts++;
  }
  
  ensureMinimumDistribution(board);
  
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

function ensureMinimumDistribution(board) {
  for (let row = 0; row < 9; row++) {
    const rowNumbers = board[row].filter(num => num !== 0);
    if (rowNumbers.length < 3) {
      for (let i = 0; i < 3 - rowNumbers.length; i++) {
        for (let attempt = 0; attempt < 50; attempt++) {
          const col = Math.floor(Math.random() * 9);
          const num = Math.floor(Math.random() * 9) + 1;
          if (board[row][col] === 0 && isValidMove(board, row, col, num)) {
            board[row][col] = num;
            break;
          }
        }
      }
    }
  }
  
  for (let col = 0; col < 9; col++) {
    const colNumbers = board.map(row => row[col]).filter(num => num !== 0);
    if (colNumbers.length < 3) {
      for (let i = 0; i < 3 - colNumbers.length; i++) {
        for (let attempt = 0; attempt < 50; attempt++) {
          const row = Math.floor(Math.random() * 9);
          const num = Math.floor(Math.random() * 9) + 1;
          if (board[row][col] === 0 && isValidMove(board, row, col, num)) {
            board[row][col] = num;
            break;
          }
        }
      }
    }
  }
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
      
      // Thêm validation cho input
      input.addEventListener('input', function() {
        const value = this.value;
        if (value && (value < 1 || value > 9)) {
          this.value = '';
        }
        // Chỉ cho phép số từ 1-9
        if (value && !/^[1-9]$/.test(value)) {
          this.value = value.replace(/[^1-9]/g, '');
        }
        
        // Bắt đầu timer khi người dùng bắt đầu nhập
        if (value && !isGameActive) {
          startTimer();
        }
      });
      
      if (puzzle[r][c] !== 0) {
        input.value = puzzle[r][c];
        input.disabled = true;
        input.style.backgroundColor = '#f8f9fa';
        input.style.fontWeight = 'bold';
      }
      board.appendChild(input);
    }
  }
}

function resetBoard() {
  document.getElementById('result').textContent = "";
  resetTimer();
  buildBoard();
}

function newGame() {
  document.getElementById('result').textContent = "";
  resetTimer();
  puzzle = generateSudokuPuzzle();
  buildBoard();
}

function checkSolution() {
  const inputs = document.querySelectorAll('#sudoku-board input');
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  
  // Kiểm tra xem tất cả ô đã được điền chưa
  let allFilled = true;
  inputs.forEach(input => {
    const r = parseInt(input.dataset.row);
    const c = parseInt(input.dataset.col);
    const value = parseInt(input.value) || 0;
    board[r][c] = value;
    
    if (value === 0) {
      allFilled = false;
    }
  });

  if (!allFilled) {
    document.getElementById('result').textContent = "⚠️ Please fill all empty cells first.";
    return;
  }

  const validation = validateBoard(board);
  if (validation.isValid) {
    const elapsedTime = getElapsedTime();
    const timeString = formatTime(elapsedTime);
    stopTimer();
    document.getElementById('result').textContent = `✅ Correct! Well done! Time: ${timeString}`;
  } else {
    document.getElementById('result').textContent = `❌ Invalid solution. ${validation.message}`;
  }
}

function validateBoard(board) {
  // Kiểm tra hàng
  for (let i = 0; i < 9; i++) {
    const row = board[i];
    const rowSet = new Set(row);
    if (rowSet.size !== 9) {
      return { isValid: false, message: `Row ${i + 1} has duplicate numbers.` };
    }
  }

  // Kiểm tra cột
  for (let i = 0; i < 9; i++) {
    const col = board.map(r => r[i]);
    const colSet = new Set(col);
    if (colSet.size !== 9) {
      return { isValid: false, message: `Column ${i + 1} has duplicate numbers.` };
    }
  }

  // Kiểm tra ô 3x3
  for (let r = 0; r < 9; r += 3) {
    for (let c = 0; c < 9; c += 3) {
      const block = [];
      for (let dr = 0; dr < 3; dr++) {
        for (let dc = 0; dc < 3; dc++) {
          block.push(board[r+dr][c+dc]);
        }
      }
      const blockSet = new Set(block);
      if (blockSet.size !== 9) {
        const boxNum = Math.floor(r/3) * 3 + Math.floor(c/3) + 1;
        return { isValid: false, message: `Box ${boxNum} has duplicate numbers.` };
      }
    }
  }

  return { isValid: true, message: "All validations passed!" };
}

// Biến timer
let startTime = null;
let timerInterval = null;
let isGameActive = false;

// Hàm format thời gian
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

// Hàm bắt đầu timer
function startTimer() {
  if (!isGameActive) {
    startTime = Date.now();
    isGameActive = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
}

// Hàm dừng timer
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    isGameActive = false;
  }
}

// Hàm reset timer
function resetTimer() {
  stopTimer();
  startTime = null;
  document.getElementById('timer').textContent = '00:00';
}

// Hàm cập nhật timer
function updateTimer() {
  if (startTime) {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = formatTime(elapsed);
  }
}

// Hàm lấy thời gian đã chơi
function getElapsedTime() {
  if (startTime) {
    return Math.floor((Date.now() - startTime) / 1000);
  }
  return 0;
}

buildBoard();