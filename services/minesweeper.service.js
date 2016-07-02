var _ = require('lodash')

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

  function showSquare (square) {
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
    var columnLocation = square.col
    var rowLocation = square.row

    for (var i = columnLocation - 1; i <= columnLocation + 1; i++) {
      for (var j = rowLocation - 1; j <= rowLocation + 1; j++) {
        if (grid[j] && grid[j][i] && grid[j][i].mine) {
          square.mineCount += 1
        }
      }
    }

    return square.mineCount
  }

  function Square (mine) {
    this.hidden = true
    this.mineCount = null
    this.mine = mine
    this.marked = false
    this.col = null
    this.row = null
  }

  function createSquares (minesWanted, width, height) {
    var list = []
    for (var i = 0; i < minesWanted; i++) {
      list.push(new Square(true))
    }

    for (i = 0; i < width * height - minesWanted; i++) {
      list.push(new Square(false))
    }
    return list
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

  function squareNeighbors (square, grid) {
    var neighbors = []
    var columnLocation = square.col
    var rowLocation = square.row
    for (var i = columnLocation - 1; i <= columnLocation + 1; i++) {
      for (var j = rowLocation - 1; j <= rowLocation + 1; j++) {
        if (grid[j] && grid[j][i]) {
          neighbors.push(grid[j][i])
        }
      }
    }
    return neighbors
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
}