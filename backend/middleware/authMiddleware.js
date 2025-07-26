// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// Protect Middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Prüfe, ob Token im Header mit 'Bearer' gesendet wird
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extrahiere Token (nach "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verifiziere Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Finde Benutzer und setze req.user (ohne Passwort)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Gehe zur nächsten Funktion (z. B. Controller)
    } catch (error) {
      console.error('Auth-Fehler:', error.message);
      res.status(401).json({
        success: false,
        message: 'Nicht autorisiert, Token ungültig',
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Nicht autorisiert, kein Token gefunden',
    });
  }
});

module.exports = { protect };