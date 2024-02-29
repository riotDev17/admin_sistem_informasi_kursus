import { Link } from 'react-router-dom';
import TippyDefault from '../../../components/tippys/default/TippyDefault';
import BadgeBasicDanger from '../../../components/badges/basic/BadgeBasicDanger';
import BadgeBasicWarning from '../../../components/badges/basic/BadgeBasicWarning';
import BadgeBasicSuccess from '../../../components/badges/basic/BadgeBasicSuccess';
import IconTrash from '../../../components/Icons/IconTrash';
import IconEye from '../../../components/Icons/IconEye';

interface ColumnsProps {
  handleDelete: (id_pendaftaran: string) => void;
}

const Columns = ({ handleDelete }: ColumnsProps) => {
  return [
    {
      title: 'NISN',
      accessor: 'nisn',
      render: (item: { nisn: number }) => (
        <>
          <span className="dark:text-white">{item?.nisn}</span>
        </>
      ),
    },
    {
      title: 'NIS',
      accessor: 'nis',
      render: (item: { nis: number }) => (
        <>
          <span className="dark:text-white">{item?.nis}</span>
        </>
      ),
    },
    {
      title: 'Email',
      accessor: 'email',
      render: (item: { email: string }) => (
        <>
          <span className="dark:text-white">{item?.email}</span>
        </>
      ),
    },
    {
      title: 'Nama Lengkap',
      accessor: 'nama_lengkap',
      render: (item: { nama_lengkap: string }) => (
        <>
          <span className="dark:text-white">{item?.nama_lengkap}</span>
        </>
      ),
    },
    {
      title: 'Asal Sekolah',
      accessor: 'sekolah',
      render: (item: { sekolah: { nama_sekolah: string } }) => (
        <>
          <span className="dark:text-white">{item?.sekolah?.nama_sekolah}</span>
        </>
      ),
    },
    {
      title: 'Kursus Yang Dipilih',
      accessor: 'kursus',
      render: (item: { kursus: { nama_kursus: string } }) => (
        <>
          <span className="dark:text-white">{item?.kursus?.nama_kursus}</span>
        </>
      ),
    },
    {
      title: 'Status Pendaftaran',
      accessor: 'status_pendaftaran',
      render: (item: { status_pendaftaran: string }) => (
        <>
          {item?.status_pendaftaran === 'Diproses' ? (
            <BadgeBasicWarning label="Diproses" />
          ) : item?.status_pendaftaran === 'Diverifikasi' ? (
            <BadgeBasicSuccess label="Diverifikasi" />
          ) : (
            <BadgeBasicDanger label="Ditolak" />
          )}
        </>
      ),
    },

    {
      title: 'Aksi',
      accessor: 'aksi',
      render: (item: { id_pendaftaran: string }) => (
        <>
          <div className="flex space-x-1 rtl:space-x-reverse gap-2">
            <Link to={`/pendaftar-kursus/${item?.id_pendaftaran}`}>
              <TippyDefault content="Lihat Data Pendaftar Kursus">
                <IconEye className="dark:text-white" />
              </TippyDefault>
            </Link>
            <button onClick={() => handleDelete(item?.id_pendaftaran)}>
              <TippyDefault content="Hapus">
                <IconTrash className="dark:text-white" />
              </TippyDefault>
            </button>
          </div>
        </>
      ),
    },
  ];
};

export default Columns;
