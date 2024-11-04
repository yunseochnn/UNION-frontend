import { FaEllipsisVertical } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string | null;
}

const Header = ({ setModal, title }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-full h-[60px]">
      <div className="cursor-pointer font-black" onClick={() => navigate(-1)}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{title}</div>
      <div className="flex gap-[20px]">
        <div className="cursor-pointer" onClick={() => setModal(true)}>
          <FaEllipsisVertical size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
