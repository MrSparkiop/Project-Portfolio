// routes/admin.js
const express = require('express');
const router  = express.Router();
const passport = require('passport');

const Project    = require('../models/Project');
const Experience = require('../models/Experience');
const Skill      = require('../models/Skill');

// middleware to protect admin routes
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/secret-admin-123/login');
}

// --- Authentication ---
router.get('/login',  (req, res) => res.render('admin/login'));
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/secret-admin-123/projects',
    failureRedirect: '/secret-admin-123/login'
  })
);
router.get('/logout', (req, res, next) => {
  req.logout(err => err ? next(err) : res.redirect('/secret-admin-123/login'));
});

// --- Projects CRUD ---
router.get('/projects', ensureAuth, async (req, res) => {
  const items = await Project.find().sort({ createdAt: -1 });
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
  const item = await Project.findById(req.params.id);
  res.render('admin/form', {
    item,
    type: 'Project',
    action: `/secret-admin-123/projects/${item.id}?_method=PUT`
  });
});
router.put('/projects/:id', ensureAuth, async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/secret-admin-123/projects');
});
router.delete('/projects/:id', ensureAuth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/secret-admin-123/projects');
});

// --- Experience CRUD ---
router.get('/experiences', ensureAuth, async (req, res) => {
  const items = await Experience.find().sort({ startDate: -1 });
  res.render('admin/projects', { items, type: 'Experience' });
});
router.get('/experiences/new', ensureAuth, (req, res) => {
  res.render('admin/form', { item: {}, type: 'Experience', action: '/secret-admin-123/experiences' });
});
router.post('/experiences', ensureAuth, async (req, res) => {
  await Experience.create(req.body);
  res.redirect('/secret-admin-123/experiences');
});
router.get('/experiences/:id/edit', ensureAuth, async (req, res) => {
  const item = await Experience.findById(req.params.id);
  res.render('admin/form', {
    item,
    type: 'Experience',
    action: `/secret-admin-123/experiences/${item.id}?_method=PUT`
  });
});
router.put('/experiences/:id', ensureAuth, async (req, res) => {
  await Experience.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/secret-admin-123/experiences');
});
router.delete('/experiences/:id', ensureAuth, async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.redirect('/secret-admin-123/experiences');
});

// --- Skills CRUD ---
router.get('/skills', ensureAuth, async (req, res) => {
  const items = await Skill.find().sort({ name: 1 });
  res.render('admin/skills', { items, type: 'Skill' });
});
router.get('/skills/new', ensureAuth, (req, res) => {
  res.render('admin/skill_form', { item: {}, action: '/secret-admin-123/skills' });
});
router.post('/skills', ensureAuth, async (req, res) => {
  await Skill.create(req.body);
  res.redirect('/secret-admin-123/skills');
});
router.get('/skills/:id/edit', ensureAuth, async (req, res) => {
  const item = await Skill.findById(req.params.id);
  res.render('admin/skill_form', {
    item,
    action: `/secret-admin-123/skills/${item.id}?_method=PUT`
  });
});
router.put('/skills/:id', ensureAuth, async (req, res) => {
  await Skill.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/secret-admin-123/skills');
});
router.delete('/skills/:id', ensureAuth, async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect('/secret-admin-123/skills');
});

module.exports = router;
