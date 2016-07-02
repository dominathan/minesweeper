module.exports = {
  bindings: {
    row: '<'
  },

  template: `
    <square ng-repeat='square in $ctrl.row' square="square" class="square"></square>
  `
}
