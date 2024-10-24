import { useEffect, useRef, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { MdOutlineMoreHoriz } from 'react-icons/md';

const Comment = () => {
  const [like, setLike] = useState(false);
  const [more, setMore] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null); //요소를 참조하는 useRef

  const handleClickOutSide = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setMore(false);
    }
  };

  const onClickLikeHandler = () => {
    setLike(!like);
  };

  const onClickMoreHandler = () => {
    setMore(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      //컴포넌트가 언마운트될 때 이벤트 리스너 해제
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  return (
    <div className="w-full h-[70px] flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div className="h-[52px] w-[52px] rounded-full bg-gray-300"></div>
        <div className="flex flex-col ">
          <div className="flex gap-1 items-center">
            <div className="font-bold text-base">찐 감자</div>
            <div className="text-gray-400 font-semibold text-xs">구름대학교</div>
          </div>

          <div className="text-[10px] text-gray-400">09/15 22:39</div>

          <div className="text-sm font-semibold">진짜 감자는 맛있다..최고다..</div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex relative cursor-pointer" onClick={onClickMoreHandler} ref={ref}>
          {more && (
            <div className="bg-white font-medium shadow-lg rounded-md absolute w-28 h-auto right-1 bottom-4 py-1 z-40">
              <div className="border-b border-gray-300 px-2">대댓글 달기</div>
              <div className="border-b border-gray-300 px-2">삭제하기</div>
              <div className="px-2">차단하기</div>
            </div>
          )}
          <MdOutlineMoreHoriz size={25} />
        </div>

        <div className="flex items-center gap-1">
          <span onClick={onClickLikeHandler} className="cursor-pointer">
            {like ? <FaHeart size={14} color="#ff4a4d" /> : <FaRegHeart size={14} />}{' '}
          </span>
          <span className="text-sm font-semibold">15</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
