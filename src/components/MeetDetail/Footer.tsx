import { useState } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

const Footer = () => {
  const [like, setLike] = useState(false);
  const [participation, setParticipation] = useState(false);

  const onClickLikeHandler = () => {
    setLike(!like);
  };

  const onClickParticipationHandler = () => {
    setParticipation(true);
  };

  return (
    <div className="h-[70px] border-t border-gray-150 flex items-center justify-between mt-4 cursor-pointer">
      <div className="ml-2" onClick={onClickLikeHandler}>
        {like ? (
          <IoIosHeart size={24} style={{ color: '#ff4a4d' }} />
        ) : (
          <IoIosHeartEmpty size={24} style={{ strokeWidth: 7 }} />
        )}
      </div>
      <div
        className="w-[80%] h-[53px] rounded-md flex items-center justify-center text-xl text-white font-semibold cursor-pointer mr-2"
        style={{ backgroundColor: `${participation ? 'gray' : '#ff4a4d'}` }}
        onClick={onClickParticipationHandler}
      >
        {participation ? '참여완료' : '참여하기'}
      </div>
    </div>
  );
};

export default Footer;
