import { Formik } from 'formik';
import { validationSchema } from './validationSchema';
import { Link, useNavigate } from 'react-router-dom';
import { requestCreatePengumuman } from '../../../api/pengumuman/services/requestCreatePengumuman';
import FormLayouts from './layouts/FormLayouts';
import ButtonSolidDanger from '../../../components/buttons/solid/ButtonSolidDanger';
import BreadcrumbsDefault from '../../../components/breadcrumbs/BreadcrumbsDefault';
import ButtonSolidPrimary from '../../../components/buttons/solid/ButtonSolidPrimary';

interface Pengumuman {
  pendaftaran_ID: string;
  nilai_test: number;
  nilai_interview: number;
  nilai_rata_rata: number;
  hasil_pengumuman: string;
}

const FormCreate: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const handleCreate = async (formData: Pengumuman) => {
    const request = await requestCreatePengumuman(formData);
    if (request === true) {
      navigate('/pengumuman');
    }
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Tambah Pengumuman"
        menus={[
          {
            label: 'Pengumuman',
            link: '/pengumuman',
            icon: 'mdi:announcement',
          },
          {
            label: 'Tambah Pengumuman',
            link: '/pengumuman/tambah-pengumuman',
          },
        ]}
      />

      <div className="mt-10">
        <Formik
          initialValues={{
            pendaftaran_ID: '',
            nilai_test: 0,
            nilai_interview: 0,
            nilai_rata_rata: 0,
            hasil_pengumuman: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
          {({ errors, handleChange, submitCount, values, setFieldValue }) => (
            <>
              <FormLayouts errors={errors} handleChange={handleChange} submitCount={submitCount} values={values} setFieldValue={setFieldValue} />

              <div className="flex gap-3 justify-end">
                <ButtonSolidPrimary text={'Tambah Pengumuman'} width={'w-auto'} onClick={() => handleCreate(values)} />
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

export default FormCreate;
