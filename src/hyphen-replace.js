
const hyphenToUnderscore = (input = '') => input.split('-').join('_');

const underscoreToHyphen = (input = '') => input.split('_').join('-');


module.exports = {
  hyphenToUnderscore,
  underscoreToHyphen,
};
