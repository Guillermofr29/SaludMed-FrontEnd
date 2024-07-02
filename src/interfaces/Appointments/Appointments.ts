export interface Appointments {
    iD_Cita: number;
    PacienteID: number;
    MedicoID?: number;
    nombrePaciente: string;
    nombreMedico: string;
    fecha: string;
    hora: string;
    motivo:string;
    notas: string;
    estatus: string;
};