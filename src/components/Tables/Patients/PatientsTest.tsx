// import {useState, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare, faUserPlus, faMagnifyingGlass, faCaretLeft, faCaretRight, faTrash, faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import ReactPaginate from 'react-paginate';
// import useGetPatients from '../../../hooks/Patients/useGetPatients';

// const itemsPerPage = 6;

// const PatientTable: React.FC = () => {

//     const { Patient: initialPatients, loading, error } = useGetPatients();
//     const [patients, setPatients] = useState(initialPatients); // Estado para todos los pacientes
//     const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

//     // const [dropdownOpen, setDropdownOpen] = useState(false);
//     // const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState(0);
//     const navigate = useNavigate();

//     // const toggleDropdown = () => {
//     //     setDropdownOpen(!dropdownOpen);
//     // };

//     // const handleOptionClick = (option: string) => {
//     //     setSelectedOption(option);
//     //     setDropdownOpen(false);
//     // };

//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//         filterPatients(event.target.value); // Llamar a función de filtrado
//     };

//     useEffect(() => {
//         setPatients(initialPatients); // Actualizar pacientes cuando cambie initialPatients
//     }, [initialPatients]);

//     const filterPatients = (query: string) => {
//         if (!query.trim()) {
//             setPatients(initialPatients); // Si no hay búsqueda, mostrar todos los pacientes
//         } else {
//             const filteredPatients = initialPatients.filter(patient =>
//                 patient.nombre.toLowerCase().includes(query.toLowerCase())
//             );
//             setPatients(filteredPatients);
//         }
//         setCurrentPage(0); // Resetear página actual al realizar una búsqueda
//     };

//     const handleAddPatient = () => {
//         navigate('/pacientes/patients-add');
//     };

//     const handleEditPatient = (id: number) => {
//         navigate(`/pacientes/editar-paciente/${id}`);
//     };

//     const handlePageClick = (selectedItem: { selected: number }) => {
//         setCurrentPage(selectedItem.selected);
//     };

//     const offset = currentPage * itemsPerPage;
//     const currentPatients = patients.slice(offset, offset + itemsPerPage);

//     if (loading) {
//         return <p>Cargando...</p>;
//     }
    
//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div className="overflow-x-auto rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//             <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
//                 Listado de Pacientes
//             </h4>
//             <div className="flex items-center justify-between flex-col flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 dark:border-strokedark dark:bg-boxdark">
//                 {/* <div>
//                     <button
//                         id="dropdownActionButton"
//                         onClick={toggleDropdown}
//                         className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//                         type="button"
//                     >
//                         {selectedOption ? selectedOption : 'Filtrar por'}
//                         <FontAwesomeIcon className="p-2" icon={faCaretDown} />
//                     </button>
//                     {dropdownOpen && (
//                         <div
//                             id="dropdownAction"
//                             className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
//                         >
//                             <ul
//                                 className="py-1 text-sm text-gray-700 dark:text-gray-200"
//                                 aria-labelledby="dropdownActionButton"
//                             >
//                                 <li>
//                                     <a
//                                         href="#"
//                                         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                                         onClick={() => handleOptionClick('Ascendente (A-Z)')}
//                                     >
//                                         Ascendente (A-Z)
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <a
//                                         href="#"
//                                         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                                         onClick={() => handleOptionClick('Descendente (Z-A)')}
//                                     >
//                                         Descendente (Z-A)
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     )}
//                 </div> */}
//                 {/* <label htmlFor="table-search" className="sr-only">
//                     Search
//                 </label> */}
//                 <div className="relative">
//                     <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                         <FontAwesomeIcon className="p-2" icon={faMagnifyingGlass} />
//                     </div>
//                     <input
//                         type="text"
//                         id="table-search-users"
//                         className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="Buscar paciente por nombre"
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                 </div>
//                 <button
//                     onClick={handleAddPatient}
//                     className="ml-4 inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-cardGreen rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                     Agregar paciente
//                     <FontAwesomeIcon className="p-2" icon={faUserPlus} />
//                 </button>

//                 <ReactPaginate
//                     previousLabel={<FontAwesomeIcon icon={faCaretLeft} />}
//                     nextLabel={<FontAwesomeIcon icon={faCaretRight} />}
//                     breakLabel={'...'}
//                     pageCount={Math.ceil(patients.length / itemsPerPage)}
//                     marginPagesDisplayed={2}
//                     pageRangeDisplayed={3}
//                     onPageChange={handlePageClick}
//                     containerClassName={'flex justify-center mt-4'}
//                     pageClassName={'mx-1 px-3 py-1 border rounded cursor-pointer'}
//                     activeClassName={'bg-black text-white dark:text-black dark:bg-white'}
//                     previousClassName={'mx-1 px-3 py-1 border rounded cursor-pointer'}
//                     nextClassName={'mx-1 px-3 py-1 border rounded cursor-pointer'}
//                     breakClassName={'mx-1 px-3 py-1 border rounded cursor-pointer'}
//                 />

//             </div>
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                 <thead className="bg-gray-50 dark:bg-gray-800">
//                     <tr>
//                         <th
//                             scope="col"
//                             className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                             ID
//                         </th>
//                         <th
//                             scope="col"
//                             className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                             Nombre
//                         </th>
//                         <th
//                             scope="col"
//                             className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                             Apellidos
//                         </th>
//                         <th
//                             scope="col"
//                             className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                             Sexo
//                         </th>
//                         <th
//                             scope="col"
//                             className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                             Edad
//                         </th>
//                         <th
//                             scope="col"
//                             className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                             Peso
//                         </th>
//                         <th
//                             scope="col"
//                             className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                             Estatura
//                         </th>
//                         <th
//                             scope="col"
//                             className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                             Teléfono
//                         </th>
//                         {/* <th
//                             scope="col"
//                             className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                             Domicilio
//                         </th> */}
//                         <th
//                             scope="col"
//                             className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                             Acciones
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody className="divide-y text-center divide-gray-200 dark:divide-gray-700">
//                     {currentPatients.map((patient) => (
//                         <tr
//                             key={patient.iD_Paciente}
//                             className="hover:bg-gray-50 dark:hover:bg-gray-700"
//                         >
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {patient.iD_Paciente}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {patient.nombre}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {patient.apellido}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {patient.sexo}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {patient.edad}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {patient.peso}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {patient.estatura}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {patient.telefono}
//                             </td>
//                             {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {patient.domicilio}
//                             </td> */}
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 <button className="text-meta-5" onClick={() => handleEditPatient(patient.iD_Paciente)}>
//                                     <FontAwesomeIcon className="p-2" icon={faPenToSquare} />
//                                 </button>
//                                 <button className="text-meta-1">
//                                     <FontAwesomeIcon className="p-2" icon={faTrash} />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default PatientTable;
