var test = require('tape')
var {template} = require('../../components/row')

var htmlTemplate = `
    <square ng-repeat='square in $ctrl.row' square='square' class='square'></square>
  `

test('Row Component', function (t) {
  t.equals(htmlTemplate, template, 'should have the correct html generated')

  t.end()
})
