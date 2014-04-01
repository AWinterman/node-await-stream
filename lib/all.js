module.exports = function all(obj) {
  for(var key in obj) {
    if(!obj.hasOwnProperty(key)) {
      continue
    }

    if(!obj[key]) {
      return false
    }
  }

  return true
}
