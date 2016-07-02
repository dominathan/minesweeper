var test = require('tape')
var { template, controller } = require('../../components/app')

var htmlOutput = `
  <nav title='$ctrl.title'></nav>
  <game-settings></game-settings>
  <div class="container">
    <grid ng-hide="$ctrl.state ==='LOST'" grid="$ctrl.grid"></grid>
    <winner state="$ctrl.state"></winner>
    <loser state="$ctrl.state"></loser>
  </div>`

var minesweeperServiceMock = {
  initGrid: function () {
    return [1, 2, 2]
  },
  updateGrid: function () {
    return true
  }
}

test('app template', function (t) {
  t.equals(htmlOutput, template, 'should be equal')
  t.end()
})

test('app controller', function (t) {
  var c = controller[controller.length - 1]
  var ctrl = { }

  c.apply(ctrl, [minesweeperServiceMock])
  t.ok(ctrl.grid, '$ctrl.grid should be set')

  t.deepEquals(ctrl.grid, [1, 2, 2], '$ctrl.grid should equal return value of MinesweeperService')
  t.end()
})
