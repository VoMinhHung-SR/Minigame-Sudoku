# Sudoku Game

A modern, responsive Sudoku game built with vanilla HTML, CSS, and JavaScript.

## 🎮 Features

- **Classic Sudoku**: Fill the 9x9 grid with numbers 1-9
- **Smart Validation**: Real-time visual feedback (blue = valid, amber = invalid)
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Keyboard Navigation**: Use arrow keys to navigate between cells
- **Auto-timer**: Tracks your solving time automatically
- **Statistics**: Games won counter and best time record
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Getting Started

1. Open `index.html` in your web browser
2. Start playing immediately - no installation required!

## 🎯 How to Play

1. Click on any empty cell and enter a number (1-9)
2. Use arrow keys to navigate between cells
3. Get instant feedback:
   - **Blue border** = valid move
   - **Amber border** = invalid move
4. Click "Check" to verify your solution
5. Click "New Game" for a fresh puzzle

## 🛠️ Technical Details

**Technologies:**
- HTML5, CSS3, Vanilla JavaScript
- CSS Grid for the 9x9 board
- LocalStorage for statistics
- Font Awesome icons

**File Structure:**
```
├── index.html    # Main HTML file
├── style.css     # Styles and themes
└── script.js     # Game logic
```

## 🎨 Customization

Themes are defined using CSS custom properties. Modify `style.css` to change colors and styling.

## 📱 Browser Support

- Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

- **Timer not starting**: Click on an empty cell first
- **Theme not switching**: Check if localStorage is enabled
- **Mobile issues**: Ensure viewport meta tag is present

---

**Enjoy playing Sudoku! 🎉**