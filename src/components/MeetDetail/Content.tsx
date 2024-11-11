import { FaRegCalendarCheck } from 'react-icons/fa6';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import '../../style.css';
import Slide from '../../common/Slide';
import Map from '../../common/Map';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { Response } from '../../pages/MeetDetail';
import dayjs from 'dayjs';
import { useSetRecoilState } from 'recoil';
import { selectedUserState } from '../../recoil/selectedUserState';
import { useEffect, useState } from 'react';
import 'dayjs/locale/ko';
dayjs.locale('ko');

interface Prop {
  gatheringData: Response | null;
  setGatheringData: React.Dispatch<React.SetStateAction<Response | null>>;
  modify: boolean;
  outMeet: boolean;
}

const Content = ({ gatheringData }: Prop) => {
  const fullMember = gatheringData?.maxMember === gatheringData?.currentMember;
  const setUser = useSetRecoilState(selectedUserState);
  const [isPassDate, setIsPassDate] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const myNickname = localStorage.getItem('nickname');

  useEffect(() => {
    if (gatheringData) {
      setIsPassDate(new Date() > new Date(gatheringData.gatheringDateTime));
    }
  }, [gatheringData, isPassDate]);

  const onClickProfile = () => {
    if (gatheringData?.author.token) {
      setUser(gatheringData.author.token);
      localStorage.setItem('userToken', gatheringData.author.token);
      navigate('/userinfo');
    }
  };

  const images = gatheringData?.photos || [];

  return (
    <div className="flex flex-col">
      <div>
        <div
          className="rounded-full h-[30px] w-[74px] flex items-center justify-center gap-2 text-sm font-bold mt-3"
          style={{ backgroundColor: '#F2F3F6' }}
        >
          <span>
            <HiOutlineUserGroup size={16} style={{ strokeWidth: 2 }} />
          </span>
          <span>일정</span>
        </div>
      </div>

      <div className="flex items-center mt-[20px] gap-3">
        <div
          className={`h-10 w-10 bg-gray-300 rounded-full overflow-hidden ${
            gatheringData?.author.nickname === myNickname ? 'cursor-default' : 'cursor-pointer'
          }`}
          onClick={gatheringData?.author.nickname === myNickname ? undefined : onClickProfile}
        >
          <img src={gatheringData?.author.profileImage} />
        </div>
        <div>
          <div className="font-semibold text-sm">{gatheringData?.author.nickname}</div>
          <div className="font-semibold text-sm text-gray-400">
            {dayjs(gatheringData?.createdAt).format('MM월 DD일 A H:mm')}
          </div>
        </div>
      </div>

      <div className="mt-3 text-[22px]">
        {gatheringData?.recruited || fullMember || isPassDate ? (
          <span className="font-bold text-customGray2">모집완료</span>
        ) : (
          <span className="font-bold" style={{ color: '#FF4A4D' }}>
            모집중
          </span>
        )}

        <span className="font-bold ml-2">{gatheringData?.title}</span>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span>
          <FaRegCalendarCheck size={22} />
        </span>
        <span className="text-[18px] font-semibold">
          {dayjs(gatheringData?.gatheringDateTime).format('MM/DD A H:mm')}
        </span>
      </div>

      <div className="mt-3 text-base">
        <div>{gatheringData?.content}</div>
      </div>

      {images?.length > 0 && (
        <div className="mt-4">
          <div className="h-auto w-full cursor-pointer">{<Slide images={images} />}</div>
        </div>
      )}

      {gatheringData?.address && (
        <div className="mt-4 flex flex-col">
          <div className="h-48 w-full border border-gray-200 rounded-md">
            <Map x={gatheringData?.longitude} y={gatheringData?.latitude} name={gatheringData?.address} />
          </div>
        </div>
      )}

      <div className="flex justify-end mt-3">
        <div className="font-semibold text-gray-500 text-sm">{`관심 ${gatheringData?.likes} · 조회 ${gatheringData?.views}`}</div>
      </div>

      <div className="mt-3 border-t border-gray-150 pt-4 mb-2 flex justify-between items-center">
        <div className="font-bold text-xl">
          <span>{`참여 중인 이웃 `}</span>
          <span style={{ color: '#FF4A4D' }}>{gatheringData?.currentMember}</span>
          <span>{`/${gatheringData?.maxMember}`}</span>
        </div>

        <div
          onClick={() => navigate(`/meet/participants/${id}?ownerNic=${gatheringData?.author.nickname}`)}
          className="cursor-pointer"
        >
          <IoIosArrowForward size={24} />
        </div>
      </div>
    </div>
  );
};

export default Content;
