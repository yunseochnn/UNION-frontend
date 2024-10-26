import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface Prop {
  success: boolean;
}

const Header = ({ success }: Prop) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-full h-[60px] border-b border-gray-200 ">
      <div className="cursor-pointer font-black" onClick={() => navigate('/meet')}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{`모임 글쓰기`}</div>
      <div className="flex gap-[20px]">
        <div className={`cursor-pointer font-semibold text-lg ${success ? 'text-black' : 'text-gray-300'}`}>완료</div>
      </div>
    </div>
  );
};

export default Header;
