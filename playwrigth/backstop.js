const backstop = require('backstopjs');
const config = require('config');

backstop('test', {config: config.backstop})
  .then(() => {
    // test successful
  }).catch(() => {
    // test failed
  });