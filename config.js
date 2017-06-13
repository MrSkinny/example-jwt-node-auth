const crypto = require('crypto');

module.exports = {
  SECRET_KEY: crypto.rng(75).toString()
};
