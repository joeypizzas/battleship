// Game UI module

export function addBoardToUI(player) {
  const gameboardsAndHangars = document.querySelector("#gameboards-and-hangars");
  
  const gameboardArea = document.createElement("div");
  gameboardArea.classList.add("gameboard-area");
  if (player.type === "human") gameboardArea.id = "human";
  if (player.type === "computer") gameboardArea.id = "computer";
  //if (player.type === "computer") gameboardArea.classList.add("hidden");

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
      if (player.type === "human") square.classList.add("pre-game");
      if (player.type === "human" && player.gameboard.grid[r][c].ship && player.gameboard.grid[r][c].beenAttacked) square.classList.add("hit");
      if (player.type === "human" && !player.gameboard.grid[r][c].ship && player.gameboard.grid[r][c].beenAttacked) square.classList.add("miss");
      if (player.type === "human" && player.gameboard.grid[r][c].ship && !player.gameboard.grid[r][c].beenAttacked) square.classList.add("ship-placed");
      square.dataset.x = r;
      square.dataset.y = c
      squareRow.appendChild(square);
    }
    gameboard.appendChild(squareRow);
  }
  nameAndGameboard.appendChild(gameboard);

  const hangar = document.createElement("div");
  hangar.classList.add("hangar");
  gameboardArea.appendChild(hangar);

  for(const ship of player.ships) {
    const hangarShip = document.createElement("div");
    hangarShip.classList.add("hangar-ship");
    if (player.type === "human") hangarShip.classList.add("selectable");
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
  const gameboardsAndHangars = document.querySelector("#gameboards-and-hangars");
  gameboardsAndHangars.replaceChildren();
}

