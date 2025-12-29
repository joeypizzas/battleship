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
- Color scheme:
  -

## How do you plan to design the application state?

## How do you plan to organize your project files?

## What inputs will your program have? Will the user enter data or will you get input from somewhere else?

## Given your inputs, what are the steps necessary to return the desired output?
