class Game {
  constructor(canvas) {
    console.log("Game initialization...");
    this.board = new Board(20, 10);
    this.tetromino = new Tetromino();
    this.view = new GameView(canvas);
    this.controller = new GameController(this.board, this.tetromino);

    this.gameLoop = null;
    this.speed = 500;
  }

  start() {
    this.gameLoop = setInterval(() => {
      this.update();
      this.render();
    }, this.speed);
  }

  update() {
    const isGameOver = this.controller.moveDown();
    if (isGameOver) {
      this.gameOver();
      return;
    }
    this.tetromino = this.controller.getCurrentTetromino();
  }

  render() {
    this.view.clearCanvas();
    this.view.drawBoard(this.board);
    this.view.drawTetromino(this.tetromino);
  }

  gameOver() {
    clearInterval(this.gameLoop);
    alert("Game Over!");
    this.resetGame();
  }

  resetGame() {
    this.board = new Board(20, 10);
    this.tetromino = new Tetromino();
    this.controller = new GameController(this.board, this.tetromino);
    this.start();
  }
}
