module.exports = attachment => {
  Object.assign(attachment, {
    footer: 'Scryfall',
    footer_icon: 'https://assets.scryfall.com/app-icon.png'
  });
  return attachment;
};
