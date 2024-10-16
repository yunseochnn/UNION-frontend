import { FaEllipsisVertical } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full h-[60px]">
      <div className="cursor-pointer font-black">
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{`게시글`}</div>
      <div className="flex gap-[20px]">
        <div className="cursor-pointer">
          <FaEllipsisVertical size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
