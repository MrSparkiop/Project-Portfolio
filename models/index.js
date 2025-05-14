const sequelize = require('../config/database');
const Project = require('./Project');
const Experience = require('./Experience');

// Export your models and sequelize instance
module.exports = { sequelize, Project, Experience };
