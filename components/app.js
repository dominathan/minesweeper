
module.exports = {
  bindings: {
    title: '@',
    state: '<'
  },
  template: `
  <nav title='$ctrl.title'></nav>
  <game-settings></game-settings>
  <div class="container">
    <grid ng-hide="$ctrl.state ==='LOST'" grid="$ctrl.grid"></grid>
    <winner state="$ctrl.state"></winner>
    <loser state="$ctrl.state"></loser>
  </div>`,
  controller: ['MinesweeperService', controller]
}

function controller (MinesweeperService) {
  var $ctrl = this
  $ctrl.grid = MinesweeperService.initGrid({})

  MinesweeperService.updateGrid(function (grid, state) {
    $ctrl.grid = grid
    $ctrl.state = state
  })
}
