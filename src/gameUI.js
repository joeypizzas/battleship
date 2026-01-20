// Game UI module

export function addBoardToUI(player) {
  const gameboardsAndHangars = document.querySelector("#gameboards-and-hangars");
  
  const gameboardArea = document.createElement("div");
  gameboardArea.classList.add("gameboard-area");
  if (player.type === "human") gameboardArea.id = "human";
  if (player.type === "computer") gameboardArea.id = "computer";

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
          this.deselectShipInUI(player);
        } else {
          // add gameController method that prompts to select an additional square
        }
      } else {
        // Add gameController method that says the ship can't be placed there and to select a new square.
      }
    }
  }
}

