// Game Statistics
let gameStats = {
  gamesWon: parseInt(localStorage.getItem('gamesWon')) || 0,
  bestTime: localStorage.getItem('bestTime') || null
};

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('#theme-toggle i');
  themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

function updateStats() {
  document.getElementById('games-won').textContent = gameStats.gamesWon;
  document.getElementById('best-time').textContent = gameStats.bestTime || '--:--';
}

function generateSudokuPuzzle() {
  // Sử dụng puzzle cố định đã được test và đảm bảo có solution
  const puzzle = createValidPuzzle();
  return puzzle;
}

function createValidPuzzle() {
  // Puzzle đã được test và đảm bảo có solution duy nhất
  const validPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];
  
  // Tạo một số biến thể để tránh lặp lại
  const variations = [
    // Variation 1: Swap rows
    [
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    // Variation 2: Different pattern
    [
      [0, 0, 0, 6, 8, 0, 4, 0, 0],
      [5, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 8, 7, 0, 0, 0, 0, 3, 1],
      [0, 0, 3, 0, 1, 0, 0, 8, 0],
      [9, 0, 0, 8, 6, 3, 0, 0, 5],
      [0, 5, 0, 0, 9, 0, 6, 0, 0],
      [1, 3, 0, 0, 0, 0, 2, 5, 0],
      [0, 0, 0, 0, 0, 0, 0, 7, 4],
      [0, 0, 5, 2, 0, 6, 3, 0, 0]
    ],
    // Variation 3: Another pattern
    [
      [0, 0, 0, 0, 0, 0, 6, 8, 0],
      [0, 0, 0, 0, 7, 3, 0, 0, 9],
      [3, 0, 9, 0, 0, 0, 0, 4, 5],
      [4, 9, 0, 0, 0, 0, 0, 0, 0],
      [8, 0, 3, 0, 5, 0, 9, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 3, 6],
      [9, 6, 0, 0, 0, 0, 3, 0, 8],
      [7, 0, 0, 6, 8, 0, 0, 0, 0],
      [0, 2, 8, 0, 0, 0, 0, 0, 0]
    ]
  ];
  
  // Chọn ngẫu nhiên một variation
  const randomIndex = Math.floor(Math.random() * variations.length);
  return variations[randomIndex];
}






function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
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
  
  // Add loading animation
  board.classList.add('loading');
  
  setTimeout(() => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.dataset.row = r;
        input.dataset.col = c;
        
        // Enhanced input validation - only allow numbers 1-9
        input.addEventListener('input', function() {
          let value = this.value;
          
          // Only allow digits 1-9
          if (value && !/^[1-9]$/.test(value)) {
            this.value = value.replace(/[^1-9]/g, '');
            value = this.value;
          }
          
          // Limit to single character
          if (value.length > 1) {
            this.value = value.slice(-1);
            value = this.value;
          }
          
          if (value && !isGameActive) {
            startTimer();
          }
          
          // Add visual feedback for valid/invalid moves
          if (value) {
            const row = parseInt(this.dataset.row);
            const col = parseInt(this.dataset.col);
            const num = parseInt(value);
            
            // Create temporary board to check if move is valid
            const tempBoard = getCurrentBoard();
            tempBoard[row][col] = 0; // Remove current value first
            tempBoard[row][col] = num; // Add new value
            
            if (isValidMove(tempBoard, row, col, num)) {
              this.style.borderColor = '#3b82f6'; // Blue for valid
              this.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            } else {
              this.style.borderColor = '#f59e0b'; // Amber for invalid
              this.style.backgroundColor = 'rgba(245, 158, 11, 0.1)';
            }
          } else {
            this.style.borderColor = '';
            this.style.backgroundColor = '';
          }
        });
        
        // Combined keyboard handling for navigation and input validation
        input.addEventListener('keydown', function(e) {
          const row = parseInt(this.dataset.row);
          const col = parseInt(this.dataset.col);
          
          // Handle arrow key navigation
          switch(e.key) {
            case 'ArrowUp':
              e.preventDefault();
              if (row > 0) {
                const prevInput = document.querySelector(`input[data-row="${row-1}"][data-col="${col}"]`);
                if (prevInput && !prevInput.disabled) prevInput.focus();
              }
              return;
            case 'ArrowDown':
              e.preventDefault();
              if (row < 8) {
                const nextInput = document.querySelector(`input[data-row="${row+1}"][data-col="${col}"]`);
                if (nextInput && !nextInput.disabled) nextInput.focus();
              }
              return;
            case 'ArrowLeft':
              e.preventDefault();
              if (col > 0) {
                const prevInput = document.querySelector(`input[data-row="${row}"][data-col="${col-1}"]`);
                if (prevInput && !prevInput.disabled) prevInput.focus();
              }
              return;
            case 'ArrowRight':
              e.preventDefault();
              if (col < 8) {
                const nextInput = document.querySelector(`input[data-row="${row}"][data-col="${col+1}"]`);
                if (nextInput && !nextInput.disabled) nextInput.focus();
              }
              return;
          }
          
          // Allow: backspace, delete, tab, escape, enter
          if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
              // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
              (e.keyCode === 65 && e.ctrlKey === true) ||
              (e.keyCode === 67 && e.ctrlKey === true) ||
              (e.keyCode === 86 && e.ctrlKey === true) ||
              (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
          }
          
          // Only allow numbers 1-9
          if ((e.shiftKey || (e.keyCode < 49 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
          }
        });
        
        if (puzzle[r][c] !== 0) {
          input.value = puzzle[r][c];
          input.disabled = true;
        }
        board.appendChild(input);
      }
    }
    board.classList.remove('loading');
  }, 300);
}

