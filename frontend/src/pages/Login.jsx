// frontend/src/pages/Login.js
import React, { useEffect } from 'react';
import { api } from '../utils/api'; // Importiere die API-Instanz

function Login() {
  useEffect(() => {
    const testAPI = async () => {
      try {
        const res = await api.get('/test');
        console.log('✅ API-Verbindung erfolgreich:', res.data);
      } catch (error) {
        console.error('❌ API-Verbindung fehlgeschlagen:', error.message);
      }
    };

    testAPI();
  }, []);

  return <h2>Login</h2>;
}

export default Login;