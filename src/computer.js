// Computer module

import { getCurrentPlayerTurn } from "./gameController.js";
import { markComputerShipPlacedInHangar, attackSquareInUI } from "./gameUI.js";

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

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function computerAttack(human) {
  while (getCurrentPlayerTurn() === "computer") {
    const attackCoordinates = determineComputerAttack(human);
    await delay(3000);
    attackSquareInUI(attackCoordinates[0], attackCoordinates[1], human);
    if (human.gameboard.grid[attackCoordinates[0]][attackCoordinates[1]].ship) {
      let x = attackCoordinates[0];
      let y = attackCoordinates[1];

      for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
          const xNeighbor = x + xOffset;
          const yNeighbor = y + yOffset;

          if (x === xNeighbor && y === yNeighbor) continue;
          if (xNeighbor < 0 || xNeighbor > 9 || yNeighbor < 0 || yNeighbor > 9)
            continue;
          if (human.gameboard.grid[xNeighbor][yNeighbor].beenAttacked) continue;
          for (const target of targetQueue) {
            if (target[0] === xNeighbor && target[1] === yNeighbor) continue;
          }

          targetQueue.push([xNeighbor, yNeighbor]);
        }
      }
    }
  }
}
