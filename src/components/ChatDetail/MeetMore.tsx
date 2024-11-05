import { MdOutlineNoMeetingRoom } from 'react-icons/md';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOutMeet: React.Dispatch<React.SetStateAction<boolean>>;
}

const MeetMore = ({ setModal, setOutMeet }: Props) => {
  const onClickOutMeet = () => {
    setOutMeet(true);
    setModal(false);
  };
  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-20 flex justify-center items-end">
      <div className="h-auto w-full bg-gray-200 rounded-tl-lg roun rounded-tr-lg p-5 gap-3 flex flex-col">
        <div className="bg-white rounded-lg px-3 flex flex-col font-semibold" onClick={onClickOutMeet}>
          <div className="flex h-14 border-b border-gray-200 items-center gap-2">
            <span>
              <MdOutlineNoMeetingRoom />
            </span>
            <span>모임 나가기</span>
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

export default MeetMore;
