// Computer module

const targetQueue = [];

export function placeComputerShips(computer) {
  const shipsForPlacement = [...computer.ships];

  while (!computer.gameboard.allShipsPlaced) {
    computer.selectedShip = shipsForPlacement.shift();
    while (!computer.selectedShip.fullyPlaced) {
      computer.selectedShip.addSquareToShipPlacement(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        computer.gameboard,
      );
      computer.gameboard.placeShip(computer.selectedShip);
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
