const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { SECRET_KEY } = require('./config');

const User = require('./models/User');

const opts = {
  // This looks for header on all client requests: 
  // Authorization: JWT [jwt-string]
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: SECRET_KEY,
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  // this callback only runs if JWT token has successfully verified
  // against server secret signature

  const user = User.findOneById(jwt_payload.sub);
  const foundToken = user.tokens.find(t => t.iat === jwt_payload.iat);

  if (!foundToken) {
    return done(null, false, 'Token does not exist');
  }

  if (user) {
    done(null, user);
  } else {
    done(null, false, 'User does not exist');
  }
}));

module.exports = passport;
