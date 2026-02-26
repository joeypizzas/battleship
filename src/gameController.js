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
