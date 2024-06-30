import { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { AppointmentAddi } from '../../interfaces/Appointments/AppointmentAdd';

const useAddAppointment = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const addAppointment = async (appointment: AppointmentAddi) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await axiosInstance.post('Cita', appointment);
            setSuccess(true);
        } catch (err) {
            setError('Error al agregar la cita');
        } finally {
            setLoading(false);
        }
    };

    return { addAppointment, loading, error, success };
};

export default useAddAppointment;
