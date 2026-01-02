// Ship class tests

import { Ship } from "./ship.js";

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
});
