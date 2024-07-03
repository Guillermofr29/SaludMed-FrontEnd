import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadcrumbPatient from '../../components/Breadcrumbs/BreadcrumbPatient';
import DefaultLayout from '../../layout/DefaultLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import { faUser,faCake,faPhone,faMapMarkerAlt,faVenusMars,faChevronDown,faWeight,faArrowsAltV,faEnvelope,faUserDoctor,} from '@fortawesome/free-solid-svg-icons';
import {validateOnlyString,validateEmail,validatePhoneNumber,validateWeight,validateHeight,validateAge,} from '../../components/Validations/Patients/PatientValidation';
import useAddPatient from '../../hooks/Patients/useAddPatient';
import useGetDoctors from '../../hooks/Doctors/useGetDoctors';
import { showAlert, showErrorAlert } from '../../components/Alerts/PatientAlert';
import { Patient } from '../../interfaces/Patients/Patients';

interface DashboardProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const PatientAdd: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
  const rol = localStorage.getItem('rolID') || 'rolId';
  const medicoId = localStorage.getItem('userId') || 'Id';
  const navigate = useNavigate();
  const { addPatient, loading, error, success } = useAddPatient();
  const { doctors, loading: doctorsLoading } = useGetDoctors(Number(rol));

  const [selectedDoctor, setSelectedDoctor] = useState<{ value: number; label: string } | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

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
    MedicoID: Number(rol) === 2 ? Number(selectedDoctor?.value) : Number(medicoId),
  });

  const [formErrors, setFormErrors] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    edad: '',
    peso: '',
    estatura: ''
  });

  useEffect(() => {
    if (error) {
      showAlert('Error', error, 'error');
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      showAlert('Éxito', 'Paciente agregado exitosamente', 'success');
      navigate('/pacientes');
    }
  }, [success, navigate]);

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { nombre, apellido, correo, sexo, domicilio, edad, estatura, telefono } = formData;

    if (!nombre || !apellido || !correo || !sexo || !domicilio || !edad || !estatura || !telefono) {
      showAlert('Error', 'No tienen que haber campos vacíos', 'error');
      return;
    }

    if (Object.values(formErrors).some((error) => error) || (Number(rol) === 2 && !selectedDoctor)) {
      showAlert(
        'Error',
        'Por favor corrige los errores en el formulario antes de continuar.',
        'error',
      );
      return;
    }

    try {
      let formattedData = { ...formData };
    
      if (Number(rol) === 2 && selectedDoctor) {
        formattedData = {
          ...formattedData,
          MedicoID: selectedDoctor.value,
        };
      } else {
        formattedData = {
          ...formattedData,
          MedicoID: parseInt(medicoId),
        };
      }
    
      await addPatient(formattedData);
    } catch (err) {
      console.error('Error al agregar el paciente', err);
      showErrorAlert();
    }
    

  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const handleRolChange = (selectedOption: any) => {
    setSelectedDoctor(selectedOption);
  };

  const options = doctors.map(doctor => ({
    value: doctor.iD_Medico,
    label: `${doctor.nombre} ${doctor.apellido}`,
  }));

  return (
    <DefaultLayout setIsAuthenticated={setIsAuthenticated}>
      <div className="mx-auto max-w-270">
        <BreadcrumbPatient pageName="Agregar Paciente" />
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
                          id="nombre"
                          placeholder="Nombre(s)"
                          value={formData.nombre}
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
                          value={formData.apellido}
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
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                          value={formData.sexo}
                          onChange={handleChange}
                        >
                          <option value="">Seleccionar</option>
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
                          className="w-full rounded border border-stroke py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="edad"

                          min={0}
                          max={125}
                          placeholder="0"
                          value={formData.edad !== 0 ? formData.edad : ''}
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
                          <FontAwesomeIcon icon={faWeight} opacity="0.8" />
                        </span>
                        <input
                          className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="peso"
                          id="peso"
                          min={0}
                          placeholder='0.00 Kgs'
                          step="0.01"
                          value={formData.peso !== 0 ? formData.peso : ''}
                          onChange={handleChange}
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
                          <FontAwesomeIcon icon={faArrowsAltV} opacity="0.8" />
                        </span>
                        <input
                          className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="estatura"
                          id="estatura"
                          min={0}
                          step="0.01"
                          placeholder='0.00 Mts'
                          value={formData.estatura !== 0 ? formData.estatura : ''}
                          onChange={handleChange}
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
                          placeholder='+52 (123) 456-7890'
                          id="telefono"
                          value={formData.telefono}
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
                          placeholder='Av. 1 Calle 2, Colonia Centro, Ciudad'
                          id="domicilio"
                          value={formData.domicilio}
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
                          placeholder='mail@mail.com'
                          id="correo"
                          value={formData.correo}
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

                  {rol === '2' && (
                    <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                      <div className="w-full sm:w-1/3">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="nombrePaciente"
                        >
                          Nombre del médico
                        </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <FontAwesomeIcon icon={faUserDoctor} opacity="0.8" />
                          </span>
                          <Select
                            className="w-full rounded border-stroke py-1.5 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            options={options}
                            value={selectedDoctor}
                            onChange={handleRolChange}
                            onInputChange={handleInputChange}
                            inputValue={inputValue}
                            isLoading={doctorsLoading}
                            placeholder="Buscar médico..."
                            noOptionsMessage={() => 'No se encontraron opciones'}
                          />
                        </div>
                      </div>
                    </div>
                  )}

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

export default PatientAdd;
