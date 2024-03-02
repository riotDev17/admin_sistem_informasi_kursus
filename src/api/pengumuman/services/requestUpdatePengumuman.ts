import { put } from '../api';
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
  ShowToast('success', 'Pengumuman Berhasil Diupdate!');
  return true;
};

const handleError = (): boolean => {
  ShowToast('error', 'Pengumuman Gagal Diupdate!');
  return false;
};

export const requestUpdatePengumuman = async (id_pengumuman: string, data: Pengumuman) => {
  try {
    const response: PengumumanResponse = await put(id_pengumuman, data);
    if (response.status === 200) {
      return handleSuccess();
    }
  } catch (error) {
    console.log(error);
    return handleError();
  }
};
