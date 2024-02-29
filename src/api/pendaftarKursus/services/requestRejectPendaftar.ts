import Swal from 'sweetalert2';
import ShowToast from '../../../helpers/ShowToast';
import { reject, verify } from '../api';

const handleSuccess = (): boolean => {
  ShowToast('success', 'Data Pendaftar Berhasil Ditolak!');
  return true;
};

const handleError = (): boolean => {
  ShowToast('error', 'Data Pendaftar Gagal Ditolak!');
  return false;
};

const handleErrorConflict = (): boolean => {
  ShowToast('error', 'Data Pendaftar Sudah Ditolak!');
  return false;
};

export const requestRejectPendaftar = async (id_pendaftaran: string) => {
  try {
    const alert = await Swal.fire({
      icon: 'warning',
      title: 'Apakah anda yakin?',
      text: 'Ingin menolak data pendaftar ini?',
      showCancelButton: true,
      confirmButtonText: 'Tolak',
      padding: '2em',
      customClass: 'sweet-alerts',
    });

    if (alert.isConfirmed) {
      await reject(id_pendaftaran);
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
