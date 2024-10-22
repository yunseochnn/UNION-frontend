import { PiMapPinBold } from 'react-icons/pi';
import PlusImage from '../../common/PlusImage';

interface Prop {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const Footer = ({ setOpen, images, setImages }: Prop) => {
  console.log(images);
  return (
    <div className="border-t border-gray-200 h-14">
      <div className="flex gap-7 mt-4 text-gray-400">
        <PlusImage images={images} setImages={setImages} />
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setOpen(true)}>
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
