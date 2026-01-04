// Ship class tests

import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";

describe("Ship constructor tests", () => {
  test("Length correctly set", () => {
    const ship = new Ship("carrier");
    expect(ship.length).toBe(5);
  });

  test("Hits correctly set", () => {
    const ship = new Ship("carrier");
    expect(ship.hits).toBe(0);
  });

  test("isSunk correctly set", () => {
    const ship = new Ship("carrier");
    expect(ship.isSunk).toBe(false);
  });

  test("shipPlacement correctly set", () => {
    const ship = new Ship("carrier");
    expect(ship.shipPlacement).toEqual([]);
  });

  test("fullyPlaced correctly set", () => {
    const ship = new Ship("carrier");
    expect(ship.fullyPlaced).toBe(false);
  });
});

describe("Ship method tests", () => {
  test("setShipName with battleship", () => {
    const ship = new Ship("battleship");
    expect(ship.name).toBe("battleship");
  });

  test("Hit method correctly increases hits", () => {
    const ship = new Ship("destroyer");
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("Hit method correctly updates isSunk", () => {
    const ship = new Ship("destroyer");
    ship.hit();
    ship.hit();
    expect(ship.isSunk).toBe(true);
  });

  test("checkSunkStatus returns correct status", () => {
    const ship = new Ship("destroyer");
    ship.hit();
    ship.hit();
    expect(ship.checkSunkStatus()).toBe(true);
  });

  test("canShipFitFromSquare returns false if ship can't fit from first square", () => {
    const gameboard = new Gameboard();
    gameboard.grid[0][1].ship = "test";
    gameboard.grid[1][0].ship = "test";
    const ship = new Ship("destroyer");
    expect(ship.canShipFitFromSquare(0, 0, gameboard)).toBe(false);
  });

  test("canShipFitFromSquare returns true if one path from first square", () => {
    const gameboard = new Gameboard();
    gameboard.grid[2][0].ship = "test";
    const ship = new Ship("destroyer");
    expect(ship.canShipFitFromSquare(0, 0, gameboard)).toBe(true);
  });

  test("canShipFitFromSquare returns false if ship can't fit from second square", () => {
    const gameboard = new Gameboard();
    gameboard.grid[2][0].ship = "test";
    const ship = new Ship("destroyer");
    ship.shipPlacement.push([0, 0]);
    expect(ship.canShipFitFromSquare(1, 0, gameboard)).toBe(false);
  });

  test("canShipFitFromSquare returns false with longer ship that won't fit from second square", () => {
    const gameboard = new Gameboard();
    gameboard.grid[3][0].ship = "test";
    const ship = new Ship("submarine");
    ship.shipPlacement.push([0, 0]);
    expect(ship.canShipFitFromSquare(1, 0, gameboard)).toBe(false);
  });

  test("canShipFitFromSquare returns true with one path from second square", () => {
    const gameboard = new Gameboard();
    gameboard.grid[3][0].ship = "test";
    const ship = new Ship("submarine");
    ship.shipPlacement.push([0, 0]);
    expect(ship.canShipFitFromSquare(0, 1, gameboard)).toBe(true);
  });

  test("areShipCoordinatesStraight returns false if coordinates not in straight line", () => {
    const ship = new Ship("submarine");
    ship.shipPlacement.push([0, 0]);
    expect(ship.areShipCoordinatesStraight(5, 5)).toBe(false);
  });

  test("areShipCoordinatesStraight returns false with not-straight coordinates adjacent to starting square", () => {
    const ship = new Ship("submarine");
    ship.shipPlacement.push([0, 0]);
    ship.shipPlacement.push([1, 0]);
    expect(ship.areShipCoordinatesStraight(0, 1)).toBe(false);
  });

  test("areShipCoordinatesStraight returns true when coordinates are straight", () => {
    const ship = new Ship("submarine");
    ship.shipPlacement.push([0, 0]);
    ship.shipPlacement.push([1, 0]);
    expect(ship.areShipCoordinatesStraight(2, 0)).toBe(true);
  });

  test("canShipBePlacedOnSquare returns false with not open square", () => {
    const gameboard = new Gameboard();
    gameboard.grid[1][1].ship = "test";
    const ship = new Ship("destroyer");
    expect(ship.canShipBePlacedOnSquare(0, 0, gameboard)).toBe(false);
  });

  test("canShipBePlacedOnSquare returns false with ship won't fit first square", () => {
    const gameboard = new Gameboard();
    gameboard.grid[2][0].ship = "test";
    gameboard.grid[0][2].ship = "test";
    const ship = new Ship("destroyer");
    expect(ship.canShipBePlacedOnSquare(0, 0, gameboard)).toBe(false);
  });

  test("canShipBePlacedOnSquare returns false with ship won't fit second square", () => {
    const gameboard = new Gameboard();
    gameboard.grid[2][0].ship = "test";
    const ship = new Ship("destroyer");
    ship.shipPlacement.push([0, 0]);
    expect(ship.canShipBePlacedOnSquare(1, 0, gameboard)).toBe(false);
  });

  test("canShipBePlacedOnSquare returns false with not straight coordinates", () => {
    const gameboard = new Gameboard();
    const ship = new Ship("submarine");
    ship.shipPlacement.push([0, 0], [1, 0]);
    expect(ship.canShipBePlacedOnSquare(0, 1, gameboard)).toBe(false);
  });

  test("canShipBePlacedOnSquare returns true when square can be placed", () => {
    const gameboard = new Gameboard();
    gameboard.grid[1][0].ship = "test";
    const ship = new Ship("submarine");
    ship.shipPlacement.push([0, 0], [0, 1]);
    expect(ship.canShipBePlacedOnSquare(0, 2, gameboard)).toBe(true);
  });
});
