import Swal from 'sweetalert2';
import ShowToast from '../../../helpers/ShowToast';
import { remove } from '../api';

const handleSuccess = (): boolean => {
  ShowToast('success', 'Pendaftar Kursus Berhasil Dihapus!');
  return true;
};

const handleError = (): boolean => {
  ShowToast('error', 'Pendaftar Kursus Gagal Dihapus!');
  return false;
};

export const requestDeletePendaftarKursus = async (id_pendaftaran: string) => {
  try {
    const alert = await Swal.fire({
      icon: 'warning',
      title: 'Apakah anda yakin?',
      text: 'Ingin menghapus pendaftar kursus ini?',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      padding: '2em',
      customClass: 'sweet-alerts',
    });

    if (alert.isConfirmed) {
      await remove(id_pendaftaran);
      return handleSuccess();
    }
  } catch (error) {
    console.log(error);
    return handleError();
  }
};
