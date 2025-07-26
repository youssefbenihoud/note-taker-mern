// backend/models/Note.js

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Titel ist erforderlich'],
      trim: true,
      maxlength: [100, 'Titel darf maximal 100 Zeichen haben'],
    },
    content: {
      type: String,
      required: [true, 'Inhalt ist erforderlich'],
      trim: true,
    },
    color: {
      type: String,
      default: '#ffffff', // Weiß als Standard
      match: [/^#([0-9A-F]{6})$/i, 'Bitte einen gültigen Hex-Farbcode angeben'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // fügt createdAt und updatedAt hinzu
  }
);

// Index für Benutzer – verbessert Abfrageperformance (z. B. "alle Notizen eines Benutzers")
noteSchema.index({ user: 1 });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;