import { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { Appointments } from '../../interfaces/Appointments/Appointments';

const useUpdateAppointment = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const updateAppointment = async (appointment: Appointments) => {
        setLoading(true);
        try {
            const response = await axiosInstance.put(`Cita/${appointment.iD_Cita}`, appointment);
            return response.data;
        } catch (err) {
            setError('Error al actualizar los datos de la cita');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateAppointment, loading, error };
};

export default useUpdateAppointment;
