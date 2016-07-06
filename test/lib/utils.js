var test = require('tape')
var { createSquares, validCell, squareNeighbors } = require('../../lib/utils')()

var mockGrid = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']]

var validMockSquare = {
  col: 2,
  row: 2
}

var invalidMockSquare = {
  col: -1,
  row: 1
}

var invalidMockSquare2 = {
  col: 5,
  row: 5
}

test('should be able to create an array of squares', function (t) {
  t.ok(createSquares, 'should exist')

  var arrayOfSquare = createSquares(2, 3, 4)
  var mines = arrayOfSquare.filter(function (element) {
    return element.mine
  }).length

  t.equal(arrayOfSquare.length, 12, 'should be of length 12')
  t.equal(mines, 2, 'should have two mines')
  t.end()
})

test('should be able to test whether a cell is valid (on the grid)', function (t) {
  t.ok(validCell, 'should exist')
  t.equal(validCell(validMockSquare, mockGrid), 'i', 'should return the value at location')
  t.equal(validCell(invalidMockSquare, mockGrid), null, 'shuold return null for invalid squares with negative numbers')
  t.equal(validCell(invalidMockSquare2, mockGrid), null, 'should return null for squares with location outside')

  t.end()
})

test('squareNeighbors', function (t) {
  t.ok(squareNeighbors, 'should exist')

  t.deepEquals(squareNeighbors(validMockSquare, mockGrid), ['e', 'f', 'h'])
  t.deepEquals(squareNeighbors({col: 1, row: 1}, mockGrid), ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'i'])

  t.end()
})
