import { FaRegHeart } from 'react-icons/fa6';
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';
import Slide from './Slide';

const Content = () => {
  return (
    <div className="flex flex-col  px-[30px]">
      <div className="flex items-center mt-[20px] gap-3">
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div>
          <div className="font-bold text-sm">
            유니 <span className="text-gray-400">· 구름대학교</span>
          </div>
          <div className="font-semibold text-sm text-gray-400">09/15 22:39 조회수 233</div>
        </div>
      </div>

      <div className="mt-5 font-semibold text-xl">게시글 제목이 들어갑니다~~~</div>

      <div>
        <div className="mt-5 text-base">{`글 내용이 들어갑니다. 고민 중인 것은 사진을 여러 장 첨부할 수 있도록 할지, 사진 위치를 글 마지막, 혹은 원하는 위치,
        혹은 맨 앞으로 할 지 고민 중입니다. 회의를 통해 결정하는 것이 좋아보입니다.`}</div>
      </div>

      <div className="mt-4">
        <Slide />
      </div>

      <div className="flex gap-3 my-3">
        <div className="flex items-center gap-1 font-semibold">
          <FaRegHeart size={18} /> <span className="text-xs">155</span>
        </div>
        <div className="flex items-center gap-1 font-semibold">
          <HiOutlineChatBubbleOvalLeft size={20} />
          <span className="text-xs">3</span>
        </div>
      </div>
    </div>
  );
};

export default Content;
