class GameController {
  constructor(board, tetromino) {
    this.board = board;
    this.currentTetromino = tetromino;
    this.isGameOver = false;
    this.gameLoop = null;

    this.init();
  }

  init() {
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  handleKeyPress(event) {
    if (this.isGameOver) return;

    switch (event.key) {
      case "ArrowLeft":
        this.moveTetrominoLeft();
        break;
      case "ArrowRight":
        this.moveTetrominoRight();
        break;
      case "ArrowUp":
        this.rotateTetromino();
        break;
      case "ArrowDown":
        this.moveDown();
        break;
    }
  }

  moveTetrominoLeft() {
    if (!this.board.hasCollision(this.currentTetromino, -1, 0)) {
      this.currentTetromino.moveLeft();
    }
  }

  moveTetrominoRight() {
    if (!this.board.hasCollision(this.currentTetromino, 1, 0)) {
      this.currentTetromino.moveRight();
    }
  }

  rotateTetromino() {
    const previousShape = this.currentTetromino.currentShape;
    this.currentTetromino.currentShape = this.currentTetromino.rotate();

    if (this.board.hasCollision(this.currentTetromino)) {
      this.currentTetromino.currentShape = previousShape;
    }
  }

  moveDown() {
    if (!this.board.hasCollision(this.currentTetromino, 0, 1)) {
      this.currentTetromino.moveDown();
      return false;
    }

    this.board.addTetromino(this.currentTetromino);
    this.board.checkLines();
    this.currentTetromino = new Tetromino();

    if (this.board.hasCollision(this.currentTetromino)) {
      this.isGameOver = true;
      return true;
    }

    return false;
  }

  getCurrentTetromino() {
    return this.currentTetromino;
  }
}
