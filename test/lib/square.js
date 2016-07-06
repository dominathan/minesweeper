var test = require('tape');
var Square = require('../../lib/square')


test('should be able to create a square', function(t) {
  var square = new Square(false)
  t.ok(square, 'created successfully')
  t.deepEquals(square, new Square(false), 'should be identical to another non-mine')
  t.equals(square.hidden,true,'should be hidden')

  t.end()
})

test('should be able to create a mine', function(t) {
  var square = new Square(true)
  t.ok(square, 'created successfully')
  t.equals(square.mine,true,'should be a mine')

  t.end()
})
