const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Project, Experience } = require('../models');

// protect admin routes
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/secret-admin-123/login');
}

// --- Auth ---
router.get('/login', (req, res) => {
  res.render('admin/login');
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/secret-admin-123/projects',
    failureRedirect: '/secret-admin-123/login'
  })
);

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/secret-admin-123/login');
  });
});

// --- Projects CRUD ---
router.get('/projects', ensureAuth, async (req, res) => {
  const items = await Project.findAll();
  res.render('admin/projects', { items, type: 'Project' });
});

router.get('/projects/new', ensureAuth, (req, res) => {
  res.render('admin/form', { item: {}, type: 'Project', action: '/secret-admin-123/projects' });
});

router.post('/projects', ensureAuth, async (req, res) => {
  await Project.create(req.body);
  res.redirect('/secret-admin-123/projects');
});

router.get('/projects/:id/edit', ensureAuth, async (req, res) => {
  const item = await Project.findByPk(req.params.id);
  res.render('admin/form', {
    item,
    type: 'Project',
    action: `/secret-admin-123/projects/${item.id}?_method=PUT`
  });
});

router.put('/projects/:id', ensureAuth, async (req, res) => {
  await Project.update(req.body, { where: { id: req.params.id } });
  res.redirect('/secret-admin-123/projects');
});

router.delete('/projects/:id', ensureAuth, async (req, res) => {
  await Project.destroy({ where: { id: req.params.id } });
  res.redirect('/secret-admin-123/projects');
});

// --- Experience CRUD ---
// same pattern, just change /admin to /secret-admin-123
router.get('/experiences', ensureAuth, async (req, res) => {
  const items = await Experience.findAll({ order: [['startDate', 'DESC']] });
  res.render('admin/projects', { items, type: 'Experience' });
});
// ... (new, post, edit, put, delete for experiences) ...

module.exports = router;
