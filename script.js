const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

cellSize = 30;

ctx.fillStyle = "blue";
ctx.fillRect(50, 50, 50, 50);

const rows = 20;
const colums = 10;

function showGrid() {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < colums; column++) {
      ctx.strokeStyle = "gray";
      ctx.strokeRect(column * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

showGrid();
