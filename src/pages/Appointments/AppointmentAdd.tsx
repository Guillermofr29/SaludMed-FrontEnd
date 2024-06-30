import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadcrumbAppointment from '../../components/Breadcrumbs/BreadcrumbAppointment';
import DefaultLayout from '../../layout/DefaultLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faNoteSticky, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import useAddAppointment from '../../hooks/Appointments/useAddAppointment';
import { AppointmentAddi } from '../../interfaces/Appointments/AppointmentAdd';
import { showAlert, showSuccessAlert, showErrorAlert } from '../../components/Alerts/AppointmentAlert';
import { validateOnlyString } from '../../components/Validations/Patients/PatientValidation';
import useGetPatients from '../../hooks/Patients/useGetPatients';
import Select from 'react-select'; // Importa el componente de autocompletado que uses

interface DashboardProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AppointmentAdd: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const { patients, loading: patientsLoading } = useGetPatients();
    const { addAppointment, loading, error, success } = useAddAppointment();
    const [formData, setFormData] = useState<AppointmentAddi>({
        PacienteID: 0,
        MedicoID: 0,
        fecha: '',
        hora: '',
        motivo: '',
        estatus: '',
        notas: '',
    });
    const [motivoError, setMotivoError] = useState<string | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<{ value: number; label: string } | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        if (error) {
            showAlert('Error', error, 'error');
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            showSuccessAlert();
            navigate('/citas');
        }
    }, [success, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'motivo') {
            setMotivoError(validateOnlyString(value));
        }

        setFormData({
            ...formData,
            [name]: name === 'PacienteID' || name === 'MedicoID' ? Number(value) : value,
        });
    };

    const formatMotivo = (motivo: string): string => {
        return motivo.trim().toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (motivoError || !selectedPatient) {
            showAlert('Error', 'Por favor, corrija los errores en el formulario antes de continuar.', 'error');
            return;
        }

        try {
            const formattedData = {
                ...formData,
                PacienteID: selectedPatient.value,
                motivo: formatMotivo(formData.motivo),
            };
            await addAppointment(formattedData);
        } catch (err) {
            console.error('Error al agregar la cita', err);
            showErrorAlert();
        }
    };

    const handleInputChange = (newValue: string) => {
        setInputValue(newValue);
    };

    const handlePatientChange = (selectedOption: any) => {
        setSelectedPatient(selectedOption);
    };

    const options = patients.map(patient => ({
        value: patient.iD_Paciente,
        label: `${patient.nombre} ${patient.apellido}`,
    }));

    return (
        <DefaultLayout setIsAuthenticated={setIsAuthenticated}>
            <div className="mx-auto max-w-270">
                <BreadcrumbAppointment pageName="Agregar Nueva Cita" />
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-5 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Información de la cita
                                </h3>
                            </div>
                            <div className="p-7">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="nombrePaciente"
                                            >
                                                Nombre del Paciente
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <FontAwesomeIcon icon={faUser} opacity="0.8" />
                                                </span>
                                                <Select
                                                    className="w-full"
                                                    options={options}
                                                    value={selectedPatient}
                                                    onChange={handlePatientChange}
                                                    onInputChange={handleInputChange}
                                                    inputValue={inputValue}
                                                    isLoading={patientsLoading}
                                                    placeholder="Buscar paciente..."
                                                    noOptionsMessage={() => 'No se encontraron opciones'}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="nombreMedico"
                                            >
                                                Nombre del Médico
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <FontAwesomeIcon icon={faUser} opacity="0.8" />
                                                </span>
                                                {/* Aquí deberías agregar un selector similar para el médico */}
                                                <select
                                                    className={
                                                        'w-full rounded border border-stroke bg-gray-200 py-3 pl-11.5 pr-4.5 text-gray-500 focus:border-gray-300 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-gray-500 dark:focus:border-gray-300'
                                                    }
                                                    name="MedicoID"
                                                    // value={formData.MedicoID}
                                                    value={1}
                                                    onChange={handleChange}
                                                >
                                                    <option disabled>
                                                        Seleccionar Médico
                                                    </option>
                                                    <option value={1}>
                                                        Joe Doe
                                                    </option>
                                                    {/* Opciones de médicos */}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="fecha"
                                            >
                                                Fecha
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                    type="date"
                                                    name="fecha"
                                                    value={formData.fecha}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="hora"
                                            >
                                                Hora
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full rounded border border-stroke py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="time"
                                                    name="hora"
                                                    value={formData.hora}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="motivo"
                                            >
                                                Motivo
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <FontAwesomeIcon icon={faNoteSticky} opacity="0.8" />
                                                </span>
                                                <input
                                                    className={`w-full rounded border border-stroke py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${motivoError ? 'border-red-500' : ''}`}
                                                    type="text"
                                                    name="motivo"
                                                    value={formData.motivo}
                                                    onChange={handleChange}
                                                />
                                                {motivoError && (
                                                    <p className="mt-1 text-sm text-red-500">{motivoError}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="estatus">
                                                Estatus
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">
                                                <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                                    <FontAwesomeIcon icon={faNoteSticky} opacity="0.8" />
                                                </span>
                                                <select
                                                    name="estatus"
                                                    value={formData.estatus}
                                                    onChange={handleChange}
                                                    className={'relative z-20 w-full appearance-none rounded border border-stroke py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input'}
                                                    disabled
                                                >
                                                    <option value="Pendiente">Pendiente</option>
                                                    <option value="Terminada">Terminada</option>
                                                    <option value="Cancelada">Cancelada</option>
                                                </select>
                                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                                    <FontAwesomeIcon icon={faChevronDown} opacity="0.8" />
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="notas"
                                        >
                                            Notas
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FontAwesomeIcon icon={faNoteSticky} opacity="0.8" />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="notas"
                                                value={formData.notas}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                            type="button"
                                            onClick={() => navigate('/citas')}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-cardGreen py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? 'Guardando...' : 'Guardar'}
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

export default AppointmentAdd;