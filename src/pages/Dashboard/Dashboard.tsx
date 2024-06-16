import React from 'react';
import CardDashboard from '../../components/Cards/Dashboard/CardDashboard';
import MostCommonDiseases from '../../components/Charts/MostCommonDiseases';
import QuantityBySex from '../../components/Charts/QuantityBySex';
import TableLastAppointments from '../../components/Tables/Dashboard/TableLastAppointments';
import TableMostPrescripMed from '../../components/Tables/Dashboard/TableMostPrescripMed';
import DefaultLayout from '../../layout/DefaultLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserInjured, faCalendar, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
        <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Bienvenido, Dr. Joe Doe!
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Este es tu dashboard médico. Aquí puedes encontrar información y
          herramientas importantes para administrar tu práctica médica.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDashboard
          title="Total pacientes" 
          total="1,893" 
          Classnames='bg-cardGreen'
          borderRadius='rounded-10'
          test='bg-greenHover'
          borderRadiusTop='rounded-top'
          >
        <FontAwesomeIcon icon={faUserInjured} size="3x"/>
        </CardDashboard>

        <CardDashboard
          title="Total citas" 
          total="234" 
          Classnames='bg-cardOrange'
          borderRadius='rounded-10'
          test='bg-orangeHover'
          borderRadiusTop='rounded-top'
          >
        <FontAwesomeIcon icon={faCalendar} size="3x"/>
        </CardDashboard>

        <CardDashboard
          title="Citas pendientes" 
          total="23" 
          Classnames='bg-cardBlue'
          borderRadius='rounded-10'
          test='bg-blueHover'
          borderRadiusTop='rounded-top'
          >
        <FontAwesomeIcon icon={faCalendarDay} size="3x"/>
        </CardDashboard>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <QuantityBySex />
        <MostCommonDiseases />
        <div className="col-span-12 xl:col-span-6">
          <TableLastAppointments />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <TableMostPrescripMed />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
