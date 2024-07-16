import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserDoctor,
  faLock,
  faEyeSlash,
  faEye,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import useAuthentication from '../hooks/Login/useLogin';

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [correo, setCorreo] = useState<string>('');
  const [contraseña, setContraseña] = useState<string>('');
  const { error, loading, handleLogin } = useAuthentication({
    setIsAuthenticated,
  });

  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const toggleMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin(correo, contraseña);
  };

  return (
    <div className="flex h-screen">
      <Link
        to="/"
        className="absolute top-4 left-4 text-white sm:text-customBlue lg:text-customBlue hover:text-gray-300 transition-colors duration-300"
      >
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        <span className="ml-2 text-sm sm:text-base md:text-lg lg:text-xl">
          Volver
        </span>
      </Link>

      <div className="hidden sm:flex sm:flex-1 bg-gray-100 items-center justify-center">
        <div className="text-center">
          <img
            src="/src/images/logo/logoLogin.png"
            alt="SaludMed Logo"
            className="mx-auto mb-4 w-40 md:w-32 lg:w-40 xl:w-48 2xl:w-56"
          />
          <h1 className="text-3xl font-bold text-customBlue">
            Salud<span className="text-secondBlue">Med</span>
          </h1>
        </div>
      </div>

      <div className="flex-1 bg-customBlue flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-semibold mb-4 text-blue text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="correo"
                className="block text-sm font-medium text-gray-700"
              >
                Usuario
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">
                  <FontAwesomeIcon icon={faUserDoctor} opacity="0.8" />
                </span>
                <input
                  type="text"
                  id="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="mt-1 block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="med@saludmed.com"
                  autoComplete="username"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="contraseña"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">
                  <FontAwesomeIcon icon={faLock} opacity="0.8" />
                </span>
                <input
                  type={mostrarContraseña ? 'text' : 'password'}
                  id="contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  className="mt-1 block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5"
                  onClick={toggleMostrarContraseña}
                >
                  <FontAwesomeIcon
                    icon={mostrarContraseña ? faEyeSlash : faEye}
                    opacity="0.8"
                  />
                </button>
              </div>
              {error && (
                <p className="mt-1.5 text-xs text-center font-bold text-red-500">
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-customBlue text-white py-2 px-4 rounded-md hover:bg-secondBlue flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
