import { MostRecurrentPatients } from '../../../interfaces/Patients/MostRecurrentPatients';

const MostRecurrentPatientsData: MostRecurrentPatients[] = [
    {
        NoPaciente: 'PAC001',
        Paciente: 'Joe Doe',
        NoVisitas: 12,
    },
    {
        NoPaciente: 'PAC002',
        Paciente: 'Joe Doe',
        NoVisitas: 12,
    },
    {
        NoPaciente: 'PAC003',
        Paciente: 'Joe Doe',
        NoVisitas: 12,
    },
    {
        NoPaciente: 'PAC004',
        Paciente: 'Joe Doe',
        NoVisitas: 12,
    }
];

const TableMostRecurrentPatients = () => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Pacientes mas recurrentes
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium xsm:text-base">
                            No.Paciente
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium xsm:text-base">
                            Nombre
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium xsm:text-base">
                            No. Visitas
                        </h5>
                    </div>
                </div>

                {MostRecurrentPatientsData.map((MostRecurrentPatients, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-3 ${key === MostRecurrentPatientsData.length - 1
                                ? ''
                                : 'border-b border-stroke dark:border-strokedark'
                            }`}
                        key={key}
                    >
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">
                                {MostRecurrentPatients.NoPaciente}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{MostRecurrentPatients.Paciente}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{MostRecurrentPatients.NoVisitas}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableMostRecurrentPatients;
