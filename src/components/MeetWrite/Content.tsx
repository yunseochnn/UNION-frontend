import Policy from '../../common/Policy';
import Calendar from './Calendar';
import '../../style.css';
import People from './People';
import { IoPeople } from 'react-icons/io5';
import { IAddress, OptionType } from '../../pages/MeetWrite';
import Map from '../../common/Map';
import { useEffect } from 'react';
import ShowImages from '../../common/ShowImages';
import { FaCalendar } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

interface Prop {
  address: IAddress | null;
  setAddress: React.Dispatch<React.SetStateAction<IAddress | null>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  maxMember: OptionType | null;
  setMaxMember: React.Dispatch<React.SetStateAction<OptionType | null>>;
}

const Content = ({
  address,
  setAddress,
  setSuccess,
  images,
  setImages,
  title,
  setTitle,
  text,
  setText,
  selectedDate,
  setSelectedDate,
  maxMember,
  setMaxMember,
}: Prop) => {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onClickDeleteMap = () => {
    setAddress(null);
  };

  useEffect(() => {
    if (text !== '' && title !== '' && selectedDate) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [selectedDate, setSuccess, text, title]);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto hidden-scrollbar mt-4 w-[90%]">
      <div className="font-bold ml-2">시간 인원 설정</div>
      <div className="flex mb-3 justify-between items-center">
        <div className="flex items-center gap-2 mt-1">
          <FaCalendar />
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <div className="flex items-center">
          <div className="mr-2">
            <IoPeople size={20} />
          </div>
          <People maxMember={maxMember} setMaxMember={setMaxMember} />
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
        className="mt-4 w-full flex flex-1 text-base resize-none placeholder-gray-400 outline-none hidden-scrollbar min-h-40"
        placeholder="주변 학생들과 나누고 싶은 내용을 입력해주세요"
      />

      <ShowImages images={images} setImages={setImages} />

      {address && (
        <div className="flex flex-col items-center justify-center mb-2 w-full">
          <div className="h-48 w-full border border-gray-200 rounded-md  relative">
            <Map y={address?.positionY} x={address?.positionX} name={address?.name} />
            <div className="absolute top-1 right-1 cursor-pointer z-10" onClick={onClickDeleteMap}>
              <IoIosCloseCircle size={20} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
