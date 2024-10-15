import { GoHeart } from 'react-icons/go';

const Footer = () => {
  return (
    <div className="h-[70px] border-t border-gray-150 flex items-center gap-5 mt-4">
      <div className="ml-4">
        <GoHeart size={22} style={{ strokeWidth: 0.5 }} />
      </div>
      <div
        className="w-[305px] h-[53px] rounded-md flex items-center justify-center text-xl text-white font-semibold"
        style={{ backgroundColor: '#ff4a4d' }}
      >
        참여하기
      </div>
    </div>
  );
};

export default Footer;
