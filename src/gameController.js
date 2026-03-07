// Game controller module

import {
  initUIEventListeners,
  startGameInUI,
  removeBoardsfromUI,
} from "./gameUI.js";
import { Player } from "./player.js";
import { placeComputerShips, computerAttack } from "./computer.js";

let currentPlayerTurn;

export function startPregame() {
  const human = new Player("Joey pizzas", "human");
  const computer = new Player("Phoney baloney", "computer");
  initUIEventListeners(human, computer);
  placeComputerShips(computer);
}

export function startGame(human) {
  startGameInUI();
  changePlayerTurn(human);

  // Announces start of game
}

export function getCurrentPlayerTurn() {
  return currentPlayerTurn;
}

export function changePlayerTurn(human) {
  if (!currentPlayerTurn) {
    currentPlayerTurn = "human";
    return;
  } else if (currentPlayerTurn === "human") {
    currentPlayerTurn = "computer";
    computerAttack(human);
  } else if (currentPlayerTurn === "computer") currentPlayerTurn = "human";
}

export function resetGame() {
  currentPlayerTurn = undefined;
  removeBoardsfromUI();
  startPregame();
}

export function endGame() {
  currentPlayerTurn = undefined;
}

export function determinePlacementEvent(x, y, player) {
  let placedShip;
  if (player.selectedShip) placedShip = player.selectedShip;
  else placedShip = player.gameboard.grid[x][y].ship;
  return {
    type: "placement",
    ship: placedShip,
    allShipsPlaced: player.gameboard.allShipsPlaced,
  };
}

export function determineAttackEvent(x, y, attackedPlayer) {
  return {
    type: "attack",
    attackedPlayerName: attackedPlayer.name,
    square: attackedPlayer.gameboard.grid[x][y],
    allShipsSunk: attackedPlayer.gameboard.allShipsSunk,
  };
}

export function getGameMessage(event) {
  if (!event) return "Select a ship from the hangar and place it on the board.";

  if (event.type === "placement") {
    if (!event.ship.fullyPlaced)
      return "Great choice! Now, continue placing your ship on the board.";

    if (event.ship.fullyPlaced && !event.allShipsPlaced)
      return `You finished placing your ${event.ship.name}. Select another ship from the hangar and place it on the board.`;

    if (event.allShipsPlaced)
      return "It's time for Battleship! Make your first attack.";
  }

  if (event.type === "attack") {
    if (!event.square.ship)
      return `A miss into the wide open seas. ${event.attackedPlayerName}, go on the attack!`;

    if (event.square.ship && !event.square.ship.isSunk)
      return `A hit against ${event.attackedPlayerName}'s ${event.square.ship.name}. Press the attack!`;

    if (event.square.ship && event.square.ship.isSunk && !event.allShipsSunk)
      return `${event.attackedPlayerName}'s ${event.square.ship.name} is sunk. Continue attacking their fleet!`;

    if (event.allShipsSunk)
      return `${event.attackedPlayerName}'s fleet is sunk. Game over!`;
  }
}
