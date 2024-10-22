import { FaEllipsisVertical } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setModal }: Props) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const parts = pathname.split('/');
  const nav = parts.slice(0, -1).join('/');
  return (
    <div className="flex items-center justify-between w-full h-[60px]">
      <div className="cursor-pointer font-black" onClick={() => navigate(nav)}>
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{`게시글`}</div>
      <div className="flex gap-[20px]">
        <div className="cursor-pointer" onClick={() => setModal(true)}>
          <FaEllipsisVertical size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
