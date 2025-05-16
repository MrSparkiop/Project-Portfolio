// models/Experience.js
const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    default: null
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);
