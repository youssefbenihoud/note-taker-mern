// backend/config/db.js

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB verbunden');
  } catch (error) {
    console.error('❌ MongoDB Verbindungsfehler:', error.message);
    process.exit(1); // Beendet den Prozess bei Verbindungsfehler
  }
};

module.exports = connectDB;