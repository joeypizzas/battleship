// Player class

import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  updateName(newName) {
    this.name = newName;
  }
}
