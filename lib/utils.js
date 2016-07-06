var _ = require('lodash')
var Square = require('./square')

module.exports = function () {
  return {
    squareNeighbors: squareNeighbors,
    createSquares: createSquares,
    validCell: validCell
  }

  function squareNeighbors (square, grid) {
    return [
      { row: square.row - 1, col: square.col - 1 },
      { row: square.row - 1, col: square.col },
      { row: square.row - 1, col: square.col + 1 },
      { row: square.row, col: square.col - 1 },
      { row: square.row, col: square.col + 1 },
      { row: square.row + 1, col: square.col - 1 },
      { row: square.row + 1, col: square.col },
      { row: square.row + 1, col: square.col + 1 }
    ].map(function (element) {
      return validCell(element, grid)
    }).filter(function (element) {
      return !!element
    })
  }

  function createSquares (minesWanted, width, height) {
    return _.flatten(
      _.times(minesWanted, function (mineSquare) {
        return [new Square(true)]
      })
      .concat(_.times((width * height - minesWanted), function (element) {
        return [new Square(false)]
      }))
    )
  }

  function validCell (square, grid) {
    var x = square.col
    var y = square.row
    var col = grid[0].length
    var row = grid.length

    if (x >= 0 && y >= 0 && y < row && x < col) {
      return grid[y][x]
    }

    return null
  }
}
