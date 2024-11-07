import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-full h-[62px] px-5">
      <div className="cursor-pointer font-black" onClick={() => navigate(-1)}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{`참여자 목록`}</div>
      <div className="w-8 h-8"></div>
    </div>
  );
};

export default Header;
