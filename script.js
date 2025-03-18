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

const grid = Array(rows)
  .fill(null)
  .map(() => Array(colums).fill(0));

document.addEventListener("keydown", handleKeyPress);

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
  ],
};

function handleKeyPress(event) {
  if (event.key === "ArrowLeft") {
    moveLeft();
  } else if (event.key === "ArrowRight") {
    moveRight();
  } else if (event.key === "ArrowUp") {
    rotateTetromino();
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

function rotateTetromino() {
  // Создаём новую повернутую версию фигуры
  let rotated = [];

  // Проходим по колонкам старой фигуры
  for (let col = 0; col < currentTetromino[0].length; col++) {
    rotated[col] = []; // Создаём новый столбец

    // Заполняем его значениями из строк старой фигуры
    for (let row = currentTetromino.length - 1; row >= 0; row--) {
      rotated[col].push(currentTetromino[row][col]);
    }
  }

  // Проверяем, можно ли повернуть фигуру
  if (!collides(rotated, currentX, currentY)) {
    currentTetromino = rotated; // Сохраняем новый вариант фигуры
  }
}

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
  drawBoard();
  drawTetromino(currentTetromino, currentX, currentY, "yellow");

  // Проверяем возможность движения вниз
  if (!collides(currentTetromino, currentX, currentY + 1)) {
    currentY += 1;
  } else {
    merge(); // фиксируем фигуру если есть столкновение
    currentTetromino = getRandomTetromino();
    currentX = startX;
    currentY = startY;

    // Проверяем возможность размещения новой фигуры
    if (collides(currentTetromino, currentX, currentY)) {
      // Если сразу есть коллизия - игра окончена
      alert("Game Over!");
      // Здесь можно добавить сброс игры
      grid.forEach((row) => row.fill(0));
    }
  }
}

setInterval(update, 500);

function collides(matrix, x, y) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col]) {
        let newY = y + row;
        let newX = x + col;

        // Проверяем границы поля
        if (newX < 0 || newX >= colums || newY >= rows) {
          return true;
        }

        // Проверяем столкновение с уже размещенными фигурами
        if (newY >= 0 && grid[newY][newX]) {
          return true;
        }
      }
    }
  }
  return false;
}

function merge() {
  for (let row = 0; row < currentTetromino.length; row++) {
    for (let col = 0; col < currentTetromino[row].length; col++) {
      if (currentTetromino[row][col]) {
        grid[currentY + row][currentX + col] = 1;
      }
    }
  }
}

function moveDown() {
  if (!collides(currentTetromino, currentX, currentY + 1)) {
    currentY++;
  } else {
    merge();
    // Проверяем, есть ли заполненные линии
    checkLines();
    spawnNewTetromino();
  }
}

function checkLines() {
  for (let row = rows - 1; row >= 0; row--) {
    // Проверяем, заполнена ли строка
    if (grid[row].every((cell) => cell === 1)) {
      // Удаляем заполненную строку
      grid.splice(row, 1);
      // Добавляем новую пустую строку сверху
      grid.unshift(new Array(colums).fill(0));
    }
  }
}

function spawnNewTetromino() {
  currentTetromino = getRandomTetromino(); // Берём случайную фигуру
  currentX = startX; // Ставим в центр
  currentY = startY; // Начинаем сверху

  if (collides(currentTetromino, currentX, currentY)) {
    alert("Game Over!"); // Если сразу есть коллизия — конец игры
    //resetGame();
  }
}

function drawBoard() {
  // Отрисовка зафиксированных фигур
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < colums; col++) {
      if (grid[row][col]) {
        ctx.fillStyle = "red"; // цвет для зафиксированных блоков
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }
}
