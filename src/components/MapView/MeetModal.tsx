import { BsFillPeopleFill } from 'react-icons/bs';
import { IoMdEye } from 'react-icons/io';
import { List } from '../../pages/MapView';
import dayjs from 'dayjs';

interface Prop {
  modalContent: List;
}

const MeetModal = ({ modalContent }: Prop) => {
  return (
    <div className="absolute w-full h-[150px] bg-white bottom-0 z-10 flex items-center justify-center">
      <div className="w-[85%] flex justify-between">
        <div className="flex flex-col">
          <div className="flex">
            <div className="w-5 h-5 bg-gray-300 rounded-md mr-1"></div>
            <div className="font-medium text-sm">
              <span style={{ color: '#4D5159' }}>{modalContent.author.nickname} · </span>
              <span style={{ color: '#868B94' }}> {modalContent.eupMyeonDong}</span>
            </div>
          </div>
          <div>
            <div className="font-bold mt-3 text-base">{modalContent.title}</div>
            <div className="font-semibold text-sm" style={{ color: '#868B94' }}>
              {dayjs(modalContent.gatheringDateTime).format('MM월 DD일 A H:mm')}
            </div>
          </div>
          <div className="flex gap-2 mt-1">
            <div className="flex gap-1 items-center text-gray-500 text-sm">
              <span>
                <BsFillPeopleFill />
              </span>
              <span>{`${modalContent.currentMember}/${modalContent.maxMember}명`}</span>
            </div>

            <div className="flex gap-1 items-center text-gray-500 text-sm">
              <span>
                <IoMdEye />
              </span>
              <span>{modalContent.views}</span>
            </div>
          </div>
        </div>
        {modalContent.thumbnail && (
          <div className="w-28 h-28 rounded-md">
            <img src={modalContent.thumbnail} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetModal;
