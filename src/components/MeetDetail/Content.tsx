import { FaRegCalendarCheck } from 'react-icons/fa6';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import '../../style.css';
import Slide from '../../common/Slide';
import Map from '../../common/Map';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import ReadMeetRequest from '../../api/ReadMeetRequest';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Response } from '../../pages/MeetDetail';

interface Prop {
  gatheringData: Response | null;
  setGatheringData: React.Dispatch<React.SetStateAction<Response | null>>;
}

const Content = ({ gatheringData, setGatheringData }: Prop) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const MeetId = Number(id);

  const onReadMeet = useCallback(async () => {
    try {
      const response = await ReadMeetRequest(MeetId);
      const data = response.data;
      setGatheringData(data);
      console.log(data);
      console.log(gatheringData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response);
        }
      }
    }
  }, [MeetId, setGatheringData]);

  useEffect(() => {
    onReadMeet();
  }, [onReadMeet]);

  const formattedDate = gatheringData?.gatheringDateTime
    ? format(gatheringData.gatheringDateTime, 'yyyy년 MM월 dd일 a hh:mm', { locale: ko })
    : '';

  return (
    <div className="flex flex-col flex-1">
      <div>
        <div
          className="rounded-full h-[30px] w-[74px] flex items-center justify-center gap-2 text-sm font-bold"
          style={{ backgroundColor: '#F2F3F6' }}
        >
          <span>
            <HiOutlineUserGroup size={16} style={{ strokeWidth: 2 }} />
          </span>
          <span>일정</span>
        </div>
      </div>

      <div className="flex items-center mt-[30px] gap-3">
        <div className="h-10 w-10 bg-gray-300 rounded-full cursor-pointer"></div>
        <div>
          <div className="font-semibold text-sm">유니</div>
          <div className="font-semibold text-sm text-gray-400">방배본동 인증 30회 · 1일전</div>
        </div>
      </div>

      <div className="mt-5 text-[22px]">
        <span className="font-bold" style={{ color: '#FF4A4D' }}>
          모집중
        </span>
        <span className="font-bold">{gatheringData?.title}</span>
      </div>

      <div className="flex items-center gap-2 mt-5">
        <span>
          <FaRegCalendarCheck size={22} />
        </span>
        <span className="text-[18px] font-semibold">{formattedDate}</span>
      </div>

      <div className="mt-5 text-base">
        <div>{gatheringData?.content}</div>
      </div>

      <div className="mt-4">
        <div className="h-[396px] w-full cursor-pointer">
          <Slide />
        </div>
      </div>

      {gatheringData?.address && (
        <div className="mt-4 flex flex-col">
          <div className="h-48 w-full border border-gray-200 rounded-md">
            <Map x={gatheringData?.longitude} y={gatheringData?.latitude} name={gatheringData?.address} />
          </div>
        </div>
      )}

      <div className="flex justify-end mt-3">
        <div className="font-semibold text-gray-500 text-sm">관심 0 · 조회 29</div>
      </div>

      <div className="mt-5 border-t border-gray-150 pt-6 mb-2 flex justify-between items-center">
        <div className="font-bold text-xl">
          <span>{`참여 중인 이웃 `}</span>
          <span style={{ color: '#FF4A4D' }}>{gatheringData?.currentMember}</span>
          <span>{`/${gatheringData?.maxMember}`}</span>
        </div>

        <div onClick={() => navigate(`/Meet/Participants/${id}`)} className="cursor-pointer">
          <IoIosArrowForward size={24} />
        </div>
      </div>
    </div>
  );
};

export default Content;
