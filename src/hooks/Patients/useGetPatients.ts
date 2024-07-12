import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { Patient } from '../../interfaces/Patients/Patients';

const useGetPatients = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axiosInstance.get(`Paciente`);
                setPatients(response.data.result);
            } catch (err) {
                setError('Error al obtener los pacientes');
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    const deletePatient = async (id: number) => {
        try {
            await axiosInstance.delete(`Paciente/${id}`);
            setPatients(prevPatients => prevPatients.filter(patient => patient.iD_Paciente !== id));
        } catch (err) {
            setError('Error al eliminar el paciente');
        }
    };

    return { patients, loading, error, deletePatient };
};

export default useGetPatients;
