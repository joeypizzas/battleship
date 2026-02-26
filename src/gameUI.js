// Game UI module

import {
  changePlayerTurn,
  resetGame,
  getCurrentPlayerTurn,
  startGame,
} from "./gameController.js";

export function addBoardToUI(player) {
  // Used for both human and computer gameboards
  const gameboardsAndHangars = document.querySelector(
    "#gameboards-and-hangars",
  );

  const gameboardArea = document.createElement("div");
  gameboardArea.classList.add("gameboard-area");
  if (player.type === "human") gameboardArea.id = "human";
  if (player.type === "computer") gameboardArea.id = "computer";
  if (player.type === "computer") gameboardArea.classList.add("hidden"); // Computer gameboard isn't shown until game begins

  const nameAndGameboard = document.createElement("div");
  nameAndGameboard.classList.add("name-and-gameboard");
  gameboardArea.appendChild(nameAndGameboard);

  const nameAndEdit = document.createElement("div");
  nameAndEdit.classList.add("name-and-edit");
  nameAndGameboard.appendChild(nameAndEdit);

  const gameboardName = document.createElement("div");
  gameboardName.classList.add("gameboard-name");
  gameboardName.textContent = player.name;
  nameAndEdit.appendChild(gameboardName);

  const editName = document.createElement("button");
  editName.classList.add("edit-name");
  editName.textContent = "Edit";
  nameAndEdit.appendChild(editName);

  const gameboard = document.createElement("div");
  for (let r = 0; r < 10; r++) {
    const squareRow = document.createElement("div");
    squareRow.classList.add("square-row");
    for (let c = 0; c < 10; c++) {
      const square = document.createElement("div");
      square.classList.add("square");
      if (r === 0) square.classList.add("top-row");
      if (c === 0) square.classList.add("left-column");
      if (player.type === "human") square.classList.add("pre-game"); // Ensures event listeners fire for selecting squares to place ships on human gameboard
      if (
        player.type === "human" &&
        player.gameboard.grid[r][c].ship &&
        player.gameboard.grid[r][c].beenAttacked
      )
        square.classList.add("hit");
      if (
        player.type === "human" &&
        !player.gameboard.grid[r][c].ship &&
        player.gameboard.grid[r][c].beenAttacked
      )
        square.classList.add("miss");
      if (
        player.type === "human" &&
        player.gameboard.grid[r][c].ship &&
        !player.gameboard.grid[r][c].beenAttacked
      )
        square.classList.add("ship-placed");
      square.dataset.x = r;
      square.dataset.y = c;
      squareRow.appendChild(square);
    }
    gameboard.appendChild(squareRow);
  }
  nameAndGameboard.appendChild(gameboard);

  const hangar = document.createElement("div");
  hangar.classList.add("hangar");
  gameboardArea.appendChild(hangar);

  for (const ship of player.ships) {
    const hangarShip = document.createElement("div");
    hangarShip.classList.add("hangar-ship");
    if (player.type === "human") hangarShip.classList.add("selectable"); // Allows selecting ships to then place them on board
    hangarShip.dataset.shipName = ship.name;

    const hangarShipName = document.createElement("div");
    hangarShipName.classList.add("hangar-ship-name");
    hangarShipName.textContent = ship.name;
    hangarShip.appendChild(hangarShipName);

    const hangarShipStorage = document.createElement("div");
    hangarShipStorage.classList.add("hangar-ship-storage");
    for (let i = 0; i < ship.length; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("top-row");
      if (i === 0) square.classList.add("left-column");
      hangarShipStorage.appendChild(square);
    }
    hangarShip.appendChild(hangarShipStorage);
    hangar.appendChild(hangarShip);
  }

  gameboardsAndHangars.appendChild(gameboardArea);
}

export function removeBoardsfromUI() {
  // Used when resetting game
  const gameboardsAndHangars = document.querySelector(
    "#gameboards-and-hangars",
  );
  gameboardsAndHangars.replaceChildren();
}

export function selectShipInUI(selectedShipName, player) {
  if (player.selectedShip) return false; // Once you select a ship, you have to place it before selecting a new one

  for (const ship of player.ships) {
    if (selectedShipName === ship.name)
      player.addSelectedShip(selectedShipName);
  }

  const hangarShips = document.querySelectorAll(".hangar-ship");
  hangarShips.forEach((hangarShip) => {
    if (hangarShip.classList.contains("selectable"))
      hangarShip.classList.remove("selectable"); // Ensures can't select ship while once is selected
    if (hangarShip.dataset.shipName === selectedShipName)
      hangarShip.classList.add("selected");
  });

  // add gameController method to announce ship placement once written
  // maybe add class to highlight ship in UI once it exists
}

