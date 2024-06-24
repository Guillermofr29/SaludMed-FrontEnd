import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import PatientTable from '../../components/Tables/Patients/TablePatients';
import TableMostRecurrentPatients from '../../components/Tables/Patients/TableMostRecurrentPatients';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserInjured } from '@fortawesome/free-solid-svg-icons';
import CardDataPatients from '../../components/Cards/Patients/CardDataPatients';

const Patients: React.FC = () => {
    return (
        <DefaultLayout>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    Pacientes
                    <FontAwesomeIcon icon={faUserInjured} />
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Este es tu apartado de Pacientes. Aquí puedes encontrar información y
                    herramientas importantes para administrar a tus pacientes.
                </p>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <div className="col-span-12 xl:col-span-6 pb-6">
                    <TableMostRecurrentPatients />
                </div>

                <div className="col-span-12 xl:col-span-6 pb-6">
                    <CardDataPatients title="Pacientes hoy" total="17" rate="+0.43% Semana anterior" levelUp>
                        <FontAwesomeIcon icon={faUserInjured} size="3x" />
                    </CardDataPatients>

                    <CardDataPatients title="Paceintes este mes" total="78" rate="-0.95% Mes pasado" levelDown>
                        <FontAwesomeIcon icon={faUserInjured} size="3x" />
                    </CardDataPatients>
                </div>
            </div>
            <PatientTable />
        </DefaultLayout>
    );
};

export default Patients;
