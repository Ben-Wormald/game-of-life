# game-of-life

JavaScript implementation of Conway's Game of Life

## Usage

Requires Node.js and NPM. To install the required dependencies:

```
npm install
```

To run with a randomly generated seed grid:

```
node gameoflife.js
```

To run with a custom seed grid:

```
node gameoflife.js beacon.txt
```

## Custom seed grids

Custom seed grids should be a plain text file using 0 and 1 for dead and living cells respectively. Line breaks are used to separate rows. For example:

```
000000
011000
011000
000110
000110
000000
```

[This article](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns) gives examples of some common patterns that can be used to test the game.