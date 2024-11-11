// import { HiOutlineArchiveBox } from 'react-icons/hi2';
import PlusImage from '../../common/PlusImage';

interface Prop {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const Footer = ({ setOpen, setImages }: Prop) => {
  const onClickVoteHandler = () => {
    setOpen(true);
  };

  return (
    <div className="border-t border-gray-200 h-14">
      <div className="flex gap-7 mt-4 text-customGray2">
        <PlusImage setImages={setImages} />
        <div className="flex items-center gap-2 cursor-pointer" onClick={onClickVoteHandler}>
          {/* <span>
            <HiOutlineArchiveBox size={20} />
          </span>
          <span className="text-sm">투표</span> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
