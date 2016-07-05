module.exports = {
  bindings: {
    grid: '<'
  },

  template: `
    <div class='grid'>
      <row ng-repeat='row in $ctrl.grid' row='row' class="move"></row>
    </div>`,

  controller: function () {
  }
}
