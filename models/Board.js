class Board {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = this.createGrid();
  }

  createGrid() {
    return Array(this.rows)
      .fill(null)
      .map(() => Array(this.columns).fill(0));
  }

  isInsideField(x, y) {
    return x >= 0 && x < this.columns && y >= 0 && y < this.rows;
  }

  isOccupied(x, y) {
    return this.grid[y][x] === 1;
  }

  addTetromino(tetromino) {
    for (let row = 0; row < tetromino.currentShape.length; row++) {
      for (let col = 0; col < tetromino.currentShape[row].length; col++) {
        if (tetromino.currentShape[row][col]) {
          // Сохраняем блок в сетке
          this.grid[tetromino.y + row][tetromino.x + col] = 1;
        }
      }
    }
  }

  hasCollision(tetromino, offsetX = 0, offsetY = 0) {
    for (let row = 0; row < tetromino.currentShape.length; row++) {
      for (let col = 0; col < tetromino.currentShape[row].length; col++) {
        if (tetromino.currentShape[row][col]) {
          const newY = tetromino.y + row + offsetY;
          const newX = tetromino.x + col + offsetX;

          // Проверяем границы и столкновения
          if (
            newX < 0 ||
            newX >= this.columns ||
            newY >= this.rows ||
            (newY >= 0 && this.grid[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
