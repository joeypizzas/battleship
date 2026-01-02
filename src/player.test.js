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

  test("Player ships correctly created", () => {
    const player = new Player("test");
    expect(player.ships[0].name).toBe("destroyer");
    expect(player.ships[1].name).toBe("submarine");
    expect(player.ships[2].name).toBe("cruiser");
    expect(player.ships[3].name).toBe("battleship");
    expect(player.ships[4].name).toBe("carrier");
  });

  test("Update name changes name key", () => {
    const player = new Player("Joey Pizzas");
    player.updateName("Joseph Pizzas");
    expect(player.name).toBe("Joseph Pizzas");
  });
});
