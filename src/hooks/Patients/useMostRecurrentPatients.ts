import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { MostRecurrentPatients } from '../../interfaces/Patients/MostRecurrentPatients';

const useMostRecurrentPatients = (medicoID: number, rolID:number) => {
    const [recurrentPatients, setRecurrentPatients] = useState<MostRecurrentPatients[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecurrentPatients = async () => {
            try {
                const response = await axiosInstance.get(`Paciente/PacientesMasRecurrentes?medicoID=${medicoID}&rolID=${rolID}`);
                const formattedData = response.data.result.map((item: any) => ({
                    iD_Paciente: item.iD_Paciente,
                    nombrePaciente: item.nombrePaciente,
                    numeroDeCitas: item.numeroDeCitas,
                }));
                setRecurrentPatients(formattedData);
            } catch (err) {
                setError('Error al obtener los pacientes mas recurrentes');
            } finally {
                setLoading(false);
            }
        };

        fetchRecurrentPatients();
    }, [medicoID, rolID]);

    return { recurrentPatients, loading, error };
};

export default useMostRecurrentPatients;
