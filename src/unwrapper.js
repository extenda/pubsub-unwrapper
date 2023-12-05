const axios = require('axios');
const { mapToUrl } = require('./subscriptions');

module.exports = (req, res) => {
  const { subscription, message } = req.body || {};

  if (!subscription || !message) {
    res.status(400).end('Not a pubsub message');
    return;
  }

  const headers = {};
  const prefix = 'x-goog-pubsub';
  Object.keys(req.headers).forEach((k) => {
    const key = `${prefix}-${k}`.toLowerCase();
    headers[key] = req.header(k);
  });
  Object.keys(message.attributes).forEach((k) => {
    const key = k.toLowerCase();
    headers[key] = message.attributes[k];
  });

  if (!headers['content-type']) {
    console.error('Content-type header must be supplied');
    res.status(400).end();
    return;
  }

  const data = atob(message.data);
  const url = mapToUrl(subscription);
  axios.post(url, data, { headers })
    .then(() => res.end())
    .catch((err) => {
      if (err.response) {
        const { status } = err.response;
        console.log(`Request headers: ${JSON.stringify(headers)}`);
        console.log(`Error status code: ${status}`);
        console.log(`Error headers: ${JSON.stringify(err.response.headers)}`);
        const errorPayload = JSON.stringify(err.response.data || {});
        console.log(`Error payload: ${errorPayload}`);
        res.status(status).end();
      } else {
        console.log('Unknown error');
        res.status(500).end();
      }
    });
};
