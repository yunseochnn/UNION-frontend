import Policy from '../../common/Policy';
import '../../style.css';
import VoteContent from './VoteContent';
import '../../style.css';
import { IoIosCloseCircle } from 'react-icons/io';
import { useEffect, useState } from 'react';

interface Prop {
  items: string[];
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  voteTitle: string;
}

const Content = ({ items, images, setImages, setSuccess, voteTitle }: Prop) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onClickCloseImage = (id: number) => {
    const newImages = images.filter((image, index) => index !== id);
    setImages(newImages);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (content !== '' && title !== '') {
      setSuccess(true);
    }
  }, [content, setSuccess, title]);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto hidden-scrollbar mt-4">
      <div>
        <Policy />
      </div>

      <div className="mt-4">
        <input
          value={title}
          className="outline-none w-full text-xl font-semibold"
          placeholder="제목을 입력하세요"
          onChange={onChangeTitle}
        />
      </div>

      <textarea
        value={content}
        className="mt-4 w-full flex-1 text-base resize-none placeholder-gray-400 outline-none hidden-scrollbar min-h-52"
        placeholder="주변 학생들과 나누고 싶은 내용을 입력해주세요"
        onChange={onChangeContent}
      />

      <div className="flex gap-3 mb-3 overflow-x-auto hidden-scrollbar">
        {images &&
          images.map((image, index) => (
            <div
              key={index}
              className="h-24 w-24 flex flex-shrink-0 justify-center items-center rounded-md overflow-hidden"
            >
              <div className="relative">
                <img src={image} className="object-full" />
                <div className="absolute top-1 right-1" onClick={() => onClickCloseImage(index)}>
                  <IoIosCloseCircle />
                </div>
              </div>
            </div>
          ))}
      </div>

      {items[0] !== '' && <VoteContent items={items} voteTitle={voteTitle} />}
    </div>
  );
};

export default Content;
