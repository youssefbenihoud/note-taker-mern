// frontend/src/pages/Login.js

import React, { useState } from 'react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    try {
      const res = await api.post('/auth/login', formData);
      const { token, user } = res.data;

      // Token im localStorage speichern
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Weiterleiten zum Dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Anmeldung fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Anmelden</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-Mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Passwort</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Wird gesendet...' : 'Anmelden'}
        </button>
      </form>
      <p>
        Noch kein Konto? <a href="/register">Registrieren</a>
      </p>
    </div>
  );
}

export default Login;