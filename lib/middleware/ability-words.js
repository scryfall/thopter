const ABILITY_WORDS = [
  "Battalion",
  "Bloodrush",
  "Channel",
  "Chroma",
  "Cohort",
  "Constellation",
  "Converge",
  "Council's dilemma",
  "Delirium",
  "Domain",
  "Fateful hour",
  "Ferocious",
  "Formidable",
  "Grandeur",
  "Hellbent",
  "Heroic",
  "Imprint",
  "Inspired",
  "Join forces",
  "Kinship",
  "Landfall",
  "Lieutenant",
  "Metalcraft",
  "Morbid",
  "Parley",
  "Radiance",
  "Raid",
  "Rally",
  "Spell mastery",
  "Strive",
  "Sweep",
  "Tempting offer",
  "Threshold",
  "Will of the council"
];

function abilityWords(str) {
  ABILITY_WORDS.forEach(abilityWord => {
    str = str.replace(abilityWord, `_${abilityWord}_`);
  });
  return str;
}


module.exports = attachment => {
  if (attachment.text) {
    attachment.text = abilityWords(attachment.text);
    if (!('mrkdwn_in' in attachment)) {
      attachment.mrkdwn_in = [];
    }
    attachment.mrkdwn_in.push('text');
  }
  return attachment;
};
