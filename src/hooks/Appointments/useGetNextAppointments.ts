import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { nextAppointments } from '../../interfaces/Appointments/nextAppointments';

const useGetNextAppointments = () => {
    const [nextAppointments, setNextAppointments] = useState<nextAppointments[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axiosInstance.get('Cita/ProximasCitas');
                setNextAppointments(response.data.result);
            } catch (err) {
                setError('Error al obtener las citas');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return { nextAppointments, loading, error};
};

export default useGetNextAppointments;