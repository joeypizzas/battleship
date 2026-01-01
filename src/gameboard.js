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
}
