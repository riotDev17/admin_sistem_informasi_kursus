import React, { useState, useEffect } from 'react';
import Columns from './Columns';
import TableSkinBordered from '../../../components/tables/skin/TableSkinBordered';

interface PendaftarKursus {
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

interface TableProps {
  pendaftarKursus: Array<PendaftarKursus>;
  handleDelete: (id_pendaftaran: string) => void;
}

const Table: React.FunctionComponent<TableProps> = ({ pendaftarKursus, handleDelete }) => {
  const DEFAULT_PAGE_SIZE: number = 10;
  const PAGE_SIZES: number[] = [10, 25, 50, 100];
  const [state, setState] = useState({
    page: 1 as number,
    pageSize: DEFAULT_PAGE_SIZE as number,
    recordsData: [] as PendaftarKursus[],
  });

  const { page, pageSize, recordsData } = state;

  useEffect(() => {
    setState((prevState) => ({ ...prevState, recordsData: pendaftarKursus.slice(0, pageSize) }));
  }, [pendaftarKursus, pageSize]);

  useEffect(() => {
    const calculateRecords = () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize;
      setState((prevState) => ({ ...prevState, recordsData: pendaftarKursus.slice(from, to) }));
    };
    calculateRecords();
  }, [page, pageSize, pendaftarKursus]);

  const handlePageChange = (page: number) => setState((prevState) => ({ ...prevState, page }));
  const handleRecordsPerPageChange = (size: number) => setState((prevState) => ({ ...prevState, pageSize: size }));

  return (
    <>
      <TableSkinBordered
        page={page}
        records={recordsData}
        columns={Columns({ handleDelete })}
        totalRecords={pendaftarKursus.length}
        onPageChange={handlePageChange}
        recordsPerPage={pageSize}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={handleRecordsPerPageChange}
      />
    </>
  );
};

export default Table;
