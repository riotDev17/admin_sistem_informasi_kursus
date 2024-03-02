import { get } from '../api';

interface Pembayaran {
  id_pembayaran: string;
  pendaftaran: {
    id_pendaftaran: string;
    nama_lengkap: string;
    email: string;
    kursus: {
      id_kursus: string;
      nama_kursus: string;
    };
  };
  bukti_pembayaran: string;
  status_pembayaran: string;
  createdAt: string;
}

interface PembayarnResponse {
  status: number;
  data: {
    data: Pembayaran[];
  };
}

export const requestGetPembayaran = async () => {
  try {
    const response: PembayarnResponse = await get();
    const pembayaran = response?.data?.data.map((item: any, index: number) => ({ ...item, index }));
    return pembayaran;
  } catch (error) {
    console.log(error);
    return [];
  }
};
