import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faUserPlus, faMagnifyingGlass, faCaretLeft, faCaretRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import useGetPatients from '../../../hooks/Patients/useGetPatients';
import { Patient } from '../../../interfaces/Patients/Patients';
import { showDeleteConfirmation, showDeleteSuccessAlert, showErrorAlert } from '../../../components/Alerts/PatientAlert'; // Importa las funciones de alerta

const itemsPerPage = 6;

const PatientTable: React.FC = () => {
    const { patients: initialPatients, loading, error, deletePatient } = useGetPatients();
    const [patients, setPatients] = useState<Patient[]>(initialPatients);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterPatients(event.target.value);
    };

    useEffect(() => {
        setPatients(initialPatients);
    }, [initialPatients]);

    const filterPatients = (query: string) => {
        if (!query.trim()) {
            setPatients(initialPatients);
        } else {
            const filteredPatients = initialPatients.filter(patient => {
                const keywords = query.toLowerCase().split(' ');
                return keywords.every(keyword =>
                    patient.nombre.toLowerCase().includes(keyword) ||
                    patient.apellido.toLowerCase().includes(keyword)
                );
            });
            setPatients(filteredPatients);
        }
        setCurrentPage(0);
    };

    const handleAddPatient = () => {
        navigate('/pacientes/agregar-paciente');
    };

    const handleEditPatient = (id: number) => {
        navigate(`/pacientes/editar-paciente/${id}`);
    };

    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const handleDeletePatient = async (id: number) => {
        const confirmed = await showDeleteConfirmation();
        if (confirmed) {
            try {
                await deletePatient(id);
                setPatients(prevPatients => prevPatients.filter(patient => patient.iD_Paciente !== id));
                showDeleteSuccessAlert();
            } catch (err) {
                showErrorAlert();
            }
        }
    };

    const offset = currentPage * itemsPerPage;
    const currentPatients = patients.slice(offset, offset + itemsPerPage);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="overflow-x-auto rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Listado de Pacientes
            </h4>
            <div className="flex items-center justify-between flex-col flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 dark:border-strokedark dark:bg-boxdark">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon className="p-2" icon={faMagnifyingGlass} />
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        className="block w-80 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar paciente por nombre o apellido"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <button
                    onClick={handleAddPatient}
                    className="ml-4 inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-cardGreen rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Agregar paciente
                    <FontAwesomeIcon className="p-2" icon={faUserPlus} />
                </button>

                <ReactPaginate
                    previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
                    nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
                    breakLabel={'...'}
                    pageCount={Math.ceil(patients.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'flex justify-center mt-4'}
                    pageClassName={'mx-1 px-3 py-1 border rounded cursor-pointer'}
                    activeClassName={'bg-black text-white dark:text-black dark:bg-white'}
                    previousClassName={'mx-1 px-3 py-1 border rounded cursor-pointer'}
                    nextClassName={'mx-1 px-3 py-1 border rounded cursor-pointer'}
                    breakClassName={'mx-1 px-3 py-1 border rounded cursor-pointer'}
                />

            </div>
            {currentPatients.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">Paciente no encontrado.</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Apellidos
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sexo
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Edad
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Peso
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estatura
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Teléfono
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-center divide-gray-200 dark:divide-gray-700">
                        {currentPatients.map((patient) => (
                            <tr key={patient.iD_Paciente} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {patient.iD_Paciente}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {patient.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {patient.apellido}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {patient.sexo}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {patient.edad}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {patient.peso}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {patient.estatura}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {patient.telefono}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button className="text-meta-5" onClick={() => handleEditPatient(patient.iD_Paciente)}>
                                        <FontAwesomeIcon className="p-2" icon={faPenToSquare} />
                                    </button>
                                    <button className="text-meta-1" onClick={() => handleDeletePatient(patient.iD_Paciente)}>
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

export default PatientTable;
