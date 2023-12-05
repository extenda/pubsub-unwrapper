const { env } = process;

const stripPrefix = (sub) => {
  const index = sub.lastIndexOf('/');
  return sub.substring(index + 1);
};

const mapToUrl = (subscription) => {
  const name = stripPrefix(subscription);
  return env[name.split('-').join('_').toUpperCase()];
};

module.exports = {
  mapToUrl,
};
