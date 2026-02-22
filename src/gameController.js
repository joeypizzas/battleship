// Game controller module 

import { initUIEventListeners, startGameInUI } from "./gameUI.js";
import { Player } from "./player.js";

let currentPlayerTurn;

export function startPregame() {
  const human = new Player("Joey pizzas", "human");
  const computer = new Player("Phoney baloney", "computer");
  initUIEventListeners(human, computer);

  // Add method(s) for computer ship placement
  // Add human announcement for selecting first ship
}

export function startGame() {
  startGameInUI();

  // calls changePlayerTurn method
  // Announces start of game
}

function changePlayerTurn() {
  if (!currentPlayerTurn) currentPlayerTurn = "human";
  if (currentPlayerTurn === "human") {
    currentPlayerTurn = "computer";
    // add computerAttack method
  }
  if (currentPlayerTurn === "computer") currentPlayerTurn = "human";
}