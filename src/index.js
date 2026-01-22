// Battleship JS index

import "./style.css";
import { addBoardToUI, selectShipInUI, deselectShipInUI, placeShipOnSquareInUI } from "./gameUI.js";
import { Player } from "./player.js";

const human = new Player("Phoney baloney", "human");
addBoardToUI(human);
selectShipInUI("destroyer", human);
placeShipOnSquareInUI(1, 1, human);
placeShipOnSquareInUI(2, 1, human);
selectShipInUI("cruiser", human);
placeShipOnSquareInUI(5, 5, human);
placeShipOnSquareInUI(5, 6, human);
placeShipOnSquareInUI(5, 7, human);
