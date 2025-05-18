// server.js

const path            = require('path');
const express         = require('express');
const mongoose        = require('mongoose');
const session         = require('express-session');
const passport        = require('passport');
const methodOverride  = require('method-override');

// 1) Register Passport strategies BEFORE initializing Passport
require('./config/passport');

const publicRoutes    = require('./routes/public');
const adminRoutes     = require('./routes/admin');

// 2) Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const app = express();

// 3) View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 4) Static folder (css, client-side js, images)
app.use(express.static(path.join(__dirname, 'public')));

// 5) Body parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 6) Method override for PUT & DELETE via ?_method=DELETE
app.use(methodOverride('_method'));

// 7) Session & Passport initialization
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret', 
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// 8) Load global site settings + user + currentPath into res.locals
const Setting = require('./models/Setting');
app.use(async (req, res, next) => {
  try {
    const settings = await Setting.findOne() || {};
    settings.navLinks    = settings.navLinks    || [];
    settings.socialLinks = settings.socialLinks || [];
    settings.vision      = settings.vision      || {};
    settings.goal        = settings.goal        || {};
    res.locals.settings  = settings;
  } catch (err) {
    res.locals.settings = {
      navLinks:    [],
      socialLinks: [],
      vision:      {},
      goal:        {}
    };
  }
  res.locals.user        = req.user;
  res.locals.currentPath = req.path;
  next();
});

// 9) Mount routes
app.use('/', publicRoutes);
app.use('/secret-admin-123', adminRoutes);

// 10) 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

// 11) Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Server Error' });
});

// 12) Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
