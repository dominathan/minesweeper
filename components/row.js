angular
  .module('minesweeper')
  .component('row', {
    bindings: {
      row: '<'
    },

    template: `
      <square ng-repeat='square in $ctrl.row' square="square" class="square"></square>
    `
  })
