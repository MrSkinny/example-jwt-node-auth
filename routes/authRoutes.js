const express = require('express');
const authRoutes = express.Router();
const jwt = require('jsonwebtoken');

const passport = require('../passport-config');

const User = require('../models/User');

authRoutes
  .route('/')

  .post((req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json();
    }

    const user = User.findOneByUsername(username);
    if (!user) {
      return res.status(401).json();
    }

    const token = user.authenticate(password);
    if (!token) {
      return res.status(401).json();
    }

    return res.status(201).json({ token, username: user.username });
  })

  .delete((req, res) => {
    const encodedToken = req.header('Authorization');
    if (!encodedToken) {
      return res.status(400).json();
    }

    const decoded = jwt.decode(encodedToken.slice(4));
    if (!decoded) {
      return res.status(400).json();
    }

    const { iat, sub } = decoded;
    const user = User.findOneById(sub);
    if (!user) return res.status(422).json();

    user.logout(iat);
    res.json();
  });

module.exports = authRoutes;
