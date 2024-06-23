import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { MostPrescripMed } from '../../interfaces/Dashboard/MostPrescripMed';

const useMedicamentosMasRecetados = () => {
  const [mostPrescripMed, setMedicamentos] = useState<MostPrescripMed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMostPrescripMed = async () => {
      try {
        const response = await axiosInstance.get('/Receta/CincoMedicamentosMasRecetados');
        if (response.data.success) {
          const fetchedMedicamentos = response.data.result.map((item: any, index: number) => ({
            NoMedicamento: `MED${index + 1}`,
            medicamento: item.medicamento,
            numeroDeVeces: item.numeroDeVeces,
          }));
          setMedicamentos(fetchedMedicamentos);
        } else {
          console.log('Error en la respuesta de la API:', response.data.message);
        }
      } catch (error) {
        setError('Error al obtener medicamentos');
      } finally{
        setLoading(false);
      }
    };

    fetchMostPrescripMed();
  }, []);

  return { mostPrescripMed, loading, error };
};

export default useMedicamentosMasRecetados;
