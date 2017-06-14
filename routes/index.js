const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

module.exports = function (app) {
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
};
