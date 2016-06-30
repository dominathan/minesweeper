const angular = angular
  .module('minesweeper')
  .component('gameSettings', {
    bindings: {
      grid: '<'
    },

    template: `
      <form class="form-group" ng-submit="startGame(userGrid)">
        <input class="form-control" type="text" name="name" value="" ng-model="userGrid.mines" placeholder="Number of mines (default: 99)">
        <input class="form-control" type="text" name="name" value="" ng-model="userGrid.width" placeholder="width (default: 40)">
        <input class="form-control" type="text" name="name" value="" ng-model="userGrid.height" placeholder="height (default: 20)">
        <button type="submit" name="button" class="btn btn-lg btn-success">Start Game</button>
      </form>
    `,

    controller: function () {

    }
  })
