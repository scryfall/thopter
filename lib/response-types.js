class TextResponse {
  constructor(cardName) {
    console.log(cardName);
    this.cardName = cardName;
  }

  makeAttachment() {
    return { text: `default + ${this.cardName}` };
  }
}


class ImageResponse extends TextResponse {
  makeAttachment() {
    return { text: `image + ${this.cardName}` };
  }
}


class PriceResponse extends TextResponse {
  makeAttachment() {
    return { text: `price + ${this.cardName}` };
  }
}

module.exports = { TextResponse, ImageResponse, PriceResponse };
