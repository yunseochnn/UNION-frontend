import Policy from '../../common/Policy';
import '../../style.css';
import VoteContent from './VoteContent';
import '../../style.css';
import { useEffect } from 'react';
import ShowImages from '../../common/ShowImages';

interface Prop {
  items: string[];
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  voteTitle: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Content = ({ items, images, setImages, setSuccess, voteTitle, title, setTitle, content, setContent }: Prop) => {
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (content !== '' && title !== '') {
      setSuccess(true);
    } else {
      setSuccess(false);
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

      <ShowImages images={images} setImages={setImages} />

      {items[0] !== '' && <VoteContent items={items} voteTitle={voteTitle} />}
    </div>
  );
};

export default Content;
