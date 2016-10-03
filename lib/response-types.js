const request = require('request-promise-native');
const Url = require('urijs');

const manamoji = require('./middleware/manamoji');

const COLOR = '#431E3F';


class TextResponse {
  constructor(cardName) {
    this.cardName = cardName;
  }

  makeQuerystring() {
    return {
      fuzzy: this.cardName,
      format: 'text'
    }
  }

  makeUrl() {
    return Url(this.url).query(this.makeQuerystring()).toString();
  }

  makeRequest() {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        resolveWithFullResponse: true,
        uri: this.makeUrl()
      }).then(response => {
        resolve(response);
      }).catch(err => {
        resolve(err.response);
      });
    });
  }

  makeAttachment(response) {
    let parts = response.body.split('\n');
    const attachmentTitle = parts.shift();
    return {
      text: parts.join('\n'),
      title: attachmentTitle,
      title_link: response.headers['x-scryfall-card'],
      color: COLOR
    };
  }

  attachment() {
    return new Promise((resolve, reject) => {
      this.makeRequest().then(response => {
        let attachment = this.makeAttachment(response);
        this.middleware.length > 0 && this.middleware.forEach(mw => {
          attachment = mw(attachment);
        });
        resolve(attachment);
      });
    });
  }
}

TextResponse.prototype.middleware = [manamoji];
TextResponse.prototype.url = 'https://api.scryfall.com/cards/named';



class ImageResponse extends TextResponse {
  makeAttachment(response) {
    let parts = response.body.split('\n');
    return {
      image_url: response.headers['x-scryfall-card-image'],
      title: parts[0].match(/^([^{]+)/)[0].trim(),
      title_link: response.headers['x-scryfall-card'],
      color: COLOR
    };
  }
}


class PriceResponse extends TextResponse {
  makeAttachment() {
    return { text: `Prices not yet available for ${this.cardName}.` };
  }
}

module.exports = { TextResponse, ImageResponse, PriceResponse };
