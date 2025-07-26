// frontend/src/pages/EditNote.js

import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';

function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    color: '#ffffff',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Lade die Notiz beim Start
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setFormData(res.data.data); // Anpassung an Backend-Response
      } catch (err) {
        setError(err.response?.data?.message || 'Fehler beim Laden der Notiz');
        if (err.response?.status === 404 || err.response?.status === 403) {
          navigate('/dashboard');
        }
      }
    };

    fetchNote();
  }, [id, navigate]);

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
      await api.put(`/notes/${id}`, formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Fehler beim Speichern');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bist du sicher, dass du diese Notiz löschen möchtest?')) {
      try {
        await api.delete(`/notes/${id}`);
        navigate('/dashboard');
      } catch (err) {
        setError('Fehler beim Löschen der Notiz');
      }
    }
  };

  return (
    <div className="create-note">
      <h2>Notiz bearbeiten</h2>
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

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Wird gespeichert...' : 'Änderungen speichern'}
          </button>
          <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard')}>
            Abbrechen
          </button>
          <button type="button" className="btn-delete" onClick={handleDelete}>
            Löschen
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditNote;