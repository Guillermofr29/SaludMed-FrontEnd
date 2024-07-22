import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BreadcrumbAppointment from '../../components/Breadcrumbs/BreadcrumbAppointment';
import DefaultLayout from '../../layout/DefaultLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faNoteSticky, faFilePen, faChevronDown, faTrash, faCalendarDay, faCalendarCheck, faCalendarXmark, faUserDoctor, faClipboardList, faFileWaveform } from '@fortawesome/free-solid-svg-icons';
import useGetAppointmentById from '../../hooks/Appointments/useGetAppointmentById';
import useUpdateAppointment from '../../hooks/Appointments/useUpdateAppointment';
import useDeleteAppointment from '../../hooks/Appointments/useDeleteAppointments';
import { Appointments } from '../../interfaces/Appointments/Appointments';
import { showConfirmationAlert, showSuccessAlert, showErrorAlert, showAlert, showDeleteConfirmation, showDeleteSuccessAlert } from '../../components/Alerts/AppointmentAlert';
import { validateOnlyString } from '../../components/Validations/Patients/PatientValidation';
import Select from 'react-select';
import useGetDoctors from '../../hooks/Doctors/useGetDoctors';

interface DashboardProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AppointmentEdit: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
    const rol = localStorage.getItem('rolID') || 'rolId';
    const medicoId = localStorage.getItem('userId') || 'Id';
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const appointmentId = id ? parseInt(id) : undefined;
    const { doctors, loading: doctorsLoading } = useGetDoctors();

    const { appointment, loading, error } = useGetAppointmentById(appointmentId || 0);
    const { updateAppointment, loading: updating, error: updateError } = useUpdateAppointment();
    const { deleteAppointment, error: deleteError } = useDeleteAppointment();
    const [motivoError, setMotivoError] = useState<string | null>(null);



    const [selectedDoctor, setSelectedDoctor] = useState<{ value: number; label: string } | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    // const [formData, setFormData] = useState<Appointments | null>(null);
    const [formData, setFormData] = useState<Appointments>({
        iD_Cita: 0,
        pacienteID: 0,
        medicoID: Number(rol) === 2 ? 0 : Number(medicoId),
        fecha: '',
        hora: '',
        motivo: '',
        notas: '',
        estatus: '',
        nombrePaciente: '',
        nombreMedico: '',
    });


    useEffect(() => {
        if (appointment) {
            setFormData({
                ...appointment,
                medicoID: Number(rol) === 2 ? appointment.medicoID : Number(medicoId),
            });
            if (Number(rol) === 2) {
                const doctor = doctors.find(doc => doc.iD_Medico === appointment.medicoID);
                if (doctor) {
                    setSelectedDoctor({ value: doctor.iD_Medico, label: `${doctor.nombre} ${doctor.apellido}` });
                }
            }
        }
    }, [appointment, doctors, rol, medicoId]);




    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'motivo') {
            setMotivoError(validateOnlyString(value));
        }

        if (formData) {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const formatMotivo = (motivo: string): string => {
        return motivo.trim().toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { fecha, hora, motivo } = formData;

        if (!fecha || !hora || !motivo) {
            showAlert('Error', 'No tienen que haber campos vacíos', 'error');
            return;
        }

        if (motivoError || (Number(rol) === 2 && !selectedDoctor)) {
            showAlert('Error', 'Por favor, corrija los errores en el formulario antes de continuar.', 'error');
            return;
        }

        const confirmed = await showConfirmationAlert();

        if (confirmed && formData) {
            try {
                const updatedAppointment = {
                    ...formData,
                    motivo: formatMotivo(formData.motivo),
                    medicoID: Number(rol) === 2 && selectedDoctor ? selectedDoctor.value : Number(medicoId),
                };

                await updateAppointment(updatedAppointment);
                showSuccessAlert();
            } catch (err) {
                console.error('Error al actualizar la cita', err);
                showErrorAlert();
            }
        }
    };


    const handleDelete = async () => {
        const confirmed = await showDeleteConfirmation();
        if (confirmed && appointmentId) {
            try {
                await deleteAppointment(appointmentId);
                showDeleteSuccessAlert();
                navigate('/citas');
            } catch (err) {
                console.error('Error al eliminar la cita', err);
                showErrorAlert();
            }
        }
    };

    if (loading || updating) {
        return <div>Cargando...</div>;
    }

    if (error || updateError || deleteError) {
        return <div>Error: {error || updateError || deleteError}</div>;
    }

    if (!appointment) {
        return <div>Cita no encontrada</div>;
    }

    const handleInputChange = (newValue: string) => {
        setInputValue(newValue);
    };

    const handleRolChange = (selectedOption: any) => {
        setSelectedDoctor(selectedOption);
        setFormData(prevFormData => ({
            ...prevFormData,
            medicoID: selectedOption ? selectedOption.value : 0
        }));
    };

    // const handlePatientData = (id: number) => {
    //     navigate(`/pacientes/editar-paciente/${id}`);
    // }

    const options = doctors.map(doctor => ({
        value: doctor.iD_Medico,
        label: `${doctor.nombre} ${doctor.apellido}`,
    }));

    return (
        <DefaultLayout setIsAuthenticated={setIsAuthenticated}>
            <div className="mx-auto max-w-270">
                <BreadcrumbAppointment pageName="Editar Cita" />
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-5 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-4 sm:px-7 dark:border-strokedark flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <h3 className="font-medium text-black dark:text-white mb-4 sm:mb-0">
                                    Información de la cita
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                    <button
                                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 w-full sm:w-auto"
                                        type="button"
                                        onClick={() => navigate(`/pacientes/editar-paciente/${formData.pacienteID}`)}
                                    >
                                        <FontAwesomeIcon icon={faClipboardList} className="mr-2 mt-1" />
                                        Ver info del paciente
                                    </button>
                                    <button
                                        className="flex justify-center rounded bg-meta-7 py-2 px-6 font-medium text-gray hover:bg-opacity-90 w-full sm:w-auto"
                                        type="button"
                                        onClick={() => navigate(`/recetas/agregar-receta/${id}`)}
                                    >
                                        <FontAwesomeIcon icon={faFileWaveform} className="mr-2 mt-1" />
                                        Generar receta
                                    </button>
                                </div>
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
                                                <input
                                                    className={'w-full rounded border border-stroke bg-gray-200 py-3 pl-11.5 pr-4.5 text-gray-500 cursor-not-allowed focus:border-gray-300 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-gray-500 dark:focus:border-gray-300'}
                                                    type="text"
                                                    value={formData?.nombrePaciente || ''}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        {rol === '2' && (
                                            <div className="w-full sm:w-1/2">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="nombrePaciente"
                                                >
                                                    Cambiar médico
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4.5 top-4">
                                                        <FontAwesomeIcon icon={faUserDoctor} opacity="0.8" />
                                                    </span>
                                                    <Select
                                                        className="w-full rounded border-stroke py-1.5 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                        options={options}
                                                        value={selectedDoctor || { value: formData.medicoID, label: formData.nombreMedico || 'Seleccionar médico' }}
                                                        onChange={handleRolChange}
                                                        onInputChange={handleInputChange}
                                                        inputValue={inputValue}
                                                        isLoading={doctorsLoading}
                                                        placeholder="Buscar médico..."
                                                        noOptionsMessage={() => 'No se encontraron opciones'}
                                                    />

                                                </div>
                                            </div>
                                        )
                                            // : (
                                            //     <div className="w-full sm:w-1/2">
                                            //         <label
                                            //             className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            //             htmlFor="nombreMedico"
                                            //         >
                                            //             Nombre del Médico
                                            //         </label>
                                            //         <div className="relative">
                                            //             <span className="absolute left-4.5 top-4">
                                            //                 <FontAwesomeIcon icon={faUser} opacity="0.8" />
                                            //             </span>
                                            //             <input
                                            //                 className={'w-full rounded border border-stroke bg-gray-200 py-3 pl-11.5 pr-4.5 text-gray-500 cursor-not-allowed focus:border-gray-300 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-gray-500 dark:focus:border-gray-300'}
                                            //                 type="text"
                                            //                 value={formData.nombreMedico}
                                            //                 disabled
                                            //             />
                                            //         </div>
                                            //     </div>
                                            // )
                                        }

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
                                                    type='date'
                                                    name="fecha"
                                                    placeholder="mm/dd/yyyy"
                                                    value={formData?.fecha || ''}
                                                    onChange={handleChange}
                                                // min={new Date().toISOString().split('T')[0]}
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
                                                    value={formData?.hora || ''}
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
                                                    <FontAwesomeIcon icon={faFilePen} opacity="0.8" />
                                                </span>
                                                <input
                                                    className={`w-full rounded border border-stroke py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${motivoError ? 'border-red-500' : ''}`}
                                                    type="text"
                                                    name="motivo"
                                                    value={formData?.motivo || ''}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {motivoError && (
                                                <p className="mt-1 text-sm text-red-500">{motivoError}</p>
                                            )}
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="estatus">
                                                Estatus
                                            </label>
                                            <div className="relative z-20 bg-white dark:bg-form-input">
                                                <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                                                    {formData?.estatus === 'Pendiente' && (
                                                        <FontAwesomeIcon icon={faCalendarDay} opacity="0.8" />
                                                    )}
                                                    {formData?.estatus === 'Terminada' && (
                                                        <FontAwesomeIcon icon={faCalendarCheck} opacity="0.8" />
                                                    )}
                                                    {formData?.estatus === 'Cancelada' && (
                                                        <FontAwesomeIcon icon={faCalendarXmark} opacity="0.8" />
                                                    )}
                                                </span>
                                                <select
                                                    name="estatus"
                                                    value={formData?.estatus || ''}
                                                    onChange={handleChange}
                                                    className={'relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input'}
                                                >
                                                    <option value="" disabled>
                                                        Seleccionar
                                                    </option>
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
                                            Notas (opcional)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FontAwesomeIcon icon={faNoteSticky} opacity="0.8" />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="notas"
                                                value={formData?.notas || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white w-full sm:w-auto mb-2 sm:mb-0"
                                            type="button"
                                            onClick={() => navigate('/citas')}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-cardGreen py-2 px-6 font-medium text-gray hover:bg-opacity-90 w-full sm:w-auto mb-2 sm:mb-0"
                                            type="submit"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-red-600 py-3 px-6 font-medium text-white hover:bg-opacity-90 w-full sm:w-auto"
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

export default AppointmentEdit;
