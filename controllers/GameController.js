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
        this.moveTetrominoDown();
        break;
    }
  }

  moveTetrominoLeft() {
    this.currentTetromino.moveLeft();
    if (this.board.hasCollision(this.currentTetromino)) {
      this.currentTetromino.moveRight();
    }
  }

  moveTetrominoRight() {
    this.currentTetromino.moveRight();
    if (this.board.hasCollision(this.currentTetromino)) {
      this.currentTetromino.moveLeft();
    }
  }

  rotateTetromino() {
    const previousShape = this.currentTetromino.currentShape;
    this.currentTetromino.currentShape = this.currentTetromino.rotate();

    if (this.board.hasCollision(this.currentTetromino)) {
      this.currentTetromino.currentShape = previousShape;
    }
  }
}
