import React, { useState, useEffect } from 'react';
import Columns from './Columns';
import TableSkinBordered from '../../../components/tables/skin/TableSkinBordered';

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

interface TableProps {
  pengumuman: Array<Pengumuman>;
}

const Table: React.FunctionComponent<TableProps> = ({ pengumuman }) => {
  const DEFAULT_PAGE_SIZE: number = 10;
  const PAGE_SIZES: number[] = [10, 25, 50, 100];
  const [state, setState] = useState({
    page: 1 as number,
    pageSize: DEFAULT_PAGE_SIZE as number,
    recordsData: [] as Pengumuman[],
  });

  const { page, pageSize, recordsData } = state;

  useEffect(() => {
    setState((prevState) => ({ ...prevState, recordsData: pengumuman.slice(0, pageSize) }));
  }, [pengumuman, pageSize]);

  useEffect(() => {
    const calculateRecords = () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize;
      setState((prevState) => ({ ...prevState, recordsData: pengumuman.slice(from, to) }));
    };
    calculateRecords();
  }, [page, pageSize, pengumuman]);

  const handlePageChange = (page: number) => setState((prevState) => ({ ...prevState, page }));
  const handleRecordsPerPageChange = (size: number) => setState((prevState) => ({ ...prevState, pageSize: size }));

  return (
    <>
      <TableSkinBordered
        page={page}
        records={recordsData}
        columns={Columns()}
        totalRecords={pengumuman.length}
        onPageChange={handlePageChange}
        recordsPerPage={pageSize}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={handleRecordsPerPageChange}
      />
    </>
  );
};

export default Table;
