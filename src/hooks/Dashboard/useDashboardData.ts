import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';

interface DashboardData {
  totalPatients: number;
  totalAppointments: number;
  pendingAppointments: number;
}

const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePatients = await axiosInstance.get('/Paciente/TotalPacientes');
        const responseTotalAppointments = await axiosInstance.get('/Cita/TotalCitas');
        const responsePendingAppointments = await axiosInstance.get('/Cita/CitasPendientes');

        setData({
          totalPatients: responsePatients.data.result,
          totalAppointments: responseTotalAppointments.data.result,
          pendingAppointments: responsePendingAppointments.data.result,
        });
      } catch (err) {
        setError('Error al obtener los datos del dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useDashboardData;
