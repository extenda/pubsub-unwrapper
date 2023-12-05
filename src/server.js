const express = require('express');
const unwrapper = require('./unwrapper');

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.json());
app.use('/unwrap', unwrapper);

const server = app.listen(port, () => console.log(`Server listening on ${port}`));

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});

module.exports = {
  server,
};
