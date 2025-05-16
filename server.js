// server.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');                // ← import passport itself
require('./config/passport')(passport);              // ← configure it with your strategy
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

const app = express();

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ─── View engine & parsing ────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ─── Session & authentication ─────────────────────────────────────────────────
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'CHANGE_THIS_SECRET',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());  // now valid
app.use(passport.session());

// Expose `user` to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// ─── Static assets ─────────────────────────────────────────────────────────────
app.use(express.static('public'));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/', publicRoutes);
app.use('/secret-admin-123', adminRoutes); // change `secret-admin-123` to your own

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
