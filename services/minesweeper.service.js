var _ = require('lodash')

var Square = require('../lib/square')
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
    showSquare: testSquare,
    updateGrid: function (fn) {
      listeners.push(fn)
    }
  }

  function showSquare (square) {
    if (square.marked) return
    if (square.mine) {
      gameState = 'LOST'
    }
    var neighbors = squareNeighbors(square, globalGrid)
    recursiveCheck(square, globalGrid, neighbors)
    isVictorious(globalGrid)
    listeners[0](_.clone(globalGrid), gameState)
  }

  function initGrid (opts) {
    mines = +opts.mines || 99
    width = +opts.width || 40
    height = +opts.height || 20
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

    squareNeighbors(square,grid)
      .map(function(neighbor) {
        if(neighbor.mine) {
          square.mineCount += 1
        }
      })

    return square
  }

  function recursiveCheck (square, grid) {
    if (square.marked) return
    checkMineCount(square, grid)
    if (square.mineCount > 0) {
      square.hidden = false
      return
    }
    if (square.mineCount === 0 && square.hidden === true) {
      square.hidden = false
      var sqNeighbors = squareNeighbors(square, grid)
      sqNeighbors.forEach(function (newSquare) {
        recursiveCheck(newSquare, grid)
      })
    }
  }

  function isVictorious (grid) {
    var flatmappedSquares = _.flatten(grid)
    var shownSquares = flatmappedSquares.filter(function (square) {
      return !square.hidden
    })
    if (shownSquares.length === (width * height) - mines) {
      gameState = 'WINNER'
    }
  }

  function testSquare (square, grid) {
    grid = globalGrid || grid
    if (square.marked || !square.hidden) {
      return
    }

    if (square.mineCount > 0) {
      square.hidden = false
      return
    }

    if (square.mine) {
      gameState = "LOST"
      return
    }

    square.hidden = false

    squareNeighbors(square,grid)
      .map(function(sq) {
        return checkMineCount(sq,grid)
      })
      .filter(function(goodSquare) {
        console.log("ALL NEIGHBORS", goodSquare)
        return goodSquare.mineCount === 0 && goodSquare.hidden === true
      })
      .map(function(testThisSquare) {
        console.log("FILTERED NEIGHBORS", testThisSquare)
        testSquare(testThisSquare,grid)
      })
  }
}
