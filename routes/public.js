const express = require('express');
const router = express.Router();
const { Project, Experience } = require('../models');

router.get('/', async (req, res) => {
  const [projects, experiences] = await Promise.all([
    Project.findAll(),
    Experience.findAll({ order: [['startDate', 'DESC']] })
  ]);
  res.render('public/index', { projects, experiences });
});

module.exports = router;
