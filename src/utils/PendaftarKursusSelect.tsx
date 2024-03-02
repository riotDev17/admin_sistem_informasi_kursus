import { useEffect, useState } from 'react';
import { requestGetPendaftarKursus } from '../api/pendaftarKursus/services/requestGetPendaftarKursus';
import SelectSearch from '../components/forms/Select/SelectSearch';

interface PendaftarKursusSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  error: string;
  isInputFilled: string;
  onChange: (e: any) => void;
}

const PendaftarKursusSelect: React.FunctionComponent<PendaftarKursusSelectProps> = ({ id, name, label, value, placeholder, error, isInputFilled, onChange }) => {
  const [pendaftaraKursus, setPendaftarKursus] = useState<any[]>([]);

  useEffect(() => {
    requestGetPendaftarKursus().then((response) => {
      const transformedData = response.map((item: any) => ({
        value: item.id_pendaftaran,
        label: item.nama_lengkap,
      }));

      setPendaftarKursus(transformedData);
    });
  }, []);

  const styles = {
    control: (baseStyles: any) => ({
      ...baseStyles,
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      paddingBottom: '6px',
      paddingTop: '6px',
      paddingLeft: '8px',
      color: '#1f2937',
      backgroundColor: '#fff',
    }),
  };

  return (
    <>
      <SelectSearch
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        options={pendaftaraKursus}
        error={error}
        styles={styles}
        isInputFilled={isInputFilled}
      />
    </>
  );
};

export default PendaftarKursusSelect;
