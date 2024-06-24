import Swal from 'sweetalert2';

export const showConfirmationAlert = async (): Promise<boolean> => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se realizarán cambios en el paciente. ¿Desea continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: "#3085d6",
        cancelButtonText: 'Cancelar',
        cancelButtonColor: "#d33",
        
    });
    return result.isConfirmed;
};

export const showSuccessAlert = (): void => {
    Swal.fire({
        title: '¡Éxito!',
        text: 'Los cambios se realizaron correctamente.',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
    });
};

export const showDeleteConfirmation = async (): Promise<boolean> => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se eliminará este paciente de forma permanente. ¿Desea continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: "#d33",
        cancelButtonText: 'Cancelar',
        cancelButtonColor: "#3085d6",
    });
    return result.isConfirmed;
};

export const showDeleteSuccessAlert = (): void => {
    Swal.fire({
        title: '¡Eliminado!',
        text: 'El paciente ha sido eliminado correctamente.',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
    });
};

export const showAlert = (title: string, text: string, icon: 'success' | 'error') => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'Aceptar',
    });
};


export const showErrorAlert = (): void => {
    Swal.fire({
        title: 'Error',
        text: 'No se pudo realizar la acción.',
        icon: 'error',
    });
};
