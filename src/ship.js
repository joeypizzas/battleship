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

  areShipCoordinatesStraight(x, y) {
    // Coordinates are always straight for the first square
    if (this.shipPlacement.length === 0) return true;

    // Confirms if ship is moving along y axis
    if (
      x === this.shipPlacement[0][0] &&
      x === this.shipPlacement[this.shipPlacement.length - 1][0] // Guards against case where ship changes direction from start mid-placement
    ) {
      const yCoordinates = [];

      for (const coordinates of this.shipPlacement) {
        yCoordinates.push(coordinates[1]);
      }

      // New y needs to be one more or less than max/min y to be straight along y axis
      if (
        Math.max(...yCoordinates) + 1 === y ||
        Math.min(...yCoordinates) - 1 === y
      )
        return true;
    }

    // Confirms if ship is moving along x axis
    if (
      y === this.shipPlacement[0][1] &&
      y === this.shipPlacement[this.shipPlacement.length - 1][1]
    ) {
      const xCoordinates = [];

      for (const coordinates of this.shipPlacement) {
        xCoordinates.push(coordinates[0]);
      }

      // New x needs to be one more or less than max/min x to be straight along x axis
      if (
        Math.max(...xCoordinates) + 1 === x ||
        Math.min(...xCoordinates) - 1 === x
      )
        return true;
    }

    return false;
  }

  canShipBePlacedOnSquare(x, y, gameboard) {
    if (!gameboard.isSquareOpen(x, y)) return false;

    if (
      (this.shipPlacement.length === 0 &&
        !this.canShipFitFromSquare(x, y, gameboard)) ||
      (this.shipPlacement.length === 1 &&
        !this.canShipFitFromSquare(x, y, gameboard))
    )
      return false;

    if (!this.areShipCoordinatesStraight(x, y)) return false;

    return true;
  }

  addSquareToShipPlacement(x, y, gameboard) {
    if (!this.canShipBePlacedOnSquare(x, y, gameboard)) return false;

    this.shipPlacement.push([x, y]);
    if (this.shipPlacement.length === this.length) this.fullyPlaced = true;

    return true;
  }

  isShipFullyPlaced() {
    if (this.fullyPlaced === false) return false;

    return true;
  }
}
