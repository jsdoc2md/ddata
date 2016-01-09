var test = require('tape')
var ddata = require('../')

function makeOptions (data) {
  return { data: { root: data }, hash: {} }
}

test('_identifiers', function (t) {
  var options = makeOptions([
    { id: '1', kind: 'module' },
    { id: '2', kind: 'class' }
  ])
  options.hash.kind = 'module'
  var result = ddata._identifiers.call(null, options)
  t.deepEqual(result, [
    { id: '1', kind: 'module' }
  ])
  t.end()
})
