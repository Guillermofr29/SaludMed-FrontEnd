import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard/Dashboard';
import Patients from './pages/Patients/Patients';
import PatientEdit from './pages/Patients/PatientEdit';
import PatientAdd from './pages/Patients/PatientAdd';
import PatientAppointments from './pages/Patients/PatientAppointments';
import Citas from './pages/Appointments/Appointments';
import AppointmentEdit from './pages/Appointments/AppointmentEdit';
import AppointmentAdd from './pages/Appointments/AppointmentAdd';
import PrescriptionAdd from './pages/Prescriptions/PrescriptionAdd';
import PrescriptionEdit from './pages/Prescriptions/PrescriptionEdit';
import RecetaPDF from './pages/RecetaPDF';
import Perfil from './pages/Perfil/Perfil';

const INACTIVITY_TIME = 960000; //Esto es 5 minutos
//60000 1 minuto

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
    const authState = localStorage.getItem('isAuthenticated');
    const sessionCheck = sessionStorage.getItem('sessionCheck');
    if (authState === 'true' && !sessionCheck) {
      handleLogout();
    } else if (authState === 'true') {
      setIsAuthenticated(true);
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout;

    const handleUserActivity = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(handleLogout, INACTIVITY_TIME);
    };

    handleUserActivity();

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, []);
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userSpecialty');
    localStorage.removeItem('rolID');
    sessionStorage.removeItem('sessionCheck');
  };
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('sessionCheck', 'true');
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
          path="/pacientes/patient-appointments/:id"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Citas del Paciente | SaludMed" />
                <PatientAppointments setIsAuthenticated={handleLogout} />
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
          path="/recetas/agregar-receta/:id"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Recetas | SaludMed" />
                <PrescriptionAdd setIsAuthenticated={handleLogout} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/recetas/editar-receta/:id"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Recetas | SaludMed" />
                <PrescriptionEdit setIsAuthenticated={handleLogout} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/test"
          element={
            <>
              <PageTitle title="Not Found | SaludMed" />
              <RecetaPDF />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Mi Perfil | SaludMed" />
                <Perfil setIsAuthenticated={handleLogout} />
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
