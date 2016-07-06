var _ = require('lodash')
var Square = require('./square')

module.exports = function() {
    return {
      squareNeighbors: squareNeighbors,
      createSquares: createSquares,
      testSquare: testSquare,
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
      ].map(function(element) {
        return validCell(element, grid)
      }).filter(function(element) {
        return !!element
      })
    }

    function createSquares (minesWanted, width, height) {
      return _.flatten(
        _.times(minesWanted,function(mineSquare) {
          return [new Square(true)]
        })
        .concat(_.times((width * height - minesWanted),function(element) {
            return [new Square(false)]
          })
        )
      )
    }

    function validCell (square, grid) {
      var x = square.col
      var y = square.row
      var col = grid[0].length
      var row = grid.length

      if(x >= 0 && y >= 0 && y < row && x < col) {
        return grid[y][x]
      }

      return null
    }

    function testSquare (square, grid) {
      if(square.marked) {
        return
      }

      if(square.mine) {
        return "LOST"
      }

      if (square.mineCount > 0) {
        square.hidden = false
        return
      }

      squareNeighbors(square,grid)
        .map(function(neighbor) {
          square.mineCount = square.mineCount + 1 || 1
          return neighbor
        })
        .filter(function(square) {
          return square.mineCount === 0 && square.hidden === true
        })
        .map(function(square) {
          square.hidden = false
          testSquare(square,grid)
        })
    }

}
