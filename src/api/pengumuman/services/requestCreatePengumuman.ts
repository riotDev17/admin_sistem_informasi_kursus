import { post } from '../api';
import ShowToast from '../../../helpers/ShowToast';

interface Pengumuman {
  pendaftaran_ID: string;
  nilai_test: number;
  nilai_interview: number;
  nilai_rata_rata: number;
  hasil_pengumuman: string;
}

interface PengumumanResponse {
  status: number;
  data: {
    data: Pengumuman;
  };
}

const handleSuccess = (): boolean => {
  ShowToast('success', 'Pengumuman Berhasil Ditambahkan!');
  return true;
};

const handleError = (): boolean => {
  ShowToast('error', 'Pengumuman Gagal Ditambahkan!');
  return false;
};

const handleErrorConflict = (): boolean => {
  ShowToast('error', 'Pengumuman Sudah Dibuat!');
  return false;
};

export const requestCreatePengumuman = async (data: Pengumuman) => {
  try {
    const response: PengumumanResponse = await post(data);
    if (response.status === 201) {
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
