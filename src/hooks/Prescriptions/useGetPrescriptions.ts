import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { PrescriptionTableI } from '../../interfaces/Prescription/PrescripTable';

const useGetPrescriptions = (medicoID:number, rolID: number) => {
    const [prescriptions, setPrescriptions] = useState<PrescriptionTableI[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axiosInstance.get(`Recetas/Recetas?medicoID=${medicoID}&rolID=${rolID}`);
                setPrescriptions(response.data.result);
            } catch (err) {
                setError('Error al obtener las citas');
            } finally {
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, [medicoID, rolID]);

    return { prescriptions, loading, error};
};

export default useGetPrescriptions;
