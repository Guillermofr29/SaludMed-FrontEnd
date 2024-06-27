import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [correo, setCorreo] = useState<string>('');
  const [contraseña, setContraseña] = useState<string>('');
  const navigate = useNavigate(); 

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', {
        correo,
        contraseña,
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate('/'); 
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="flex h-screen">
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
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="correo"
                className="block text-sm font-medium text-gray-700"
              >
                Usuario
              </label>
              <input
                type="text"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="MED00001"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="contraseña"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-customBlue text-white py-2 px-4 rounded-md hover:bg-secondBlue"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
