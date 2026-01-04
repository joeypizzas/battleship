// Gameboard class

import { Square } from "./square.js";

export class Gameboard {
  constructor() {
    this.grid = this.createGrid();
    this.shipsSunk = 0;
    this.shipsPlaced = 0;
    this.allShipsSunk = false;
    this.allShipsPlaced = false;
  }

  createGrid() {
    const grid = [];

    for (let r = 0; r < 10; r++) {
      grid.push([]);
      for (let c = 0; c < 10; c++) {
        grid[r].push(new Square());
      }
    }

    return grid;
  }

  isSquareOpen(x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) return false;
    if (this.grid[x][y].ship) return false;

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        if (xOffset === 0 && yOffset === 0) continue;

        const xNeighbor = x + xOffset;
        const yNeighbor = y + yOffset;

        if (xNeighbor < 0 || xNeighbor > 9 || yNeighbor < 0 || yNeighbor > 9)
          continue;

        if (this.grid[xNeighbor][yNeighbor].ship) return false;
      }
    }

    return true;
  }

  placeShip(ship) {
    if (!ship.isShipFullyPlaced()) return false;

    for (const coordinates of ship.shipPlacement) {
      this.grid[coordinates[0]][coordinates[1]].ship = ship;
    }

    this.shipsPlaced++;
    if (this.shipsPlaced === 5) this.allShipsPlaced = true;

    return true;
  }

  receiveAttack(x, y) {
    if (!this.grid[x][y].beenAttacked) this.grid[x][y].beenAttacked = true;

    if (this.grid[x][y].ship) {
      this.grid[x][y].ship.hit();

      if (this.grid[x][y].ship.checkSunkStatus()) this.shipsSunk++;
      if (this.shipsSunk === 5) this.allShipsSunk = true;
    }
  }
}
