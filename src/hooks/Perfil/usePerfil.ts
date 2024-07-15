import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { useUser } from '../../context/UserContex';

interface Medico {
  id?: number;
  clinicaID?: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  cedulaProfesional: string;
  telefono: string;
  correo: string;
}

const usePerfil = (id: number) => {
  const [medico, setMedico] = useState<Medico | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const response = await axiosInstance.get(`/api/auth/medico/${id}`);
        setMedico(response.data);
      } catch (err) {
        setError('Error al cargar los datos del médico');
      } finally {
        setLoading(false);
      }
    };

    fetchMedico();
  }, [id]);

  const { setUser } = useUser();

  const updateMedico = async (
    updatedMedico: Medico,
    nuevaContrasena?: string,
  ) => {
    try {
      await axiosInstance.put(`/api/auth/medico/${id}`, {
        ...updatedMedico,
        contrasena: nuevaContrasena,
      });
      setMedico(updatedMedico);

      setUser({
        id: id.toString(), 
        name: `${updatedMedico.nombre} ${updatedMedico.apellido}`,
        specialty: updatedMedico.especialidad,
        roleID: localStorage.getItem('rolID') || '',
      });

      localStorage.setItem(
        'userName',
        `${updatedMedico.nombre} ${updatedMedico.apellido}`,
      );
      localStorage.setItem('userSpecialty', updatedMedico.especialidad);

      return true;
    } catch (err) {
      setError('Error al actualizar los datos del médico');
      return false;
    }
  };

  return {
    medico,
    loading,
    error,
    updateMedico,
  };
};

export default usePerfil;
