// backend/server.js

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const { protect } = require('./middleware/authMiddleware');
const cors = require('cors'); // <-- neu

const app = express();
const PORT = process.env.PORT || 5001;

// Verbinde mit MongoDB
connectDB();

// Middleware
app.use(express.json());

// CORS konfigurieren
app.use(cors({
  origin: 'http://localhost:5173', // Nur dein Frontend darf zugreifen
  credentials: true, // Erlaubt Cookies/Authorization-Header (später relevant)
}));

// Routen
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Test-Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Starte Server
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});