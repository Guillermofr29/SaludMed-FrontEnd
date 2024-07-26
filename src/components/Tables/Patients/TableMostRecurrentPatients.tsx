import useMostRecurrentPatients from "../../../hooks/Patients/useMostRecurrentPatients";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboardList, faIdCard } from '@fortawesome/free-solid-svg-icons';

const TableMostRecurrentPatients = () => {
    const MedicoID = localStorage.getItem('userId') || 'Id';
    const rolID = localStorage.getItem('rolID') || 'rolID';

    const { recurrentPatients, loading, error } = useMostRecurrentPatients(Number(MedicoID), Number(rolID));

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="overflow-x-auto rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-center text-black dark:text-white">
                Pacientes más recurrentes
            </h4>
            <div className="hidden md:block"> {/* Tabla para pantallas medianas y grandes */}
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                No.Paciente
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                No. Visitas
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-center divide-gray-200 dark:divide-gray-700">
                        {recurrentPatients.map((reacApp) => (
                            <tr key={reacApp.iD_Paciente} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {reacApp.iD_Paciente}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {reacApp.nombrePaciente}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {reacApp.numeroDeCitas}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="md:hidden"> {/* Diseño de tarjetas para móviles */}
                {recurrentPatients.map((reacApp) => (
                    <div key={reacApp.iD_Paciente} className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                                No.Paciente: {reacApp.iD_Paciente}
                            </span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                {reacApp.nombrePaciente}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                                No. Visitas: {reacApp.numeroDeCitas}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableMostRecurrentPatients;