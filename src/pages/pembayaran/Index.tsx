import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { requestGetPembayaran } from '../../api/pembayaran/services/requestGetPembayaran';
import ButtonIcon from '../../components/buttons/icon/ButtonIcon';
import SearchBasic from '../../components/searchs/SearchBasic';
import TippyDefault from '../../components/tippys/default/TippyDefault';
import BreadcrumbsDefault from '../../components/breadcrumbs/BreadcrumbsDefault';
import Table from './Table/Index';

interface PembayaranList {
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

const Pembayaran: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    pembayaranList: [] as PembayaranList[],
    initialPembayaranList: [] as PembayaranList[],
    searchQuery: '' as string,
  });

  const { pembayaranList, initialPembayaranList, searchQuery } = state;

  useEffect(() => {
    dispatch(setPageTitle('Admin | Pembayaran'));

    requestGetPembayaran().then((response: PembayaranList[]) => {
      setState((prevState) => ({ ...prevState, pembayaranList: response, initialPembayaranList: response }));
    });
  }, [dispatch]);

  const filterPembayaranList = useCallback(
    debounce((query: string) => {
      const filteredData = initialPembayaranList.filter(
        (item) => item?.pendaftaran?.nama_lengkap.toLowerCase().includes(query.toLowerCase()) || item?.pendaftaran?.email.toLowerCase().includes(query.toLowerCase())
      );
      setState((prevState) => ({ ...prevState, pembayaranList: filteredData }));
    }, 500),
    [initialPembayaranList]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setState((prevState) => ({ ...prevState, searchQuery: query }));
    filterPembayaranList(query);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <BreadcrumbsDefault
        header="Pembayaran"
        menus={[
          {
            label: 'Pembayaran',
            link: '/pembayaran',
            icon: 'material-symbols:money',
          },
        ]}
      />

      <div className="flex justify-between items-center mt-10">
        <SearchBasic value={searchQuery} placeholder="Cari Nama Lengkap Atau Email Pembayaran Kursus..." onChange={handleSearch} width="w-1/2" />
        <div className="flex gap-3">
          <TippyDefault content="Refresh Halaman">
            <ButtonIcon icon="material-symbols:refresh" backgroundColor="btn-info" onClick={handleRefresh} />
          </TippyDefault>
        </div>
      </div>

      <div className="mt-5">
        <Table pembayaran={pembayaranList} />
      </div>
    </>
  );
};

export default Pembayaran;
