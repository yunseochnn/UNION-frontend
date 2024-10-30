import './People.css';
import Select from 'react-select';
import { OptionType } from '../../pages/MeetWrite';
interface Prop {
  maxMember: OptionType | null;
  setMaxMember: React.Dispatch<React.SetStateAction<OptionType | null>>;
}

const People = ({ maxMember, setMaxMember }: Prop) => {
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
  ];
  return (
    <div>
      <Select
        defaultValue={maxMember}
        options={options}
        onChange={setMaxMember}
        classNamePrefix="react-select"
        isSearchable={false}
      />
    </div>
  );
};

export default People;
