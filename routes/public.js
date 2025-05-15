// routes/public.js
const express = require('express');
const router = express.Router();
const { Project, Experience, Skill } = require('../models');

// Home page: list projects, experiences, and skills
router.get('/', async (req, res) => {
  try {
    const [projects, experiences, skills] = await Promise.all([
      Project.findAll(),
      Experience.findAll({ order: [['startDate', 'DESC']] }),
      Skill.findAll({ order: [['level', 'DESC']] })
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
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.redirect('/');
    res.render('public/project', { project });
  } catch (err) {
    console.error('Error loading project detail:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
