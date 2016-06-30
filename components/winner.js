angular
  .module('minesweeper')
  .component('winner',{
    bindings: {
      state: '<'
    },

    template: `
      <div ng-show="$ctrl.winner">
        <h2>WINNER!! Play again?</h2>
        <button type="button" name="button" class="btn btn-lg btn-primary" ng-click="newGame()">Play Again</button>
      </div>
    `,

    controller: function() {
      $ctrl = this;
      $ctrl.winner = false

      if($ctrl.state === "WINNER") {
        $ctrl.winner = true;
      }
      $ctrl.newGame = function() {

      }
    }
  })
