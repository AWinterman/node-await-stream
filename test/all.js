var tape = require('tape')

var all = require('../lib/all')

tape('test all', function(assert) {
  assert.ok(all({
      a: true
    , b: true
  }))

  assert.ok(!all({
      a: true
    , b: true
    , c: false
  }))

  assert.end()
})
