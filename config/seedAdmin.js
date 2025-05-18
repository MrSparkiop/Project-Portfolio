// config/seedAdmin.js

const mongoose = require('mongoose');
const User     = require('../models/User');

// Grab username & password from CLI args
const [ , , username, password ] = process.argv;

if (!username || !password) {
  console.error('Usage: node seedAdmin.js <username> <password>');
  process.exit(1);
}

async function seedAdmin() {
  try {
    console.log('🔗 Connecting to MongoDB…');
    await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');

    // Check if user already exists
    const exists = await User.findOne({ username });
    if (exists) {
      console.log(`⚠️  User "${username}" already exists. No changes made.`);
      return process.exit(0);
    }

    // Create new admin user
    const user = new User({ username, password });
    await user.save();

    console.log('✅ Admin user created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seedAdmin();
