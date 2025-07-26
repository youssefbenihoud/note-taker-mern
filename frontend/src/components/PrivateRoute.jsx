// frontend/src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Nicht eingeloggt → zum Login weiterleiten
    return <Navigate to="/" replace />;
  }

  // Token vorhanden → erlaube Zugriff
  return children;
}

export default PrivateRoute;