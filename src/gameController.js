// Game controller module 

import { initUIEventListeners, startGameInUI, removeBoardsfromUI } from "./gameUI.js";
import { Player } from "./player.js";
import { placeComputerShips } from "./computer.js";

let currentPlayerTurn;

export function startPregame() {
  const human = new Player("Joey pizzas", "human");
  const computer = new Player("Phoney baloney", "computer");
  initUIEventListeners(human, computer);
  placeComputerShips(computer);

  // Add human announcement for selecting first ship
}

export function startGame() {
  startGameInUI();
  changePlayerTurn();

  // Announces start of game
}

export function changePlayerTurn() {
  if (!currentPlayerTurn) currentPlayerTurn = "human";
  if (currentPlayerTurn === "human") {
    currentPlayerTurn = "computer";
    // add computerAttack method
  }
  if (currentPlayerTurn === "computer") currentPlayerTurn = "human";
}

export function resetGame() {
  currentPlayerTurn = undefined;
  removeBoardsfromUI();
  startPregame();
}