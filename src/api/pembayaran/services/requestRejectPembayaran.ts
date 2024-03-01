import Swal from 'sweetalert2';
import ShowToast from '../../../helpers/ShowToast';
import { reject } from '../api';

const handleSuccess = (): boolean => {
  ShowToast('success', 'Pembayaran Berhasil Ditolak!');
  return true;
};

const handleError = (): boolean => {
  ShowToast('error', 'Pembayaran Ditolak!');
  return false;
};

const handleErrorConflict = (): boolean => {
  ShowToast('error', 'Pembayaran Sudah Ditolak!');
  return false;
};

export const requestRejectPembayaran = async (id_pembayaran: string) => {
  try {
    const alert = await Swal.fire({
      icon: 'warning',
      title: 'Apakah anda yakin?',
      text: 'Ingin menolak pembayaran ini?',
      showCancelButton: true,
      confirmButtonText: 'Tolak',
      padding: '2em',
      customClass: 'sweet-alerts',
    });

    if (alert.isConfirmed) {
      await reject(id_pembayaran);
      return handleSuccess();
    }
    return handleSuccess();
  } catch (error) {
    console.log(error);
    if ((error as any).response.status === 409) {
      return handleErrorConflict();
    } else {
      return handleError();
    }
  }
};
