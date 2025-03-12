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

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
  if (event.key === "ArrowLeft") {
    moveLeft();
  } else if (event.key === "ArrowRight") {
    moveRight();
  }
}

// Двигаем фигуру влево
function moveLeft() {
  if (currentX > 0) {
    currentX -= 1;
  }
}

// Двигаем фигуру вправо
function moveRight() {
  if (currentX < colums - currentTetromino[0].length) {
    currentX += 1;
  }
}

const TETROMINOS = {
  O: [
    [1, 1],
    [1, 1],
  ],
  I: [[1, 1, 1, 1]],
  L: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  J: [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ]
};

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

function getRandomTetromino() {
  const keys = Object.keys(TETROMINOS);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOS[randomKey];
}

// showGrid();
let currentTetromino = getRandomTetromino();

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  showGrid();
  drawTetromino(currentTetromino, currentX, currentY, "yellow");

  if (currentY < rows - currentTetromino.length) {
    currentY += 1;
  } else {
    currentY = startY;
    currentX = startX;
    currentTetromino = getRandomTetromino();
  }
}

setInterval(update, 500);
