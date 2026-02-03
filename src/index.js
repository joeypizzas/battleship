// Battleship JS index

import "./style.css";
import { addBoardToUI, selectShipInUI, placeShipOnSquareInUI, attackSquareInUI, initUIEventListeners } from "./gameUI.js";
import { Player } from "./player.js";

const human = new Player("Joey pizzas", "human");
const computer = new Player("Phoney baloney", "computer");

initUIEventListeners(human, computer);
