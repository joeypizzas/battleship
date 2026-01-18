// Battleship JS index

import "./style.css";
import { addBoardToUI, removeBoardsfromUI } from "./gameUI.js";
import { Player } from "./player.js";

const computer = new Player("Phoney baloney", "computer");
addBoardToUI(computer);
