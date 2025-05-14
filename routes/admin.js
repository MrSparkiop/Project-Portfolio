const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Project, Experience } = require('../models');

// Protect admin routes
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/admin/login');
}

// --- Auth ---
router.get('/login', (req, res) => {
  res.render('admin/login', { error: null });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/admin/projects',
    failureRedirect: '/admin/login'
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/admin/login');
});

// --- Projects CRUD ---
router.get('/projects', ensureAuth, async (req, res) => {
  const items = await Project.findAll();
  res.render('admin/projects', { items, type: 'Project' });
});

router.get('/projects/new', ensureAuth, (req, res) => {
  res.render('admin/form', { type: 'Project', action: '/admin/projects', item: {} });
});

router.post('/projects', ensureAuth, async (req, res) => {
  await Project.create(req.body);
  res.redirect('/admin/projects');
});

router.get('/projects/:id/edit', ensureAuth, async (req, res) => {
  const item = await Project.findByPk(req.params.id);
  res.render('admin/form', {
    type: 'Project',
    action: `/admin/projects/${item.id}?_method=PUT`,
    item
  });
});

router.put('/projects/:id', ensureAuth, async (req, res) => {
  await Project.update(req.body, { where: { id: req.params.id } });
  res.redirect('/admin/projects');
});

router.delete('/projects/:id', ensureAuth, async (req, res) => {
  await Project.destroy({ where: { id: req.params.id } });
  res.redirect('/admin/projects');
});

// --- Experience CRUD ---
router.get('/experiences', ensureAuth, async (req, res) => {
  const items = await Experience.findAll({ order: [['startDate', 'DESC']] });
  res.render('admin/projects', { items, type: 'Experience' });
});

router.get('/experiences/new', ensureAuth, (req, res) => {
  res.render('admin/form', { type: 'Experience', action: '/admin/experiences', item: {} });
});

router.post('/experiences', ensureAuth, async (req, res) => {
  await Experience.create(req.body);
  res.redirect('/admin/experiences');
});

router.get('/experiences/:id/edit', ensureAuth, async (req, res) => {
  const item = await Experience.findByPk(req.params.id);
  res.render('admin/form', {
    type: 'Experience',
    action: `/admin/experiences/${item.id}?_method=PUT`,
    item
  });
});

router.put('/experiences/:id', ensureAuth, async (req, res) => {
  await Experience.update(req.body, { where: { id: req.params.id } });
  res.redirect('/admin/experiences');
});

router.delete('/experiences/:id', ensureAuth, async (req, res) => {
  await Experience.destroy({ where: { id: req.params.id } });
  res.redirect('/admin/experiences');
});

module.exports = router;
