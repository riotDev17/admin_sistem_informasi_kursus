import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { requestGetPendaftarKursus } from '../../api/pendaftarKursus/services/requestGetPendaftarKursus';
import { requestDeletePendaftarKursus } from '../../api/pendaftarKursus/services/requestDeletePendaftarKursus';
import ButtonIcon from '../../components/buttons/icon/ButtonIcon';
import SearchBasic from '../../components/searchs/SearchBasic';
import TippyDefault from '../../components/tippys/default/TippyDefault';
import BreadcrumbsDefault from '../../components/breadcrumbs/BreadcrumbsDefault';
import Table from './Table/Index';

interface PendaftarKursusList {
  kursus_ID: string;
  nisn: number;
  nis: number;
  nik: number;
  nama_lengkap: string;
  jenis_kelamin: string;
  pas_foto: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  agama_ID: string;
  email: string;
  no_telepon: string;
  alamat: string;
  nama_ayah: string;
  pekerjaan_ayah_ID: string;
  no_telepon_ayah: string;
  pendidikan_ayah_ID: string;
  penghasilan_ayah_ID: string;
  nama_ibu: string;
  pekerjaan_ibu_ID: string;
  no_telepon_ibu: string;
  pendidikan_ibu_ID: string;
  penghasilan_ibu_ID: string;
  slip_gaji_ayah_ibu: string;
  foto_kk: string;
  sekolah_ID: string;
  nilai_semester_1: number;
  nilai_semester_2: number;
  nilai_semester_3: number;
  nilai_semester_4: number;
  nilai_semester_5?: number;
  nilai_semester_6?: number;
  raport: string;
  prestasi?: string;
}

const PendaftarKursus: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    pendaftarKursusList: [] as PendaftarKursusList[],
    initialPendaftarKursusList: [] as PendaftarKursusList[],
    searchQuery: '' as string,
  });

  const { pendaftarKursusList, initialPendaftarKursusList, searchQuery } = state;

  useEffect(() => {
    dispatch(setPageTitle('Admin | Pendaftar Kursus'));

    requestGetPendaftarKursus().then((response: PendaftarKursusList[]) => {
      setState((prevState) => ({ ...prevState, pendaftarKursusList: response, initialPendaftarKursusList: response }));
    });
  }, [dispatch]);

  const filterPendaftarKursusList = useCallback(
    debounce((query: string) => {
      const filteredData = initialPendaftarKursusList.filter((item) => item?.nama_lengkap.toLowerCase().includes(query.toLowerCase()) || item?.email.toLowerCase().includes(query.toLowerCase()));
      setState((prevState) => ({ ...prevState, pendaftarKursusList: filteredData }));
    }, 500),
    [initialPendaftarKursusList]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setState((prevState) => ({ ...prevState, searchQuery: query }));
    filterPendaftarKursusList(query);
  };

  const handleDelete = async (id_pendaftaran: string) => {
    const isDeleted = await requestDeletePendaftarKursus(id_pendaftaran);
    if (isDeleted === true) {
      requestGetPendaftarKursus().then((response: PendaftarKursusList[]) => {
        setState((prevState) => ({ ...prevState, pendaftarKursusList: response as PendaftarKursusList[] }));
      });
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Pendaftar Kursus"
        menus={[
          {
            label: 'Pendaftar Kursus',
            link: '/pendaftar-kursus',
            icon: 'mdi:user-add',
          },
        ]}
      />

      <div className="flex justify-between items-center mt-10">
        <SearchBasic value={searchQuery} placeholder="Cari Nama Lengkap Atau Email Pendaftar Kursus..." onChange={handleSearch} width="w-1/2" />
        <div className="flex gap-3">
          <TippyDefault content="Refresh Halaman">
            <ButtonIcon icon="material-symbols:refresh" backgroundColor="btn-info" onClick={handleRefresh} />
          </TippyDefault>
        </div>
      </div>

      <div className="mt-5">
        <Table pendaftarKursus={pendaftarKursusList} handleDelete={handleDelete} />
      </div>
    </>
  );
};

export default PendaftarKursus;
