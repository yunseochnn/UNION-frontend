import Policy from '../../common/Policy';
import '../../style.css';

const Content = () => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto hidden-scrollbar mt-4">
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
