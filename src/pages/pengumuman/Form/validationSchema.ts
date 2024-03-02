import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  pendaftaran_ID: yup.string().required('Pendaftar Kursus Wajib Dipilih'),
  nilai_test: yup.number().required('Nilai Test Wajib Diisi'),
  nilai_interview: yup.number().required('Nilai Interview Wajib Diisi'),
  nilai_rata_rata: yup.number().required('Nilai Rata-Rata Wajib Diisi'),
  hasil_pengumuman: yup.string().required('Hasil Pengumuman Wajib Diisi'),
});
