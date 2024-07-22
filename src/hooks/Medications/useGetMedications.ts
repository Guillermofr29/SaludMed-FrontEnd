import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { Medications } from '../../interfaces/Medications/Medications';

const useGetMedications = () => {
    const [medications, setMedications] = useState<Medications[]>([]);
    const [loadingMedi, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const response = await axiosInstance.get(`Medicamentos`);
                setMedications(response.data.result);
            } catch (err) {
                setError('Error al obtener los médicos');
            } finally {
                setLoading(false);
            }
        };

        fetchMedications();
    }, []);

    return { medications, loadingMedi, error };
};

export default useGetMedications;
