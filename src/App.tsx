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
    const authState = localStorage.getItem('isAuthenticated');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={handleLogin} />}
        />
        <Route
          path="/"
          element={
            <>
              {isAuthenticated ? (
                <>
                  <PageTitle title="Inicio | SaludMed" />
                  <Dashboard setIsAuthenticated={handleLogout} />
                </>
              ) : (
                <Navigate to="/login" />
              )}
            </>
          }
        />
        <Route
          path="/pacientes"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Pacientes | SaludMed" />
                <Patients setIsAuthenticated={handleLogout} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/pacientes/editar-paciente/:id"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Editar Pacientes | SaludMed" />
                <PatientEdit setIsAuthenticated={handleLogout} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/pacientes/agregar-paciente"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Agregar Paciente | SaludMed" />
                <PatientAdd setIsAuthenticated={handleLogout} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/*"
          element={
            <>
              <PageTitle title="Not Found | SaludMed" />
              <NotFound />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
