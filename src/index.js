// Battleship JS index

import "./style.css";
import { addBoardToUI, selectShipInUI, deselectShipInUI, placeShipOnSquareInUI } from "./gameUI.js";
import { Player } from "./player.js";

const human = new Player("Phoney baloney", "human");
addBoardToUI(human);

// TEST placeShipOnSquareInUI


