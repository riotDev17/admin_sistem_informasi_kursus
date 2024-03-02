import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { validationSchema } from './validationSchema';
import { useEffect, useState } from 'react';
import { requestUpdatePengumuman } from '../../../api/pengumuman/services/requestUpdatePengumuman';
import { requestGetPengumumanByID } from '../../../api/pengumuman/services/requestGetPengumumanByID';
import FormLayouts from './layouts/FormLayouts';
import ButtonSolidSuccess from '../../../components/buttons/solid/ButtonSolidSuccess';
import ButtonSolidDanger from '../../../components/buttons/solid/ButtonSolidDanger';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';

interface Pengumuman {
  pendaftaran_ID: string;
  nilai_test: number;
  nilai_interview: number;
  nilai_rata_rata: number;
  hasil_pengumuman: string;
}

const FormUpdate: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { id_pengumuman } = useParams<{ id_pengumuman: string }>();
  const [formData, setFormData] = useState<Pengumuman>({
    pendaftaran_ID: '' as string,
    nilai_test: 0 as number,
    nilai_interview: 0 as number,
    nilai_rata_rata: 0 as number,
    hasil_pengumuman: '' as string,
  });

  useEffect(() => {
    requestGetPengumumanByID(id_pengumuman ?? '').then((response: any) => {
      setFormData({
        pendaftaran_ID: response.data.pendaftaran.id_pendaftaran,
        nilai_test: response.data.nilai_test,
        nilai_interview: response.data.nilai_interview,
        nilai_rata_rata: response.data.nilai_rata_rata,
        hasil_pengumuman: response.data.hasil_pengumuman,
      });
    });
  }, [id_pengumuman]);

  const handleUpdate = async (formData: Pengumuman) => {
    const request = await requestUpdatePengumuman(id_pengumuman ?? '', formData);
    if (request) {
      navigate('/pengumuman');
    }
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Update Pengumuman"
        menus={[
          {
            label: 'Pengumuman',
            link: '/pengumuman',
            icon: 'mdi:announcement',
          },
          {
            label: 'Update Pengumuman',
            link: `/pengumuman/update-pengumuman/${id_pengumuman}`,
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          enableReinitialize={true}
          initialValues={{
            pendaftaran_ID: formData.pendaftaran_ID,
            nilai_test: formData.nilai_test,
            nilai_interview: formData.nilai_interview,
            nilai_rata_rata: formData.nilai_rata_rata,
            hasil_pengumuman: formData.hasil_pengumuman,
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ errors, handleChange, submitCount, values, setFieldValue }) => (
            <>
              <FormLayouts errors={errors} handleChange={handleChange} submitCount={submitCount} values={values} setFieldValue={setFieldValue} />

              <div className="flex gap-3 justify-end">
                <ButtonSolidSuccess text={'Update Pengumuman'} width={'w-auto'} onClick={() => handleUpdate(values)} />
                <Link to={'/pengumuman'}>
                  <ButtonSolidDanger text={'Batal'} width={'w-auto'} />
                </Link>
              </div>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormUpdate;
