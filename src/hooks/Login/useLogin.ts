import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import { useUser } from '../../context/UserContex';

interface UseAuthenticationProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthentication = ({ setIsAuthenticated }: UseAuthenticationProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (correo: string, contraseña: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('api/auth/login', {
        correo,
        contraseña,
      });

      if (response.status === 200) {
        const { id, nombre, apellido, especialidad, rolID } = response.data;
        // Aquí puedes almacenar los datos en el almacenamiento local o en el estado global si lo necesitas
        localStorage.setItem('userId', id);
        localStorage.setItem('userName', `${nombre} ${apellido}`);
        localStorage.setItem('userSpecialty', especialidad);
        localStorage.setItem('rolID', rolID);

        setUser({
          id: id.toString(),
          name: `${nombre} ${apellido}`,
          specialty: especialidad,
          roleID: rolID,
        });

        setIsAuthenticated(true);
        navigate('/');
        console.log('Usuario autenticado con éxito');
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
