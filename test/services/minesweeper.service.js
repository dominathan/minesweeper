var test = require('tape')
var _ = require('lodash');
var MinesweeperService = require('../../services/minesweeper.service')(_)

test('MinesweeperService', function (t) {
  t.ok(MinesweeperService.initGrid, 'should initialize Minesweeper grid')
  t.ok(MinesweeperService.showSquare, ' should have method showSquare')
  t.ok(MinesweeperService.updateGrid, ' should have method updateGrid ')


  var grid = MinesweeperService.initGrid({mines: 8, width: 10, height: 9})

  t.equals(grid.length, 9, 'should have 9 rows')
  t.equals(grid[0].length, 10, 'should have 10 columns')

  var mineCount = _.flatten(grid).filter(function (sq) {
    return sq.mine === true
  }).length

  t.equals(mineCount, 8, 'should have 8 mines')

  t.end()
})




// var test = require('tape')
//
// var msSvc = require('../../services/ms-svc')
// var underscore = require('underscore')
// var ramda = require('ramda')
//
// var svc = msSvc(ramda, underscore)
//
// test('minesweeper service', t => {
//   t.ok(svc.createBoard, 'should have createBoard')
//   t.ok(svc.openCell, 'should have openCell')
//   t.ok(svc.update, 'should have update')
//
//   var board = svc.createBoard(10, 10, 15)
//
//   t.equals(board.length, 10, 'should have 10 rows')
//   t.equals(board[0].length, 10, 'should have 10 cols')
//   svc.update(function (board) {
//     t.ok(true, 'update should be called')
//   })
//
//   t.equals(board[5][5].state, 0, 'should be closed')
//   svc.openCell(board[5][5])
//   t.equals(board[5][5].state, 1, 'should be open')
//   t.end()
// })
