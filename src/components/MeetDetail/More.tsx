import { FaRegEyeSlash } from 'react-icons/fa6';
import { MdOutlineNoMeetingRoom } from 'react-icons/md';
import { RiAlarmWarningLine } from 'react-icons/ri';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const More = ({ setModal }: Props) => {
  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-20 flex justify-center items-end">
      <div className="h-64 w-full bg-gray-200 rounded-tl-lg roun rounded-tr-lg p-5 gap-3 flex flex-col">
        <div className="bg-white h-[168px] rounded-lg px-3 flex flex-col font-semibold">
          <div className="flex flex-1 border-b border-gray-200 items-center gap-2">
            <span>
              <FaRegEyeSlash />
            </span>
            <span> 이 글 숨기기</span>
          </div>
          <div className="flex flex-1 border-b border-gray-200 items-center gap-2">
            <span>
              <MdOutlineNoMeetingRoom />
            </span>
            <span>모임 나가기</span>
          </div>
          <div className="flex flex-1 border-b border-gray-200 items-center text-red-600 gap-2">
            <span>
              <RiAlarmWarningLine />
            </span>
            <span>신고하기</span>
          </div>
        </div>

        <div
          className="bg-white h-14 rounded-lg cursor-pointer flex items-center justify-center font-semibold"
          onClick={() => setModal(false)}
        >
          닫기
        </div>
      </div>
    </div>
  );
};

export default More;
