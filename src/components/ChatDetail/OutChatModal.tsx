import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import Cookies from 'js-cookie';

interface Prop {
  setOutChat: React.Dispatch<React.SetStateAction<boolean>>;
  chatroomId: number;
}

const OutChatModal = ({ setOutChat, chatroomId }: Prop) => {
  const navigate = useNavigate();
  const onClickYes = async () => {
    try {
      const response = await apiClient.delete(`/chat/private/${chatroomId}`, {
        headers: {
          Authorization: Cookies.get('Authorization'),
        },
      });

      if (!response) {
        console.log('네트워크 이상입니다.');
      }

      console.log('채팅방 나가기 성공');
      navigate('/chatList');
    } catch (error) {
      console.log(error);
    }
  };
  const onClickNo = () => {
    setOutChat(false);
  };
  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-20 flex justify-center items-center">
      <div className="w-72 h-36 bg-white rounded-md flex flex-col justify-center items-center gap-4">
        <div className="font-semibold text-lg flex flex-col justify-center items-center">
          <span>채팅방을 나가시겠습니까?</span>
          <span className="text-sm text-red-500">상대방과의 채팅내역이 전부 삭제됩니다.</span>
        </div>
        <div className="flex gap-8">
          <div
            className="w-14 h-7 text-white rounded-lg flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: '#ff4a4d' }}
            onClick={onClickYes}
          >
            네
          </div>
          <div
            className="w-14 h-7 text-white rounded-lg flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: '#ff4a4d' }}
            onClick={onClickNo}
          >
            아니오
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutChatModal;