function getCurrentBoard() {
  const inputs = document.querySelectorAll('#sudoku-board input');
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  
  inputs.forEach(input => {
    const r = parseInt(input.dataset.row);
    const c = parseInt(input.dataset.col);
    const value = parseInt(input.value) || 0;
    board[r][c] = value;
  });
  
  return board;
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
  const board = getCurrentBoard();
  
  // Check if all cells are filled
  let allFilled = true;
  inputs.forEach(input => {
    const value = parseInt(input.value) || 0;
    if (value === 0) {
      allFilled = false;
    }
  });

  const resultElement = document.getElementById('result');
  
  if (!allFilled) {
    showResult("⚠️ Please fill all empty cells first.", 'warning');
    return;
  }

  const validation = validateBoard(board);
  if (validation.isValid) {
    const elapsedTime = getElapsedTime();
    const timeString = formatTime(elapsedTime);
    stopTimer();
    
    // Update statistics
    gameStats.gamesWon++;
    if (!gameStats.bestTime || elapsedTime < parseTime(gameStats.bestTime)) {
      gameStats.bestTime = timeString;
    }
    
    // Save to localStorage
    localStorage.setItem('gamesWon', gameStats.gamesWon);
    localStorage.setItem('bestTime', gameStats.bestTime);
    updateStats();
    
    showResult(`🎉 Congratulations! You solved it in ${timeString}!`, 'success');
    
    // Add confetti effect
    addConfettiEffect();
  } else {
    showResult(`❌ Invalid solution. ${validation.message}`, 'error');
  }
}

function showResult(message, type) {
  const resultElement = document.getElementById('result');
  resultElement.textContent = message;
  resultElement.className = `result-message ${type}`;
  
  // Auto-hide after 5 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      resultElement.textContent = '';
      resultElement.className = 'result-message';
    }, 5000);
  }
}

function parseTime(timeString) {
  const parts = timeString.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  } else if (parts.length === 3) {
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
  }
  return 0;
}

function addConfettiEffect() {
  // Simple confetti effect
  const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '1000';
      confetti.style.animation = 'confettiFall 3s linear forwards';
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }, i * 50);
  }
}

function validateBoard(board) {
  // Kiểm tra hàng
  for (let i = 0; i < 9; i++) {
    const row = board[i].filter(num => num !== 0); // Loại bỏ số 0
    const rowSet = new Set(row);
    if (rowSet.size !== row.length) {
      return { isValid: false, message: `Row ${i + 1} has duplicate numbers.` };
    }
    // Kiểm tra có đủ 9 số không
    if (row.length !== 9) {
      return { isValid: false, message: `Row ${i + 1} is incomplete.` };
    }
  }

  // Kiểm tra cột
  for (let i = 0; i < 9; i++) {
    const col = board.map(r => r[i]).filter(num => num !== 0); // Loại bỏ số 0
    const colSet = new Set(col);
    if (colSet.size !== col.length) {
      return { isValid: false, message: `Column ${i + 1} has duplicate numbers.` };
    }
    // Kiểm tra có đủ 9 số không
    if (col.length !== 9) {
      return { isValid: false, message: `Column ${i + 1} is incomplete.` };
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
      const blockFiltered = block.filter(num => num !== 0); // Loại bỏ số 0
      const blockSet = new Set(blockFiltered);
      if (blockSet.size !== blockFiltered.length) {
        const boxNum = Math.floor(r/3) * 3 + Math.floor(c/3) + 1;
        return { isValid: false, message: `Box ${boxNum} has duplicate numbers.` };
      }
      // Kiểm tra có đủ 9 số không
      if (blockFiltered.length !== 9) {
        const boxNum = Math.floor(r/3) * 3 + Math.floor(c/3) + 1;
        return { isValid: false, message: `Box ${boxNum} is incomplete.` };
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

// Initialize the game
function initGame() {
  initTheme();
  updateStats();
  
  
  buildBoard();
  
  // Add event listeners
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  
  // Add confetti animation to CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      0% {
        transform: translateY(-100vh) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}