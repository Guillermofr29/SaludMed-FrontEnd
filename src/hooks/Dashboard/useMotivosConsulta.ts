import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';

interface MotivoConsulta {
    motivo: string;
    numeroDeVeces: number;
}

const useMotivosConsulta = (medicoID: number) => {
    const [data, setData] = useState<MotivoConsulta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMotivosConsulta = async () => {
            try {
                const response = await axiosInstance.get(`/Cita/CincoMotivosConsultaMasComunes?medicoID=${medicoID}`);
                setData(response.data.result);
            } catch (err) {
                setError('Error al obtener los motivos de consulta más comunes');
            } finally {
                setLoading(false);
            }
        };

        fetchMotivosConsulta();
    }, [medicoID]);

    return { data, loading, error };
};

export default useMotivosConsulta;
