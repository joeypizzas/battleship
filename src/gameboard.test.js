// Gameboard class tests

import { Gameboard } from "./gameboard.js";

describe("Gameboard constructor initalization", () => {
  const gameboard = new Gameboard();

  test("Grid has initial correct square at coordinate (0,0)", () => {
    expect(gameboard.grid[0][0].ship).toBe(null);
    expect(gameboard.grid[0][0].beenAttacked).toBe(false);
  });

  test("Grid has initial correct sqaure at coordinate (5,5)", () => {
    expect(gameboard.grid[5][5].ship).toBe(null);
    expect(gameboard.grid[5][5].beenAttacked).toBe(false);
  });

  test("Grid has initial correct sqaure at coordinate (9,9)", () => {
    expect(gameboard.grid[9][9].ship).toBe(null);
    expect(gameboard.grid[9][9].beenAttacked).toBe(false);
  });

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
