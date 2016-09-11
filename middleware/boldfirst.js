module.exports = function(str) {
  return str.replace(/^(.+)\n/, '*$1*\n')
}
