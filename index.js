const Thopter = require('./lib/bot');


if (!process.env.SLACK_TOKEN) {
  console.log('Error: Specify SLACK_TOKEN in environment');
  process.exit(1);
}

new Thopter(
  process.env.SLACK_TOKEN,
  process.env.DEBUG === 'true'
);
