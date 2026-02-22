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
