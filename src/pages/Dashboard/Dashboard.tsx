import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
        <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Hola mundo
        </h1>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
