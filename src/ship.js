// Ship class

export class Ship {
  constructor(shipName) {
    this.length = this.setShipLength(shipName);
    this.hits = 0;
    this.isSunk = false;
    this.name = shipName;
    this.shipPlacement = [];
    this.fullyPlaced = false;
  }

  setShipLength(shipName) {
    if (shipName === "destroyer") return 2;
    if (shipName === "submarine") return 3;
    if (shipName === "cruiser") return 3;
    if (shipName === "battleship") return 4;
    if (shipName === "carrier") return 5;
  }

  hit() {
    this.hits++;
    if (this.hits === this.length) this.isSunk = true;
  }

  checkSunkStatus() {
    return this.isSunk;
  }

  canShipFitFromSquare(x, y, gameboard) {
    if (!gameboard.isSquareOpen(x, y)) return false;

    if (this.shipPlacement.length === 0) {
      // Loops check ship length - 1 because they check from the starting square
      for (let i = 1; i <= this.length - 1; i++) {
        // Checks for incrementing ship space on x axis
        if (!gameboard.isSquareOpen(x + i, y)) break;
        if (i === this.length - 1) return true;
      }

      for (let i = 1; i <= this.length - 1; i++) {
        // Checks for decrementing ship space on x axis
        if (!gameboard.isSquareOpen(x - i, y)) break;
        if (i === this.length - 1) return true;
      }

      for (let i = 1; i <= this.length - 1; i++) {
        // Checks for incrementing ship space on y axis
        if (!gameboard.isSquareOpen(x, y + i)) break;
        if (i === this.length - 1) return true;
      }

      for (let i = 1; i <= this.length - 1; i++) {
        // Checks for decrementing ship space on y axis
        if (!gameboard.isSquareOpen(x, y - i)) break;
        if (i === this.length - 1) return true;
      }

      return false;
    }

    if (this.shipPlacement.length === 1) {
      if (x === this.shipPlacement[0][0]) {
        // Checks for incrementing ship space on y axis
        if (y > this.shipPlacement[0][1]) {
          // Loops check ship length - 2 because first 2 squares are already vetted
          for (let i = 1; i <= this.length - 2; i++) {
            if (!gameboard.isSquareOpen(x, y + i)) return false;
          }
        }

        if (y < this.shipPlacement[0][1]) {
          // Checks for decrementing ship space on y axis
          for (let i = 1; i <= this.length - 2; i++) {
            if (!gameboard.isSquareOpen(x, y - i)) return false;
          }
        }
      }

      if (y === this.shipPlacement[0][1]) {
        // Checks for incrementing ship space on x axis
        if (x > this.shipPlacement[0][0]) {
          for (let i = 1; i <= this.length - 2; i++) {
            if (!gameboard.isSquareOpen(x + i, y)) return false;
          }
        }

        if (x < this.shipPlacement[0][0]) {
          // Checks for decrementing ship space on y axis
          for (let i = 1; i <= this.length - 2; i++) {
            if (!gameboard.isSquareOpen(x - 1, y)) return false;
          }
        }
      }

      return true;
    }
  }
}
