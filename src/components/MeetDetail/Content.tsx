import { FaRegCalendarCheck } from 'react-icons/fa6';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import '../../style.css';
import Slide from '../../common/Slide';
import Map from '../../common/Map';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

const Content = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
        <span className="font-bold">{` 8/28(수) 모각모`}</span>
      </div>

      <div className="flex items-center gap-2 mt-5">
        <span>
          <FaRegCalendarCheck size={22} />
        </span>
        <span className="text-[18px] font-semibold">오늘, 오후 2:00</span>
      </div>

      <div className="mt-5 text-base">
        <div>
          {`사당역/이수역 인근 카페에서 같이 모델링해요~~
        f360,blender,zbrush, maya 등등 구성원분들 다양하게 툴 사용하며 각자 모델링하고 있습니다~`}
        </div>
      </div>

      <div className="mt-4">
        <div className="h-[396px] w-full cursor-pointer">
          <Slide />
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <div className="h-48 w-full border border-gray-200 rounded-md">
          <Map x={126.8277859} y={37.5361699} name={'장소이름'} />
        </div>
      </div>

      <div className="flex justify-end mt-3">
        <div className="font-semibold text-gray-500 text-sm">관심 0 · 조회 29</div>
      </div>

      <div className="mt-5 border-t border-gray-150 pt-6 mb-2 flex justify-between items-center">
        <div className="font-bold text-xl">
          <span>{`참여 중인 이웃 `}</span>
          <span style={{ color: '#FF4A4D' }}>1</span>
          <span>/4</span>
        </div>

        <div onClick={() => navigate(`/Meet/Participants/${id}`)} className="cursor-pointer">
          <IoIosArrowForward size={24} />
        </div>
      </div>
    </div>
  );
};

export default Content;
