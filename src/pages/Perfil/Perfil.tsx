import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DefaultLayout from '../../layout/DefaultLayout';
import usePerfil from '../../hooks/Perfil/usePerfil';
import { showConfirmationAlertPerfil } from '../../components/Alerts/PerfilAlert';
import { useUser } from '../../context/UserContext';

interface DashboardProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Perfil: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
  const id = parseInt(localStorage.getItem('userId') || '0');
  const { medico, loading, error, updateMedico } = usePerfil(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    especialidad: '',
    cedulaProfesional: '',
    telefono: '',
    correo: '',
    contrasena: '',
  });

  useEffect(() => {
    if (medico) {
      setFormData({
        nombres: medico.nombre,
        apellidos: medico.apellido,
        especialidad: medico.especialidad,
        cedulaProfesional: medico.cedulaProfesional,
        telefono: medico.telefono,
        correo: medico.correo,
        contrasena: '',
      });
    }
  }, [medico]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (medico) {
      const confirmed = await showConfirmationAlertPerfil();
      if (confirmed) {
        const success = await updateMedico(
          {
            ...medico,
            nombre: formData.nombres,
            apellido: formData.apellidos,
            especialidad: formData.especialidad,
            cedulaProfesional: formData.cedulaProfesional,
            telefono: formData.telefono,
            correo: formData.correo,
          },
          formData.contrasena || undefined,
        );

        if (success) {
          setUser({
            id: localStorage.getItem('userId') || '',
            name: `${formData.nombres} ${formData.apellidos}`,
            specialty: formData.especialidad,
            roleID: localStorage.getItem('rolID') || '',
          });
          Swal.fire({
            icon: 'success',
            title: '¡Datos actualizados con éxito!',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar datos',
            text: 'Hubo un problema al intentar actualizar los datos del médico.',
          });
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Cambios cancelados',
          text: 'No se realizaron cambios en los datos del médico.',
        });
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <DefaultLayout setIsAuthenticated={setIsAuthenticated}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-boxdark-2">
        <div className="w-full max-w-xl p-4">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Información Personal
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmit}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white "
                      htmlFor="nombres"
                    >
                      Nombres
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="nombres"
                      id="nombres"
                      value={formData.nombres}
                      onChange={handleInputChange}
                      placeholder="Juan"
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="apellidos"
                    >
                      Apellidos
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="apellidos"
                      id="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      placeholder="Pérez"
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="especialidad"
                  >
                    Especialidad
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="especialidad"
                    id="especialidad"
                    value={formData.especialidad}
                    onChange={handleInputChange}
                    placeholder="Cardiología"
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="cedulaProfesional"
                  >
                    Cédula Profesional
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="cedulaProfesional"
                    id="cedulaProfesional"
                    value={formData.cedulaProfesional}
                    onChange={handleInputChange}
                    placeholder="123456789"
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="telefono"
                  >
                    Teléfono
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="tel"
                    name="telefono"
                    id="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="+1234567890"
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="correo"
                  >
                    Correo
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="email"
                    name="correo"
                    id="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    placeholder="ejemplo@correo.com"
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="contrasena"
                  >
                    Contraseña
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="password"
                    name="contrasena"
                    id="contrasena"
                    value={formData.contrasena}
                    onChange={handleInputChange}
                    placeholder="No cambie la contreseña si no es necesario (Deje vacio)"
                  />
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="button"
                    onClick={()=>navigate('/dashboard')}
                  >
                    Cancelar
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Perfil;