import { useState } from 'react';
import { TbPhoto } from 'react-icons/tb';
import apiClient from '../api/apiClient';

interface Prop {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const PlusImage = ({ images, setImages }: Prop) => {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const onImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setSelectedFile(filesArray);
    console.log(selectedFile);

    try {
      const response = await apiClient.post(
        '/photo/upload',
        {
          images: selectedFile,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log(response);
    } catch (error) {
      console.log(error);
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
