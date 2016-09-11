let substitutions = {'CHAOS': ':mana-chaos:'};

let COLORS = ['W', 'U', 'B', 'R', 'G'];
let NUMBERS = [...Array(21).keys()];
let ADDTL = ['C', 'E', 'HR', 'HW', 'T', 'Q', 'S', 'X', 'Y', 'Z', '∞',
             '½', '100', '1000000'];

function _(before, after) {
  if (typeof after === 'undefined') {
    after = before;
  }
  substitutions[`{${before}}`] = `:mana-${after.toString().toLowerCase()}:`;
}

ADDTL.forEach(a => { _(a) });
COLORS.forEach(c => { _(c) });
COLORS.forEach(c => { _(`2/${c}`, `2${c}`) });
COLORS.forEach(c => { _(`${c}P`) });
COLORS.forEach(c => { COLORS.forEach(d => { if (c != d) _(`${c}${d}`) }) });
NUMBERS.forEach(n => { _(n) });

module.exports = function(str) {
  const re = new RegExp(Object.keys(substitutions).map(v => {
    return v.replace('{', '\\{').replace('}', '\\}');
  }).join('|'), 'gi');
  return str.replace(re, matched => {
    return substitutions[matched];
  });
}
