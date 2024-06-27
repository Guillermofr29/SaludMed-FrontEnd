import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BreadcrumbPatien from '../../components/Breadcrumbs/BreadcrumbPatient';
import DefaultLayout from '../../layout/DefaultLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCake,
  faPhone,
  faMapMarkerAlt,
  faVenusMars,
  faChevronDown,
  faWeightScale,
  faArrowsUpDown,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import useFetchPatient from '../../hooks/Patients/useFetchPatient';
import useUpdatePatient from '../../hooks/Patients/useUpdatePatient';
import useGetPatients from '../../hooks/Patients/useGetPatients';
import { Patient } from '../../interfaces/Patients/Patients';
import {
  showConfirmationAlert,
  showSuccessAlert,
  showErrorAlert,
  showDeleteConfirmation,
  showDeleteSuccessAlert,
} from '../../components/Alerts/PatientAlert';
import {
  validateName,
  validateEmail,
} from '../../components/Validations/Patients/PatientValidation';

interface DashboardProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const PatientEdit: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const patientId = id ? parseInt(id) : undefined;

  const { patient, loading, error } = useFetchPatient(patientId || 0);
  const {
    updatePatient,
    loading: updating,
    error: updateError,
  } = useUpdatePatient();
  const { deletePatient } = useGetPatients();

  const [formData, setFormData] = useState<Patient | null>(null);
  const [, setSelectedOption] = useState<string | undefined>(undefined);
  const [nameError, setNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    if (patient) {
      setFormData(patient);
      setSelectedOption(patient.sexo);
    }
  }, [patient]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'nombre') {
      if (!validateName(value)) {
        setNameError('El nombre solo puede contener letras y espacios');
      } else {
        setNameError(null);
      }
    } else if (name === 'apellido') {
      if (!validateName(value)) {
        setLastNameError('El apellido solo puede contener letras y espacios');
      } else {
        setLastNameError(null);
      }
    } else if (name === 'correo') {
      if (!validateEmail(value)) {
        setEmailError('El correo electrónico no tiene un formato válido');
      } else {
        setEmailError(null);
      }
    }

    if (formData) {
      setFormData({
        ...formData,
        [name]:
          name === 'edad' || name === 'peso' || name === 'estatura'
            ? parseFloat(value)
            : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !validateName(formData?.nombre || '') ||
      !validateName(formData?.apellido || '') ||
      !validateEmail(formData?.correo || '')
    ) {
      alert(
        'Por favor, corrija los errores en el formulario antes de continuar.',
      );
      return;
    }

    const confirmed = await showConfirmationAlert();

    if (confirmed && formData) {
      try {
        await updatePatient(formData);
        showSuccessAlert();
      } catch (err) {
        console.error('Error al actualizar el paciente', err);
        showErrorAlert();
      }
    }
  };

  const handleDelete = async () => {
    const confirmed = await showDeleteConfirmation();
    if (confirmed && patientId) {
      try {
        await deletePatient(patientId);
        showDeleteSuccessAlert();
        navigate('/pacientes');
      } catch (err) {
        console.error('Error al eliminar el paciente', err);
        showErrorAlert();
      }
    }
  };

  if (loading || updating) {
    return <div>Cargando...</div>;
  }

  if (error || updateError) {
    return <div>Error: {error || updateError}</div>;
  }

  if (!patient) {
    return <div>Paciente no encontrado</div>;
  }
  return (
    <DefaultLayout setIsAuthenticated={setIsAuthenticated}>
      <div className="mx-auto max-w-270">
        <BreadcrumbPatien pageName="Editar Paciente" />
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Información
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 text-sm font-medium text-black dark:text-white"
                        htmlFor="nombre"
                      >
                        Nombre
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faUser} opacity="0.8" />
                        </span>
                        <input
                          className={`w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${nameError ? 'border-red-500' : ''}`}
                          type="text"
                          name="nombre"
                          id="nombre"
                          placeholder="Nombre"
                          value={formData?.nombre || ''}
                          onChange={handleChange}
                        />
                        {nameError && (
                          <p className="mt-1 text-xs text-red-500">
                            {nameError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="apellido"
                      >
                        Apellidos
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faUser} opacity="0.8" />
                        </span>
                        <input
                          className={`w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${lastNameError ? 'border-red-500' : ''}`}
                          type="text"
                          name="apellido"
                          id="apellido"
                          placeholder="Apellidos"
                          value={formData?.apellido || ''}
                          onChange={handleChange}
                        />
                        {lastNameError && (
                          <p className="mt-1 text-xs text-red-500">
                            {lastNameError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Sexo
                      </label>

                      <div className="relative z-20 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                          <FontAwesomeIcon icon={faVenusMars} opacity="0.8" />
                        </span>

                        <select
                          name="sexo"
                          value={formData?.sexo || ''}
                          onChange={handleChange}
                          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                        >
                          <option value="" disabled>
                            Seleccionar
                          </option>
                          <option value="M">Masculino</option>
                          <option value="F">Femenino</option>
                        </select>

                        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                          <FontAwesomeIcon icon={faChevronDown} opacity="0.8" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="edad"
                      >
                        Edad
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faCake} opacity="0.8" />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="edad"
                          id="edad"
                          value={formData?.edad || 0}
                          onChange={handleChange}
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="peso"
                      >
                        Peso (Kg's)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faWeightScale} opacity="0.8" />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="peso"
                          id="peso"
                          value={formData?.peso || 0}
                          onChange={handleChange}
                          min={0}
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="estatura"
                      >
                        Estatura (Mt's)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon
                            icon={faArrowsUpDown}
                            opacity="0.8"
                          />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="estatura"
                          id="estatura"
                          value={formData?.estatura || 0}
                          onChange={handleChange}
                          min={0}
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="telefono"
                      >
                        Telefono
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faPhone} opacity="0.8" />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="telefono"
                          id="telefono"
                          value={formData?.telefono || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="domicilio"
                      >
                        Domicilio
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            opacity="0.8"
                          />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="domicilio"
                          id="domicilio"
                          value={formData?.domicilio || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="correo"
                      >
                        Correo
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faEnvelope} opacity="0.8" />
                        </span>
                        <input
                          className={`w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${emailError ? 'border-red-500' : ''}`}
                          type="email"
                          name="correo"
                          id="correo"
                          value={formData?.correo || ''}
                          onChange={handleChange}
                        />
                        {emailError && (
                          <p className="mt-1 text-xs text-red-500">
                            {emailError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                      onClick={() => navigate('/pacientes')}
                    >
                      Cancelar
                    </button>
                    <button
                      className="flex justify-center rounded bg-cardGreen py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Guardar
                    </button>
                    <button
                      className="flex justify-center rounded bg-red-600 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                      type="button"
                      onClick={handleDelete}
                    >
                      Eliminar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PatientEdit;
