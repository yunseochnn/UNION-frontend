import Policy from '../../common/Policy';
import Calendar from './Calendar';
import '../../style.css';
import People from './People';
import { IoPeople } from 'react-icons/io5';
import { IAddress } from '../../pages/MeetWrite';
import Map from '../../common/Map';
import { useState } from 'react';

interface Prop {
  address: IAddress | null;
}

const Content = ({ address }: Prop) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto hidden-scrollbar mt-4">
      <div className="font-bold ml-2">시간 인원 설정</div>
      <div className="flex mb-3 justify-between items-center">
        <div>
          <Calendar />
        </div>
        <div className="flex items-center">
          <div>
            <IoPeople size={20} />
          </div>
          <People />
        </div>
      </div>

      <div>
        <Policy />
      </div>

      <div className="mt-4">
        <input
          className="outline-none w-full text-xl font-semibold"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={onTitleChange}
        />
      </div>

      <textarea
        value={text}
        onChange={handleInput}
        className="mt-4 w-full flex flex-1 text-base resize-none placeholder-gray-400 outline-none hidden-scrollbar min-h-52"
        placeholder="주변 학생들과 나누고 싶은 내용을 입력해주세요"
      />

      {address && (
        <div className="mt-4 flex flex-col">
          <div className="h-48 w-[368px] border border-gray-200 rounded-md">
            <Map y={address?.positionY} x={address?.positionX} name={address?.name} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
