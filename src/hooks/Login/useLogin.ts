import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';

interface UseAuthenticationProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthentication = ({ setIsAuthenticated }: UseAuthenticationProps) => {
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleLogin = async (correo: string, contraseña: string) => {
        try {
            const response = await axiosInstance.post('api/auth/login', {
                correo,
                contraseña,
            });
            if (response.status === 200) {
                setIsAuthenticated(true);
                navigate('/');
                console.log('Loguedo');
            }
        } catch (error) {
            console.error('Ocurrió un error: ', error);
            setError('Correo o contraseña incorrectos');
        }
    };

    return {
        error,
        handleLogin,
    };
};

export default useAuthentication;
