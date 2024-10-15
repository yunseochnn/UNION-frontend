import { FaEllipsisVertical } from 'react-icons/fa6';
import { IoIosArrowBack } from 'react-icons/io';
import { LuSendHorizonal } from 'react-icons/lu';

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full h-[60px]">
      <div className="cursor-pointer font-black">
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{`델링델링(3D모델러 모임)`}</div>
      <div className="flex gap-[20px]">
        <div className="cursor-pointer">
          <LuSendHorizonal size={20} />
        </div>
        <div className="cursor-pointer">
          <FaEllipsisVertical size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
