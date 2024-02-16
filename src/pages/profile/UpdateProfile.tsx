import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { validationSchema } from './validationSchema';
import { useEffect, useState } from 'react';
import { requestGetProfilUser } from '../../api/profile/services/requestGetProfilUser';
import { requestUpdateProfilUser } from '../../api/profile/services/requestUpdateProfilUser';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormLayouts from './layouts/FormLayouts';
import ButtonSolidDanger from '../../components/buttons/solid/ButtonSolidDanger';
import BreadcrumbsDefault from '../../components/breadcrumbs/BreadcrumbsDefault';
import ButtonSolidPrimary from '../../components/buttons/solid/ButtonSolidPrimary';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id_users } = useParams<{ id_users: string }>();
  const [user, setUser] = useState<any>({});
  const [data, setData] = useState<any>({
    nama: '',
    foto_profil: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    no_telepon: '',
    alamat: '',
    instagram: '',
    whatsapp: '',
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    dispatch(setPageTitle('Admin | Profile'));

    requestGetProfilUser().then((response) => {
      setUser(response);
      setData({
        nama: response?.data?.nama,
        foto_profil: response?.data?.foto_profil,
        tempat_lahir: response?.data?.tempat_lahir,
        tanggal_lahir: response?.data?.tanggal_lahir,
        jenis_kelamin: response?.data?.jenis_kelamin,
        no_telepon: response?.data?.no_telepon,
        alamat: response?.data?.alamat,
        instagram: response?.data?.instagram,
        whatsapp: response?.data?.whatsapp,
      });
    });
  }, [dispatch]);

  const handleUpdateProfile = async (values: any): Promise<any> => {
    const request = await requestUpdateProfilUser(id_users ?? '', values);
    if (request) {
      navigate(`/profile`);
    }
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Profile"
        menus={[
          {
            label: 'Profile',
            link: `/profile/${id_users}`,
            icon: 'mdi:user',
          },
        ]}
      />

      <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-xl p-5 mb-5 mt-10 bg-white dark:bg-black">
        <h5 className="font-semibold text-lg dark:text-white-dark mb-10 mt-5 px-5">Update Profile Admin</h5>
        <div className="flex flex-col sm:flex-row">
          <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
            {imagePreview ? (
              <img src={imagePreview} alt="Iamge Preview" className="w-44 h-44 md:w-48 md:h-48 rounded-full object-cover mx-auto" />
            ) : (
              <img src={`${import.meta.env.VITE_API_URL}/${user?.data?.foto_profil}`} alt="img" className="w-44 h-44 md:w-48 md:h-48 rounded-full object-cover mx-auto" />
            )}
          </div>

          <div className="flex-1">
            <Formik
              enableReinitialize={true}
              initialValues={{
                nama: data.nama,
                foto_profil: data.foto_profil,
                tempat_lahir: data.tempat_lahir,
                tanggal_lahir: data.tanggal_lahir,
                jenis_kelamin: data.jenis_kelamin,
                no_telepon: data.no_telepon,
                alamat: data.alamat,
                instagram: data.instagram,
                whatsapp: data.whatsapp,
              }}
              validationSchema={validationSchema}
              onSubmit={handleUpdateProfile}
            >
              {({ errors, handleChange, submitCount, values, setFieldValue }) => (
                <>
                  <FormLayouts errors={errors} handleChange={handleChange} submitCount={submitCount} values={values} setFieldValue={setFieldValue} setImagePreview={setImagePreview} />

                  <div className="md:flex justify-end mx-5 gap-3">
                    <ButtonSolidPrimary text={'Update Profil'} width={'md:w-auto w-full'} onClick={() => handleUpdateProfile(values)} />
                    <Link to={'/profile'}>
                      <ButtonSolidDanger text={'Batal'} width={'md:w-auto w-full'} />
                    </Link>
                  </div>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
