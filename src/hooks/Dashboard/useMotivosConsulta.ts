import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';

interface MotivoConsulta {
    motivo: string;
    numeroDeVeces: number;
}

const useMotivosConsulta = () => {
    const [data, setData] = useState<MotivoConsulta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMotivosConsulta = async () => {
            try {
                const response = await axiosInstance.get('/Cita/CincoMotivosConsultaMasComunes');
                setData(response.data.result);
            } catch (err) {
                setError('Error al obtener los motivos de consulta más comunes');
            } finally {
                setLoading(false);
            }
        };

        fetchMotivosConsulta();
    }, []);

    return { data, loading, error };
};

export default useMotivosConsulta;
