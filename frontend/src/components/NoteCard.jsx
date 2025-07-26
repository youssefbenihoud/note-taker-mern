// frontend/src/components/NoteCard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

function NoteCard({ note }) {
  const navigate = useNavigate();

  return (
    <div
      className="note-card"
      style={{ backgroundColor: note.color }}
      onClick={() => navigate(`/notes/${note._id}`)}
    >
      <h3>{note.title}</h3>
      <p>{note.content.substring(0, 100)}{note.content.length > 100 ? '...' : ''}</p>
      <small>{new Date(note.createdAt).toLocaleDateString()}</small>
    </div>
  );
}

export default NoteCard;