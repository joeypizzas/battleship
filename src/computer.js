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
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    if (!human.gameboard.grid[x][y].beenAttacked) return [x, y];

    while (human.gameboard.grid[x][y].beenAttacked) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
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
    attackSquareInUI(attackCoordinates[0], attackCoordinates[1], human, human);
    if (human.gameboard.grid[attackCoordinates[0]][attackCoordinates[1]].ship) {
      let x = attackCoordinates[0];
      let y = attackCoordinates[1];

      const neighbors = [];
      neighbors.push([x, y - 1], [x - 1, y], [x, y + 1], [x + 1, y]);
      for (const neighbor of neighbors) {
        if (
          neighbor[0] < 0 ||
          neighbor[0] > 9 ||
          neighbor[1] < 0 ||
          neighbor[1] > 9
        )
          continue;

        if (human.gameboard.grid[neighbor[0]][neighbor[1]].beenAttacked)
          continue;

        let alreadyQueued = false;
        for (const target of targetQueue) {
          if (target[0] === neighbor[0] && target[1] === neighbor[1]) {
            alreadyQueued = true;
            break;
          }
        }
        if (alreadyQueued) continue;

        targetQueue.push(neighbor);
      }
    }
  }
}
