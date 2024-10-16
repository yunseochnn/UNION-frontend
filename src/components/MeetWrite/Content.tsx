import Policy from '../../common/Policy';
import Calendar from './Calendar';
import '../../style.css';
import People from './People';
import { IoPeople } from 'react-icons/io5';

const Content = () => {
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
        <input className="outline-none w-full text-xl font-semibold" placeholder="제목을 입력하세요" />
      </div>

      <textarea
        className="mt-4 w-full h-full text-base resize-none placeholder-gray-400 outline-none hidden-scrollbar"
        placeholder="주변 학생들과 나누고 싶은 내용을 입력해주세요"
      />
    </div>
  );
};

export default Content;
