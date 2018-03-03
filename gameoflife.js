var sleep = require('sleep');

main();

/**
 * Load or generate a grid and run the game loop
 */
function main()
{
    var grid;
    var n = 10;
    var period = 1000;

    // Load a grid if a filename is supplied, else generate a random one
    if(process.argv[2])
        grid = readGrid(process.argv[2]);
    else
        grid = generateGrid(n);

    while(true)
    {
        // Print the current state of the grid then evolve and pause
        printGrid(grid);
        grid = evolveGrid(grid);
        sleep.msleep(period);
    }
}

/**
 * Evolve each cell of the grid and return the updated version
 */
function evolveGrid(grid)
{
    // Create a deep copy of the grid's values
    var newGrid = [];
    for(row = 0; row < grid.length; row++)
    {
        // Use slice() to copy the array values, not just a reference to each row
        newGrid.push(grid[row].slice());
    }

    // Loop over each cell
    for(row = 0; row < grid.length; row++)
    {
        for(col = 0; col < grid[row].length; col++)
        {
            // Get the number of neighbours for this cell
            var neighbours = countNeighbours(grid, {'row': row, 'col': col});

            if(neighbours < 2 || neighbours > 3)
            {
                // If underpopulated or overcrowded, kill the cell
                newGrid[row][col] = false;
            }
            else if(neighbours == 3)
            {
                // If exactly 3 neighbours, make/keep the cell alive
                newGrid[row][col] = true;
            }
            // Otherwise, the cell keeps its state
        }
    }
    return newGrid;
}

/**
 * Print the state of the grid to the console
 */
function printGrid(grid)
{
    process.stdout.write('\n');

    for(row = 0; row < grid.length; row++)
    {
        for(col = 0; col < grid[row].length; col++)
        {
            process.stdout.write(grid[row][col] ? 'O' : '-');
        }
        process.stdout.write('\n');
    }
}

/**
 * Read a seed grid from a given text file, of lines of 0 and 1
 */
function readGrid(file)
{
    // TODO read file

    return [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0]
    ];
}

/**
 * Generate a random n x n seed grid
 */
function generateGrid(n)
{
    var grid = [];

    for(row = 0; row < n; row++)
    {
        var newRow = [];

        for(col = 0; col < n; col++)
        {
            // Add a random boolean
            newRow.push(Math.random() >= 0.5);
        }
        grid.push(newRow);
    }
    return grid;
}

/**
 * Count the number of neighbours of a cell, including diagonals and excluding itself
 */
function countNeighbours(grid, cell)
{
    var count = 0;

    // Loop over the 3x3 area centred on the given cell
    for(rowN = cell.row-1; rowN <= cell.row+1; rowN++)
    {
        // Ignore rows outside the grid boundaries
        if(rowN >= 0 && rowN < grid.length)
        {
            for(colN = cell.col-1; colN <= cell.col+1; colN++)
            {
                // If the cell is not the given cell and the neighbour is alive, increment the count
                if(!(rowN == cell.row && colN == cell.col) && grid[rowN][colN])
                    count++;
            }
        }
    }
    return count;
}