import React, { Suspense, useEffect, useState, useCallback, useRef } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import { UserProvider } from './context/UserContext';
import 'react-calendar/dist/Calendar.css';

const Login = React.lazy(() => import('./pages/Login'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Patients = React.lazy(() => import('./pages/Patients/Patients'));
const PatientEdit = React.lazy(() => import('./pages/Patients/PatientEdit'));
const PatientAdd = React.lazy(() => import('./pages/Patients/PatientAdd'));
const PatientAppointments = React.lazy(() => import('./pages/Patients/PatientAppointments'));
const Citas = React.lazy(() => import('./pages/Appointments/Appointments'));
const AppointmentEdit = React.lazy(() => import('./pages/Appointments/AppointmentEdit'));
const AppointmentAdd = React.lazy(() => import('./pages/Appointments/AppointmentAdd'));
const PrescriptionAdd = React.lazy(() => import('./pages/Prescriptions/PrescriptionAdd'));
const Prescriptions = React.lazy(() => import('./pages/Prescriptions/Prescriptions'));
const Perfil = React.lazy(() => import('./pages/Perfil/Perfil'));
const HomePage = React.lazy(() => import('./pages/HomePage/Context'));

const INACTIVITY_TIME = 960000;

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const lastActivityRef = useRef(Date.now());
  const { pathname } = useLocation();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  const handleUserActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userSpecialty');
    localStorage.removeItem('rolID');
    sessionStorage.removeItem('sessionCheck');
  }, []);

  useEffect(() => {
    const checkInactivity = () => {
      if (
        isAuthenticated &&
        Date.now() - lastActivityRef.current > INACTIVITY_TIME
      ) {
        handleLogout();
      }
    };

    const inactivityInterval = setInterval(checkInactivity, 1000);

    const activityHandler = () => {
      handleUserActivity();
    };

    window.addEventListener('mousemove', activityHandler);
    window.addEventListener('keypress', activityHandler);
    window.addEventListener('scroll', activityHandler);

    return () => {
      clearInterval(inactivityInterval);
      window.removeEventListener('mousemove', activityHandler);
      window.removeEventListener('keypress', activityHandler);
      window.removeEventListener('scroll', activityHandler);
    };
  }, [handleLogout, handleUserActivity, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/') {
      handleLogout();
    }
  }, [location, isAuthenticated, handleLogout]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('sessionCheck', 'true');
    lastActivityRef.current = Date.now();
  };

  return loading ? (
    <Loader />
  ) : (
    <UserProvider>
      <Suspense fallback={<Loader />}>
         <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Inicio | SaludMed" />
                <Dashboard setIsAuthenticated={handleLogout} />
              </>
            ) : (
              <Navigate to="/login" />
            )
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
          path="/recetas"
          element={
            isAuthenticated ? (
              <>
                <PageTitle title="Recetas | SaludMed" />
                <Prescriptions setIsAuthenticated={handleLogout} />
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
      </Suspense>
    </UserProvider>
  );
}

export default App;
