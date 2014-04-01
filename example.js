var request = require('request')
  , await_stream = require('./lib/')
  , accum = require('accum-transform')

var URL = require('url')

// This is an example that will use the giphy api to find first result for gifs
// of a dog, a cat and a mouse. It will print links of them to the terminal,
// once all three requests have returned.

await_stream({
    mouse: search('mouse')
  , cat: search('cat')
  , dog: search('dog')
  , rat: search('rat')
}).on('data', function(data) {
  console.log('mouse', JSON.parse(data.mouse.toString()).data[0].url)
  console.log('dog', JSON.parse(data.dog.toString()).data[0].url)
  console.log('cat', JSON.parse(data.cat.toString()).data[0].url)
  console.log('rat', JSON.parse(data.cat.toString()).data[0].url)
})

function search(terms) {
  return request.get(URL.format({
      protocol: 'http'
    , host: 'api.giphy.com'
    , pathname: '/v1/gifs/search'
    , query: {q: terms, api_key: 'dc6zaTOxFJmzC'}
  })).pipe(accum())
}
