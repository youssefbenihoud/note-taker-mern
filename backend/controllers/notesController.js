// backend/controllers/notesController.js

const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');

// @desc    Erstelle eine neue Notiz
// @route   POST /api/notes
// @access  Privat
exports.createNote = asyncHandler(async (req, res) => {
  const { title, content, color } = req.body;

  const note = await Note.create({
    title,
    content,
    color,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: note,
  });
});

// @desc    Alle Notizen des Benutzers abrufen
// @route   GET /api/notes
// @access  Privat
exports.getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes,
  });
});

// @desc    Eine einzelne Notiz abrufen
// @route   GET /api/notes/:id
// @access  Privat
exports.getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Notiz nicht gefunden',
    });
  }

  // Zugriffsprüfung: Nur der Besitzer darf sie sehen
  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Kein Zugriff – keine Berechtigung',
    });
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});

// @desc    Notiz aktualisieren
// @route   PUT /api/notes/:id
// @access  Privat
exports.updateNote = asyncHandler(async (req, res) => {
  let note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Notiz nicht gefunden',
    });
  }

  // Zugriffsprüfung
  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Keine Berechtigung zum Bearbeiten',
    });
  }

  // Aktualisiere die Felder
  note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: note,
  });
});

// @desc    Notiz löschen
// @route   DELETE /api/notes/:id
// @access  Privat
exports.deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Notiz nicht gefunden',
    });
  }

  // Zugriffsprüfung
  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Keine Berechtigung zum Löschen',
    });
  }

//  await note.remove();
await Note.findByIdAndDelete(note._id);

  res.status(200).json({
    success: true,
    message: 'Notiz erfolgreich gelöscht',
  });
});