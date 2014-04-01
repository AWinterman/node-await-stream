# Await Stream

A stream which listens to a collection of streams. When they emit, it collects
their data into a single object, and then emits the new object when they've all
emitted.

```javascript
var await_stream = require('await_stream')
  , through = require('through')

// these will be pass through streams, that we will `.push` to once our
// listeners are set up.
var a = through()
  , b = through()
  , c = through()

var collection = await_stream({a: a, b: b, c: c})

collection.on('data', function(data) {
  // a_stream's data is:
  console.log('a', data.a)

  // b stream's data is:
  console.log('b', data.b)

  // c stream's data is:
  console.log('c', data.c)
})

// Nothing is emitted until all keys are accounted for:
a.push(1)
b.push(200)
b.push(20)
b.push(2)

// No data is emitted until:

c.push(3)
// data is {a: 1, b: 2, c: 3}, and the counter is reset. So any two of the
// three streams a, b, c could emit 'data'  without emitting.
```

## API:

`await_stream(streams) -> ReadableStream`

`streams` is expected to be a object mapping names to streams. The
returned stream emits, objects with the same keys as the passed in object, but
with the values emitted by each stream as the values of the object.

Note that each time all keys become accounted before, the ReadableStream emits
a data event, and then resets itself to its initial state.




