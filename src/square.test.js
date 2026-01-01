// Square class tests

import { Square } from "./square.js";

describe("Square class", () => {
  test("Initial ship key is null", () => {
    const square = new Square();
    expect(square.ship).toBe(null);
  });

  test("Initial beenAttacked key is false", () => {
    const square = new Square();
    expect(square.beenAttacked).toBe(false);
  });

  test("Attack method updates unattacked square", () => {
    const square = new Square();
    square.attack();
    expect(square.beenAttacked).toBe(true);
  });
});
