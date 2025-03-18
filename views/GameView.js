class GameView {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.cellSize = 30;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBoard(board) {
    for (let row = 0; row < board.rows; row++) {
      for (let col = 0; col < board.columns; col++) {
        this.ctx.strokeStyle = "gray";
        this.ctx.strokeRect(
          col * this.cellSize,
          row * this.cellSize,
          this.cellSize,
          this.cellSize
        );

        if (board.grid[row][col]) {
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(
            col * this.cellSize,
            row * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }

  drawTetromino(tetromino) {
    this.ctx.fillStyle = "yellow";
    for (let row = 0; row < tetromino.currentShape.length; row++) {
      for (let col = 0; col < tetromino.currentShape[row].length; col++) {
        if (tetromino.currentShape[row][col]) {
          this.ctx.fillRect(
            (tetromino.x + col) * this.cellSize,
            (tetromino.y + row) * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }
}
