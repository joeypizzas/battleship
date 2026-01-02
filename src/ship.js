// Ship class

import { Gameboard } from "./gameboard.js";

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
}
