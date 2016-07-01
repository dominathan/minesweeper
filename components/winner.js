module.exports = {
  bindings: {
    state: '<'
  },

  template: `
    <div ng-show="$ctrl.state === 'WINNER'">
      <h2>WINNER!! Play again?</h2>
    </div>
  `,

  controller: function () {
  }
}
