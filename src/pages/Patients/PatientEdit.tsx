import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BreadcrumbPatients from '../../components/Breadcrumbs/BreadcrumbPatient';
import DefaultLayout from '../../layout/DefaultLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCake, faPhone, faMapMarkerAlt, faTrash, faVenusMars, faChevronDown, faWeightScale, faArrowsUpDown, faEnvelope, } from '@fortawesome/free-solid-svg-icons';
import useFetchPatient from '../../hooks/Patients/useFetchPatient';
import useUpdatePatient from '../../hooks/Patients/useUpdatePatient';
import useGetPatients from '../../hooks/Patients/useGetPatients';
import { Patient } from '../../interfaces/Patients/Patients';
import { showConfirmationAlert, showSuccessAlert, showErrorAlert, showDeleteConfirmation, showDeleteSuccessAlert, showAlert, } from '../../components/Alerts/PatientAlert';
import { validateOnlyString, validateEmail, validatePhoneNumber, validateAge, validateHeight, validateWeight } from '../../components/Validations/Patients/PatientValidation';

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

  const [, setSelectedOption] = useState<string | undefined>(undefined);

  const [formData, setFormData] = useState<Patient>({
    iD_Paciente: 0,
    nombre: '',
    apellido: '',
    sexo: '',
    edad: 0,
    peso: 0,
    estatura: 0,
    telefono: '',
    domicilio: '',
    correo: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData(patient);
      setSelectedOption(patient.sexo);
    }
  }, [patient]);

  const [formErrors, setFormErrors] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    edad: '',
    peso: '',
    estatura: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: name === 'edad' || name === 'peso' || name === 'estatura'
            ? Number(value)
            : value,
    });

    const validationError = (() => {
        switch (name) {
            case 'nombre':
                return validateOnlyString(value);
            case 'apellido':
                return validateOnlyString(value);
            case 'correo':
                return validateEmail(value);
            case 'telefono':
                return validatePhoneNumber(value);
            case 'edad':
                return validateAge(Number(value));
            case 'peso':
                return validateWeight(Number(value));
            case 'estatura':
                return validateHeight(Number(value));
            default:
                return null;
        }
    })();

    setFormErrors({
        ...formErrors,
        [name]: validationError || '',
    });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, apellido, correo, sexo, domicilio, edad, estatura, telefono } = formData;

    if (!nombre || !apellido || !correo || !sexo || !domicilio || !edad || !estatura || !telefono) {
      showAlert('Error', 'No tienen que haber campos vacíos', 'error');
      return;
    }

    if (Object.values(formErrors).some((error) => error)) {
      showAlert(
        'Error',
        'Por favor corrige los errores en el formulario antes de continuar.',
        'error',
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
        <BreadcrumbPatients pageName="Editar Paciente" />
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
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="nombre"
                      >
                        Nombre
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faUser} opacity="0.8" />
                        </span>
                        <input
                          className={`w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${formErrors.nombre ? 'border-red-500' : ''}`}
                          type="text"
                          name="nombre"
                          value={formData?.nombre || ''}
                          onChange={handleChange}
                        />
                        {formErrors.nombre && (
                          <p className="mt-1 text-xs text-red-500">
                            {formErrors.nombre}
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
                          className={`w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${formErrors.apellido ? 'border-red-500' : ''}`}
                          type="text"
                          name="apellido"
                          id="apellido"
                          placeholder="Apellidos"
                          value={formData?.apellido || ''}
                          onChange={handleChange}
                        />
                        {formErrors.apellido && (
                          <p className="mt-1 text-xs text-red-500">
                            {formErrors.apellido}
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
                        Edad value= {formData?.edad || 0}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FontAwesomeIcon icon={faCake} opacity="0.8" />
                        </span>
                        <input
                          className="w-full rounded border border-stroke py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="edad"
                          id="edad"
                          min={0}
                          max={125}
                          placeholder="0"
                          value={formData?.edad || 0}
                          onChange={handleChange}
                        />
                        {formErrors.edad && (
                          <p className="mt-1 text-xs text-red-500">
                            {formErrors.edad}
                          </p>
                        )}
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
                          className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="peso"
                          id="peso"
                          value={formData?.peso || 0}
                          onChange={handleChange}
                          min={0}
                          step="0.01"
                        />
                        {formErrors.peso && (
                          <p className="mt-1 text-xs text-red-500">
                            {formErrors.peso}
                          </p>
                        )}
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
                          className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="estatura"
                          id="estatura"
                          value={formData?.estatura || 0}
                          onChange={handleChange}
                          min={0}
                          step="0.01"
                        />
                        {formErrors.estatura && (
                          <p className="mt-1 text-xs text-red-500">
                            {formErrors.estatura}
                          </p>
                        )}
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
                          className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="telefono"
                          id="telefono"
                          value={formData?.telefono || ''}
                          onChange={handleChange}
                        />
                        {formErrors.telefono && (
                          <p className="mt-1 text-xs text-red-500">
                            {formErrors.telefono}
                          </p>
                        )}
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
                          className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
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
                          className={`w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${formErrors.correo ? 'border-red-500' : ''}`}
                          type="email"
                          name="correo"
                          id="correo"
                          value={formData?.correo || ''}
                          onChange={handleChange}
                        />
                        {formErrors.correo && (
                          <p className="mt-1 text-xs text-red-500">
                            {formErrors.correo}
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
                      className="flex justify-center rounded bg-red-600 py-3 px-6 font-medium text-white hover:bg-opacity-90"
                      type="button"
                      onClick={handleDelete}
                    >
                      <FontAwesomeIcon icon={faTrash} />
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
