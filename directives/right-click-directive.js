/*
 * Borrowed from google to enable rightclicks.
 */

module.exports = function ($parse) {
  return function (scope, element, attrs) {
    var fn = $parse(attrs.ngRightClick)
    element.bind('contextmenu', function (event) {
      scope.$apply(function () {
        event.preventDefault()
        fn(scope, {$event: event})
      })
    })
  }
}
