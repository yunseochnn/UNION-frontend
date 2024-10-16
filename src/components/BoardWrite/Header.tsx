import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const Header = () => {
  const [success, setSuccess] = useState(false);
  return (
    <div className="flex items-center justify-between w-full h-[60px] border-b border-gray-200 ">
      <div className="cursor-pointer font-black">
        <IoIosArrowBack size={32} />
      </div>
      <div className="font-semibold text-lg">{`게시판 글쓰기`}</div>
      <div className="flex gap-[20px]">
        <div className={`cursor-pointer font-semibold text-lg ${success ? 'text-black' : 'text-gray-300'}`}>완료</div>
      </div>
    </div>
  );
};

export default Header;
