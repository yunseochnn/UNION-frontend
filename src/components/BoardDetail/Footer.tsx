import { FaPlus } from 'react-icons/fa6';
import { LuSendHorizonal } from 'react-icons/lu';

const Footer = () => {
  return (
    <div className="h-14 flex items-center justify-between">
      <div>
        <FaPlus size={20} />
      </div>
      <div className="w-[85%]">
        <input
          className="bg-gray-100 w-full h-10 rounded-full py-2 px-4 outline-none"
          type="text"
          placeholder="댓글을 입력해주세요"
        />
      </div>
      <div>
        {' '}
        <LuSendHorizonal size={20} />
      </div>
    </div>
  );
};

export default Footer;
