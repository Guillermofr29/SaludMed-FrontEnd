import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faMagnifyingGlass, faCaretLeft, faCaretRight, faTrash, faCalendarPlus, faFilter, faCalendarDay, faCalendarCheck, faCalendarXmark } from '@fortawesome/free-solid-svg-icons';
import { Appointments } from '../../../interfaces/Appointments/Appointments';
import useGetAppointments from '../../../hooks/Appointments/useGetAppointments';
import useDeleteAppointment from '../../../hooks/Appointments/useDeleteAppointments';
import { showDeleteConfirmation, showDeleteSuccessAlert, showErrorAlert } from '../../../components/Alerts/AppointmentAlert';

const itemsPerPage = 6;
const maxPageNumbers = 4;

const AppointmentsTable: React.FC = () => {
    const rol = localStorage.getItem('rolID');
    const MedicoID = localStorage.getItem('userId') || 'Id';
    const { appointments: initialAppointments, loading, error } = useGetAppointments(Number(MedicoID));
    const { deleteAppointment, error: deleteError } = useDeleteAppointment();
    const [appointments, setAppointments] = useState<Appointments[]>(initialAppointments);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterAppointments(selectedOption, event.target.value);
    };

    useEffect(() => {
        setAppointments(initialAppointments);
    }, [initialAppointments]);

    const filterAppointments = (status: string | null, query?: string) => {
        let filteredAppointments = initialAppointments;

        if (status && status !== 'Todos') {
            filteredAppointments = filteredAppointments.filter(appointment => appointment.estatus === status);
        }

        if (query && query.trim()) {
            const keywords = query.toLowerCase().split(' ');
            filteredAppointments = filteredAppointments.filter(appointment =>
                keywords.every(keyword =>
                    appointment.nombrePaciente.toLowerCase().includes(keyword)
                )
            );
        }

        setAppointments(filteredAppointments);
        setCurrentPage(0);
    };

    const handleEditAppointment = (id: number) => {
        navigate(`/citas/editar-cita/${id}`);
    };

    const handleAddAppointment = () => {
        navigate('/citas/agregar-cita');
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(appointments.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, appointments.length);
    const currentAppointments = appointments.slice(startIndex, endIndex);

    const getPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= maxPageNumbers) {
            for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const halfMaxPages = Math.floor(maxPageNumbers / 2);
            let startPage = Math.max(0, currentPage - halfMaxPages);
            let endPage = startPage + maxPageNumbers - 1;

            if (endPage >= totalPages) {
                startPage = Math.max(0, totalPages - maxPageNumbers);
                endPage = totalPages - 1;
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (startPage > 0) {
                pageNumbers.unshift('...');
            }
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }
        }
        return pageNumbers;
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

    const handleDeleteAppointment = async (id: number) => {
        const confirmed = await showDeleteConfirmation();
        if (confirmed) {
            try {
                await deleteAppointment(id);
                setAppointments(prevPatientsAppointment => prevPatientsAppointment.filter(appointment => appointment.iD_Cita !== id));
                showDeleteSuccessAlert();
            } catch (err) {
                showErrorAlert();
            }
        }
    };

    if (loading || deleteError) {
        return <p>Cargando...</p>;
    }

    if (error || deleteError) {
        return <p>{error || deleteError}</p>;
    }

    return (
        <div className="overflow-x-auto rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Historial de cita</h4>
            <div className="flex items-center justify-between flex-col flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 dark:border-strokedark dark:bg-boxdark">
                <div>
                    <button
                        id="dropdownActionButton"
                        onClick={toggleDropdown}
                        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                    >
                        {selectedOption ? selectedOption : 'Filtrar por estatus'}
                        <FontAwesomeIcon className="p-2" icon={faFilter} />
                    </button>
                    {dropdownOpen && (
                        <div
                            id="dropdownAction"
                            className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                        >
                            <ul
                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownActionButton"
                            >
                                <li>
                                    <a
                                        className="block px-4 py-2 hover:bg-gray dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => handleOptionClick('Todos')}
                                    >
                                        Todos
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="block px-4 py-2 hover:bg-gray dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => handleOptionClick('Terminada')}
                                    >
                                        Terminada
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="block px-4 py-2 hover:bg-gray dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => handleOptionClick('Pendiente')}
                                    >
                                        Pendiente
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="block px-4 py-2 hover:bg-gray dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => handleOptionClick('Cancelada')}
                                    >
                                        Cancelada
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon className="p-2" icon={faMagnifyingGlass} />
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        className="block w-80 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar cita por nombre del paciente"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <button
                    onClick={handleAddAppointment}
                    className="ml-4 inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-cardGreen rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Agendar Cita
                    <FontAwesomeIcon className="p-2" icon={faCalendarPlus} />
                </button>

                <div className="flex items-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="mx-1 px-3 py-1 border rounded cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </button>
                    {getPageNumbers().map((page, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(typeof page === 'number' ? page : currentPage)}
                            className={`mx-1 px-3 py-1 border rounded cursor-pointer ${currentPage === page ? 'bg-black text-white dark:text-black dark:bg-white' : ''}`}
                        >
                            {page === '...' ? '...' : (typeof page === 'number' ? `${page + 1}` : '')}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        className="mx-1 px-3 py-1 border rounded cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faCaretRight} />
                    </button>
                </div>
            </div>
            {currentAppointments.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">Cita no encontrada.</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cita No.
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Paciente
                            </th>
                            {rol === '2' && (
                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                    Médico
                                </th>
                            )}
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                Fecha
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                Hora
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                Motivo
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                Notas
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                Estatus
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-center divide-gray-200 dark:divide-gray-700">
                        {currentAppointments.map((appointment) => (
                            <tr key={appointment.iD_Cita} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    CIT{appointment.iD_Cita}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {appointment.nombrePaciente}
                                </td>
                                {rol === '2' && (
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                                        {appointment.nombreMedico}
                                    </td>
                                )}
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                    {formatFecha(appointment.fecha)}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                    {appointment.hora}
                                </td>
                                <td className="px-4 py-4 whitespace-normal text-sm text-gray-500 hidden lg:table-cell">
                                    {appointment.motivo}
                                </td>
                                <td className="px-4 py-4 whitespace-normal text-sm text-gray-500 hidden lg:table-cell">
                                    {appointment.notas}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
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
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button className="text-meta-5" onClick={() => appointment.iD_Cita && handleEditAppointment(appointment.iD_Cita)}>
                                        <FontAwesomeIcon className="p-2" icon={faPenToSquare} />
                                    </button>
                                    <button className="text-meta-1" onClick={() => appointment.iD_Cita && handleDeleteAppointment(appointment.iD_Cita)}>
                                        <FontAwesomeIcon className="p-2" icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AppointmentsTable;
