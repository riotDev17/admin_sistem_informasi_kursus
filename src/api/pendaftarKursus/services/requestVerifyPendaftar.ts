import Swal from 'sweetalert2';
import ShowToast from '../../../helpers/ShowToast';
import { verify } from '../api';

const handleSuccess = (): boolean => {
  ShowToast('success', 'Data Pendaftar Berhasil Diverifikasi!');
  return true;
};

const handleError = (): boolean => {
  ShowToast('error', 'Data Pendaftar Gagal Diverifikasi!');
  return false;
};

const handleErrorConflict = (): boolean => {
  ShowToast('error', 'Data Pendaftar Sudah Diverifikasi!');
  return false;
};

export const requestVerifyPendaftar = async (id_pendaftaran: string) => {
  try {
    const alert = await Swal.fire({
      icon: 'warning',
      title: 'Apakah anda yakin?',
      text: 'Ingin memverifikasi data pendaftar ini?',
      showCancelButton: true,
      confirmButtonText: 'Verifikasi',
      padding: '2em',
      customClass: 'sweet-alerts',
    });

    if (alert.isConfirmed) {
      await verify(id_pendaftaran);
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
