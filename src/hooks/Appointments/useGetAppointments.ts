import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { Appointments } from '../../interfaces/Appointments/Appointments';

const useGetAppointments = () => {
    const [appointments, setAppointments] = useState<Appointments[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axiosInstance.get('Cita');
                setAppointments(response.data.result);
            } catch (err) {
                setError('Error al obtener las citas');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return { appointments, loading, error, setAppointments };
};

export default useGetAppointments;
