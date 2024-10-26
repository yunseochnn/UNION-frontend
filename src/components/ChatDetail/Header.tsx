import { FaEllipsisVertical } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setModal }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-[85%] h-[60px]">
      <div className="cursor-pointer font-black" onClick={() => navigate('/chat')}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{`찐 감자`}</div>
      <div className="flex gap-[20px]">
        <div className="cursor-pointer" onClick={() => setModal(true)}>
          <FaEllipsisVertical size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
