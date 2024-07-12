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

    const { medications, loadingMedi: mediacationsLoading } = useGetMedications();
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

    const [formDataPrescription, setFormDataPrescription] = useState<Prescription>({
        PacienteID: 0,
        CitaID: 0,
        Diagnostico: '',
        FechaInicio: '',
        FechaFin: '',
        RecetaID: 0,
        MedicamentoID: 0,
        Dosis: '',
        Cantidad: '',
        Frecuencia: ''
    })

    const [medicamentos, setMedicamentos] = useState<Medications[]>([
    ]);

    useEffect(() => {
        if (appointment) {
            setFormData({
                ...appointment,
                // medicoID: Number(rol) === 2 ? appointment.medicoID : Number(medicoId),
            });
            // if (Number(rol) === 2) {
            //     const doctor = doctors.find(doc => doc.iD_Medico === appointment.medicoID);
            //     if (doctor) {
            //         setSelectedMedications({ value: doctor.iD_Medico, label: `${doctor.nombre} ${doctor.apellido}` });
            //     }
            // }
        }
    }, [appointment]);




    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'Diagnostico') {
            setMotivoError(validateOnlyString(value));
        }

        // if (formData) {
        //     setFormData({
        //         ...formData,
        //         [name]: value,
        //     });
        // }

        if (formDataPrescription) {
            setFormDataPrescription({
                ...formDataPrescription,
                [name]: value,
            });
        }
    };

    const formatMotivo = (motivo: string): string => {
        return motivo.trim().toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase());
    };

    // const handleMedicamentoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     const newMedicamentos = [...medicamentos];
    //     newMedicamentos[index] = {
    //         ...newMedicamentos[index],
    //         [name]: value,
    //     };
    //     setMedicamentos(newMedicamentos);
    // };


    const addMedicamento = () => {
        setMedicamentos([...medicamentos, { iD_Medicamento: 0, nombre: '', forma: '', efectosSecundarios: '' }]);
    };

    const removeMedicamento = (index: number) => {
        const newMedicamentos = medicamentos.filter((_, i: number) => i !== index);
        setMedicamentos(newMedicamentos);
    
        // Actualiza formDataPrescription eliminando el medicamento específico
        setFormDataPrescription(prevState => ({
            ...prevState,
            medicamentos: newMedicamentos,
        }));
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
    
        setFormDataPrescription(prevState => ({
            ...prevState,
            medicamentos: newMedicamentos,
            [name]: value,
        }));
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
    

    // const handleMedicationsChange = (selectedOption: any) => {
    //     setSelectedMedications(selectedOption);
    //     setFormDataPrescription(prevFormData => ({
    //         ...prevFormData,
    //         MedicamentoID: selectedOption ? selectedOption.value : 0
    //     }));
    // };

    const options = medications.map(medi => ({
        value: medi.iD_Medicamento,
        label: `${medi.nombre}`,
    }));


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { FechaInicio, FechaFin, Diagnostico, Dosis, Cantidad, Frecuencia } = formDataPrescription;

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

    // if (loadingMedi) {
    //     return <div>Cargando...</div>;
    // }

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
                                                Diagnóstico {formDataPrescription.Diagnostico}
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
                                                    onBlur={() => setMotivoError(validateOnlyString(formDataPrescription.Diagnostico))}

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
                                                Fecha inicio {formDataPrescription.FechaInicio}
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
                                                Fecha fin {formDataPrescription.FechaFin}
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
                                                        Medicamento {medi.iD_Medicamento}
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
                                                            isLoading={mediacationsLoading}
                                                            placeholder="Buscar medicamento..."
                                                            noOptionsMessage={() => 'No se encontró el medicamento'}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="w-full sm:w-1/5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                        htmlFor={`Dosis-${index}`}
                                                    >
                                                        Dosis
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-4.5 top-4">
                                                            <FontAwesomeIcon icon={faHashtag} opacity="0.8" />
                                                        </span>
                                                        <input
                                                            className={`w-full rounded border border-stroke bg-transparent py-3 pl-11.5 pr-4.5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                                            type="text"
                                                            id={`dosis-${index}`}
                                                            name="Dosis"
                                                            value={formDataPrescription.Dosis || ''}
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
                                                            name="Cantidad"
                                                            value={formDataPrescription.Cantidad || ''}
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
                                                            <FontAwesomeIcon icon={faClockRotateLeft} opacity="0.8" />
                                                        </span>
                                                        <input
                                                            className={`w-full rounded border border-stroke bg-transparent py-3 pl-11.5 pr-4.5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                                            type="text"
                                                            id={`frecuencia-${index}`}
                                                            name="Frecuencia"
                                                            value={formDataPrescription.Frecuencia || ''}
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
                                            className="flex justify-center rounded bg-red-600 py-3 px-6 font-medium text-white hover:bg-opacity-90"
                                            type="button"
                                        >
                                            Generar PDF
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

export default PrescriptionEdit;
