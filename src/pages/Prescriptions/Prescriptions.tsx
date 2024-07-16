import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import PrescriptionTable from '../../components/Tables/Prescriptions/TablePrescriptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserInjured } from '@fortawesome/free-solid-svg-icons';

interface DashboardProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Prescriptions: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
  return (
    <DefaultLayout setIsAuthenticated={setIsAuthenticated}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Recetas
          <FontAwesomeIcon className='pl-2' icon={faUserInjured} />
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Este es tu apartado de Recetas. Aquí puedes gestionar las recetas de cada cita de tus pacientes, así como acceder a herramientas importantes.
        </p>

      </div>
      <PrescriptionTable />
    </DefaultLayout>
  );
};

export default Prescriptions;
