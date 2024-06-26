import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

import NotFound from './pages/NotFound';

import Dashboard from './pages/Dashboard/Dashboard';

import Patients from './pages/Patients/Patients';
import PatientEdit from './pages/Patients/PatientEdit';
import PatientAdd from './pages/Patients/PatientAdd';
import Login from './pages/Login';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/pacientes"
          element={isAuthenticated ? <Patients /> : <Navigate to="/login" />}
        />
        <Route
          path="/pacientes/editar-paciente/:id"
          element={isAuthenticated ? <PatientEdit /> : <Navigate to="/login" />}
        />
        <Route
          path="/pacientes/agregar-paciente"
          element={isAuthenticated ? <PatientAdd /> : <Navigate to="/login" />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
