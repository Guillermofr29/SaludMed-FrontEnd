import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetAppointmentByIdPatient from '../../hooks/Patients/useGetAppointmentsPatient';
import DefaultLayout from '../../layout/DefaultLayout';
import { Appointments } from '../../interfaces/Appointments/Appointments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarCheck, faCalendarDay, faCalendarXmark, faComment, faEnvelope, faFilter } from '@fortawesome/free-solid-svg-icons';
import emailjs from 'emailjs-com';
import { showConfirmationAlert, showSuccessAlert, showErrorAlert } from '../../components/Alerts/SendMsjAlert';


interface DashboardProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const PatientAppointments: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
    const { id } = useParams<{ id?: string }>();
    const patientId = id ? parseInt(id) : undefined;
    const navigate = useNavigate();
    const { appointmentsPatient: initialAppointments, loading, error } = useGetAppointmentByIdPatient(Number(patientId));


    //
    const [appointmentsPatient, setAppointments] = useState<Appointments[]>(initialAppointments);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>('Pendiente');

    const formatFecha = (fecha: string) => {
        const [year, month, day] = fecha.split('-');
        // Crear una fecha sin considerar la zona horaria local
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        const formattedDay = String(date.getDate()).padStart(2, '0');
        const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
        const formattedYear = date.getFullYear();
        return `${formattedDay}-${formattedMonth}-${formattedYear}`;
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setDropdownOpen(false);

        filterAppointments(option);
    };

    useEffect(() => {
        filterAppointments('Pendiente');
    }, [initialAppointments]);

    const filterAppointments = (status: string | null) => {
        let filteredAppointments = initialAppointments;

        if (status && status !== 'Todos') {
            filteredAppointments = filteredAppointments.filter(appointment => appointment.estatus === status);
        }

        // if (query && query.trim()) {
        //     const keywords = query.toLowerCase().split(' ');
        //     filteredAppointments = filteredAppointments.filter(appointment =>
        //         keywords.every(keyword =>
        //             appointment.nombrePaciente.toLowerCase().includes(keyword)
        //         )
        //     );
        // }

        setAppointments(filteredAppointments);
    };

    const sendEmail = async (appointment: Appointments) => {
        const confirmSend = await showConfirmationAlert();
        if (confirmSend) {
            const templateParams = {
                nombrePaciente: appointment.nombrePaciente,
                fecha: formatFecha(appointment.fecha),
                hora: appointment.hora,
                motivo: appointment.motivo,
                nombreMedico: appointment.nombreMedico,
                email: appointment.correo,
            };

            emailjs.send('service_fw1f0dd', 'template_tdzgz29', templateParams, '9iGP5GktXg2sET95d')
                .then((response) => {
                    showSuccessAlert();
                    console.log('Correo enviado correctamente', response);
                })
                .catch((error) => {
                    showErrorAlert();
                    console.error('Error al enviar el correo', error);
                });
        }
    };

    const getStatusClassName = (status: string) => {
        switch (status) {
            case 'Terminada':
                return 'bg-success p-1 text-white rounded-5';
            case 'Pendiente':
                return 'bg-warning p-1 text-white rounded-5';
            case 'Cancelada':
                return 'bg-danger p-1 text-white rounded-5';
            default:
                return '';
        }
    };

    if (loading) {
        return <div>Cargando citas...</div>;
    }

    if (error) {
        return <div>Error al cargar las citas: {error}</div>;
    }

    return (
        <DefaultLayout setIsAuthenticated={setIsAuthenticated}>
            <div className="overflow-x-auto rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Citas del paciente {appointmentsPatient && appointmentsPatient.length > 0 ? appointmentsPatient[0].nombrePaciente : ''}</h4>
                <div className='pb-3 flex justify-between items-center relative'>
                    <button
                        id="dropdownActionButton"
                        onClick={toggleDropdown}
                        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-boxdark dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                    >
                        Filtrar por:
                        {selectedOption ? selectedOption : 'Filtrar por estatus'}
                        <FontAwesomeIcon className="p-2" icon={faFilter} />
                    </button>
                    {dropdownOpen && (
                        <div
                            id="dropdownAction"
                            className="absolute border left-0 top-full mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-boxdark dark:divide-gray-600"
                        >
                            <ul
                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownActionButton"
                            >
                                <li>
                                    <a
                                        className="block px-4 py-2 hover:bg-gray  dark:hover:bg-gray-600 dark:hover:text-boxdark"
                                        onClick={() => handleOptionClick('Todos')}
                                    >
                                        Todos
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="block px-4 py-2 hover:bg-gray dark:hover:bg-gray-600 dark:hover:text-boxdark"
                                        onClick={() => handleOptionClick('Terminada')}
                                    >
                                        Terminada
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="block px-4 py-2 hover:bg-gray dark:hover:bg-gray-600 dark:hover:text-boxdark"
                                        onClick={() => handleOptionClick('Pendiente')}
                                    >
                                        Pendiente
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="block px-4 py-2 hover:bg-gray dark:hover:bg-gray-600 dark:hover:text-boxdark"
                                        onClick={() => handleOptionClick('Cancelada')}
                                    >
                                        Cancelada
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                    <button
                        className="flex rounded border border-stroke py-2 px-4 font-medium text-black hover:shadow-1 dark:text-white dark:border-gray-500"
                        type="button"
                        onClick={() => navigate(`/pacientes/editar-paciente/${patientId}`)}>
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 mt-1" />
                        Regresar
                    </button>
                </div>

                {!appointmentsPatient || appointmentsPatient.length === 0 ? (
                    <p className="mb-6 text-center text-black dark:text-white">No hay citas</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha
                                </th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hora
                                </th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Motivo
                                </th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Médico
                                </th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estatus
                                </th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Notificar
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 dark:bg-boxdark">
                            {appointmentsPatient.map((appointment: Appointments) => (
                                <tr key={appointment.iD_Cita}>
                                    <td className="text-center px-4 py-4 whitespace-nowrap">{formatFecha(appointment.fecha)}</td>
                                    <td className="text-center px-4 py-4 whitespace-nowrap">{appointment.hora}</td>
                                    <td className="text-center px-4 py-4 whitespace-nowrap">{appointment.motivo}</td>
                                    <td className="text-center px-4 py-4 whitespace-nowrap">{appointment.nombreMedico}</td>
                                    <td className="text-center px-4 py-4 whitespace-nowrap ">
                                        <p className={`${getStatusClassName(appointment.estatus)}`}>
                                            <span className="pr-1">
                                                {appointment.estatus === 'Pendiente' && (
                                                    <FontAwesomeIcon icon={faCalendarDay} opacity="0.8" />
                                                )}
                                                {appointment.estatus === 'Terminada' && (
                                                    <FontAwesomeIcon icon={faCalendarCheck} opacity="0.8" />
                                                )}
                                                {appointment.estatus === 'Cancelada' && (
                                                    <FontAwesomeIcon icon={faCalendarXmark} opacity="0.8" />
                                                )}
                                            </span>
                                            {appointment.estatus}
                                        </p>
                                    </td>
                                    <td className="px-4 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-meta-5" onClick={() => sendEmail(appointment)}>
                                            <FontAwesomeIcon className="p-2" icon={faEnvelope} />
                                        </button>
                                        <button className="text-meta-1" >
                                            <FontAwesomeIcon className="p-2" icon={faComment} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </DefaultLayout >
    );
};

export default PatientAppointments;
