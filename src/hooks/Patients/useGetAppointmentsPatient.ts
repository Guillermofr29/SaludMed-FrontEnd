import { useState, useEffect } from 'react';
import { Appointments } from '../../interfaces/Appointments/Appointments';
import axiosInstance from '../../api/axiosConfig';

const useGetAppointmentByIdPatient = (pacienteID: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [appointmentsPatient, setAppointment] = useState<Appointments[]>([]);

    useEffect(() => {
        const fetchAppointmentsPatient = async () => {
            try {
                const response = await axiosInstance.get(`Cita/paciente/${pacienteID}`);
                setAppointment(response.data.result);
            } catch (err) {
                setError(`Error al mostrar la cita del paciente con el id ${pacienteID}`);
            } finally{
                setLoading(false);
            }
        };

        fetchAppointmentsPatient();
    }, [pacienteID]);

    return { appointmentsPatient, loading, error };
};

export default useGetAppointmentByIdPatient;
