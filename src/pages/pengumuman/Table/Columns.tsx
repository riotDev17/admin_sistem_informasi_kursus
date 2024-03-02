import { Link } from 'react-router-dom';
import IconPencil from '../../../components/Icons/IconPencil';
import TippyDefault from '../../../components/tippys/default/TippyDefault';
import BadgeBasicDanger from '../../../components/badges/basic/BadgeBasicDanger';
import BadgeBasicSuccess from '../../../components/badges/basic/BadgeBasicSuccess';

const Columns = () => {
  return [
    {
      title: 'Nama Lengkap Pendaftar',
      accessor: 'nama_lengkap',
      render: (item: { pendaftaran: { nama_lengkap: string } }) => (
        <>
          <span className="dark:text-white">{item?.pendaftaran?.nama_lengkap}</span>
        </>
      ),
    },
    {
      title: 'Email Pendaftar',
      accessor: 'email',
      render: (item: { pendaftaran: { email: string } }) => (
        <>
          <span className="dark:text-white">{item?.pendaftaran?.email}</span>
        </>
      ),
    },
    {
      title: 'Kursus Yang Dipilih',
      accessor: 'kursus',
      render: (item: { pendaftaran: { kursus: { nama_kursus: string } } }) => (
        <>
          <span className="dark:text-white">{item?.pendaftaran?.kursus?.nama_kursus}</span>
        </>
      ),
    },
    {
      title: 'Nilai Test',
      accessor: 'nilai_test',
      render: (item: { nilai_test: number }) => (
        <>
          <span className="dark:text-white">{item?.nilai_test}</span>
        </>
      ),
    },
    {
      title: 'Nilai Interview',
      accessor: 'nilai_interview',
      render: (item: { nilai_interview: number }) => (
        <>
          <span className="dark:text-white">{item?.nilai_interview}</span>
        </>
      ),
    },
    {
      title: 'Nilai Rata-rata',
      accessor: 'nilai_rata_rata',
      render: (item: { nilai_rata_rata: number }) => (
        <>
          <span className="dark:text-white">{item?.nilai_rata_rata}</span>
        </>
      ),
    },
    {
      title: 'Hasil Pengumuman',
      accessor: 'hasil_pengumuman',
      render: (item: { hasil_pengumuman: string }) => (
        <>{item?.hasil_pengumuman === 'LULUS' ? <BadgeBasicSuccess label="LULUS" /> : item?.hasil_pengumuman === 'TIDAK LULUS' ? <BadgeBasicDanger label="TIDAK LULUS" /> : '-'}</>
      ),
    },

    {
      title: 'Aksi',
      accessor: 'aksi',
      render: (item: { id_pengumuman: string }) => (
        <>
          <div className="flex space-x-1 rtl:space-x-reverse gap-2">
            <Link to={`/pengumuman/update-pengumuman/${item?.id_pengumuman}`}>
              <TippyDefault content="Update Pengumuman">
                <IconPencil className="dark:text-white" />
              </TippyDefault>
            </Link>
          </div>
        </>
      ),
    },
  ];
};

export default Columns;
