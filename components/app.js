
angular
  .module('minesweeper')
  .component('app',{
    bindings: {
      title: '@'
    },
    template: `
      <nav title='$ctrl.title'></nav>
      <div class="container">
        <grid grid="$ctrl.grid"></grid>
      </div>
    `,
    controller: ['MinesweeperService', controller]
  });

  function controller(MinesweeperService) {
    $ctrl = this;

    $ctrl.grid = MinesweeperService.initGrid({});
  }