export function deselectShipInUI(player) {
  player.removeSelectedShip();

  const oldSelectedShip = document.querySelector(".selected");
  oldSelectedShip.classList.remove("selected");
  oldSelectedShip.classList.add("placed");

  oldSelectedShip.classList.remove("hangar-ship-hover");
  const hangarShipSquares = oldSelectedShip.querySelectorAll(".square");
  hangarShipSquares.forEach((hangarShipSquare) => {
    hangarShipSquare.classList.remove("square-hover");
  });

  const hangarShips = document.querySelectorAll(".hangar-ship");
  hangarShips.forEach((hangarShip) => {
    if (!hangarShip.classList.contains("placed"))
      hangarShip.classList.add("selectable"); // After a ship is placed, it's not selectable again
  });
}

export function placeShipOnSquareInUI(x, y, player) {
  for (const ship of player.ships) {
    if (ship.name === player.selectedShip) {
      if (ship.canShipBePlacedOnSquare(x, y, player.gameboard)) {
        ship.addSquareToShipPlacement(x, y, player.gameboard); // Track prospective placement on ship alongside board UI

        const square = document.querySelector(
          `.square[data-x="${x}"][data-y="${y}"]`,
        );
        square.classList.add("ship-placed");

        const selectedHangarShip = document.querySelector(".selected");
        const hangarSquares = selectedHangarShip.querySelectorAll(".square");
        for (const hangarSquare of hangarSquares) {
          if (!hangarSquare.classList.contains("ship-placed")) {
            hangarSquare.classList.add("ship-placed");
            break;
          }
        }

        if (player.gameboard.placeShip(ship)) {
          // Only the full, final ship placement's added to the gameboard object
          deselectShipInUI(player);
          if (player.gameboard.allShipsPlaced) {
            startGame(player);
          } else {
            // add announcement for selecting new ship
          }
        } else {
          // add gameController method that prompts to select an additional square
        }
      } else {
        // Add gameController method that says the ship can't be placed there and to select a new square.
      }
    }
  }
}

export function markComputerShipPlacedInHangar(player) {
  const computerGameboard = document.querySelector("#computer");
  const hangarShips = computerGameboard.querySelectorAll(".hangar-ship");
  hangarShips.forEach((hangarShip) => {
    if (hangarShip.dataset.shipName === player.selectedShip.name) {
      hangarShip.classList.add("selected");
    }
  });

  const selectedHangarShip = computerGameboard.querySelector(".selected");
  if (selectedHangarShip) {
    const hangarSquares = selectedHangarShip.querySelectorAll(".square");
    for (const hangarSquare of hangarSquares) {
      if (!hangarSquare.classList.contains("ship-placed")) {
        hangarSquare.classList.add("ship-placed");
        break;
      }
    }
    selectedHangarShip.classList.remove("selected");
  }
}

export function startGameInUI() {
  const humanGameboard = document.querySelector("#human");
  const humanSquares = humanGameboard.querySelectorAll(".square");
  humanSquares.forEach((square) => {
    if (square.classList.contains("pre-game"))
      square.classList.remove("pre-game");
  });

  const computerGameboard = document.querySelector("#computer");
  if (computerGameboard.classList.contains("hidden"))
    computerGameboard.classList.remove("hidden");

  // call method to add game start announcement
}

export function attackSquareInUI(x, y, player, human) {
  if (x < 0 || x > 9 || y < 0 || y > 9) return false;

  player.gameboard.receiveAttack(x, y);

  const gameboard = document.querySelector(`#${player.type}`);
  const attackedSquare = gameboard.querySelector(
    `.square[data-x="${x}"][data-y="${y}"]`,
  );
  if (player.gameboard.grid[x][y].ship) {
    if (attackedSquare.classList.contains("ship-placed"))
      attackedSquare.classList.remove("ship-placed");
    attackedSquare.classList.add("hit");

    const hangarShips = gameboard.querySelectorAll(".hangar-ship");
    hangarShips.forEach((hangarShip) => {
      if (
        hangarShip.dataset.shipName === player.gameboard.grid[x][y].ship.name
      ) {
        const hangarSquares = hangarShip.querySelectorAll(".square");
        for (const hangarSquare of hangarSquares) {
          if (!hangarSquare.classList.contains("hit")) {
            hangarSquare.classList.remove("ship-placed");
            hangarSquare.classList.add("hit");
            break;
          }
        }
      }
    });

    // Announce step from gameController for hit or sunk ship, or winner if all ships sunk
  } else {
    attackedSquare.classList.add("miss");
    changePlayerTurn(human);
    // announces miss from gameController
  }
}

