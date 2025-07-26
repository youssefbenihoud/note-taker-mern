// backend/server.js
const express = require('express');
const connectDB = require('./config/db'); // <-- neu
const app = express();
const PORT = process.env.PORT || 5001;

// Verbinde mit MongoDB
connectDB();

// Middleware
app.use(express.json());

// Test-Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Starte Server
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});