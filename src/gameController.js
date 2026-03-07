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

  // Add human announcement for selecting first ship
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
  return {
    type: "placement",
    ship: player.gameboard.grid[x][y].ship,
    allShipsPlaced: player.gameboard.allShipsPlaced,
  };
}

export function determineAttackEvent(x, y, attackedPlayer) {
  return {
    type: "attack",
    attackerPlayerName: getCurrentPlayerTurn().name,
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
      return `${event.attackerPlayerName} missed into the wide open seas. ${event.attackedPlayerName}, go on the attack!`;

    if (event.square.ship && !event.square.ship.isSunk)
      return `${event.attackerPlayerName} hit ${event.attackedPlayerName}'s ${event.square.ship.name}. Press the attack!`;

    if (event.square.ship && event.square.ship.isSunk && !event.allShipsSunk)
      return `${event.attackerPlayerName} sunk ${event.attackedPlayerName}'s ${event.square.ship.name}. Continue attacking their fleet!`;

    if (event.allShipsSunk)
      return `${event.attackerPlayerName} sunk ${event.attackedPlayerName}'s fleet and is master of the seas!`;
  }
}
