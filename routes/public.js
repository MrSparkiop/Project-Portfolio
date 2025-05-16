// routes/public.js
const express = require('express');
const router = express.Router();

const Project    = require('../models/Project');
const Experience = require('../models/Experience');
const Skill      = require('../models/Skill');

// Home page: list projects, experiences, and skills
router.get('/', async (req, res) => {
  try {
    const [projects, experiences, skills] = await Promise.all([
      Project.find().sort({ createdAt: -1 }),
      Experience.find().sort({ startDate: -1 }),
      Skill.find().sort({ level: -1 })
    ]);
    res.render('public/index', { projects, experiences, skills });
  } catch (err) {
    console.error('Error loading home:', err);
    res.status(500).send('Server Error');
  }
});

// Project detail page
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.redirect('/');
    res.render('public/project', { project });
  } catch (err) {
    console.error('Error loading project detail:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
