module.exports = {
  bindings: {
    square: '<'
  },

  template: `
    <span class='square'
          ng-class="{ 'flag': $ctrl.square.marked }"
          ng-right-click="$ctrl.toggleFlag($ctrl.square)"
          ng-click="$ctrl.toggleSquare($ctrl.square)">{{$ctrl.square.mine ? ' ' : $ctrl.square.mineCount}}
    </span>`,

  controller: ['MinesweeperService', controller]
}

function controller (MinesweeperService) {
  const $ctrl = this

  $ctrl.toggleSquare = function (square) {
    MinesweeperService.showSquare(square, null, true)
  }

  $ctrl.toggleFlag = function (sq) {
    if (sq.hidden) {
      sq.marked = !sq.marked
    }
  }
}
