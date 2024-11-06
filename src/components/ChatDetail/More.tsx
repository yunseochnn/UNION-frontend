import { LiaUserSlashSolid } from 'react-icons/lia';
import { MdOutlineNoMeetingRoom } from 'react-icons/md';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUserBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setOutChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const More = ({ setModal, setUserBlock, setOutChat }: Props) => {
  const onClickBlockUser = () => {
    setUserBlock(true);
    setModal(false);
  };

  const onClickOutChat = () => {
    setOutChat(true);
    setModal(false);
  };
  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-20 flex justify-center items-end">
      <div className="h-auto w-full bg-gray-200 rounded-tl-lg roun rounded-tr-lg p-5 gap-3 flex flex-col">
        <div className="bg-white rounded-lg px-3 flex flex-col font-semibold">
          <div className="flex h-14 border-b border-gray-200 items-center gap-2" onClick={onClickOutChat}>
            <span>
              <MdOutlineNoMeetingRoom />
            </span>
            <span>채팅방 나가기</span>
          </div>
          <div className="flex h-14 border-b border-gray-200 items-center gap-2" onClick={onClickBlockUser}>
            <span>
              <LiaUserSlashSolid />
            </span>
            <span>유저 차단하기</span>
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
