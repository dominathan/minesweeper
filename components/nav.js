const angular = angular
  .module('minesweeper')
  .component('nav', {
    bindings: {
      title: '<'
    },

    template: `
      <header>
        <h2>{{$ctrl.title}}</h2>
      </header>
    `,
    controller: function () {

    }
  })
