import { useState } from 'react';
import './People.css';
import Select from 'react-select';

interface OptionType {
  value: number;
  label: number;
}

const People = () => {
  const [selectOption, setSelectOption] = useState<OptionType | null>({ value: 2, label: 2 });
  console.log(selectOption);

  const options = [
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
  ];
  return (
    <div>
      <Select defaultValue={selectOption} options={options} onChange={setSelectOption} classNamePrefix="react-select" />
    </div>
  );
};

export default People;
