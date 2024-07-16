import { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';

const useDeletePrescriptions = () => {
    const [error, setError] = useState<string | null>(null);

    const deletePrescription = async (id: number) => {
        try {
            await axiosInstance.delete(`Recetas/${id}`);
        } catch (err) {
            setError('Error al eliminar la receta');
        }
    };

    return { deletePrescription, error };
};

export default useDeletePrescriptions;
