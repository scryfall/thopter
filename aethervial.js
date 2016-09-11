const request = require('request-promise-native');
const URI = require('urijs');

const AETHERVIAL = 'https://api.aethervial.net/cards/named';

module.exports = function(str) {
  let url = URI(AETHERVIAL).query({
    fuzzy: str,
    format: 'text'
  }).toString();
  console.log(2, 'Promise init', str, url);
  return new Promise(function(resolve, reject) {
    console.log(3, 'Make request', url);
    request(url).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
}
