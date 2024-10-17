import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="flex items-center justify-between w-full h-[60px]">
      <div className="cursor-pointer font-black" onClick={() => navigate(`/Meet/${id}`)}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{`참여자 목록`}</div>
      <div className="w-8 h-8"></div>
    </div>
  );
};

export default Header;
