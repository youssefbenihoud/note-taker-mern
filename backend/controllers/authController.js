// backend/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// Hilfsfunktion: Token signieren
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Registrierung
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Prüfe, ob Benutzer bereits existiert
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Ein Benutzer mit dieser E-Mail existiert bereits.',
      });
    }

    // 2. Erstelle neuen Benutzer
    const user = await User.create({ name, email, password });

    // 3. Token generieren
    const token = signToken(user._id);

    // 4. Antwort senden (ohne Passwort dank select: false)
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Prüfe, ob E-Mail und Passwort eingegeben wurden
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Bitte E-Mail und Passwort eingeben.',
      });
    }

    // 2. Suche Benutzer (Passwort wird explizit ausgewählt, da select: false)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Ungültige Anmeldeinformationen.',
      });
    }

    // 3. Prüfe Passwort
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Ungültige Anmeldeinformationen.',
      });
    }

    // 4. Token generieren
    const token = signToken(user._id);

    // 5. Antwort senden
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};