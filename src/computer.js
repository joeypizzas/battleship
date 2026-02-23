// Computer module

import { getCurrentPlayerTurn } from "./gameController.js";
import { markComputerShipPlacedInHangar } from "./gameUI.js";

const targetQueue = [];

export function placeComputerShips(computer) {
  const shipsForPlacement = [...computer.ships];

  while (shipsForPlacement.length > 0) {
    computer.selectedShip = shipsForPlacement.shift();
    while (!computer.selectedShip.fullyPlaced) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      if (
        computer.selectedShip.canShipBePlacedOnSquare(x, y, computer.gameboard)
      ) {
        computer.selectedShip.addSquareToShipPlacement(
          x,
          y,
          computer.gameboard,
        );
        markComputerShipPlacedInHangar(computer);
        computer.gameboard.placeShip(computer.selectedShip);
      }
    }
  }

  computer.removeSelectedShip();
}

function determineComputerAttack(human) {
  if (targetQueue.length === 0) {
    let x = Math.floor(Math.random()) * 10;
    let y = Math.floor(Math.random()) * 10;

    if (!human.gameboard.grid[x][y].beenAttacked) return [x, y];

    while (human.gameboard.grid[x][y].beenAttacked) {
      x = Math.floor(Math.random()) * 10;
      y = Math.floor(Math.random()) * 10;
    }

    return [x, y];
  }

  return targetQueue.shift();
}

export async function computerAttack(human) {
  while (getCurrentPlayerTurn() === "computer") {
    const attackCoordinates = determineComputerAttack(human);
  }
}
