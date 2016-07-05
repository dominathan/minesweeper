module.exports = {
  bindings: {
    grid: '<'
  },

  template: `
    <form class="form-group" ng-submit="$ctrl.startGame(userGrid)">
      <input class="form-control" type="text" name="name" value="" ng-model="userGrid.mines" placeholder="Number of mines (default: 99)">
      <input class="form-control" type="text" name="name" value="" ng-model="userGrid.width" placeholder="width (default: 40)">
      <input class="form-control" type="text" name="name" value="" ng-model="userGrid.height" placeholder="height (default: 20)">
      <button type="submit" name="button" class="btn btn-lg btn-success">Start Game</button>
    </form>`,

  controller: ['MinesweeperService', controller]
}

function controller(MinesweeperService) {
  var $ctrl = this
  $ctrl.startGame = function (opts) {
    if (opts) {
      $ctrl.grid = MinesweeperService.initGrid(opts)
    } else {
      $ctrl.grid = MinesweeperService.initGrid({})
    }
  }
}
