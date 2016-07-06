var _ = require('lodash')

var { createSquares, squareNeighbors } = require('../lib/utils')()

module.exports = function () {
  var globalGrid
  var gameState
  var width
  var height
  var mines
  var listeners = []

  return {
    initGrid: initGrid,
    showSquare: showSquare,
    updateGrid: function (fn) {
      listeners.push(fn)
    }
  }

  function initGrid (opts) {
    mines = +opts.mines || 10
    width = +opts.width || 10
    height = +opts.height || 10
    var grid = []
    var row
    var listOfShuffledMines = _.shuffle(createSquares(mines, width, height))
    gameState = 'PRISTINE'
    _.times(height, function (i) {
      row = []
      _.times(width, function (j) {
        var square = listOfShuffledMines.shift()
        square.col = j
        square.row = i
        row.push(square)
      })
      grid.push(row)
    })

    globalGrid = grid
    if (listeners.length) {
      listeners[0](_.clone(globalGrid), gameState)
    }
    return grid
  }

  function checkMineCount (square, grid) {
    if (square.mineCount > 0) {
      return square.mineCount
    }
    square.mineCount = 0

    squareNeighbors(square, grid)
      .map(function (neighbor) {
        if (neighbor.mine) {
          square.mineCount += 1
        }
      })

    return square
  }

  function showSquare (square, grid, firstClick) {
    grid = globalGrid || grid
    if (firstClick && square.mine) {
      gameState = 'LOST'
      listeners[0](_.clone(globalGrid), gameState)
      return
    }

    if (square.mine) {
      return
    }

    if (square.mineCount > 0) {
      square.hidden = false
      return
    }

    if (square.marked || !square.hidden) {
      return
    }

    square.hidden = false
    checkMineCount(square, grid)

    squareNeighbors(square, grid)
      .map(function (sq) {
        return checkMineCount(sq, grid)
      })
      .filter(function (goodSquare) {
        return goodSquare.mineCount === 0 && goodSquare.hidden === true
      })
      .map(function (testThisSquare) {
        showSquare(testThisSquare, grid, false)
      })
  }
}
