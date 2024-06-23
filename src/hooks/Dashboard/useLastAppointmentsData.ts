import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { LastAppointments } from '../../interfaces/Dashboard/LastAppointments';

const useLastAppointmentsData = () => {
  const [lastAppointments, setLastAppointments] = useState<LastAppointments[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastAppointments = async () => {
      try {
        const response = await axiosInstance.get('/Cita/UltimasCincoCitas');
        const formattedData = response.data.result.map((item: any) => ({
          NoCita: item.iD_Cita,
          Paciente: item.nombrePaciente,
          Fecha: item.fechaHora,
        }));
        setLastAppointments(formattedData);
      } catch (err) {
        setError('Error al obtener las últimas citas');
      } finally {
        setLoading(false);
      }
    };

    fetchLastAppointments();
  }, []);

  return { lastAppointments, loading, error };
};

export default useLastAppointmentsData;
