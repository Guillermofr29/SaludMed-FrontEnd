import { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { Patient } from '../../interfaces/Patients/Patients';

const useAddPatient = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const addPatient = async (patient: Patient) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await axiosInstance.post('Paciente', patient);
            setSuccess(true);
        } catch (err) {
            setError('Error al agregar el paciente');
        } finally {
            setLoading(false);
        }
    };

    return { addPatient, loading, error, success };
};

export default useAddPatient;
