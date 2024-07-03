import { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { Patient } from '../../interfaces/Patients/Patients';

const useUpdatePatient = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const updatePatient = async (patient: Patient) => {
        setLoading(true);
        try {
            const response = await axiosInstance.put(`Paciente/${patient.iD_Paciente}`, patient);
            return response.data;
        } catch (err) {
            setError('Error al actualizar el paciente');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updatePatient, loading, error };
};

export default useUpdatePatient;
