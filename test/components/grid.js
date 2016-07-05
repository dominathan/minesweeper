var test = require('tape')
var { template } = require('../../components/grid')

var htmlOutput = `
    <div class='grid'>
      <row ng-repeat='row in $ctrl.grid' row='row' class="move"></row>
    </div>`

test('grid template', function (t) {
  t.equals(htmlOutput, template, 'should output the correct html')
  t.end()
})
