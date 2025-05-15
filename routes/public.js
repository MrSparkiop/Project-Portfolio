const express = require('express');
const router = express.Router();
const { Project, Experience } = require('../models');

// Home page: list projects & experience
router.get('/', async (req, res) => {
  try {
    const [projects, experiences] = await Promise.all([
      Project.findAll(),
      Experience.findAll({ order: [['startDate', 'DESC']] })
    ]);
    res.render('public/index', { projects, experiences });
  } catch (err) {
    console.error("Error loading home:", err);
    res.status(500).send("Server Error");
  }
});

// Project detail page
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      // If no such project, redirect back home
      return res.redirect('/');
    }
    res.render('public/project', { project });
  } catch (err) {
    console.error("Error loading project detail:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
