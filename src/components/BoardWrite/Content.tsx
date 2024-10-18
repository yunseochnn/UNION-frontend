import Policy from '../../common/Policy';
import '../../style.css';
import VoteContent from './VoteContent';
import '../../style.css';
import { IoIosCloseCircle } from 'react-icons/io';

interface Prop {
  items: string[];
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const Content = ({ items, images, setImages }: Prop) => {
  const onClickCloseImage = (id: number) => {
    const newImages = images.filter((image, index) => index !== id);
    setImages(newImages);
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto hidden-scrollbar mt-4">
      <div>
        <Policy />
      </div>

      <div className="mt-4">
        <input className="outline-none w-full text-xl font-semibold" placeholder="제목을 입력하세요" />
      </div>

      <textarea
        className="mt-4 w-full flex-1 text-base resize-none placeholder-gray-400 outline-none hidden-scrollbar min-h-52"
        placeholder="주변 학생들과 나누고 싶은 내용을 입력해주세요"
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

      {items[0] !== '' && <VoteContent items={items} />}
    </div>
  );
};

export default Content;
