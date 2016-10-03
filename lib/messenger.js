const ResponseTypes = require('./response-types');


class Messenger {
  negotiateMatch(match) {
    /*
    Passed a search match, returns an object containing the sanitized card name
    and the appropriate response class to process it.
    */
    let cardName = match.substring(0, match.length - 2).substring(2);
    let responseType = this.defaultResponseType;
    const token = cardName.slice(0, 1);
    if (token in this.specialResponseTypes) {
      cardName = cardName.slice(1);
      responseType = this.specialResponseTypes[token];
    }
    return { cardName, responseType }
  }

  makePromise(cardName, responseType) {
    return new Promise((resolve, reject) => {
      try {
        resolve(new responseType(cardName).makeAttachment());
      } catch(err) {
        reject(err);
      }
    });
  }

  constructor(matches, bot, message) {
    this.promises = [];

    matches.forEach(match => {
      const { cardName, responseType } = this.negotiateMatch(match);
      const promise = this.makePromise(cardName, responseType);
      this.promises.push(promise);
    });

    Promise.all(this.promises).then(attachments => {
      console.log(attachments);
      bot.reply(message, { attachments: attachments });
    });
  }
}

Messenger.prototype.specialResponseTypes = {
  '!': ResponseTypes.ImageResponse,
  '$': ResponseTypes.PriceResponse
};


Messenger.prototype.defaultResponseType = ResponseTypes.TextResponse;

module.exports = Messenger;
