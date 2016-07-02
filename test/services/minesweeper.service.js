var test = require('tape')
var _ = require('lodash')
var MinesweeperService = require('../../services/minesweeper.service')

test('MinesweeperService', function (t) {
  var msSvc = MinesweeperService()
  t.ok(msSvc.initGrid, 'should initialize Minesweeper grid')
  t.ok(msSvc.showSquare, ' should have method showSquare')
  t.ok(msSvc.updateGrid, ' should have method updateGrid ')

  var grid = msSvc.initGrid({mines: 8, width: 10, height: 9})
  t.equals(grid.length, 9, 'should have 9 rows')
  t.equals(grid[0].length, 10, 'should have 10 columns')

  var mineCount = _.flatten(grid).filter(function (sq) {
    return sq.mine === true
  }).length
  t.equals(mineCount, 8, 'should have 8 mines')

  // what about internal functions of minesweeper service?

  t.end()
})
