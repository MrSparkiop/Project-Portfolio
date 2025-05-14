const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// *** Change this password to something strong! ***
const ADMIN = {
  id: 1,
  username: 'admin',
  passwordHash: bcrypt.hashSync('ChangeMe123!', 10)
};

passport.use(new LocalStrategy((username, password, done) => {
  if (username !== ADMIN.username) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  if (!bcrypt.compareSync(password, ADMIN.passwordHash)) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, ADMIN);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  if (id === ADMIN.id) return done(null, ADMIN);
  return done(new Error('User not found'));
});

module.exports = passport;
