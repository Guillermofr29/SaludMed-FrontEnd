import { useState, useEffect } from 'react';
import { Patient } from '../../interfaces/Patients/Patients';
import axiosInstance from '../../api/axiosConfig';

const useFetchPatient = (patientId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axiosInstance.get(`Paciente/${patientId}`);
                setPatient(response.data.result);
            } catch (err) {
                setError('Error al mostrar los datos del paciente');
            } finally{
                setLoading(false);
            }
        };

        fetchPatient();
    }, [patientId]);

    return { patient, loading, error };
};

export default useFetchPatient;
