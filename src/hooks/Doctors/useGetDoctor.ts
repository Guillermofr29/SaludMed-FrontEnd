import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { DoctorData } from '../../interfaces/Doctors/Doctor';

const useGetDoctor = (AppointmentId: number) => {
    const [doctor, setDoctor] = useState<DoctorData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axiosInstance.get(`Medicos/${AppointmentId}`);
                setDoctor(response.data.result);
            } catch (err) {
                setError('Error al obtener los datos del médico');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, []);

    return { doctor, loading, error };
};

export default useGetDoctor;
