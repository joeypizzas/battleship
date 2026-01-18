// Player class

import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

export class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.gameboard = new Gameboard();
    this.ships = this.createShips();
    this.selectedShip = null;
  }

  createShips() {
    const ships = [];

    ships.push(
      new Ship("destroyer"),
      new Ship("submarine"),
      new Ship("cruiser"),
      new Ship("battleship"),
      new Ship("carrier"),
    );

    return ships;
  }

  updateName(newName) {
    this.name = newName;
  }

  addSelectedShip(selectedShip) {
    this.selectedShip = selectedShip;
  }

  removeSelectedShip() {
    this.selectedShip = null;
  }
}
