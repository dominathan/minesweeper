angular
  .module("minesweeper")
  .controller("MinesweeperCtrl",function($scope,MinesweeperService) {

    $scope.grid = MinesweeperService.initGrid({});
    $scope.toggleSquare = function(square) {
      var neighbors = squareNeighbors(square,$scope.grid);
      recursiveCheck(square,$scope.grid,neighbors)
    }
    $scope.toggleFlag = function(square) {
      console.log("FLAG")
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
      var neighbors = []
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
