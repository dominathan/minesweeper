
const angular = angular
  .module('minesweeper')
  .component('app', {
    bindings: {
      title: '@',
      state: '<'
    },
    template: `
      <nav title='$ctrl.title'></nav>
      <div class="container">
        <grid ng-hide="$ctrl.state ==='LOST'" grid="$ctrl.grid"></grid>
        <winner state="$ctrl.state"></winner>
        <loser state="$ctrl.state"></loser>
      </div>
    `,
    controller: ['MinesweeperService', '$scope', controller]
  })

function controller (MinesweeperService, $scope) {
  var $ctrl = this
  $ctrl.grid = MinesweeperService.initGrid({})

  MinesweeperService.updateGrid(function (grid, state) {
    $ctrl.grid = grid
    $ctrl.state = state
  })
}
