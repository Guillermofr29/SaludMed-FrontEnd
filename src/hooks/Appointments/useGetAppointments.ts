import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { Appointments } from '../../interfaces/Appointments/Appointments';

const useGetAppointments = (medicoID: number) => {
    const [appointments, setAppointments] = useState<Appointments[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axiosInstance.get(`Cita/medico/${medicoID}`);
                setAppointments(response.data.result);
            } catch (err) {
                setError(`Error al obtener las citas`);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [medicoID]);

    return { appointments, loading, error, setAppointments };
};

export default useGetAppointments;
