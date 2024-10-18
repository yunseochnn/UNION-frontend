import { TbPhoto } from 'react-icons/tb';

interface Prop {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const PlusImage = ({ images, setImages }: Prop) => {
  const onImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const image = window.URL.createObjectURL(file);
      setImages([...images, image]);
    }
  };
  return (
    <>
      <label className="flex items-center gap-2 cursor-pointer" htmlFor="img">
        <span>
          <TbPhoto size={20} />
        </span>
        <span className="text-sm">사진</span>
      </label>
      <input className="hidden" id="img" type="file" accept="image/*" onChange={onImageInput} />
    </>
  );
};

export default PlusImage;
