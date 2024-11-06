import { IoIosArrowBack } from 'react-icons/io';
import SearchInput from './SearchInput';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearch: (keyword: string) => void;
  onFocus?: () => void;
  onInputChange: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onFocus, onInputChange }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center w-full h-[62px]">
      <div className="ml-5 cursor-pointer font-black mr-[15px]" onClick={handleBackClick}>
        <IoIosArrowBack size={32} />
      </div>
      <SearchInput onSearch={onSearch} onFocus={onFocus} onInputChange={onInputChange} />
    </div>
  );
};

export default Header;
