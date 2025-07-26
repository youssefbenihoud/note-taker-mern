import React, { useEffect } from 'react';
import { api } from '../utils/api'; // Importiere die API-Instanz   

function Dashboard() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard');
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return <h2>Dashboard</h2>;
}
export default Dashboard;