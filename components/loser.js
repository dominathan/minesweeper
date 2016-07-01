module.exports = {
  bindings: {
    state: '<'
  },

  template: `
    <div ng-show="$ctrl.state === 'LOST'">
      <h2>You lose.  Play again?</h2>
      <button type="button" name="button" class="btn btn-lg btn-primary" ng-click="$ctrl.newGame()">Play Again</button>
    </div>
  `,

  controller: function (MinesweeperService) {
    var $ctrl = this

    $ctrl.newGame = function () {
      MinesweeperService.initGrid({})
    }
  }
}
