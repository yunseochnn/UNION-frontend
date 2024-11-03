import axios from 'axios';
import { useState } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import JoinMeetRequest from '../../api/JoinMeetRequest';
import { useParams } from 'react-router-dom';

interface Props {
  fullMember: boolean;
  owner: boolean | undefined;
}

const Footer = ({ fullMember, owner }: Props) => {
  const [like, setLike] = useState(false);
  const [participation, setParticipation] = useState(false);
  const { id } = useParams();
  const MeetId = Number(id);

  const onClickLikeHandler = () => {
    setLike(!like);
  };

  const onClickParticipationHandler = async () => {
    if (!participation && !fullMember) {
      try {
        const response = await JoinMeetRequest(MeetId);

        if (!response) {
          alert('네트워크 이상입니다.');
          return;
        }

        console.log('모임 참여 완료');
        setParticipation(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log(error.response.data);
          }
        }
      }
    }
  };

  const onClickOwner = () => {
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
      {owner ? (
        <div
          className="w-[80%] h-[53px] rounded-md flex items-center justify-center text-xl text-white font-semibold cursor-pointer mr-2"
          style={{ backgroundColor: `${participation ? 'gray' : fullMember ? 'gray ' : '#ff4a4d'}` }}
          onClick={onClickOwner}
        >
          모집마감
        </div>
      ) : (
        <div
          className="w-[80%] h-[53px] rounded-md flex items-center justify-center text-xl text-white font-semibold cursor-pointer mr-2"
          style={{ backgroundColor: `${participation ? 'gray' : fullMember ? 'gray ' : '#ff4a4d'}` }}
          onClick={onClickParticipationHandler}
        >
          {participation ? '참여완료' : fullMember ? '모집완료' : '참여하기'}
        </div>
      )}
    </div>
  );
};

export default Footer;
