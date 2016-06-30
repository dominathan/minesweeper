angular
  .module('minesweeper')
  .component('square', {
    bindings: {
      square: '<'
    },

    template: `
      <span class='square' ng-click="$ctrl.toggleSquare($ctrl.square)">{{$ctrl.square.mine ? ' ' : $ctrl.square.mineCount}}</span>
    `,

    controller: function(MinesweeperService) {
      $ctrl = this;

      $ctrl.toggleSquare = function(square) {
        MinesweeperService.showSquare(square);
      }
    }
  })
