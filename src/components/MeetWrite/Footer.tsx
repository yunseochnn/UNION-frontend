import { PiMapPinBold } from 'react-icons/pi';
import { TbPhoto } from 'react-icons/tb';

const Footer = () => {
  return (
    <div className="border-t border-gray-200 h-20">
      <div className="flex gap-7 mt-4 text-gray-400">
        <div className="flex items-center gap-2 cursor-pointer">
          <span>
            <TbPhoto size={20} />
          </span>
          <span className="text-sm">사진</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <span>
            <PiMapPinBold size={20} />
          </span>
          <span className="text-sm">장소</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
