const express = require('express');
const userRoutes = express.Router();

const passport = require('../passport-config');

userRoutes.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user.apiRepr());
});

module.exports = userRoutes;
