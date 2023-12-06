const axios = require('axios');
const {mapToUrl} = require('./subscriptions');
const {underscoreToHyphen} = require('./hyphen-replace');

module.exports = (req, res) => {
  const { subscription, message } = req.body || {};

  if (!subscription || !message) {
    res.status(400).end('Not a pubsub message');
    return;
  }

  const { attributes } = message;
  if (!attributes['content-type']) {
    console.error('Content-type attribute must be supplied');
    res.status(400).end();
    return;
  }

  const headers = { ...req.headers };
  const prefix = 'x-goog-pubsub-';
  const subscriptionHeader = `${prefix}subscription-name`;
  headers[subscriptionHeader] = subscription;

  ['message_id', 'publish_time', 'ordering_key'].forEach((k) => {
    const headerKey = `${prefix}${underscoreToHyphen(k)}`.toLowerCase();
    const value = message[k];
    if (value) {
      headers[headerKey] = value;
    }
  });

  Object.keys(attributes).forEach((k) => {
    const key = k.toLowerCase();
    headers[key] = attributes[k];
  });

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
