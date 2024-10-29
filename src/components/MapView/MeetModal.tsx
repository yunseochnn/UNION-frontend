import { FaUserGroup } from 'react-icons/fa6';
import { IoMdHeart } from 'react-icons/io';

const MeetModal = () => {
  return (
    <div className="absolute w-full h-[150px] bg-white bottom-0 z-10 flex items-center justify-center">
      <div className="w-[85%] flex justify-between">
        <div className="flex flex-col">
          <div className="flex">
            <div className="w-5 h-5 bg-gray-300 rounded-md mr-1"></div>
            <div className="font-medium text-sm">
              <span style={{ color: '#4D5159' }}>닉네임 · </span>
              <span style={{ color: '#868B94' }}> 상도동</span>
            </div>
          </div>
          <div>
            <div className="font-bold mt-3 text-base">휘겸재 전시&카페</div>
            <div className="font-semibold text-sm" style={{ color: '#868B94' }}>
              오늘, 오후 4:00
            </div>
          </div>
          <div className="flex gap-2 mt-1">
            <div className="flex gap-1 items-center text-gray-500 text-sm">
              <span>
                <FaUserGroup />
              </span>
              <span>1/4명</span>
            </div>

            <div className="flex gap-1 items-center text-gray-500 text-sm">
              <span>
                <IoMdHeart />
              </span>
              <span>24</span>
            </div>
          </div>
        </div>
        <div className="w-28 h-28 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default MeetModal;
