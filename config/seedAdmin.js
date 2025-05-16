// config/seedAdmin.js
const mongoose = require('mongoose');
const User     = require('../models/User');

async function seed() {
  const [username, password] = process.argv.slice(2);
  if (!username || !password) {
    console.error('Usage: node config/seedAdmin.js <username> <password>');
    process.exit(1);
  }

  try {
    console.log('🔗 Connecting to MongoDB…');
    // Force IPv4 address
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio'
    );
    console.log('✅ MongoDB connected');

    const exists = await User.findOne({ username });
    if (exists) {
      console.log(`⚠️  User "${username}" already exists. Skipping.`);
      process.exit(0);
    }

    const admin = new User({ username, password });
    await admin.save();
    console.log(`✅ Admin user created: username="${username}"`);
    process.exit(0);

  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
