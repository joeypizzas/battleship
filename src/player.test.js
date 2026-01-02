// Player class tests

import { Player } from "./player.js";

describe("Player class tests", () => {
  test("Name initially correctly set", () => {
    const player = new Player("Joey Pizzas");
    expect(player.name).toBe("Joey Pizzas");
  });

  test("Gameboard grid correctly instantiated to player", () => {
    const player = new Player("test");
    expect(player.gameboard.grid[0][0].ship).toBe(null);
  });

  test("Player gameboard initially has no ships placed", () => {
    const player = new Player("test");
    expect(player.gameboard.shipsPlaced).toBe(0);
  });

  test("Update name changes name key", () => {
    const player = new Player("Joey Pizzas");
    player.updateName("Joseph Pizzas");
    expect(player.name).toBe("Joseph Pizzas");
  });
});
