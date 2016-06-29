angular
  .module("minesweeper")
  .controller("MinesweeperCtrl",function($scope,MinesweeperService) {

    $scope.grid = MinesweeperService.initGrid({});
    
  })
