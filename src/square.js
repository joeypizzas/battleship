// Square class

export class Square {
  constructor() {
    this.ship = null;
    this.beenAttacked = false;
  }

  attack() {
    if (!this.beenAttacked) this.beenAttacked = true;
  }
}
