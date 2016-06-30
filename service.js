angular
  .module("minesweeper")
  .factory('MinesweeperService',function() {

    var globalGrid;
    var gameState;

    var listeners = [];
    return {
      initGrid: initGrid,
      showSquare: showSquare,
      updateGrid: function(fn) {
        listeners.push(fn)
      }
    }

    function showSquare(square) {
      if(square.mine) {
        gameState = 'LOST';
      }
      var neighbors = squareNeighbors(square,globalGrid);
      recursiveCheck(square,globalGrid,neighbors);
      isVictorious(globalGrid);
      listeners[0](_.clone(globalGrid),gameState);
    }

    function initGrid(opts) {
      var mines = +opts.mines || 99;
      var width = +opts.width || 40;
      var height = +opts.height || 20;
      var grid = [];
      var row;
      var listOfShuffledMines = shuffle(createSquares(mines,width,height));

      for(var i = 0; i < height; i++) {
        row = [];
        for(var j = 0; j < width; j++) {
          var square = listOfShuffledMines.shift();
          square.col = j
          square.row = i
          row.push(square)
        }
        grid.push(row);
      }
      globalGrid = grid;
      return grid;
    };

    function checkMineCount(square,grid) {
      if(square.mineCount > 0) {
        return square.mineCount;
      }
      square.mineCount = 0;
      var columnLocation = square.col;
      var rowLocation = square.row;
      for(var i = columnLocation - 1; i <= columnLocation + 1; i++) {
        for(var j = rowLocation - 1; j <= rowLocation + 1; j++) {
          if(grid[j] && grid[j][i] && grid[j][i].mine) {
            square.mineCount += 1;
          }
        }
      }
      return square.mineCount;
    };

    function Square(mine) {
      this.hidden = true;
      this.mineCount = null;
      this.mine = mine;
    };

    function createSquares(minesWanted, width, height) {
      var list = [];
      for(var i = 0; i < minesWanted; i++) {
        list.push(new Square(true));
      }

      for(var i = 0; i < width * height - minesWanted; i++) {
        list.push(new Square(false));
      }
      return list;
    };

    function recursiveCheck(square,grid) {
      if(square.marked) return;
      var count = checkMineCount(square,grid)
      if(square.mineCount > 0) {
        square.hidden = false;
        return
      }
      if(square.mineCount === 0 && square.hidden === true) {
        square.hidden = false;
        var sqNeighbors = squareNeighbors(square,grid)
        angular.forEach(sqNeighbors,function(newSquare) {
          recursiveCheck(newSquare,grid)
        })
      }
    }

    function squareNeighbors(square,grid) {
      var neighbors = [];
      var columnLocation = square.col;
      var rowLocation = square.row;
      for(var i = columnLocation - 1; i <= columnLocation + 1; i++) {
        for(var j = rowLocation - 1; j <= rowLocation + 1; j++) {
          if(grid[j] && grid[j][i]) {
            neighbors.push(grid[j][i]);
          }
        }
      }
      return neighbors;
    }

    function isVictorious(grid) {
      var flatmappedSquares = _.flatten(grid);
      var shownSquares = flatmappedSquares.filter(function(square) {
        return !square.hidden;
      });
      if(shownSquares.length === (globalGrid.width * globalGrid.height) - globalGrid.mines) {
        gameState = 'WINNER';
      }
    }

    // Borrowed, wanted to use lodash but this was easier.
    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
        return a;
    };

  })