export function selectShipInUI(selectedShipName, player) {
  if (player.selectedShip) return false;

  for (const ship of player.ships) {
    if (selectedShipName === ship.name) player.addSelectedShip(selectedShipName);
  }

  const hangarShips = document.querySelectorAll(".hangar-ship");
  hangarShips.forEach(hangarShip => {
    if (hangarShip.classList.contains("selectable")) hangarShip.classList.remove("selectable");
    if (hangarShip.dataset.shipName === selectedShipName) hangarShip.classList.add("selected");
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
  hangarShipSquares.forEach(hangarShipSquare => {
    hangarShipSquare.classList.remove("square-hover");
  });

  const hangarShips = document.querySelectorAll(".hangar-ship");
  hangarShips.forEach(hangarShip => {
    if (!hangarShip.classList.contains("placed")) hangarShip.classList.add("selectable");
  })

  // add gameController method to announce next steps based on whether more ships to place or all placed
  // maybe add class to remove highlight from ship in UI once it exists
  // Add check for starting game once gameController module exists
}

export function placeShipOnSquareInUI(x, y, player) {
  for (const ship of player.ships) {
    if (ship.name === player.selectedShip) {
      if (ship.canShipBePlacedOnSquare(x, y, player.gameboard)) {
        ship.addSquareToShipPlacement(x, y, player.gameboard);

        const square = document.querySelector(`.square[data-x="${x}"][data-y="${y}"]`);
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
          deselectShipInUI(player);
        } else {
          // add gameController method that prompts to select an additional square
        }
      } else {
        // Add gameController method that says the ship can't be placed there and to select a new square.
      }
    }
  }
}

export function attackSquareInUI(x, y, player) {
  if (x < 0 || x > 9 || y < 0 || y > 9) return false;

  player.gameboard.receiveAttack(x, y);

  const gameboard = document.querySelector(`#${player.type}`);
  const attackedSquare = gameboard.querySelector(`.square[data-x="${x}"][data-y="${y}"]`);
  if (player.gameboard.grid[x][y].ship) {
    attackedSquare.classList.remove("ship-placed");
    attackedSquare.classList.add("hit");

    const hangarShips = document.querySelectorAll(".hangar-ship");
    hangarShips.forEach(hangarShip => {
      if (hangarShip.dataset.shipName === player.gameboard.grid[x][y].ship.name) {
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

    // Add next step from gameController for hit or sunk ship
    // checks whether all ships were sunk and announces winner, if so 

  } else {
    attackedSquare.classList.add("miss");

    // updates turn from gameController 
    // announces miss from gameController
  }
}

export function announceNextStepInUI(message) {
  const messageArea = document.querySelector("#message-area");
  messageArea.textContent = message;
}

export function initUIEventListeners(human, computer) {
  addBoardToUI(human);
  addBoardToUI(computer);

  const humanGameboard = document.querySelector("#human");
  const humanNameAndGameboard = humanGameboard.querySelector(".name-and-gameboard");
  const humanSquares = humanNameAndGameboard.querySelectorAll(".square");
  humanSquares.forEach(square => {
    square.addEventListener("mouseover", () => {
      if (square.classList.contains("pre-game") && !square.classList.contains("ship-placed") && human.selectedShip) square.classList.add("square-hover");
    });
    square.addEventListener("mouseout", () => {
      square.classList.remove("square-hover");
    });
    square.addEventListener("mousedown", () => {
      if (square.classList.contains("pre-game") && !square.classList.contains("ship-placed") && human.selectedShip) {
        square.classList.remove("square-hover");
        square.classList.add("square-click");
      }
    });
    square.addEventListener("mouseup", () => {
      if (square.classList.contains("square-click")) {
        square.classList.remove("square-click");
        square.classList.add("square-hover");

        placeShipOnSquareInUI(Number(square.dataset.x), Number(square.dataset.y), human);
        console.log(human);
      }
    });
  });

  const hangarShips = humanGameboard.querySelectorAll(".hangar-ship");
  hangarShips.forEach(hangarShip => {
    const hangarShipSquares = hangarShip.querySelectorAll(".square");
    
    hangarShip.addEventListener("mouseover", () => {
      if (hangarShip.classList.contains("selectable")) {
        hangarShip.classList.add("hangar-ship-hover");
        hangarShipSquares.forEach(hangarShipSquare => {
          hangarShipSquare.classList.add("square-hover");
        });
      }
    });
    hangarShip.addEventListener("mouseout", () => {
      if (!hangarShip.classList.contains("selected")) {
        hangarShip.classList.remove("hangar-ship-hover");
        hangarShipSquares.forEach(hangarShipSquare => {
          hangarShipSquare.classList.remove("square-hover");
        });
      }
    });
    hangarShip.addEventListener("mousedown", () => {
      if (hangarShip.classList.contains("selectable")) {
        hangarShip.classList.remove("hangar-ship-hover");
        hangarShip.classList.add("hangar-ship-click");
        hangarShipSquares.forEach(hangarShipSquare => {
          hangarShipSquare.classList.remove("square-hover");
          hangarShipSquare.classList.add("square-click");
        });
      }
    });
    hangarShip.addEventListener("mouseup", () => {
      if (hangarShip.classList.contains("hangar-ship-click")) {
        hangarShip.classList.remove("hangar-ship-click");
        hangarShip.classList.add("hangar-ship-hover");
        hangarShipSquares.forEach(hangarShipSquare => {
          hangarShipSquare.classList.remove("square-click");
          hangarShipSquare.classList.add("square-hover");
        });

        selectShipInUI(hangarShip.dataset.shipName, human);
      }
    });
  });

  // add logic to make move during game
  const computerGameboard = document.querySelector("#computer");
  const computerNameAndGameboard = computerGameboard.querySelector(".name-and-gameboard");
  const computerSquares = computerNameAndGameboard.querySelectorAll(".square");
  computerSquares.forEach(computerSquare => {
    computerSquare.addEventListener("mouseover", () => {
      if (!computer.gameboard.grid[computerSquare.dataset.x][computerSquare.dataset.y].beenAttacked) computerSquare.classList.add("square-hover");
    });
    computerSquare.addEventListener("mouseout", () => {
      computerSquare.classList.remove("square-hover");
    });
    computerSquare.addEventListener("mousedown", () => {
      if (!computer.gameboard.grid[computerSquare.dataset.x][computerSquare.dataset.y].beenAttacked) {
        computerSquare.classList.remove("square-hover");
        computerSquare.classList.add("square-click");
      }
    });
    computerSquare.addEventListener("mouseup", () => {
      if (computerSquare.classList.contains("square-click")) {
        computerSquare.classList.remove("square-click");
        computerSquare.classList.add("square-hover");

        attackSquareInUI(Number(computerSquare.dataset.x), Number(computerSquare.dataset.y), computer);
      }
    });
  });

  // add logic to change name
  const editNameButtons = document.querySelectorAll(".edit-name");
  editNameButtons.forEach(button => {
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
    });
  });

  // add logic to reset game
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
  });
}

