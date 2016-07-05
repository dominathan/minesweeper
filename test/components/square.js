var test = require('tape')
var { template, controller } = require('../../components/square')

var htmlOutput = `
    <span class='square'
          ng-class="{ 'flag': $ctrl.square.marked }"
          ng-right-click="$ctrl.toggleFlag($ctrl.square)"
          ng-click="$ctrl.toggleSquare($ctrl.square)">{{$ctrl.square.mine ? ' ' : $ctrl.square.mineCount}}
    </span>`

test('square template', function (t) {
  t.equals(htmlOutput, template, 'should be equal')
  t.end()
})

var fakeMss = {
  showSquare: function(square) {
    return square.hidden = false
  }
}

test('square controller', function (t) {
  var c = controller[controller.length - 1]
  var ctrl = { }

  c.apply(ctrl, [fakeMss])
  t.ok(ctrl.toggleSquare, '$ctrl.toggleSquare should work')
  t.ok(ctrl.toggleFlag, '$ctrl.toggleFlag should work')

  var unmarkedSquare = {
    hidden: true,
    marked: false
  }

  ctrl.toggleFlag(unmarkedSquare)
  t.deepEquals(unmarkedSquare.marked, true, '$ctrl.toggleFlag makes the marked = true ')

  ctrl.toggleSquare(unmarkedSquare)
  t.deepEquals(unmarkedSquare.hidden, false, '$ctrl.toggleSquare make the square visible')
  t.end()
})
