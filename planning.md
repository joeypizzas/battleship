# Battleship planning

## Does your program have a user interface? What will it look like? What functionality will the interface have?

- Three main UI sections:
  - Header:
    - Title.
  - Game area:
    - Instruction area at the top.
    - Differs based on whether pre-game or game in progress.
    - Before game, one board for placing ships and ships section where you select your ship type and then select it's placement on the board after.
    - During game, two game boards. Player's on the left with their ship placement. Computer on the right with no ships. Both show hits and misses. Both gameboards have section that shows ships and what hits they've taken.
    - Instruction area specifics:
      - Box with the next steps. Either player or computer move, player initially setting ships, or winner/loser.
      - To the right of that, player name with a change name button.
      - Reset game button to the right of the change name button.
    - Gameboard section specifics:
      - Each gameboard is a 10x10 grid.
      - Above the grid x axis, show letters A-J. To the left of the grid Y axis, show numbers 1-10 descending. These are the ship placement and move coordinates.
      - Below each grid is another container that shows the ships:
        - One of each of the following: carrier (5), battleship (4), cruiser (3), submarine (3), and destroyer (2). Either represented with icons of each ship OR just the square length and a name.
    - Pre-game specifics:
      - Only one game board during pre-game selection. It's centered, but small enough to comfortably fit a second on the screen (because there will be a second as soon as the game starts.)
      - During placement phase, the player will be insructed to select ships, then click the number of squares on the grid in the direction they want to place the ship. There will be error handling related to this for illegal moves. Lighting up the square is probably easiest.
      - The ships section will indicate when a ship has been selected and when it's been placed. It will also continue to show during the game to highlight hits that the player and enemy ships have received.
      - Valid ship placements are horizontally or vertically on the board. Only restriction is there must be an empty square between each ship.
      - Once all ships have been placed, the computer's ships will be randomly placed, and the instructions will tell the player to make the first move.
      - There will be no explicit instruction for the player to change their name during the pre-game phase. They can do it before or during the game, at any time.
    - During game specifics:
      - When game starts, a second board is added to the screen, for the computer. It's initially blank (because you can't see the computer's ships). There is also a ship container beneath it to indicate hits.
      - Player always goes first, before computer.
      - Player selects a square on grid to make an attack. Hits are indicated on the board, either with some kind of icon or changing the color. Misses are the same, but with a different color, likely red.
      - Instructions share whether it was a hit or miss and then whether you need to make another pick or if it's the computer's turn. To make the computer's turn believable, I'll want to add a 5s delay for each computer turn.
      - If either player gets a hit, they get to continue making attacks until they get a miss.
    - Button specifics:
      - Change name button opens centered modal to change the name. Can be clicked at any time.
      - Reset game can also be clicked at any time.
      - Once a ship has been selected, it must be placed. No de-selecting it and selecting another for simplicity.
  - Footer:
    - Author attribution.

## How do you plan to design the application state?

