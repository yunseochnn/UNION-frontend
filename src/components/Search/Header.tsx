import { IoIosArrowBack } from 'react-icons/io';
import SearchInput from './SearchInput';

const Header = () => {
  return (
    <div className="flex items-center w-full h-[62px]">
      <div className="ml-5 cursor-pointer font-black mr-[15px]">
        <IoIosArrowBack size={32} />
      </div>
      <SearchInput />
    </div>
  );
};

export default Header;
