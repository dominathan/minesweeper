angular
  .module('minesweeper')
  .directive('squareDirective', function(MinesweeperService) {
    return {
      restrict: 'E',
      template: `<span class='square'>{{mine.mineCount}}</span>`,
      scope: {
        mine: '=square',
        grid: '=grid'
      },
      transclude: true,
      link: function(scope,element,attrs) {
        element.css({
         border: '1px solid red',
         backgroundColor: 'lightgrey',
         cursor: 'finger',
         width: '25px',
         height: '25px',
         display: 'inline-block'
        })
      }
    }
  })
