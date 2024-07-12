import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { Doctor } from '../../interfaces/Doctors/Doctors';

const useGetDoctors = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axiosInstance.get(`Medicos`);
                setDoctors(response.data.result);
            } catch (err) {
                setError('Error al obtener los médicos');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    // const deletePatient = async (id: number) => {
    //     try {
    //         await axiosInstance.delete(`Paciente/${id}`);
    //         setDoctors(prevPatients => prevPatients.filter(patient => patient.iD_Paciente !== id));
    //     } catch (err) {
    //         setError('Error al eliminar el paciente');
    //     }
    // };

    return { doctors, loading, error, /*deletePatient*/ };
};

export default useGetDoctors;
