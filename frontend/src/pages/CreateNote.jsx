// frontend/src/pages/CreateNote.js

import React, { useState } from 'react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function CreateNote() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    color: '#ffffff',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title || !formData.content) {
      setError('Titel und Inhalt sind erforderlich');
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/notes', formData);
      // Neue Notiz zur Übersicht hinzufügen (optional)
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Fehler beim Erstellen der Notiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-note">
      <h2>Neue Notiz erstellen</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Titel</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titel der Notiz"
            required
          />
        </div>

        <div>
          <label>Inhalt</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            placeholder="Schreibe deine Notiz..."
            required
          />
        </div>

        <div>
          <label>Farbe</label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
          <span> {formData.color} </span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Wird gespeichert...' : 'Notiz speichern'}
        </button>
      </form>

      <button className="btn-cancel" onClick={() => navigate('/dashboard')}>
        Abbrechen
      </button>
    </div>
  );
}

export default CreateNote;