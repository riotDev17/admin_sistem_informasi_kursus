import Select from 'react-select';
import React from 'react';

interface HasilPengumumanSelectProps {
  id: string;
  name: string;
  label: string;
  value: any;
  error: string;
  onChange: (value: any) => void;
  isInputFilled: string;
}

const HasilPengumumanSelect: React.FC<HasilPengumumanSelectProps> = ({ id, name, label, error, value, onChange, isInputFilled }) => {
  const isFilled = value !== '';

  const hasilPengumuman = [
    {
      label: 'LULUS',
      value: 'LULUS',
    },
    {
      label: 'TIDAK LULUS',
      value: 'TIDAK LULUS',
    },
  ];

  const selectedOption = hasilPengumuman.find((option: any) => option.value === value);
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
      <div className="mb-5">
        <label htmlFor={label}>{label}</label>

        <Select
          id={id}
          name={name}
          value={selectedOption}
          placeholder="--- Pilih Hasil Pengumuman ---"
          options={hasilPengumuman}
          isSearchable={false}
          isClearable={true}
          onChange={onChange}
          className="mb-1 basic-single text-black"
          classNamePrefix="select"
          styles={styles}
        />

        {error && <span className="text-danger">{error}</span>}
        {isFilled && !error && <span className="text-success">{isInputFilled}</span>}
      </div>
    </>
  );
};

export default HasilPengumumanSelect;
