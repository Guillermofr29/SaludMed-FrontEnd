import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard/Dashboard';

import Patients from './pages/Patients/Patients';
import PatientEdit from './pages/Patients/PatientEdit';
import PatientAdd from './pages/Patients/PatientAdd';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Inicio | SaludMed" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/pacientes"
          element={
            <>
              <PageTitle title="Pacientes | SaludMed" />
              <Patients />
            </>
          }
        />
        <Route 
          path="/pacientes/editar-paciente/:id" 
          element={
          <>
            <PageTitle title="Editar Pacientes | SaludMed" />
            <PatientEdit />
          </>
          } 
        />
        <Route
          path="/pacientes/agregar-paciente"
          element={
            <>
              <PageTitle title="Agregar Paciente | SaludMed" />
              <PatientAdd />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
