import { IoIosArrowBack } from 'react-icons/io';
import SearchInput from './SearchInput';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center w-full h-[62px]">
      <div className="ml-5 cursor-pointer font-black mr-[15px]" onClick={handleBackClick}>
        <IoIosArrowBack size={32} />
      </div>
      <SearchInput />
    </div>
  );
};

export default Header;
