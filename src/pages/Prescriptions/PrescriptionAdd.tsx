import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BreadcrumbAppointment from '../../components/Breadcrumbs/BreadcrumbAppointment';
import DefaultLayout from '../../layout/DefaultLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFilePen, faClipboardList, faHashtag, faXmark, faPrescriptionBottle, faCalendarCheck, faPlus, faEyeDropper, faArrowsRotate, faNoteSticky, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import useGetAppointmentById from '../../hooks/Appointments/useGetAppointmentById';
import { Appointments } from '../../interfaces/Appointments/Appointments';
import { Medications } from '../../interfaces/Medications/Medications';
import { Prescription } from '../../interfaces/Prescription/Prescription';
import { showConfirmationAlert, showSuccessAlert, showErrorAlert, showAlert } from '../../components/Alerts/PrescriptionAlert';
import { validateOnlyString } from '../../components/Validations/Patients/PatientValidation';
import Select from 'react-select';
import useGetMedications from '../../hooks/Medications/useGetMedications';
import useGetDoctor from '../../hooks/Doctors/useGetDoctor';
import axiosInstance from '../../api/axiosConfig';
import { PDFDownloadLink } from '@react-pdf/renderer';
import RecetaPDF from '../RecetaPDF';

interface DashboardProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const PrescriptionAdd: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const rol = localStorage.getItem('rolID') || 'rolId';
    const medicoId = localStorage.getItem('userId') || 'Id';

    const { medications, loadingMedi: medicationsLoading } = useGetMedications();
    const appointmentId = id ? parseInt(id) : undefined;
    const {doctor} = useGetDoctor(Number(appointmentId));
    const { appointment } = useGetAppointmentById(appointmentId || 0);
    const [motivoError, setMotivoError] = useState<string | null>(null);
    const [inputValueMedi, setInputValue] = useState<string>('');

    const [recetaGuardada, setRecetaGuardada] = useState(false);

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

    const [formDataPrescription, setFormDataPrescription] = useState<Prescription>({
        PacienteID: 0,
        CitaID: 0,
        Diagnostico: '',
        Recomendaciones: '',
        FechaInicio: '',
        FechaFin: '',
        RecetaID: 0,
        MedicamentoID: 0,
        Dosis: '',
        Cantidad: '',
        Frecuencia: ''
    });

    const formatFecha = (fecha: string) => {
        const [year, month, day] = fecha.split('-');
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        const formattedDay = String(date.getDate()).padStart(2, '0');
        const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
        const formattedYear = date.getFullYear();
        return `${formattedDay}-${formattedMonth}-${formattedYear}`;
    };

    const [medicamentos, setMedicamentos] = useState<(Medications & {
        dosis: string;
        cantidad: string;
        frecuencia: string;
        pacienteID: number;
    })[]>([]);


    const GenerarPDF = () => (
        <PDFDownloadLink document={<RecetaPDF formData={formData} formDataPrescription={formDataPrescription} medicamentos={medicamentos} doctor={doctor} />} fileName='receta.pdf'>
            {({ loading }) =>
                loading ? 'Cargando documento...' : 'Descargar PDF'
            }
        </PDFDownloadLink>
    );

    useEffect(() => {
        if (appointment) {
            setFormData({
                ...appointment,
            });
        }
    }, [appointment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // if (name === 'Diagnostico') {
        //     setMotivoError(validateOnlyString(value));
        // }

        setFormDataPrescription({
            ...formDataPrescription,
            [name]: value,
        });
    };

    const formatDiagnostico = (motivo: string): string => {
        return motivo.trim().toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase());
    };

    const addMedicamento = () => {
        setMedicamentos([...medicamentos, {
            iD_Medicamento: 0,
            nombre: '',
            forma: '',
            efectosSecundarios: '',
            dosis: '',
            pacienteID: 0,
            cantidad: '',
            frecuencia: ''
        }]);
    };

    const removeMedicamento = (index: number) => {
        const newMedicamentos = medicamentos.filter((_, i: number) => i !== index);
        setMedicamentos(newMedicamentos);
    };

    const handleInputChange = (newValue: string) => {
        setInputValue(newValue);
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

        const allFieldsFilled = medicamentos.every(med =>
            med.iD_Medicamento && med.dosis && med.cantidad && med.frecuencia
        );

        if (!formDataPrescription.FechaInicio || !formDataPrescription.FechaFin || !formDataPrescription.Diagnostico || !allFieldsFilled) {
            showAlert('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        if (motivoError) {
            showAlert('Error', 'Por favor, corrija los errores en el formulario antes de continuar.', 'error');
            return;
        }

        const confirmed = await showConfirmationAlert();

        if (confirmed) {
            try {
                const recetaData = {
                    pacienteID: formData.pacienteID,
                    citaID: formData.iD_Cita,
                    diagnostico: formatDiagnostico(formDataPrescription.Diagnostico),
                    fechaInicio: formDataPrescription.FechaInicio,
                    fechaFin: formDataPrescription.FechaFin,
                    recomendaciones: formatDiagnostico(formDataPrescription.Recomendaciones),
                    medicamentos: medicamentos.map(med => ({
                        medicamentoID: med.iD_Medicamento,
                        dosis: med.dosis,
                        cantidad: med.cantidad,
                        frecuencia: med.frecuencia,
                        pacienteID: formData.pacienteID,
                    }))
                };

                const response = await axiosInstance.post('Recetas', recetaData);

                if (response.status === 200) {
                    showSuccessAlert();
                    setRecetaGuardada(true);  // Añade esta línea
                } else {
                    throw new Error('Error al guardar la receta');
                }
            } catch (err) {
                console.error('Error al guardar la receta', err);
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
                                    Información de la receta
                                </h3>
                                {/* <h3>Valores de formData:</h3>
                                <pre>{JSON.stringify(doctor, null, 2)}</pre>
                                <pre>{JSON.stringify(formData, null, 2)}</pre> */}
                                <div className="flex gap-4.5">
                                    <button
                                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                        type="button"
                                        onClick={() => navigate(`/citas/editar-cita/${id}`)}>
                                        <FontAwesomeIcon icon={faChevronLeft} className="mr-2 mt-1" />
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
                                                    value={formData.nombreMedico}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="ID_Cita"
                                            >
                                                Cita No.
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <FontAwesomeIcon icon={faCalendarCheck} opacity="0.8" />
                                                </span>
                                                <input
                                                    className={'w-full rounded border border-stroke bg-gray-200 py-3 pl-11.5 pr-4.5 text-gray-500 cursor-not-allowed focus:border-gray-300 focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-gray-500 dark:focus:border-gray-300'}
                                                    type='text'
                                                    value={'CIT' + formData?.iD_Cita || ''}
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
                                                    className="w-full rounded border border-stroke py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    id="Diagnostico"
                                                    name="Diagnostico"
                                                    value={formDataPrescription.Diagnostico}
                                                    onChange={handleChange}
                                                    // onBlur={() => setMotivoError(validateOnlyString(formDataPrescription.Diagnostico))}

                                                />
                                                {motivoError && (
                                                    <p className="mt-1 text-sm text-red-500">{motivoError}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="FechaInicio"
                                            >
                                                Fecha inicio
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                    type='date'
                                                    name="FechaInicio"
                                                    placeholder="mm/dd/yyyy"
                                                    value={formDataPrescription.FechaInicio || ''}
                                                    onChange={handleChange}
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="FechaFin"
                                            >
                                                Fecha fin
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full rounded border-[1.5px] border-stroke px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                    type='date'
                                                    name="FechaFin"
                                                    placeholder="mm/dd/yyyy"
                                                    value={formDataPrescription.FechaFin || ''}
                                                    onChange={handleChange}
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="notas"
                                        >
                                            Recomendaciones (opcional)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <FontAwesomeIcon icon={faNoteSticky} opacity="0.8" />
                                            </span>
                                            <input
                                                className="w-full rounded border border-stroke py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="Recomendaciones"
                                                value={formDataPrescription.Recomendaciones || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className='mb-5.5'>
                                        <div className="border-b border-stroke pt-4 pb-4 dark:border-strokedark flex justify-between items-center">
                                            <h3 className="font-medium text-black dark:text-white">Lista de medicamentos</h3>
                                        </div>
                                        {medicamentos.map((medi, index) => (
                                            <div key={index} className="mb-5.5 mt-2 flex flex-col gap-5.5 sm:flex-row items-center">
                                                <div className="w-full sm:w-1/3">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                        htmlFor="nombrePaciente"
                                                    >
                                                        Medicamento
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-4.5 top-4">
                                                            <FontAwesomeIcon icon={faPrescriptionBottle} opacity="0.8" />
                                                        </span>
                                                        <Select
                                                            className="w-full rounded border-stroke py-1.5 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                            options={options}
                                                            value={options.find(option => option.value === medi.iD_Medicamento) || null}
                                                            onChange={(selectedOption) => handleMedicationsChange(index, selectedOption)}
                                                            onInputChange={handleInputChange}
                                                            inputValue={inputValueMedi}
                                                            isLoading={medicationsLoading}
                                                            placeholder="Buscar medicamento..."
                                                            noOptionsMessage={() => 'No se encontró el medicamento'}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full sm:w-1/5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                        htmlFor={`dosis-${index}`}
                                                    >
                                                        Dosis
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-4.5 top-4">
                                                            <FontAwesomeIcon icon={faEyeDropper} opacity="0.8" />
                                                        </span>
                                                        <input
                                                            className={`w-full rounded border border-stroke bg-transparent py-3 pl-11.5 pr-4.5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                                            type="text"
                                                            id={`dosis-${index}`}
                                                            name="dosis"
                                                            value={medi.dosis || ''}
                                                            onChange={(e) => handleMedicamentoChange(index, e)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full sm:w-1/5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                        htmlFor={`cantidad-${index}`}
                                                    >
                                                        Cantidad
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-4.5 top-4">
                                                            <FontAwesomeIcon icon={faHashtag} opacity="0.8" />
                                                        </span>
                                                        <input
                                                            className={`w-full rounded border border-stroke bg-transparent py-3 pl-11.5 pr-4.5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                                            type="text"
                                                            id={`cantidad-${index}`}
                                                            name="cantidad"
                                                            value={medi.cantidad || ''}
                                                            onChange={(e) => handleMedicamentoChange(index, e)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full sm:w-1/4">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                        htmlFor={`frecuencia-${index}`}
                                                    >
                                                        Frecuencia
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-4.5 top-4">
                                                            <FontAwesomeIcon icon={faArrowsRotate} opacity="0.8" />
                                                        </span>
                                                        <input
                                                            className={`w-full rounded border border-stroke bg-transparent py-3 pl-11.5 pr-4.5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                                            type="text"
                                                            id={`frecuencia-${index}`}
                                                            name="frecuencia"
                                                            value={medi.frecuencia || ''}
                                                            onChange={(e) => handleMedicamentoChange(index, e)}
                                                        />
                                                    </div>
                                                </div>

                                                {index > 0 && (
                                                    <div className="flex gap-2 mt-6">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeMedicamento(index)}
                                                            className="bg-red-500 text-white p-2 rounded"
                                                        >
                                                            <FontAwesomeIcon icon={faXmark} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className='border-b border-stroke py-4 m-4 px-7 dark:border-strokedark'>
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={addMedicamento}
                                                className="bg-blue-500 text-blue p-2 rounded"
                                            >
                                                <FontAwesomeIcon icon={faPlus} /> Agregar Medicamento
                                            </button>
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
                                        >
                                            Guardar
                                        </button>

                                        <button
                                            className="flex justify-center rounded bg-green-500 py-2 px-6 font-medium text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                                            type="button"
                                            disabled={!recetaGuardada}
                                        >
                                            <FontAwesomeIcon icon={faFilePen} className="mr-2 mt-1" />
                                            {recetaGuardada ? (
                                                <GenerarPDF />
                                            ) : (
                                                'Generar PDF'
                                            )}
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

export default PrescriptionAdd;