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

    // Each grid spot takes a square object to store ship and attack status
    for (let r = 0; r < 10; r++) {
      grid.push([]);
      for (let c = 0; c < 10; c++) {
        grid[r].push(new Square());
      }
    }

    return grid;
  }

  isSquareOpen(x, y) {
    // offboard square or square with ship are never open
    if (x < 0 || x > 9 || y < 0 || y > 9) return false;
    if (this.grid[x][y].ship) return false;

    // Nested loops checking offset confirms squares around proposed square don't have a ship
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        // No need to check proposed square
        if (xOffset === 0 && yOffset === 0) continue;

        const xNeighbor = x + xOffset;
        const yNeighbor = y + yOffset;

        // No need to check offboard squares
        if (xNeighbor < 0 || xNeighbor > 9 || yNeighbor < 0 || yNeighbor > 9)
          continue;

        if (this.grid[xNeighbor][yNeighbor].ship) return false;
      }
    }

    return true;
  }

  placeShip(ship) {
    if (!ship.isShipFullyPlaced()) return false;

    // Store entire ship object on each square for ease of tracking hits/sunk status
    for (const coordinates of ship.shipPlacement) {
      this.grid[coordinates[0]][coordinates[1]].ship = ship;
    }

    this.shipsPlaced++;
    if (this.shipsPlaced === 5) this.allShipsPlaced = true;

    return true;
  }

  receiveAttack(x, y) {
    if (!this.grid[x][y].beenAttacked) this.grid[x][y].beenAttacked = true;

    // Attacked square with a ship is a hit, no ship is a miss
    if (this.grid[x][y].ship) {
      this.grid[x][y].ship.hit();

      if (this.grid[x][y].ship.checkSunkStatus()) this.shipsSunk++;
      if (this.shipsSunk === 5) this.allShipsSunk = true;
    }
  }
}