- Ship class:
  - Constructor:
    - length (passed as parameter).
    - Number of times hit (initially 0).
    - Whether they've been sunk (initially false).
    - Name. Set to setShipName method call with length as parameter.
    - shipPlacement, initially set to empty array.
    - fullyPlaced: set initially to false.
  - Methods:
    - setShipName(length):
      - returns ship name based on length.
    - hit():
      - increases hit key.
    - isSunk():
      - Checks whether ship is sunk based on number of hits.
      - If yes, updates sunk key and returns true.
      - Otherwise, return false.
    - canShipFitFromSquare(x-coordinate, y-coordinate):
      - Verifies full ship can fit in at least one direction from starting square OR a chosen direction on second sqaure.
      - If ship.shipPlacement.length === 0:
        - For loop checking checking each of the 4 directions, either incrementing or decrementing x OR incrementing or decrementing y. Loop size is based on the ship length - 1 (factoring in the starting square).
          - If (!gameboard.isSquareOpen OR whatever coordinate direction is changing is one of <= 0 or => 9 (depends on if incrementing or decrementing) AND x < ship length - 1), break the loop.
          - If get to to the last item in the loop without breaking, return true inside of the loop.
          - Repeat loops with the other 3 directions.
        - Return false outside of the last for loop.
      - If ship.shipPlacement.length === 1:
        - If x coordinate param === x coordindate of first stored coordindate of ship.shipPlacement:
          - if y coordindate param > y coordinate of first stored coordindate:
            - for loop checking intended direction of second square. Loop size is based on ship length - 2 (factoring in that this is the second square being placed).
            - If (!gameboard.isSquareOpen OR y coordinate is > 9 AND y < ship length - 2), return false.
          - if y coordindate param < y coordinate of first stored coordindate:
            for loop checking intended direction of second square. Loop size is based on ship length - 2 (factoring in that this is the second square being placed).
            If (!gameboard.isSquareOpen OR y coordinate is < 0 AND y < ship length - 2), return false.
        - If y coordinate param === y coordinate of first stored square:
          - Use the same logic as for y coordindate changing but changed to X.
        - Return true.
    - areShipCoordinatesStraight(x-coordinate, y-coordindate):
      - Verifies whether ship coordinates follow a straight line, factoring in the new proposed square.
      - Takes x and y coordinate params for proposed square placement.
      - Return true if ship.shipPlacement.length === 0 because this is the ship's first square.
      - If x coordinate param === x coordindate of first stored coordindate of ship.shipPlacement:
        - Create a new array and run a for..of loop on the y coordinates of ship.ShipPlacement.
        - Run Array sort method on the new array to sort them.
        - Return true if y coordinate param is one less smallest number in sorted array or one greater than largest in sorted array.
      - If y coordindate param === y coordinate of first stored coordinate of ship.shipPlacement:
        - Create a new array and run a for...of loop in the x coordindates of ship.ShipPlacement.
        - Run Array sort method on the new array to sort them.
        - Return true if x coordinate param is one less smallest number in sorted array or one greater than largest in sorted array.
      - Return false.
    - canShipBePlacedOnSquare(x-coordinate, y-coordinate):
      - Takes x and y coordinate params for proposed square placement.
      - Returns false if gameboard.isSquareOpen returns false.
      - Returns false if ship.shipPlacement.length === 0 && ship.canShipFitFromSquare is false.
      - Returns false if ship.shipPlacement.length === 1 && ship.canShipFitFromSquare is false.
      - Returns false if ship.areShipCoordinatesStraight returns false.
      - Return true.
    - addSquareToShipPlacement(x-coordinate, y-coordinate):
      - pushes array of x and y coordinate param to shipPlacement key array.
    - isShipFullyPlaced():
      - Checks whether shipPlacement.length === ship.length. If so, sets fullyPlaced to true and returns true.
      - Else, returns false.
- Gameboard class:
  - Constructor:
    - grid. Set to createGrid method call.
    - shipsSunk: initially set to 0.
    - shipsPlaced: initially set to 0.
    - allShipsSunk: initially false.
    - allShipsPlaced: initially false.
  - Methods:
    - createGrid():
      - Initialize 10x10 2d grid array.
      - Set each square to null.
      - Return grid array.
    - isSquareOpen(x-coordinate, y-coordinate):
      - Determines whether a square is open for any ship placement.
      - If grid array at x and y coordindate params is not null, return false.
      - Double nested loop with offsets.
        - Both for loops begin at -1 and go to 1, inclusive.
        - Check if the offsets are both 0, if so invokes continue statement to skip.
        - Sets two neighbor variables to x and y coordinate variables + the offset from loops.
        - Checks whether neighbor variables are < 0 OR > 9. If so, invokes continue statement to skip.
        - Checks whether grid array at neighborX and neighborY coordinates is not null, and returns false, if so.
      - Returns true after the loop.
    - placeShip(ship):
      - Places full ship on board. Takes the full ship object as parameter. This method will only be called when a ship's placement is fully proposed, meaning each placement has been vetted.
      - For...of loop with squares from the ship.shipPlacement array.
      - For each square, updates the relevant square on the grid with the entire ship object. The entire object is stored there so when the square is attacked, it's easy to call the method to record the hit.
      - increments shipsPlaced key.
      - If shipsPlaced === 5, sets allShipsPlaced to true.
    - **receiveAttack**:
- Square class:
  - Constructor:
    - ship key, initially null. Set to ship object when ship is placed on the square.
    - beenAttacked, initially set top false.
  - Methods:
    - attack():
      - No params.
      - If !square.beenAttacked, set beenAttacked to true.
  - **Update other on ship and gameboard to account for this new class**

## How do you plan to organize your project files?

- ship.js
- ship.test.js
- gameboard.js
- gameboard.test.js
- square.js
- square.test.js

## What inputs will your program have? Will the user enter data or will you get input from somewhere else?

## Given your inputs, what are the steps necessary to return the desired output?
