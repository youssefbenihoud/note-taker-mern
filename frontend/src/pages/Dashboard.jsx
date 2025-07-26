// frontend/src/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../components/NoteCard';

function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Fehler beim Laden der Notizen');
        if (err.response?.status === 401) {
          // Token ungültig → logout
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [navigate]);

  return (
    <div className="dashboard">
      <h2>Meine Notizen</h2>
      <button className="btn-new" onClick={() => navigate('/create')}>
        + Neue Notiz
      </button>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <p>Lade Notizen...</p>
      ) : notes.length === 0 ? (
        <p className="empty">Noch keine Notizen vorhanden. Erstelle deine erste!</p>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;