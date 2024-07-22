import useMostRecurrentPatients from "../../../hooks/Patients/useMostRecurrentPatients";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboardList } from '@fortawesome/free-solid-svg-icons';

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
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
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
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                {reacApp.iD_Paciente}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="md:hidden mr-2">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                {reacApp.nombrePaciente}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="md:hidden mr-2">
                                    <FontAwesomeIcon icon={faClipboardList} />
                                </span>
                                {reacApp.numeroDeCitas}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableMostRecurrentPatients;