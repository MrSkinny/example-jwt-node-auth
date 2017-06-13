const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

module.exports = function (app) {
  app.use('/api/sessions', authRoutes);
  app.use('/api/users', userRoutes);
};
