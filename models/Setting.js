// models/Setting.js
const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  siteTitle: {
    type: String,
    default: 'MyPortfolio'
  },
  heroSubtitle: {
    type: String,
    default: 'A short bio that highlights your expertise and passions.'
  },
  resumeUrl: {
    type: String,
    default: '/resume.pdf'
  },
  navLinks: [
    {
      label: String,
      url:   String
    }
  ],
  socialLinks: [
    {
      label: String,
      url:   String,
      icon:  String   // e.g. '/images/icons/github.svg'
    }
  ],
  vision: {
    title: { type: String, default: '' },
    text:  { type: String, default: '' },
    image: { type: String, default: '' }
  },
  goal: {
    title: { type: String, default: '' },
    text:  { type: String, default: '' },
    image: { type: String, default: '' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);
