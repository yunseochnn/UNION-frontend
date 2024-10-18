import { HiOutlineArchiveBox } from 'react-icons/hi2';
import { TbPhoto } from 'react-icons/tb';

interface Prop {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const Footer = ({ setOpen, images, setImages }: Prop) => {
  const onClickVoteHandler = () => {
    setOpen(true);
  };

  const onImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const image = window.URL.createObjectURL(file);
      setImages([...images, image]);
    }
  };

  return (
    <div className="border-t border-gray-200 h-14">
      <div className="flex gap-7 mt-4 text-gray-400">
        <label className="flex items-center gap-2 cursor-pointer" htmlFor="img">
          <span>
            <TbPhoto size={20} />
          </span>
          <span className="text-sm">사진</span>
        </label>
        <input className="hidden" id="img" type="file" accept="image/*" onChange={onImageInput} />
        <div className="flex items-center gap-2 cursor-pointer" onClick={onClickVoteHandler}>
          <span>
            <HiOutlineArchiveBox size={20} />
          </span>
          <span className="text-sm">투표</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
