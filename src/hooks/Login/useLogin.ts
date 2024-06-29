import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';

interface UseAuthenticationProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthentication = ({ setIsAuthenticated }: UseAuthenticationProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (correo: string, contraseña: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('api/auth/login', {
        correo,
        contraseña,
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate('/');
        console.log('Logueado');
      }
    } catch (error) {
      console.error('Ocurrió un error: ', error);
      setError('Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    handleLogin,
  };
};

export default useAuthentication;
