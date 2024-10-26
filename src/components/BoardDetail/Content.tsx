import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';
import Slide from '../../common/Slide';
import { useState } from 'react';
import Vote from './Vote';
import { boardInfo } from '../../pages/BoardDetail';

interface Prop {
  boardContent: boardInfo | null;
}

const Content = ({ boardContent }: Prop) => {
  const [like, setLike] = useState(false);
  const onClickLikeHandler = () => {
    setLike(!like);
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center mt-[20px] gap-3">
        <div className="h-10 w-10 bg-gray-300 rounded-full cursor-pointer"></div>
        <div>
          <div className="font-bold text-sm">
            {boardContent?.nickname} <span className="text-gray-400">{`· ${boardContent?.univName}`}</span>
          </div>
          <div className="font-semibold text-sm text-gray-400">{`${boardContent?.createdAt} 조회수 ${boardContent?.views}`}</div>
        </div>
      </div>

      <div className="mt-5 font-semibold text-xl">{boardContent?.title}</div>

      <div>
        <div className="mt-5 text-base">{boardContent?.content}</div>
      </div>

      <div className="mt-4 cursor-pointer">
        <Slide />
      </div>

      <div className="mt-4">
        <Vote />
      </div>

      <div className="flex gap-3 my-3">
        <div className="flex items-center gap-1 font-semibold cursor-pointer" onClick={onClickLikeHandler}>
          {like ? <FaHeart size={18} color="#ff4a4d" /> : <FaRegHeart size={18} />} <span className="text-xs">155</span>
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
