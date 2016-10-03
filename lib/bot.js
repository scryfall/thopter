const Botkit = require('botkit');
const Messenger = require('./messenger');


class Thopter {
  constructor(token, debug = false) {
    this.debug = debug;
    this.token = token;
    this.controller = this.makeController(token, debug);
  }

  makeController(token, debug) {
    const controller = Botkit.slackbot({ debug });
    controller.spawn({ token }).startRTM(this.handleRTM);
    controller.hears(this.patterns, this.messageTypes, (bot, message) => {
      new Messenger(message.match, bot, message);
    });
    return controller;
  }

  handleRTM(err, bot, payload) {
    if (err) {
      throw new Error(err);
    }
  }
}

Thopter.prototype.patterns = [
  /\[\[([^\]]+)\]\]/g
];

Thopter.prototype.messageTypes = [
  'ambient',
  'direct_message',
  'direct_mention',
  'mention',
  'message_received'
];

module.exports = Thopter;
