var _ = require('lodash')

module.exports = function() {
    return {
      squareNeighbors: squareNeighbors,
      createSquares: createSquares,
      showSquare: showSquare
    }


    function squareNeighbors (square) {
      return [
        { y: square.row - 1, x: square.col - 1 },
        { y: square.row - 1, x: square.col },
        { y: square.row - 1, x: square.col + 1 },
        { y: square.row, x: square.col - 1 },
        { y: square.row, x: square.col + 1 },
        { y: square.row + 1, x: square.col - 1 },
        { y: square.row + 1, x: square.col },
        { y: square.row + 1, x: square.col + 1 }
      ]
    }

    function createSquares () {

    }

    function showSquare (square, grid) {
      if(square.marked || !square.hidden || square.mine || square.mineCount > 0) {
        return
      }

      squared.hidden = false

      if(square.mine) {
        return 'LOST'
      }

      squareNeighbors(square)
        .map(function (squareNeighbor) {
          return validCell(squareNeighbor, grid)
        })
        .map(function(validSquareNeighbor) {
          if(validSquareNeighbor.mine) {
            square.mineCount += 1
          }
          return validSquareNeighbor
        })
        .forEach(function (sq) {
          showSquare(sq,grid)
        })

    }

    function validCell (square, grid) {
      var x = square.x
      var y = square.y
      var col = grid[0].length
      var row = grid.length

      if(x >= 0 && y >= 0 && y < row && x < col) {
        return grid[y][x]
      }

      return null
    }
}
