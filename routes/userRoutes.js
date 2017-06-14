const express = require('express');
const userRoutes = express.Router();

const passport = require('../passport-config');
const User = require('../models/User');

userRoutes.
  route('/')
  .post((req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Fields `username`, `password` are required.' });

    const foundUser = User.findOneByUsername(username);
    if (foundUser) return res.status(422).json({ message: 'Username is already taken' });

    const user = new User(username, password);
    const token = user.authenticate(password);

    res.status(201).json({ token, user: user.apiRepr() });
  });

userRoutes.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user.apiRepr());
});

module.exports = userRoutes;
