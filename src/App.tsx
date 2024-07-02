import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

import Login from './pages/Login';

const INACTIVITY_TIME = 960000; //Esto es 5 minutos
//60000 1 minuto

import NotFound from './pages/NotFound';

import Dashboard from './pages/Dashboard/Dashboard';

import Patients from './pages/Patients/Patients';
import PatientEdit from './pages/Patients/PatientEdit';
import PatientAdd from './pages/Patients/PatientAdd';

import Citas from './pages/Appointments/Appointments'
import AppointmentEdit from './pages/Appointments/AppointmentEdit';
import AppointmentAdd from './pages/Appointments/AppointmentAdd';

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

  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem('isAuthenticated');
    };

    const handleUserActivity = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(handleLogout, INACTIVITY_TIME);
    };

    let inactivityTimeout = setTimeout(handleLogout, INACTIVITY_TIME);

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
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
          path="/citas"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Citas | SaludMed" />
                <Citas setIsAuthenticated={handleLogout} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/citas/agregar-cita"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Agregar Cita | SaludMed" />
                <AppointmentAdd setIsAuthenticated={handleLogout} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/citas/editar-cita/:id"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Editar Cita | SaludMed" />
                <AppointmentEdit setIsAuthenticated={handleLogout} />
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
