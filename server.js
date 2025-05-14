// server.js (in your project root)
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('./config/passport');
const { sequelize } = require('./models');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'CHANGE_THIS_SECRET',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/admin', adminRoutes);
app.use('/', publicRoutes);

(async () => {
  await sequelize.sync();
  app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
  });
})();
