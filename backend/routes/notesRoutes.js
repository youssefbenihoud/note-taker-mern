// backend/routes/notesRoutes.js

const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');

const router = express.Router();

// Alle Routen sind geschützt
router.route('/')
  .post(protect, createNote)
  .get(protect, getNotes);

router.route('/:id')
  .get(protect, getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;