export function announceNextStepInUI(message) {
  const messageArea = document.querySelector("#message-area");
  messageArea.textContent = message;
}

function openDialog(player) {
  const header = document.querySelector("#header");
  const gameArea = document.querySelector("#game-area");
  const footer = document.querySelector("#footer");
  header.classList.add("blur");
  gameArea.classList.add("blur");
  footer.classList.add("blur");

  const newName = document.querySelector("#new-name");
  newName.value = player.name;

  const editNameDialog = document.querySelector("#edit-name-dialog");
  editNameDialog.dataset.editingPlayer = player.type;
  editNameDialog.showModal();
}

function closeDialog() {
  const header = document.querySelector("#header");
  const gameArea = document.querySelector("#game-area");
  const footer = document.querySelector("#footer");
  header.classList.remove("blur");
  gameArea.classList.remove("blur");
  footer.classList.remove("blur");

  const editNameDialog = document.querySelector("#edit-name-dialog");
  editNameDialog.dataset.editingPlayer = null;
  editNameDialog.close();
}

function updateNameInUI(player) {
  const playerGameboard = document.querySelector(`#${player.type}`);
  const gameboardName = playerGameboard.querySelector(".gameboard-name");
  gameboardName.textContent = player.name;
}

export function initUIEventListeners(human, computer) {
  addBoardToUI(human);
  addBoardToUI(computer);

  const humanGameboard = document.querySelector("#human");
  const humanNameAndGameboard = humanGameboard.querySelector(
    ".name-and-gameboard",
  );
  const humanSquares = humanNameAndGameboard.querySelectorAll(".square");
  humanSquares.forEach((square) => {
    square.addEventListener("mouseover", () => {
      if (
        square.classList.contains("pre-game") &&
        !square.classList.contains("ship-placed") &&
        human.selectedShip
      )
        square.classList.add("square-hover"); // Only possible to interact with human gameboard squares when placing ships pregame. Must have a selected ship and the square must be open.
    });
    square.addEventListener("mouseout", () => {
      square.classList.remove("square-hover");
    });
    square.addEventListener("mousedown", () => {
      if (
        square.classList.contains("pre-game") &&
        !square.classList.contains("ship-placed") &&
        human.selectedShip
      ) {
        square.classList.remove("square-hover");
        square.classList.add("square-click");
      }
    });
    square.addEventListener("mouseup", () => {
      if (square.classList.contains("square-click")) {
        square.classList.remove("square-click");
        square.classList.add("square-hover");

        placeShipOnSquareInUI(
          Number(square.dataset.x),
          Number(square.dataset.y),
          human,
        );
      }
    });
  });

  const hangarShips = humanGameboard.querySelectorAll(".hangar-ship");
  hangarShips.forEach((hangarShip) => {
    const hangarShipSquares = hangarShip.querySelectorAll(".square");

    hangarShip.addEventListener("mouseover", () => {
      if (hangarShip.classList.contains("selectable")) {
        hangarShip.classList.add("hangar-ship-hover");
        hangarShipSquares.forEach((hangarShipSquare) => {
          hangarShipSquare.classList.add("square-hover");
        });
      }
    });
    hangarShip.addEventListener("mouseout", () => {
      if (!hangarShip.classList.contains("selected")) {
        // Selected ship stays highlighted during placement
        hangarShip.classList.remove("hangar-ship-hover");
        hangarShipSquares.forEach((hangarShipSquare) => {
          hangarShipSquare.classList.remove("square-hover");
        });
      }
    });
    hangarShip.addEventListener("mousedown", () => {
      if (hangarShip.classList.contains("selectable")) {
        hangarShip.classList.remove("hangar-ship-hover");
        hangarShip.classList.add("hangar-ship-click");
        hangarShipSquares.forEach((hangarShipSquare) => {
          hangarShipSquare.classList.remove("square-hover");
          hangarShipSquare.classList.add("square-click");
        });
      }
    });
    hangarShip.addEventListener("mouseup", () => {
      if (hangarShip.classList.contains("hangar-ship-click")) {
        hangarShip.classList.remove("hangar-ship-click");
        hangarShip.classList.add("hangar-ship-hover");
        hangarShipSquares.forEach((hangarShipSquare) => {
          hangarShipSquare.classList.remove("square-click");
          hangarShipSquare.classList.add("square-hover");
        });

        selectShipInUI(hangarShip.dataset.shipName, human);
      }
    });
  });

  const computerGameboard = document.querySelector("#computer");
  const computerNameAndGameboard = computerGameboard.querySelector(
    ".name-and-gameboard",
  );
  const computerSquares = computerNameAndGameboard.querySelectorAll(".square");
  computerSquares.forEach((computerSquare) => {
    computerSquare.addEventListener("mouseover", () => {
      if (
        !computer.gameboard.grid[computerSquare.dataset.x][
          computerSquare.dataset.y
        ].beenAttacked &&
        getCurrentPlayerTurn() === "human"
      )
        computerSquare.classList.add("square-hover"); // Computer board's only shown once game starts, so only checks are for prior attack and correct turn
    });
    computerSquare.addEventListener("mouseout", () => {
      computerSquare.classList.remove("square-hover");
    });
    computerSquare.addEventListener("mousedown", () => {
      if (
        !computer.gameboard.grid[computerSquare.dataset.x][
          computerSquare.dataset.y
        ].beenAttacked &&
        getCurrentPlayerTurn() === "human"
      ) {
        computerSquare.classList.remove("square-hover");
        computerSquare.classList.add("square-click");
      }
    });
    computerSquare.addEventListener("mouseup", () => {
      if (computerSquare.classList.contains("square-click")) {
        computerSquare.classList.remove("square-click");
        computerSquare.classList.add("square-hover");

        attackSquareInUI(
          Number(computerSquare.dataset.x),
          Number(computerSquare.dataset.y),
          computer,
          human,
        );
      }
    });
  });

  const editNameButtons = document.querySelectorAll(".edit-name");
  editNameButtons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.classList.add("square-hover");
    });
    button.addEventListener("mouseout", () => {
      button.classList.remove("square-hover");
    });
    button.addEventListener("mousedown", () => {
      button.classList.add("square-click");
    });
    button.addEventListener("mouseup", () => {
      button.classList.remove("square-click");
      button.classList.add("square-hover");

      const closestGameboardArea = button.closest(".gameboard-area");
      if (closestGameboardArea.id === "human") openDialog(human);
      if (closestGameboardArea.id === "computer") openDialog(computer);
    });
  });

  const newGame = document.querySelector(".new-game");
  newGame.addEventListener("mouseover", () => {
    newGame.classList.add("square-hover");
  });
  newGame.addEventListener("mouseout", () => {
    newGame.classList.remove("square-hover");
  });
  newGame.addEventListener("mousedown", () => {
    newGame.classList.add("square-click");
  });
  newGame.addEventListener("mouseup", () => {
    newGame.classList.remove("square-click");
    newGame.classList.add("square-hover");
    resetGame();
  });

  const closeModalButton = document.querySelector(".close-modal-button");
  closeModalButton.addEventListener("mouseover", () => {
    closeModalButton.classList.add("close-modal-hover");
  });
  closeModalButton.addEventListener("mouseout", () => {
    closeModalButton.classList.remove("close-modal-hover");
  });
  closeModalButton.addEventListener("mousedown", () => {
    closeModalButton.classList.remove("close-modal-hover");
    closeModalButton.classList.add("close-modal-click");
  });
  closeModalButton.addEventListener("mouseup", () => {
    closeModalButton.classList.remove("close-modal-click");
    closeModalButton.classList.add("close-modal-hover");
    closeDialog();
  });

  const newSaveButton = document.querySelector(".new-save-button");
  newSaveButton.addEventListener("mouseover", () => {
    newSaveButton.classList.add("new-save-hover");
  });
  newSaveButton.addEventListener("mouseout", () => {
    newSaveButton.classList.remove("new-save-hover");
  });
  newSaveButton.addEventListener("mousedown", () => {
    newSaveButton.classList.remove("new-save-hover");
    newSaveButton.classList.add("new-save-click");
  });
  newSaveButton.addEventListener("mouseup", () => {
    newSaveButton.classList.remove("new-save-click");
    newSaveButton.classList.add("new-save-hover");

    const editNameDialog = document.querySelector("#edit-name-dialog");
    const newName = document.querySelector("#new-name");

    if (editNameDialog.dataset.editingPlayer === "human") {
      human.updateName(newName.value);
      updateNameInUI(human);
    }
    if (editNameDialog.dataset.editingPlayer === "computer") {
      computer.updateName(newName.value);
      updateNameInUI(computer);
    }

    closeDialog();
  });

  const newName = document.querySelector("#new-name");
  newName.addEventListener("blur", () => {
    newName.setCustomValidity("");
    if (!newName.checkValidity()) {
      newName.setCustomValidity("Please enter a valid player name");
      newName.reportValidity();
    } else {
      newName.setCustomValidity("");
    }
  });
  newName.addEventListener("input", () => {
    newName.setCustomValidity("");
  });
}
