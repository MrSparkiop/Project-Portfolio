// config/passport.js
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');

module.exports = function(passport) {
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Verify password
      const isValid = await user.verifyPassword(password);
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // Success
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  // Serialize & deserialize for session support
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
