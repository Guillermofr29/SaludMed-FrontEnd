import { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';

const useDeleteAppointment = () => {
    const [error, setError] = useState<string | null>(null);

    const deleteAppointment = async (id: number) => {
        try {
            await axiosInstance.delete(`Cita/${id}`);
        } catch (err) {
            setError('Error al eliminar la cita');
        }
    };

    return { deleteAppointment, error };
};

export default useDeleteAppointment;
