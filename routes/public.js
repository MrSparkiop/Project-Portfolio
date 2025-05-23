// routes/public.js

const express        = require('express');
const router         = express.Router();
const Project        = require('../models/Project');
const Experience     = require('../models/Experience');
const Skill          = require('../models/Skill');
const ContactMessage = require('../models/ContactMessage');

// Home page: Hero, Skills, Projects, Experience + contact‐form banner placeholder
router.get('/', async (req, res) => {
  try {
    const [projects, experiences, skills] = await Promise.all([
      Project.find().sort({ createdAt: -1 }).limit(5),
      Experience.find().sort({ startDate: -1 }),
      Skill.find().sort({ level: -1 })
    ]);

    // We'll handle the "sent" banner entirely client‐side via AJAX
    res.render('public/index', {
      title:       'Home',
      projects,
      experiences,
      skills,
      includeAOS:  true,
      messageSent: false
    });
  } catch (err) {
    console.error('Error loading home page:', err);
    res.status(500).send('Server Error');
  }
});

// Project detail page
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.redirect('/');
    res.render('public/project', {
      title:      project.title,
      project,
      includeAOS: false
    });
  } catch (err) {
    console.error('Error loading project detail:', err);
    res.status(500).send('Server Error');
  }
});

// Handle contact form submissions via AJAX
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await ContactMessage.create({ name, email, message });
    // Respond with JSON so client‐side JS can show banner without reloading or scrolling
    return res.json({ success: true });
  } catch (err) {
    console.error('Error saving contact message:', err);
    return res.status(500).json({ success: false });
  }
});

module.exports = router;
