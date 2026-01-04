// Gameboard class tests

import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

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

describe("Gameboard method tests", () => {
  test("isSquareOpen with empty square", () => {
    const gameboard = new Gameboard();
    expect(gameboard.isSquareOpen(5, 5)).toBe(true);
  });

  test("isSquareOpen with taken square", () => {
    const gameboard = new Gameboard();
    gameboard.grid[5][5].ship = "test ship";
    expect(gameboard.isSquareOpen(5, 5)).toBe(false);
  });

  test("isSquareOpen with taken adjacent square", () => {
    const gameboard = new Gameboard();
    gameboard.grid[4][4].ship = "test ship";
    expect(gameboard.isSquareOpen(5, 5)).toBe(false);
  });

  test("isSquareOpen with grid boundary check", () => {
    const gameboard = new Gameboard();
    expect(gameboard.isSquareOpen(9, 9)).toBe(true);
  });

  test("placeShip returns false when partially placed ship is passed", () => {
    const gameboard = new Gameboard();
    const ship = new Ship("destroyer");
    ship.addSquareToShipPlacement(0, 0, gameboard);
    expect(gameboard.placeShip(ship)).toBe(false);
  });

  test("placeShip places entire ship", () => {
    const gameboard = new Gameboard();
    const ship = new Ship("destroyer");
    ship.addSquareToShipPlacement(0, 0, gameboard);
    ship.addSquareToShipPlacement(1, 0, gameboard);
    gameboard.placeShip(ship);
    expect(gameboard.grid[0][0].ship).toBe(ship);
    expect(gameboard.grid[1][0].ship).toBe(ship);
    expect(gameboard.shipsPlaced).toBe(1);
  });

  test("placeShip changes allShipsPlace status if warranted", () => {
    const gameboard = new Gameboard();
    gameboard.shipsPlaced = 4;
    const ship = new Ship("destroyer");
    ship.addSquareToShipPlacement(0, 0, gameboard);
    ship.addSquareToShipPlacement(1, 0, gameboard);
    gameboard.placeShip(ship);
    expect(gameboard.allShipsPlaced).toBe(true);
  });
});
