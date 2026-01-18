// Battleship JS index

import "./style.css";
import { addBoardToUI } from "./gameUI.js";
import { Player } from "./player.js";

const computer = new Player("Phoney baloney", "computer");
addBoardToUI(computer);