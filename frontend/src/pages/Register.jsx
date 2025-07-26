import { useEffect } from 'react';
import { api } from '../utils/api'; // Importiere die API-Instanz

function Register() {
  useEffect(() => {
    const testAPI = async () => {
      try {
        const response = await api.get('/test');
        console.log('API Test Response:', response.data);
      } catch (error) {
        console.error('API Test Error:', error);
      }
    };
    testAPI();
  }, []);

  return <h2>Register</h2>;
}

export default Register;