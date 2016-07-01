var angular = require('angular')
var _ = require('lodash')

var appStart = require('./components/app.js')
var gameSettings = require('./components/game-settings.js')
var grid = require('./components/grid.js')
var loser = require('./components/loser.js')
var winner = require('./components/winner.js')
var nav = require('./components/nav.js')
var row = require('./components/row')
var square = require('./components/square.js')
var MinesweeperService = require('./services/minesweeper.service.js')
var rightClick = require('./directives/right-click-directive')

angular
  .module('minesweeper', [])
  .service('MinesweeperService', MinesweeperService)
  .component('app', appStart)
  .component('gameSettings', gameSettings)
  .component('grid', grid)
  .component('loser', loser)
  .component('winner', winner)
  .component('row', row)
  .component('nav', nav)
  .component('square', square)
  .directive('ngRightClick', rightClick)
