import Swal from 'sweetalert2';
import ShowToast from '../../../helpers/ShowToast';
import { verify } from '../api';

const handleSuccess = (): boolean => {
  ShowToast('success', 'Pembayaran Berhasil Diverifikasi!');
  return true;
};

const handleError = (): boolean => {
  ShowToast('error', 'Pembayaran Gagal Diverifikasi!');
  return false;
};

const handleErrorConflict = (): boolean => {
  ShowToast('error', 'Pembayaran Sudah Diverifikasi!');
  return false;
};

export const requestVerifyPembayaran = async (id_pembayaran: string) => {
  try {
    const alert = await Swal.fire({
      icon: 'warning',
      title: 'Apakah anda yakin?',
      text: 'Ingin memverifikasi pembayaran ini?',
      showCancelButton: true,
      confirmButtonText: 'Verifikasi',
      padding: '2em',
      customClass: 'sweet-alerts',
    });

    if (alert.isConfirmed) {
      await verify(id_pembayaran);
      return handleSuccess();
    }
  } catch (error) {
    console.log(error);
    if ((error as any).response.status === 409) {
      return handleErrorConflict();
    } else {
      return handleError();
    }
  }
};
