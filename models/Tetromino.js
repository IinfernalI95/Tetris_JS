class Tetromino {
  constructor() {
    this.shapes = {
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

    this.currentShape = this.getRandomShape();
    this.x = 4;
    this.y = 0;
  }

  getRandomShape() {
    const shapes = Object.keys(this.shapes);
    const randomIndex = Math.floor(Math.random() * shapes.length);
    return this.shapes[shapes[randomIndex]];
  }

  rotate() {
    let rotated = [];
    for (let col = 0; col < this.currentShape[0].length; col++) {
      rotated[col] = [];
      for (let row = this.currentShape.length - 1; row >= 0; row--) {
        rotated[col].push(this.currentShape[row][col]);
      }
    }
    return rotated;
  }

  moveLeft() {
    this.x -= 1;
  }

  moveRight() {
    this.x += 1;
  }

  moveDown() {
    this.y += 1;
  }
}
