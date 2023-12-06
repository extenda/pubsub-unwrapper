const {hyphenToUnderscore} = require('./hyphen-replace');
const {env} = process;

const stripPrefix = (sub) => {
  const index = sub.lastIndexOf('/');
  return sub.substring(index + 1);
};

const mapToUrl = (subscription) => {
  const name = stripPrefix(subscription);
  const envName = hyphenToUnderscore(name).toUpperCase();
  return env[envName];
};

module.exports = {
  mapToUrl,
};
