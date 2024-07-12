import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BreadcrumbAppointment from '../../components/Breadcrumbs/BreadcrumbAppointment';
import DefaultLayout from '../../layout/DefaultLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFilePen, faClipboardList, faHashtag, faXmark, faPrescriptionBottle, faClockRotateLeft, faCalendarCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import useGetAppointmentById from '../../hooks/Appointments/useGetAppointmentById';
import { Appointments } from '../../interfaces/Appointments/Appointments';
import { Medications } from '../../interfaces/Medications/Medications';
import { Prescription } from '../../interfaces/Prescription/Prescription';
import { showConfirmationAlert, showSuccessAlert, showErrorAlert, showAlert } from '../../components/Alerts/AppointmentAlert';
import { validateOnlyString } from '../../components/Validations/Patients/PatientValidation';
import Select from 'react-select';
import useGetMedications from '../../hooks/Medications/useGetMedications';

interface DashboardProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const PrescriptionEdit: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const rol = localStorage.getItem('rolID') || 'rolId';
    const medicoId = localStorage.getItem('userId') || 'Id';
    const { medications, loading: mediacationsLoading } = useGetMedications();
    const appointmentId = id ? parseInt(id) : undefined;
    const { appointment } = useGetAppointmentById(appointmentId || 0);
    const [motivoError, setMotivoError] = useState<string | null>(null);
    const [selectedMedi, setSelectedMedications] = useState<{ value: number; label: string } | null>(null);
    const [inputValueMedi, setInputValue] = useState<string>('');

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

    const [medicamentos, setMedicamentos] = useState<Array<Prescription>>([]);

    useEffect(() => {
        if (appointment) {
            setFormData({
                ...appointment,
            });
        }
    }, [appointment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'Diagnostico') {
            setMotivoError(validateOnlyString(value));
        }

        
    };

    const formatMotivo = (motivo: string): string => {
        return motivo.trim().toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase());
    };

    const addMedicamento = () => {
        setMedicamentos([...medicamentos, { PacienteID: formData.pacienteID, CitaID: formData.iD_Cita, Diagnostico: '', FechaInicio: '', FechaFin: '', RecetaID: 0, MedicamentoID: 0, Dosis: '', Cantidad: '', Frecuencia: '' }]);
    };

    const removeMedicamento = (index: number) => {
        const newMedicamentos = medicamentos.filter((_, i: number) => i !== index);
        setMedicamentos(newMedicamentos);
    };

    const handleMedicamentoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newMedicamentos = [...medicamentos];
        newMedicamentos[index] = {
            ...newMedicamentos[index],
            [name]: value,
        };
        setMedicamentos(newMedicamentos);
    };

    const handleMedicationsChange = (index: number, selectedOption: any) => {
        const newMedicamentos = [...medicamentos];
        newMedicamentos[index] = {
            ...newMedicamentos[index],
            iD_Medicamento: selectedOption ? selectedOption.value : 0,
            nombre: selectedOption ? selectedOption.label : '',
        };
        setMedicamentos(newMedicamentos);
    };

    const options = medications.map(medi => ({
        value: medi.iD_Medicamento,
        label: `${medi.nombre}`,
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { FechaInicio, FechaFin, Diagnostico, Dosis, Cantidad, Frecuencia } = medicamentos[0]; // Asumiendo que el primer medicamento debe tener estos valores

        if (!FechaInicio || !FechaFin || !Diagnostico || !Dosis || !Cantidad || !Frecuencia) {
            showAlert('Error', 'No tienen que haber campos vacíos', 'error');
            return;
        }

        if (motivoError) {
            showAlert('Error', 'Por favor, corrija los errores en el formulario antes de continuar.', 'error');
            return;
        }

        const confirmed = await showConfirmationAlert();

        if (confirmed && formData) {
            try {
                const updatedAppointment = {
                    ...formData,
                    motivo: formatMotivo(formData.motivo),
                    medicoID: Number(rol) === 2 && selectedMedi ? selectedMedi.value : Number(medicoId),
                };

                await updateAppointment(updatedAppointment);
                showSuccessAlert();
            } catch (err) {
                console.error('Error al actualizar la cita', err);
                showErrorAlert();
            }
        }
    };

    return (
        <DefaultLayout setIsAuthenticated={setIsAuthenticated}>
            <div className="mx-auto max-w-270">
                <BreadcrumbAppointment pageName="Generar Receta" />
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-5 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark flex justify-between items-center">
                                <h3 className="font-medium text-black dark:text-white">
                                    Información de la receta <div>
                                        <h3>Valores de formData:</h3>
                                        <pre>{JSON.stringify(formData, null, 2)}</pre>
                                    </div>
                                </h3>
                                <div className="flex gap-4.5">
                                    <button
                                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                        type="button"
                                        onClick={() => navigate(`/citas/editar-cita/${id}`)}>
                                        <FontAwesomeIcon icon={faClipboardList} className="mr-2 mt-1" />
                                        Regresar
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
                                                Paciente
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

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="nombreMedico"
                                            >
                                                Médico
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <FontAwesomeIcon icon={faUser} opacity="0.8" />
                                                </span>
                                                <input
                                                    className={'w-full rounded border border-stroke bg-gray-200 py-3 pl-11.5 pr-4.5 text-gray-500 cursor-not-allowed focus:border-gray-300 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-gray-500 dark:focus:border-gray-300'}
                                                    type="text"
                                                    value={formData?.nombreMedico || ''}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="Diagnostico"
                                            >
                                                Diagnóstico
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <FontAwesomeIcon icon={faFilePen} opacity="0.8" />
                                                </span>
                                                <input
                                                    className={`w-full rounded border ${motivoError ? 'border-meta-1' : 'border-stroke'} py-3 pl-11.5 pr-4.5 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                                                    type="text"
                                                    name="Diagnostico"
                                                    id="Diagnostico"
                                                    placeholder="Diagnóstico"
                                                    value={medicamentos[0]?.Diagnostico || ''}
                                                    onChange={(e) => handleMedicamentoChange(0, e)}
                                                />
                                                {motivoError && <p className="text-meta-1 text-sm mt-1">{motivoError}</p>}
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="FechaInicio"
                                            >
                                                Fecha de inicio
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <FontAwesomeIcon icon={faClockRotateLeft} opacity="0.8" />
                                                </span>
                                                <input
                                                    className={`w-full rounded border ${motivoError ? 'border-meta-1' : 'border-stroke'} py-3 pl-11.5 pr-4.5 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                                                    type="date"
                                                    name="FechaInicio"
                                                    id="FechaInicio"
                                                    value={medicamentos[0]?.FechaInicio || ''}
                                                    onChange={(e) => handleMedicamentoChange(0, e)}
                                                />
                                                {motivoError && <p className="text-meta-1 text-sm mt-1">{motivoError}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="FechaFin"
                                            >
                                                Fecha de fin
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <FontAwesomeIcon icon={faCalendarCheck} opacity="0.8" />
                                                </span>
                                                <input
                                                    className={`w-full rounded border ${motivoError ? 'border-meta-1' : 'border-stroke'} py-3 pl-11.5 pr-4.5 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                                                    type="date"
                                                    name="FechaFin"
                                                    id="FechaFin"
                                                    value={medicamentos[0]?.FechaFin || ''}
                                                    onChange={(e) => handleMedicamentoChange(0, e)}
                                                />
                                                {motivoError && <p className="text-meta-1 text-sm mt-1">{motivoError}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="Medicamentos"
                                        >
                                            Medicamentos
                                        </label>
                                        {medicamentos.map((medicamento, index) => (
                                            <div key={index} className="mb-5.5">
                                                <div className="flex flex-col gap-3 mb-3 sm:flex-row">
                                                    <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor={`Medicamento-${index}`}
                                                        >
                                                            Medicamento {medicamento.MedicamentoID}
                                                        </label>
                                                        <Select
                                                            id={`Medicamento-${index}`}
                                                            value={{ value: medicamento.MedicamentoID, label: medicamento.nombre }}
                                                            onChange={(selectedOption) => handleMedicationsChange(index, selectedOption)}
                                                            options={options}
                                                            placeholder="Seleccione un medicamento"
                                                        />
                                                    </div>
                                                    <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor={`Dosis-${index}`}
                                                        >
                                                            Dosis {medicamento.Dosis}
                                                        </label>
                                                        <input
                                                            className="w-full rounded border border-stroke py-3 pl-4.5 pr-4.5 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                            type="text"
                                                            id={`Dosis-${index}`}
                                                            name="Dosis"
                                                            value={medicamento.Dosis}
                                                            onChange={(e) => handleMedicamentoChange(index, e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-3 sm:flex-row">
                                                    <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor={`Cantidad-${index}`}
                                                        >
                                                            Cantidad {medicamento.Cantidad}
                                                        </label>
                                                        <input
                                                            className="w-full rounded border border-stroke py-3 pl-4.5 pr-4.5 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                            type="text"
                                                            id={`Cantidad-${index}`}
                                                            name="Cantidad"
                                                            value={medicamento.Cantidad}
                                                            onChange={(e) => handleMedicamentoChange(index, e)}
                                                        />
                                                    </div>
                                                    <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor={`Frecuencia-${index}`}
                                                        >
                                                            Frecuencia {medicamento.Frecuencia}
                                                        </label>
                                                        <input
                                                            className="w-full rounded border border-stroke py-3 pl-4.5 pr-4.5 text-black outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                            type="text"
                                                            id={`Frecuencia-${index}`}
                                                            name="Frecuencia"
                                                            value={medicamento.Frecuencia}
                                                            onChange={(e) => handleMedicamentoChange(index, e)}
                                                        />
                                                    </div>
                                                </div>
                                                {index > 0 && (
                                                    <div className="flex justify-end mt-3">
                                                        <button
                                                            type="button"
                                                            className="flex items-center gap-2 text-red-600"
                                                            onClick={() => removeMedicamento(index)}
                                                        >
                                                            <FontAwesomeIcon icon={faXmark} />
                                                            <span>Eliminar</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <div className="flex justify-end mt-3">
                                            <button
                                                type="button"
                                                className="flex items-center gap-2 text-primary"
                                                onClick={addMedicamento}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                                <span>Agregar Medicamento</span>
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                        type="submit"
                                    >
                                        Guardar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default PrescriptionEdit;
