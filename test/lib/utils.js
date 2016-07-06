var test = require('tape');
var { Square } = require("../../lib/utils")
var { createSquares } = require('../../lib/utils')()

test('should be able to create an array of squares', function(t) {
  t.ok(createSquares, 'should exist')

  var arrayOfSquare = createSquares(2,3,4)
  var mines = arrayOfSquare.filter(function(element) {
    return element.mine
  }).length

  t.equal(arrayOfSquare.length, 12, 'should be of length 12')
  t.equal(mines, 2, 'should have two mines')
  t.end()
})
