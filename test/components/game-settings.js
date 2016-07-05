var test = require('tape')
var {template, controller} = require('../../components/game-settings')

var htmlTemplate = `
    <form class="form-group" ng-submit="$ctrl.startGame(userGrid)">
      <input class="form-control" type="text" name="name" value="" ng-model="userGrid.mines" placeholder="Number of mines (default: 99)">
      <input class="form-control" type="text" name="name" value="" ng-model="userGrid.width" placeholder="width (default: 40)">
      <input class="form-control" type="text" name="name" value="" ng-model="userGrid.height" placeholder="height (default: 20)">
      <button type="submit" name="button" class="btn btn-lg btn-success">Start Game</button>
    </form>`

var userOptions = {
  width: 10,
  height: 9,
  mine: 3
}

var fakeMss = {
  initGrid: function (opts) {
    return [opts.height || 20, opts.width || 40, opts.mine || 30]
  }
}

test('Game Settings Component', function (t) {
  t.equals(htmlTemplate, template, 'should have the correct html generated')
  t.end()
})

test('game-settings controller', function (t) {
  var c = controller[controller.length - 1]
  var ctrl = { }

  c.apply(ctrl, [fakeMss])

  t.ok(ctrl.startGame, '$ctrl.startGame should work')

  ctrl.startGame()
  t.deepEquals(ctrl.grid, [20, 40, 30], 'should initialize a grid with default values if none are supplied by the user')

  ctrl.startGame(userOptions)
  t.deepEquals(ctrl.grid, [9, 10, 3], 'should initialize a grid with user options')

  t.end()
})
