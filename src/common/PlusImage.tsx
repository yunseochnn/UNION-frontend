import { useState } from 'react';
import { TbPhoto } from 'react-icons/tb';

const PlusImage = () => {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const onImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setSelectedFile(filesArray);
    console.log(selectedFile);
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
