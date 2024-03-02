import { get } from '../api';

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

export const requestGetPengumuman = async () => {
  try {
    const response: PengumumanResponse = await get();
    const pengumuman = response?.data?.data.map((item: any, index: number) => ({ ...item, index }));
    return pengumuman;
  } catch (error) {
    console.log(error);
    return [];
  }
};
