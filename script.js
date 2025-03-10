const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 30;
// Размер клетки
const tetrominoSize = 30;

// ctx.fillStyle = "blue";
// ctx.fillRect(50, 50, 50, 50);

const rows = 20;
const colums = 10;

// Определяем первую фигуру (O-тетромино)
const O_Tetromino = [
  [1, 1],
  [1, 1],
];

// Отрисовка сетки
function showGrid() {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < colums; column++) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(column * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

// Функция для рисования фигуры
function drawTetromino(matrix, x, y, color) {
  ctx.fillStyle = color; // Задаем цвет фигуры

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col]) {
        // Если в массиве 1 - рисуем клетку
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

// Координаты для первой фигуры (начальная позиция)
const startX = 4; // Начало в 4-м столбце (по сетке)
const startY = 0; // Начинаем с верхней части

showGrid();

// Вызываем функцию для рисования O-фигуры
drawTetromino(O_Tetromino, startX, startY, "yellow");
