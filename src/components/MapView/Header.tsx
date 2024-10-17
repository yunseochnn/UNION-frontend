import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center w-full h-[60px] px-[30px]">
      <div className="cursor-pointer font-black" onClick={() => navigate('/Meet')}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg ml-32">{`지도 뷰`}</div>
    </div>
  );
};

export default Header;
