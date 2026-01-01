// Gameboard class tests

import { Gameboard } from "./gameboard.js";

describe("Gameboard constructor initalization", () => {
  const gameboard = new Gameboard();
  test("shipsSunk is initially 0", () => {
    expect(gameboard.shipsSunk).toBe(0);
  });

  test("shipsPlaced is initially 0", () => {
    expect(gameboard.shipsPlaced).toBe(0);
  });

  test("allShipsSunk is initially false", () => {
    expect(gameboard.allShipsSunk).toBe(false);
  });

  test("allShipsPlaced is initially false", () => {
    expect(gameboard.allShipsPlaced).toBe(false);
  });
});
