const axios = require('axios');
const { mapToUrl } = require('./subscriptions');

module.exports = (req, res) => {
  const { subscription, message } = req.body || {};

  if (!subscription || !message) {
    res.status(400).end('Not a pubsub message');
    return;
  }

  const headers = {};
  Object.keys(message.attributes).forEach((k, v) => {
    const key = k.toLowerCase();
    headers[key] = v;
  });

  const json = JSON.parse(atob(message.data));
  const url = mapToUrl(subscription);
  axios.post(url, json, { headers })
    .then(() => res.end())
    .catch((err) => {
      if (err.response) {
        const { data = {}, status, headers: errHeaders } = err.response;
        console.log(`Request headers: ${JSON.stringify(headers)}`);
        console.log(`Error status code: ${status}`);
        console.log(`Error headers: ${JSON.stringify(errHeaders)}`);
        console.log(`Error payload: ${JSON.stringify(data)}`);
        res.status(status).end(JSON.stringify(data));
      } else {
        console.log('Unknown error');
        res.status(500).end('Unknown error');
      }
    });
};
