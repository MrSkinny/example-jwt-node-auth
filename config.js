const crypto = require('crypto');

module.exports = {
  // this should be stored in environment variable
  SECRET_KEY: crypto.rng(75).toString()
};
