tape = require('tape')
await_stream = require('../lib')
assert = require('assert')
through = require('through')

tape('emits when all the streams its listening to have emittd', awaits_all)

function awaits_all(assert) {
  var a = through()
    , b = through()
    , c = through()

  var a_emitted
    , b_emitted
    , c_emitted
    , stream

  a.on('data', function(data) {
    a_emitted = true
  })

  b.on('data', function(data) {
    b_emitted = true
  })

  c.on('data', function(data) {
    c_emitted = true
  })

  stream = await_stream({a: a, b: b, c: c})

  stream.once('data', function(data) {
    assert.ok(a_emitted, 'a was emitted')
    assert.ok(b_emitted, 'b was emitted')
    assert.ok(c_emitted, 'c was emitted')

    assert.strictEqual(data.a, 1)
    assert.strictEqual(data.b, 2)
    assert.strictEqual(data.c, 3)

    stream.on('data', second)
  })

  function second(data) {
    assert.strictEqual(data.a, 'a')
    assert.strictEqual(data.b, 'b')
    assert.strictEqual(data.c, 'c')

    assert.end()
  }

  a.push(1)
  b.push(1)
  b.push(2)
  c.push(3)
  c.push(2)
  c.push(1)
  c.push('c')

  a.push('a')
  b.push('b')
}
