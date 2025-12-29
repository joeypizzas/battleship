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
    - PlacementSquares, initially set to empty array.
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
    - addPlacementSquare(x-coordinate, y-coordinate):
      - Creates square array and pushes x and y coordinate to it.
      - Pushes that array to PlacementSquares array to track whether ship has been entirely or partially placed and where.
    - isFullyPlaced():
      - Checks whether ship is fully placed based on length of ship and length of PlacementSquares array.
      - If yes, updates fullyPlaced key to true and returns true.
      - Else, return false.
- Gameboard class:
  - Constructor:
    - grid. Set to createGrid method call.
  - Methods:
    - createGrid():
      - Initialize 10x10 2d grid array.
      - Set each square to null.
      - Return grid array.
    - placeShip(ship, x-coordinate, y-coordinate):
      - Tries to place part of a ship in an individual square.
      - ship param is an object previously created via the ship constructor.
      - x and y coordinate params are square where part of ship wants to be placed.
      - **Not necessary to guard against invalid coordinates because coordinates will come from user click on grid in UI.**
      - Invokes isValidMove(ship, x-coordinate, y-coordinate).
        - If true, sets grid square to that ship object and return true.
        - Else, return false.
    - isValidMove(ship, x-coordinate, y-coordinate):
      - Determines whether part of a ship can be placed in a specific square on the grid.
      -

## How do you plan to organize your project files?

- ship.js
- ship.test.js
- gameboard.js
- gameboard.test.js

## What inputs will your program have? Will the user enter data or will you get input from somewhere else?

## Given your inputs, what are the steps necessary to return the desired output?
