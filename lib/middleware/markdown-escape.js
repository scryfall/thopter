function escape(str) {
  // Markdown on Slack can't always be escaped, the best solution is to use a
  // vertical tab character which doesn't embolden text
  // http://webapps.stackexchange.com/questions/86557/how-do-i-escape-formatting-characters-in-slack
  return str.replace(new RegExp('\\*', 'g'), '\u000B\*');
}


module.exports = attachment => {
  if (attachment.text) {
    attachment.text = escape(attachment.text);
    if (!('mrkdwn_in' in attachment)) {
      attachment.mrkdwn_in = [];
    }
    attachment.mrkdwn_in.push('text');
  }
  return attachment;
};
