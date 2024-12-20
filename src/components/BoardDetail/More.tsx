import { BiMessage } from 'react-icons/bi';
import { LiaUserSlashSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';

interface Prop {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUserBlock: React.Dispatch<React.SetStateAction<boolean>>;
  author: { token: string; nickname: string };
}

const More = ({ setModal, setUserBlock, author }: Prop) => {
  const navigate = useNavigate();
  const onSendMessage = () => {
    localStorage.setItem('userToken', author.token);
    navigate(`/chat/private?title=${author.nickname}`);
  };
  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-20 flex justify-center items-end">
      <div className="h-auto w-full bg-gray-200 rounded-tl-lg roun rounded-tr-lg p-5 gap-3 flex flex-col ">
        <div className="bg-white rounded-lg px-3 flex flex-col font-semibold">
          <div className="flex h-14 border-b border-gray-200 items-center gap-2" onClick={onSendMessage}>
            <span>
              <BiMessage />
            </span>
            <span>메시지 보내기</span>
          </div>
          <div
            className="flex h-14 items-center gap-2"
            onClick={() => {
              setModal(false);
              setUserBlock(true);
            }}
          >
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
