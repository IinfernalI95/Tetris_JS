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
    // Проверяем, может ли фигура двигаться вниз
    if (!this.board.hasCollision(this.tetromino, 0, 1)) {
      this.tetromino.moveDown();
    } else {
      // Если движение вниз невозможно:
      // 1. Фиксируем фигуру на поле
      this.board.addTetromino(this.tetromino);
      // 2. Создаем новую фигуру
      this.tetromino = new Tetromino();
      // Обновляем ссылку на тетрамино в контроллере
      this.controller.updateTetromino(this.tetromino);

      // 3. Проверяем, можно ли разместить новую фигуру
      if (this.board.hasCollision(this.tetromino)) {
        this.gameOver();
        return;
      }
    }
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
    // Сбрасываем состояние игры
    this.board = new Board(20, 10);
    this.tetromino = new Tetromino();

    // Перезапускаем игровой цикл
    this.start();
  }
}
