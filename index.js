const scryfall = require('./scryfall');
const boldfirst = require('./middleware/boldfirst');
const Botkit = require('botkit');
const manamoji = require('./middleware/manamoji');
const quoteall = require('./middleware/quoteall');
const urlencode = require('urlencode');

const PATTERN = /\[\[([^\]]+)\]\]/g;
const TYPES = ['ambient', 'direct_message', 'direct_mention', 'mention', 'message_received'];

if (!process.env.SLACK_TOKEN) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

const controller = Botkit.slackbot({
  debug: true
});

controller.spawn({
  token: process.env.SLACK_TOKEN
}).startRTM(err => {
  if (err) throw new Error(err);
});

controller.hears([PATTERN], TYPES, (bot, message) => {
  let promises = [];
  message.match.forEach(match => {
    promises.push(new Promise((resolve, reject) => {
      let cardname = match.substring(0, match.length - 2).substring(2);
      scryfall(cardname).then(card => {
        resolve(quoteall(boldfirst(manamoji(card))));
      });
    }));
  });
  Promise.all(promises).then(cards => {
    bot.reply(message, cards.join('\n\n'));
  });
});
