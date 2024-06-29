import { useState, useEffect } from 'react';
import { Appointments } from '../../interfaces/Appointments/Appointments';
import axiosInstance from '../../api/axiosConfig';

const useGetAppointmentById = (AppointmentId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [appointment, setAppointment] = useState<Appointments | null>(null);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const response = await axiosInstance.get(`Cita/${AppointmentId}`);
                setAppointment(response.data.result);
            } catch (err) {
                setError('Error al mostrar los datos de la cita');
            } finally{
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [AppointmentId]);

    return { appointment, loading, error };
};

export default useGetAppointmentById;
