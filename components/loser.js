angular
  .module('minesweeper')
  .component('loser',{
    bindings: {
      state: '<',
    },

    template: `
      <div ng-show="$ctrl.state">
        <h2>You lose.  Play again?</h2>
        <button type="button" name="button" class="btn btn-lg btn-primary" ng-click="$ctrl.newGame()">Play Again</button>
      </div>
    `,

    controller: function(MinesweeperService,$scope) {
      $ctrl = this;

      console.log("$CTRL STATE", $ctrl.state)

      $ctrl.newGame = function() {

      }


    }
  })
