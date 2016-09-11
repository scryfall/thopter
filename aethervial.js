const request = require('request-promise-native');
const URI = require('urijs');

const AETHERVIAL = 'https://api.aethervial.net/cards/named';

module.exports = function(str) {
  let url = URI(AETHERVIAL).query({
    fuzzy: str,
    format: 'text'
  }).toString();
  return new Promise(function(resolve, reject) {
    request(url).then(response => {
      resolve(response);
    }).catch(err => {
      resolve(err.response.body);
    });
  });
}
