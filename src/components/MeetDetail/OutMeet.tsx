import axios from 'axios';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import Cookies from 'js-cookie';

interface Props {
  setOutMeet: React.Dispatch<React.SetStateAction<boolean>>;
  onReadMeet?: () => void;
}

const OutMeet = ({ setOutMeet, onReadMeet }: Props) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const MeetId = Number(id || searchParams.get('chatId'));
  console.log(MeetId);

  const DeleteMeet = async () => {
    try {
      await apiClient.delete(`/gatherings/${MeetId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get('Authorization'),
        },
      });
      console.log('모임 삭제 완료');
      navigate('/chatList');
    } catch (error) {
      console.log(error);
    }
  };
  const onClickYes = async () => {
    try {
      const response = await apiClient.delete(`/gatherings/${MeetId}/exit`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Cookies.get('Authorization'),
        },
      });

      if (response) {
        console.log(response);
        const { status } = response;
        if (status === 200) {
          console.log('모임 나가기 성공');
          if (pathname.includes('chat')) {
            setOutMeet(false);
            navigate('/chatList');
          } else if (onReadMeet) {
            setOutMeet(false);
            onReadMeet();
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.status === 403) {
          DeleteMeet();
        }
      }
    }
  };
  const onClickNo = () => {
    setOutMeet(false);
  };
  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-20 flex justify-center items-center">
      <div className="w-72 h-36 bg-white rounded-md flex flex-col justify-center items-center gap-4">
        <div className="font-semibold text-lg flex flex-col justify-center items-center">
          <span>해당 모임을 나가시겠습니까?</span>
          <span className="text-sm text-red-500">모임과 모임채팅 모두 나가게 됩니다</span>
          {pathname.includes('chat') && (
            <span className="text-sm text-red-500">(모임 생성자인 경우 모임이 삭제됩니다.)</span>
          )}
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

export default OutMeet;
