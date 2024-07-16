import Swal from 'sweetalert2';

export const showConfirmationAlertPerfil = async (): Promise<boolean> => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Se realizarán cambios en su información, ¿Desea continuar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#3085d6',
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#d33',
  });

  return result.isConfirmed;
};