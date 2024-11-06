import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import JoinMeetRequest from '../../api/JoinMeetRequest';
import { useParams } from 'react-router-dom';
import { Response } from '../../pages/MeetDetail';
import apiClient from '../../api/apiClient';
import Cookies from 'js-cookie';

interface Props {
  gatheringData: Response | null;
}

const Footer = ({ gatheringData }: Props) => {
  const fullMember = gatheringData?.maxMember === gatheringData?.currentMember;
  const [like, setLike] = useState(gatheringData?.liked);
  const [participation, setParticipation] = useState(gatheringData?.joined);
  const [isPassDate, setIsPassDate] = useState(false);
  const [recruited, setRecruited] = useState(gatheringData?.recruited);
  const { id } = useParams();
  const MeetId = Number(id);

  useEffect(() => {
    if (gatheringData) {
      setParticipation(gatheringData.joined);
      setLike(gatheringData.liked);
      setIsPassDate(new Date() > new Date(gatheringData.gatheringDateTime));
      setRecruited(gatheringData.recruited);
      console.log(isPassDate);
    }
  }, [gatheringData, isPassDate]);

  const onClickLikeHandler = () => {
    //모임 좋아요 api 연결
    setLike(!like);
  };

  const onClickParticipationHandler = async () => {
    if (!participation && !fullMember && !isPassDate && !gatheringData?.recruited) {
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

  const onClickOwner = async () => {
    try {
      const response = await apiClient.post(
        `/gatherings/${gatheringData?.id}/recruited`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: Cookies.get('Authorization'),
          },
        },
      );
      console.log('모집 마감 성공');
      setRecruited(response.data.recruited);
    } catch (error) {
      console.log(error);
    }
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
      {gatheringData?.owner ? (
        <div
          className="w-[80%] h-[53px] rounded-md flex items-center justify-center text-xl text-white font-semibold cursor-pointer mr-2"
          style={{
            backgroundColor: `${recruited ? 'gray' : '#ff4a4d'}`,
          }}
          onClick={onClickOwner}
        >
          모집마감
        </div>
      ) : (
        <div
          className="w-[80%] h-[53px] rounded-md flex items-center justify-center text-xl text-white font-semibold cursor-pointer mr-2"
          style={{
            backgroundColor: `${participation ? 'gray' : fullMember || isPassDate || recruited ? 'gray ' : '#ff4a4d'}`,
          }}
          onClick={onClickParticipationHandler}
        >
          {participation ? '참여완료' : fullMember || isPassDate || recruited ? '모집완료' : '참여하기'}
        </div>
      )}
    </div>
  );
};

export default Footer;
