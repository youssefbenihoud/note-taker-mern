// backend/server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware: JSON parsen
app.use(express.json());

// Test-Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Starte den Server
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});