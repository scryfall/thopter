function reminderText(str) {
  return str.replace(/\(([^\)]+)\)/g, match => ( `_${match}_` ));
}


module.exports = attachment => {
  if (attachment.text) {
    attachment.text = reminderText(attachment.text);
    if (!('mrkdwn_in' in attachment)) {
      attachment.mrkdwn_in = [];
    }
    attachment.mrkdwn_in.push('text');
  }
  return attachment;
};
