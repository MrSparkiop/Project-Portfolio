// models/index.js
const sequelize   = require('../config/database');
const Project     = require('./Project');
const Experience  = require('./Experience');
const Skill       = require('./Skill');

module.exports = { sequelize, Project, Experience, Skill };
