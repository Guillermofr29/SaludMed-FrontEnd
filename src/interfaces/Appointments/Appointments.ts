export interface Appointments {
    iD_Cita: number;
    pacienteID: number;
    medicoID?: number;
    correo?: string;
    telefono?: string;
    nombrePaciente: string;
    nombreMedico: string;
    fecha: string;
    hora: string;
    motivo:string;
    notas: string;
    estatus: string;
};