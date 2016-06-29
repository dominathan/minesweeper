angular
  .module('minesweeper')
  .directive('squareDirective', function(MinesweeperService) {
    return {
      restrict: 'E',
      template: `<span class='square hidden'>{{ mine.mine ? 'X' : 'O' }}</span>`,
      scope: {
        mine: '=square'
      },
      link: function(scope,element,attrs) {
        element.css({
         border: '1px solid red',
         backgroundColor: 'lightgrey',
         cursor: 'finger',
         width: '20px',
         height: '20px',
         display: 'inline-block'
        })
        element.on('mousedown', function(event) {
          event.preventDefault();
          if(scope.mine.mine) {
            console.error("CLICKED A MINE", scope.mine);
          } else {
            console.log("No mine", scope.mine);
          }
        })
      }
    }
  })
