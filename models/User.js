const cuid = require('cuid');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

class User {
  constructor(username, password) {
    this.id = cuid();
    this.username = username;
    this.password = password;
    this.tokens = [];

    User._store.push(this);
  }

  apiRepr() {
    const { id, username, tokens } = this;
    return { id, username, tokens };
  }

  authenticate(password) {
    if (this.password !== password) return false;

    // Generate JWT token using:
    // userId in `sub` field of payload
    // server's secret key
    // expire token in 7 days
    const tokenString = jwt.sign({ sub: this.id }, SECRET_KEY, { expiresIn: '7d' });
    const token = jwt.decode(tokenString);

    this.tokens.push(token);
    return tokenString;
  }

  logout(iat) {
    this.tokens = this.tokens.filter(t => t.iat !== iat);
  }
}

User._store = [];

User.create = function (username, password) {
  if (!username || !password) return false;
  return new User(username, password);
};

User.findOneByUsername = function (username) {
  return this._store.find(user => user.username === username);
};

User.findOneById = function (id) {
  return this._store.find(user => user.id === id);
};

module.exports = User;
