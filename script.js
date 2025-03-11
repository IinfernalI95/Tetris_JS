const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 30;
const tetrominoSize = 30;

const rows = 20;
const colums = 10;

const startX = 4;
const startY = 0;

let currentX = startX;
let currentY = startY;

// Определяем первую фигуру (O-тетромино)
const O_Tetromino = [
  [1, 1],
  [1, 1],
];

function showGrid() {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < colums; column++) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(column * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

function drawTetromino(matrix, x, y, color) {
  ctx.fillStyle = color;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col]) {
        ctx.fillRect(
          (x + col) * tetrominoSize,
          (y + row) * tetrominoSize,
          tetrominoSize,
          tetrominoSize
        );
      }
    }
  }
}

showGrid();
drawTetromino(O_Tetromino, startX, startY, "yellow");

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  showGrid(); // Перерисовываем сетку
  drawTetromino(O_Tetromino, currentX, currentY, "yellow");

  if (currentY < rows - O_Tetromino.length) {
    currentY += 1;
  }
}

setInterval(update, 500);
