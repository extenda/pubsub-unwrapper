const express = require('express');
const unwrapper = require('./unwrapper');

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.json());
app.use('/unwrap', unwrapper);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server listening on ${port}`));
}

module.exports = {
  app,
};
