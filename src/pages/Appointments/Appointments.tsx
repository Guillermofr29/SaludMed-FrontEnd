import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CalendarWrapper from '../../components/Calendar/CalendarWrapper';
import AppointmentsTable from '../../components/Tables/Appointments/TableAppointments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons';
import useGetAppointments from '../../hooks/Appointments/useGetAppointments';
import useGetNextAppointments from '../../hooks/Appointments/useGetNextAppointments';
import { nextAppointments } from '../../interfaces/Appointments/nextAppointments';

interface DashboardProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Appointments: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
    const medicoID = localStorage.getItem('userId') || 'Id';
    const rolID = localStorage.getItem('rolID') || 'rolID'
    const { appointments, loading, error } = useGetAppointments(Number(medicoID));
    const { nextAppointments, loading: loadingNext, error: errorNext } = useGetNextAppointments(Number(medicoID), Number(rolID));

    const formatFecha = (fecha: string) => {
        const [year, month, day] = fecha.split('-');
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        const formattedDay = String(date.getDate()).padStart(2, '0');
        const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
        const formattedYear = date.getFullYear();
        return `${formattedDay}-${formattedMonth}-${formattedYear}`;
    };

    if (loading || loadingNext) {
        return <p>Cargando citas...</p>;
    }

    if (error || errorNext) {
        return <p>{error || errorNext}</p>;
    }

    return (
        <DefaultLayout setIsAuthenticated={setIsAuthenticated}>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    Citas
                    <FontAwesomeIcon className='pl-2' icon={faCalendarDays} />
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Este es tu apartado de Citas. Aquí puedes encontrar información y
                    herramientas importantes para administrar a tus citas.
                </p>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <div className="col-span-12 xl:col-span-6 pb-6 flex justify-center items-center">
                    <CalendarWrapper appointments={appointments} />
                </div>

                <div className="col-span-12 xl:col-span-6 pb-6">
                    <div className="rounded-lg bg-white shadow-md dark:border-strokedark dark:bg-boxdark">
                        <h2 className="text-lg sm:text-xl text-center font-semibold text-gray-800 dark:text-white bg-gray-200 py-2 sm:py-3 px-4 sm:px-6 rounded-t-lg">
                            Próximas citas
                        </h2>
                        <ul className="divide-y divide-gray-300">
                            {nextAppointments.map((appointment: nextAppointments, index: number) => (
                                <li key={`${appointment.ID_Cita}-${index}`} className="py-3 sm:py-4 px-4 sm:px-6">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                        <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-white mb-1 sm:mb-0">
                                            {appointment.nombrePaciente}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                            {formatFecha(appointment.fecha)}
                                            <FontAwesomeIcon className='pl-1' icon={faCalendarDay} /> |
                                            {appointment.hora} hrs
                                            <FontAwesomeIcon className='pl-1' icon={faClock} />
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <AppointmentsTable />
        </DefaultLayout>
    );
};

export default Appointments;
