import React from 'react';
import { Form } from 'formik';
import InputText from '../../../../components/forms/Input/InputText';
import InputFile from '../../../../components/forms/Input/InputFile';
import QuillBasic from '../../../../components/quills/QuillBasic';
import InputNumber from '../../../../components/forms/Input/InputNumber';
import PreviewImage from '../../../../utils/PreviewImage';
import PendaftarKursus from '../../../../utils/PendaftarKursusSelect';
import HasilPengumumanSelect from '../../../../utils/HasilPengumumanSelect';

interface Pengumuman {
  pendaftaran_ID: string;
  nilai_test: number;
  nilai_interview: number;
  nilai_rata_rata: number;
  hasil_pengumuman: string;
}

interface FormLayoutsProps {
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  submitCount: number;
  values: Pengumuman;
  setFieldValue: (field: string, value: Pengumuman, shouldValidate?: boolean | undefined) => void;
}

const FormLayouts: React.FC<FormLayoutsProps> = ({ errors, handleChange, submitCount, values, setFieldValue }) => {
  return (
    <>
      <Form>
        {/* pendaftaran_ID */}
        <div className={submitCount ? (errors.pendaftaran_ID ? 'has-error' : 'has-success') : ''}>
          <PendaftarKursus
            id={'pendaftaran_ID'}
            name={'pendaftaran_ID'}
            label={'Pendaftar Kursus'}
            value={values.pendaftaran_ID}
            onChange={(e: any) => {
              setFieldValue('pendaftaran_ID', (values.pendaftaran_ID = e.value));
            }}
            error={errors.pendaftaran_ID || ''}
            placeholder={'--- Pilih Pendaftar Kursus ---'}
            isInputFilled={'Form Pendaftar Kursus Sudah Terisi'}
          />
        </div>

        <div className="grid grid-cols-4 gap-3">
          {/* Nilai test */}
          <div className={submitCount ? (errors.nilai_test ? 'has-error' : 'has-success') : ''}>
            <InputNumber
              id={'nilai_test'}
              name={'nilai_test'}
              label={'Nilai Test'}
              value={values.nilai_test}
              onChange={handleChange}
              error={errors.nilai_test || ''}
              placeholder={'Masukkan Nilai Test Pendaftar...'}
              isInputFilled={'Form Nilai Test Sudah Terisi'}
            />
          </div>

          {/* Nilai Interview */}
          <div className={submitCount ? (errors.interview ? 'has-error' : 'has-success') : ''}>
            <InputNumber
              id={'nilai_interview'}
              name={'nilai_interview'}
              label={'Nilai Interview'}
              value={values.nilai_interview}
              onChange={handleChange}
              error={errors.nilai_interview || ''}
              placeholder={'Masukkan Nilai Interview Pendaftar...'}
              isInputFilled={'Form Nilai Interview Sudah Terisi'}
            />
          </div>

          {/* Nilai Rata-rata */}
          <div className={submitCount ? (errors.nilai_rata_rata ? 'has-error' : 'has-success') : ''}>
            <InputNumber
              id={'nilai_rata_rata'}
              name={'nilai_rata_rata'}
              label={'Nilai Rata-rata'}
              value={values.nilai_rata_rata}
              onChange={handleChange}
              error={errors.nilai_rata_rata || ''}
              placeholder={'Masukkan Nilai Rata-rata Pendaftar...'}
              isInputFilled={'Form Nilai Rata-rata Sudah Terisi'}
            />
          </div>

          {/* Status Pengumuman */}
          <div className={submitCount ? (errors.hasil_pengumuman ? 'has-error' : 'has-success') : ''}>
            <HasilPengumumanSelect
              id={'hasil_pengumuman'}
              name={'hasil_pengumuman'}
              label={'Hasil Pengumuman'}
              value={values.hasil_pengumuman}
              error={errors.hasil_pengumuman || ''}
              onChange={(e: any) => {
                setFieldValue('hasil_pengumuman', (values.hasil_pengumuman = e.value));
              }}
              isInputFilled={'Form Hasil Pengumuman Sudah Terisi'}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default FormLayouts;
