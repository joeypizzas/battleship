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
      if (player.type === "human" && player.gameboard[r][c].ship && player.gameboard[r][c].beenAttacked) square.classList.add("hit");
      if (player.type === "human" && !player.gameboard[r][c].ship && player.gameboard[r][c].beenAttacked) square.classList.add("miss");
      if (player.type === "human" && player.gameboard[r][c].ship && !player.gameboard[r][c].beenAttacked) square.classList.add("ship-placed");
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
