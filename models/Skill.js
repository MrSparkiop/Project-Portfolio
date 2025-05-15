// models/Skill.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Skill = sequelize.define('Skill', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER, // 0–100
    allowNull: false,
    validate: { min: 0, max: 100 }
  }
});

module.exports = Skill;
