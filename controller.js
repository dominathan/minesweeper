angular
  .module("minesweeper")
  .controller("MinesweeperCtrl",function($scope,MinesweeperService) {

    $scope.grid;
    $scope.mines;
    $scope.width;
    $scope.height;
    $scope.gameSettings = {}

    $scope.startGame = function(opts) {
      if(opts) {
        $scope.gameSettings.height = opts.height;
        $scope.gameSettings.width = opts.width;
        $scope.gameSettings.mines = opts.mines;
        $scope.grid = MinesweeperService.initGrid(opts);
      } else {
        $scope.grid = MinesweeperService.initGrid({});
      }
    }

    $scope.$on('game-over',function() {
      $scope.gameOver = true;
    });

    $scope.newGame = function() {
      $scope.gameOver = false;
      $scope.grid = MinesweeperService.initGrid($scope.gameSettings);
    }

    $scope.toggleSquare = function(square) {
      var neighbors = squareNeighbors(square,$scope.grid);
      recursiveCheck(square,$scope.grid,neighbors);
    }

    $scope.toggleFlag = function(sq) {
      if(sq.hidden) {
        sq.marked = !sq.marked;
      }
    }

    function recursiveCheck(square,grid) {
      var count = MinesweeperService.checkMineCount(square,grid)
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
  })
