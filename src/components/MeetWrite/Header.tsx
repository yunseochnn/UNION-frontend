import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface Prop {
  success: boolean;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ success, setClick }: Prop) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (success) {
      setClick(true);
    }
  };
  return (
    <div className="flex items-center justify-between w-[90%] h-[60px] border-b border-gray-200 ">
      <div className="cursor-pointer font-black" onClick={() => navigate('/Meet')}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{`모임 글쓰기`}</div>
      <div className="flex gap-[20px]">
        <div
          className={`cursor-pointer font-semibold text-lg ${success ? 'text-black' : 'text-gray-300'}`}
          onClick={onClick}
        >
          완료
        </div>
      </div>
    </div>
  );
};

export default Header;
