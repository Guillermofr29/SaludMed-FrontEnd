import Swal from 'sweetalert2';

export const showConfirmationAlert = async (): Promise<boolean> => {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se enviará un email al paciente, ¿Desea continuar?',
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
        text: 'Email envíado exitosamente.',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
    });
};

export const showErrorAlert = (): void => {
    Swal.fire({
        title: 'Error',
        text: 'Ocurrió un problema al enviar el email.',
        icon: 'error',
    });
};