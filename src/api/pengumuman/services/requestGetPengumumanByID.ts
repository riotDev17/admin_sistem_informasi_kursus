import { getById } from '../api';

interface Pengumuman {
  id_pengumuman: string;
  pendaftaran: {
    id_pendaftaran: string;
    nama_lengkap: string;
    email: string;
    kursus: {
      id_kursus: string;
      nama_kursus: string;
    };
  };
  nilai_test: string;
  nilai_interview: string;
  nilai_rata_rata: string;
  hasil_pengumuman: string;
}

interface PengumumanResponse {
  status: number;
  data: {
    data: Pengumuman[];
  };
}

export const requestGetPengumumanByID = async (id_pengumuman: string) => {
  try {
    const response: PengumumanResponse = await getById(id_pengumuman);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
