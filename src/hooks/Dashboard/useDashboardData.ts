import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';

interface DashboardData {
  totalPatients: number;
  totalAppointments: number;
  pendingAppointments: number;
}

const useDashboardData = (medicoID: number) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePatients = await axiosInstance.get(`/Paciente/TotalPacientes?medicoID=${medicoID}`);
        const responseTotalAppointments = await axiosInstance.get(`/Cita/TotalCitas?medicoID=${medicoID}`);
        const responsePendingAppointments = await axiosInstance.get(`/Cita/CitasPendientes?medicoID=${medicoID}`);

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
  }, [medicoID]);

  return { data, loading, error };
};

export default useDashboardData;
