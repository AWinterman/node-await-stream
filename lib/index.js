var through = require('through')
  , all = require('./all')

module.exports = await_stream

function await_stream(streams) {
  var stream = through()
    , collection = {}
    , emitted
    , end

  emitted = copy_keys(streams)
  end = copy_keys(streams)

  for(var key in streams) {
    streams[key]
      .on('data', make_ondata(key))
      .on('end', make_onend(key))
  }

  return stream

  function make_ondata(key) {
    return ondata

    function ondata(data) {
      collection[key] = data
      emitted[key] = true

      if(!all(emitted)) {
        return
      }

      stream.queue(collection)
      emitted = copy_keys(streams)
      collection = {}
    }
  }

  function make_onend(key) {
    return make_onend

    function make_onend(data) {
      end[key] = true

      if(!all(end)) {
        return
      }

      stream.queue(null)
    }
  }


}

function copy_keys(obj) {
  var new_obj = {}

  for(key in obj) {
    if(!obj.hasOwnProperty(key)) {
      continue
    }

    new_obj[key] = false
  }

  return new_obj
}
