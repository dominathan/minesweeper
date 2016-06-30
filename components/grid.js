angular
  .module('minesweeper')
  .component('grid',{
    bindings: {
      grid: '<'
    },

    template: `
      <div class='grid'>
        <row ng-repeat='row in $ctrl.grid' row='row' class="move"></row>
      </div>
    `,

    controller: function() {
      $ctrl = this;
    }
  })
